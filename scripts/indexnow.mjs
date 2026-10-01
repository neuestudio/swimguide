// 배포 후 사이트맵의 모든 URL을 IndexNow로 알린다.
// - api.indexnow.org : Bing 등 IndexNow 참여 검색엔진에 공유됨
// - 네이버는 별도 엔드포인트로 따로 POST 해야 한다 (서치어드바이저에 사이트 등록 필요)
// 사용: npm run indexnow            → 사이트맵 전체
//       npm run indexnow -- <url>... → 지정한 URL만
import config from '../site.config.mjs';

const SITE = config.SITE_URL.replace(/\/$/, '');
const host = new URL(SITE).host;

let urls = process.argv.slice(2);
if (!urls.length) {
  const sm = await fetch(`${SITE}/sitemap.xml`);
  if (!sm.ok) throw new Error(`사이트맵을 가져오지 못함: ${sm.status}`);
  urls = [...(await sm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const key = await fetch(`${SITE}/${config.INDEXNOW_KEY}.txt`);
if (!key.ok) throw new Error(`키 파일이 배포되지 않음 (${key.status}). 먼저 npm run deploy 하세요.`);

const body = JSON.stringify({ host, key: config.INDEXNOW_KEY, keyLocation: `${SITE}/${config.INDEXNOW_KEY}.txt`, urlList: urls });

for (const [name, endpoint] of [['IndexNow', 'https://api.indexnow.org/indexnow'], ['Naver', 'https://searchadvisor.naver.com/indexnow']]) {
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body });
  const text = (await res.text()).slice(0, 200);
  console.log(`${res.ok ? '✓' : '✗'} ${name}: ${res.status} ${text}`);
}
console.log(`URL ${urls.length}개 전송`);
