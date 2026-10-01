// 배포된 실제 URL을 검사한다 (로컬 빌드 파일이 아니라 서버 응답 기준).
// 사용: npm run verify                → site.config.mjs 의 SITE_URL
//       npm run verify -- http://localhost:8787   → wrangler dev 로 미리 점검
import config from '../site.config.mjs';

const SITE = config.SITE_URL.replace(/\/$/, '');
const BASE = (process.argv[2] || SITE).replace(/\/$/, '');
const toBase = (u) => u.replace(SITE, BASE);

let fails = 0;
const ok = (msg) => console.log('  ✓ ' + msg);
const bad = (msg) => { fails++; console.log('  ✗ ' + msg); };
const check = (cond, msg) => (cond ? ok(msg) : bad(msg));

const get = (path, opts = {}) => fetch(path.startsWith('http') ? path : BASE + path, { redirect: 'manual', ...opts });
const attr = (html, re) => (html.match(re) || [])[1];

console.log(`검증 대상: ${BASE}\n`);

// 1) 색인 인프라 파일
console.log('[색인 파일]');
const robots = await get('/robots.txt');
const robotsText = await robots.text();
check(robots.status === 200 && robotsText.includes(`Sitemap: ${SITE}/sitemap.xml`), `robots.txt 200 + Sitemap 줄 (${robots.status})`);
const ads = await get('/ads.txt');
const adsText = await ads.text();
check(ads.status === 200, `ads.txt 200 (${ads.status})`);
if (!/pub-\d+/.test(adsText)) console.log('  ⚠ ads.txt에 게시자 ID가 아직 없음');
const key = await get(`/${config.INDEXNOW_KEY}.txt`);
check(key.status === 200 && (await key.text()).trim() === config.INDEXNOW_KEY, `IndexNow 키 파일 (${key.status})`);
const sm = await get('/sitemap.xml');
const smText = await sm.text();
check(sm.status === 200, `sitemap.xml 200 (${sm.status})`);
const locs = [...smText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check(locs.length > 0, `사이트맵 URL ${locs.length}개`);

// 2) 페이지별: 200, canonical/og:url = 자기 자신, hreflang 대칭, JSON-LD 파싱
console.log('\n[페이지]');
const pages = new Map();
for (const loc of locs) {
  const res = await get(toBase(loc));
  const html = await res.text();
  pages.set(loc, html);
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]+)"/);
  const problems = [];
  if (res.status !== 200) problems.push(`status ${res.status}`);
  if (canonical !== loc) problems.push(`canonical=${canonical}`);
  if (ogUrl !== loc) problems.push(`og:url=${ogUrl}`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) problems.push('description 없음');
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { problems.push('JSON-LD 파싱 실패'); }
  }
  problems.length ? bad(`${loc} → ${problems.join(', ')}`) : ok(loc);
}

console.log('\n[hreflang 대칭]');
let hreflangOk = true;
for (const [loc, html] of pages) {
  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  const langs = alts.map((a) => a[1]);
  for (const l of [...config.LANGS, 'x-default']) {
    if (!langs.includes(l)) { hreflangOk = false; bad(`${loc}: hreflang ${l} 없음`); }
  }
  const selfLang = attr(html, /<html lang="([^"]+)"/);
  const self = alts.find((a) => a[1] === selfLang);
  if (!self || self[2] !== loc) { hreflangOk = false; bad(`${loc}: 자기 자신을 가리키는 hreflang 없음`); }
  for (const [, l, target] of alts) {
    if (l === 'x-default') continue;
    const back = pages.get(target);
    if (!back) { hreflangOk = false; bad(`${loc}: hreflang ${l} 대상 ${target}이 사이트맵에 없음`); continue; }
    if (!back.includes(`hreflang="${selfLang}" href="${loc}"`)) { hreflangOk = false; bad(`${target} → ${loc} 역방향 hreflang 없음`); }
  }
}
if (hreflangOk) ok(`${pages.size}개 페이지 모두 대칭`);

// 3) trailing slash / index.html → 301, 404
console.log('\n[리다이렉트·404]');
if (!locs.length) { console.log('\n사이트맵에 URL이 없어 검사를 멈춥니다.'); process.exit(1); }
const sample = new URL(locs.find((l) => new URL(l).pathname.length > 1)).pathname;
const noSlash = await get(sample.slice(0, -1));
check(noSlash.status === 301 && new URL(noSlash.headers.get('location'), BASE).pathname === sample, `${sample.slice(0, -1)} → 301 ${sample} (${noSlash.status})`);
const idx = await get(sample + 'index.html');
check(idx.status === 301 && new URL(idx.headers.get('location'), BASE).pathname === sample, `${sample}index.html → 301 (${idx.status})`);
for (const [from, to] of [['/freestyle/', '/strokes/freestyle/'], ['/en/tools/pace-calculator/', '/en/knowledge/pace-calculator/']]) {
  const r = await get(from);
  check(r.status === 301 && new URL(r.headers.get('location'), BASE).pathname === to, `옛 주소 ${from} → 301 ${to} (${r.status})`);
}
for (const [lang, path] of [[config.LANGS[0], '/this-page-does-not-exist/'], ...config.LANGS.slice(1).map((l) => [l, `/${l}/this-page-does-not-exist/`])]) {
  const r = await get(path);
  const html = await r.text();
  check(r.status === 404 && html.includes(`<html lang="${lang}"`) && html.includes('noindex'), `${path} → 404 (${lang}, noindex) (${r.status})`);
}

console.log(fails ? `\n실패 ${fails}건` : '\n모든 검사 통과');
process.exit(fails ? 1 : 0);
