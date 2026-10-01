// 정적 사이트 빌드: src/content/*.mjs → dist/
// 레이아웃은 한 곳(이 파일)에서만 정의하므로 모든 언어에 똑같이 반영된다.
// 규칙 위반(문장 수, 내부 링크, hreflang, 깨진 링크)은 에러로 빌드를 멈춘다.
import { rm, mkdir, writeFile, cp, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../site.config.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = config.SITE_URL.replace(/\/$/, '');
const DEFAULT_LANG = config.LANGS[0];
const CATS = ['strokes', 'knowledge', 'issues', 'store'];
const INFO = ['about', 'contact', 'privacy'];

const content = {};
for (const lang of config.LANGS) {
  content[lang] = (await import(`./content/${lang}.mjs`)).default;
}

const errors = [];
const warnings = [];
const need = (cond, msg) => { if (!cond) errors.push(msg); };

// ---------- 유틸 ----------

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = (s) => String(s).replace(/<[^>]+>/g, '');
const countSentences = (s) => (stripTags(s).match(/[.!?](?=\s|$)/g) || []).length;
const dots = (n) => '●'.repeat(n) + '○'.repeat(3 - n);

const emailHtml = config.CONTACT_EMAIL
  ? `<a href="mailto:${esc(config.CONTACT_EMAIL)}">${esc(config.CONTACT_EMAIL)}</a>`
  : '<span class="placeholder">[CONTACT_EMAIL 미설정]</span>';
const fill = (s) => String(s).replace(/\{\{EMAIL\}\}/g, emailHtml).replace(/\{\{POLICY_DATE\}\}/g, config.POLICY_DATE);

// ---------- 글 목록과 경로 ----------

// 카테고리별 글. strokes 는 호흡법(guides)을 맨 앞에 둔다.
function articlesOf(c) {
  return [
    ...[...c.guides, ...c.strokes].map((a) => ({ ...a, cat: 'strokes', group: 'basic' })),
    ...c.moreStrokes.map((a) => ({ ...a, cat: 'strokes' })),
    ...[...c.knowledge, c.pace].map((a) => ({ ...a, cat: 'knowledge' })),
    ...c.issues.map((a) => ({ ...a, cat: 'issues' })),
    ...c.store.map((a) => ({ ...a, cat: 'store' })),
  ];
}
const ARTICLES = Object.fromEntries(config.LANGS.map((l) => [l, articlesOf(content[l])]));
const art = (lang, key) => ARTICLES[lang].find((a) => a.key === key);
const inCat = (lang, cat) => ARTICLES[lang].filter((a) => a.cat === cat);

// 경로는 기본 언어 기준으로 한 번만 만든다. 다른 언어는 /<lang> 접두사만 붙는다.
const PATHS = { home: '/' };
for (const k of [...CATS, ...INFO]) PATHS[k] = `/${k}/`;
for (const a of ARTICLES[DEFAULT_LANG]) PATHS[a.key] = `/${a.cat}/${a.key === 'pace' ? 'pace-calculator' : a.key}/`;
const href = (lang, key) => (lang === DEFAULT_LANG ? '' : `/${lang}`) + PATHS[key];
const abs = (path) => SITE + path;
const pageKeys = (lang) => ['home', ...CATS, ...ARTICLES[lang].map((a) => a.key), ...INFO];
const otherLang = (lang) => config.LANGS.find((l) => l !== lang);

// ---------- 그림 ----------
// 캐릭터: 면을 채운 통통한 캐릭터. 팔다리는 외곽선(lo) 위에 피부색(li)을 겹쳐 그린다.
// 회전하는 팔다리는 translate 그룹 안에 두어 (0,0) 기준으로 돌린다.

const STROKE_BG = { breathing: 'pool-deep', freestyle: 'pool', backstroke: 'lemon', breaststroke: 'sage', butterfly: 'rose' };

const limb = (d) => `<path class="lo" d="${d}"/><path class="li" d="${d}"/>`;
const hand = (x, y) => `<circle class="skin" cx="${x}" cy="${y}" r="5"/>`;
const foot = (x, y, r = 0) => `<ellipse class="skin" cx="${x}" cy="${y}" rx="7" ry="4.2" transform="rotate(${r} ${x} ${y})"/>`;
const torso = (d) => `<path class="to" d="${d}"/><path class="ti" d="${d}"/>`;
const drops = (pts) => `<g>${pts.map(([x, y], i) => `<ellipse class="drop d${i}" cx="${x}" cy="${y}" rx="2.6" ry="3.4"/>`).join('')}</g>`;
const BACK = '<g class="waves slow"><use href="#wback" class="wb"/></g>';
const FRONT = '<g class="waves"><use href="#wfront" class="wf"/><use href="#wfoam" class="foam"/></g>';

// 옆을 보는 머리: 수모, 수경, 볼터치. (cx,cy) 중심, 반지름 r=19~20
function sideHead({ cx, cy, cap, glint, strap, lens, cheek, mouth }) {
  return `<circle class="skin" cx="${cx}" cy="${cy}" r="${cap.r}"/>
    <path class="cap" d="${cap.d}"/><path class="gl" d="${glint}"/>
    <path class="strap" d="${strap}"/>
    <ellipse class="lens" cx="${lens[0]}" cy="${lens[1]}" rx="6.2" ry="5.3"/><circle class="glint" cx="${lens[0] - 1.8}" cy="${lens[1] - 1.8}" r="1.6"/>
    <circle class="cheek" cx="${cheek[0]}" cy="${cheek[1]}" r="4"/>${mouth}`;
}

const SWIMMERS = {
  freestyle: `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#F26B4F;--suit:#2E4A7D" aria-hidden="true">
    ${BACK}
    ${drops([[30, 86], [22, 92], [38, 79]])}
    <g transform="translate(76 100)"><g class="kick">${limb('M0 0 L-32 -4')}${foot(-36, -4.5, -8)}</g></g>
    <g transform="translate(76 100)"><g class="kick b">${limb('M0 0 L-30 8')}${foot(-34, 8.5, 12)}</g></g>
    <g transform="translate(122 93)"><g class="arm b">${limb('M0 0 V-34')}${hand(0, -37)}</g></g>
    ${torso('M78 100 Q100 104 124 94')}
    ${sideHead({ cx: 146, cy: 90, cap: { r: 20, d: 'M126.7 95.2 A20 20 0 0 1 162.4 78.5 Q146 88 126.7 95.2 Z' }, glint: 'M133 79 q5 -7 14 -8', strap: 'M151 88 Q140 91 128 95', lens: [157, 89], cheek: [152, 99], mouth: '<circle class="mouth" cx="163" cy="100" r="2.3"/>' })}
    <circle class="bubble" cx="169" cy="93" r="3"/><circle class="bubble b" cx="175" cy="86" r="2"/>
    <g transform="translate(122 93)"><g class="arm">${limb('M0 0 V-34')}${hand(0, -37)}</g></g>
    ${FRONT}</svg>`,

  backstroke: `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#4F86D9;--suit:#F26B4F" aria-hidden="true">
    ${BACK}
    ${drops([[34, 82], [26, 88], [42, 76]])}
    <g transform="translate(84 95)"><g class="kick">${limb('M0 0 L-34 -5')}${foot(-38, -5.5, -8)}</g></g>
    <g transform="translate(84 95)"><g class="kick b">${limb('M0 0 L-33 5')}${foot(-37, 5.5, 8)}</g></g>
    <g transform="translate(128 93)"><g class="arm b rev">${limb('M0 0 V-36')}${hand(0, -39)}</g></g>
    ${torso('M86 95 Q108 88 130 95')}
    <circle class="skin" cx="148" cy="90" r="19"/>
    <path class="cap" d="M148 71 A19 19 0 0 0 131.5 99.5 Q144 88 148 71 Z"/><path class="gl" d="M137 81 q2 -6 7 -8"/>
    <path class="strap" d="M150 80 Q141 83 134 91"/>
    <ellipse class="lens" cx="155" cy="79" rx="6.2" ry="5.3"/><circle class="glint" cx="153.2" cy="77.2" r="1.6"/>
    <circle class="cheek" cx="161" cy="88" r="3.8"/><path class="smile" d="M152 90 q4 4 9 0"/>
    <g transform="translate(128 93)"><g class="arm rev">${limb('M0 0 V-36')}${hand(0, -39)}</g></g>
    ${FRONT}</svg>`,

  breaststroke: `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#F7C948;--suit:#4F86D9" aria-hidden="true">
    ${BACK}
    <g transform="translate(82 101)"><g class="frogleg">${limb('M0 0 L-22 -10 L-38 -1')}${foot(-42, -1, -10)}</g></g>
    <g transform="translate(82 101)"><g class="frogleg b">${limb('M0 0 L-22 10 L-38 3')}${foot(-42, 3, 10)}</g></g>
    ${torso('M84 101 Q106 104 128 97')}
    <g transform="translate(128 97)"><g class="frogarm b">${limb('M0 0 L34 6')}${hand(37, 6)}</g></g>
    <g class="headbob">
      ${sideHead({ cx: 140, cy: 74, cap: { r: 19, d: 'M121.3 77.3 A19 19 0 0 1 157.9 67.5 Q140 77 121.3 77.3 Z' }, glint: 'M127 66 q6 -8 16 -8', strap: 'M146 76 Q134 78 122 80', lens: [151, 76], cheek: [147, 85], mouth: '<path class="smile" d="M152 84 q4 4 8 0"/>' })}
    </g>
    <g transform="translate(128 97)"><g class="frogarm">${limb('M0 0 L34 -6')}${hand(37, -6)}</g></g>
    ${FRONT}</svg>`,

  butterfly: `<svg class="sw ch fly" viewBox="14 34 172 129" style="--cap:#2E4A7D;--suit:#F7C948" aria-hidden="true">
    ${BACK}
    ${drops([[106, 70], [162, 62], [98, 80], [170, 72]])}
    <g class="bodyroll" style="transform-origin:100px 96px">
      <g transform="translate(124 90)"><g class="arm b">${limb('M0 0 V-36')}${hand(0, -39)}</g></g>
      ${limb('M82 99 Q62 95 46 100')}${limb('M82 102 Q62 100 47 106')}
      <ellipse class="skin" cx="40" cy="102" rx="8" ry="6" transform="rotate(-20 40 102)"/>
      ${torso('M82 100 Q104 104 126 93')}
      ${sideHead({ cx: 142, cy: 80, cap: { r: 19, d: 'M123.3 83.3 A19 19 0 0 1 159.9 73.5 Q142 84 123.3 83.3 Z' }, glint: 'M129 72 q6 -8 16 -8', strap: 'M148 82 Q136 84 124 87', lens: [153, 82], cheek: [149, 91], mouth: '<path class="mouth-o" d="M155 90 q4 5 8 0 z"/>' })}
      <g transform="translate(128 92)"><g class="arm">${limb('M0 0 V-36')}${hand(0, -39)}</g></g>
    </g>
    ${FRONT}</svg>`,
};

// 정면 얼굴 (입영, 생존수영, 개인혼영)
const r1 = (n) => +n.toFixed(1);
function frontFace({ cx, cy, r, eyes = 'dot', mouth = 'open', goggles = false }) {
  const capY = cy - r * 0.18, capX = Math.sqrt(r * r - (r * 0.18) ** 2);
  const ey = cy + r * 0.18, ex = r * 0.36;
  let s = `<circle class="skin" cx="${cx}" cy="${cy}" r="${r}"/>`
    + `<path class="cap" d="M${r1(cx - capX)} ${r1(capY)} A${r} ${r} 0 0 1 ${r1(cx + capX)} ${r1(capY)} Q${cx} ${r1(capY - r * 0.16)} ${r1(cx - capX)} ${r1(capY)} Z"/>`
    + `<path class="gl" d="M${r1(cx - r * 0.6)} ${r1(cy - r * 0.5)} q${r1(r * 0.3)} ${r1(-r * 0.38)} ${r1(r * 0.72)} ${r1(-r * 0.4)}"/>`;
  if (goggles) {
    const gy = r1(capY - r * 0.1), gr = r1(r * 0.25);
    s += `<path class="strap" d="M${r1(cx - capX)} ${gy} H${r1(cx + capX)}"/>`
      + [-1, 1].map((d) => `<circle class="lens" cx="${r1(cx + d * r * 0.36)}" cy="${gy}" r="${gr}"/><circle class="glint" cx="${r1(cx + d * r * 0.36 - gr * 0.35)}" cy="${r1(gy - gr * 0.35)}" r="${r1(r * 0.07)}"/>`).join('');
  }
  s += [-1, 1].map((d) => (eyes === 'happy'
    ? `<path class="smile" d="M${r1(cx + d * ex - r * 0.13)} ${r1(ey)} q${r1(r * 0.13)} ${r1(-r * 0.15)} ${r1(r * 0.26)} 0"/>`
    : `<circle class="ink" cx="${r1(cx + d * ex)}" cy="${r1(ey)}" r="${r1(r * 0.11)}"/><circle class="glint" cx="${r1(cx + d * ex + r * 0.04)}" cy="${r1(ey - r * 0.04)}" r="${r1(r * 0.035)}"/>`)
    + `<circle class="cheek" cx="${r1(cx + d * r * 0.62)}" cy="${r1(ey + r * 0.24)}" r="${r1(r * 0.17)}"/>`).join('');
  s += mouth === 'open'
    ? `<path class="mouth-o" d="M${r1(cx - r * 0.19)} ${r1(ey + r * 0.2)} q${r1(r * 0.19)} ${r1(r * 0.26)} ${r1(r * 0.38)} 0 z"/>`
    : `<path class="smile" d="M${r1(cx - r * 0.17)} ${r1(ey + r * 0.24)} q${r1(r * 0.17)} ${r1(r * 0.16)} ${r1(r * 0.34)} 0"/>`;
  return s;
}

Object.assign(STROKE_BG, {
  survival: 'pool', treading: 'sage', sidestroke: 'lemon', 'dog-paddle': 'rose', 'elementary-backstroke': 'pool-deep',
  start: 'lemon', turns: 'pool', underwater: 'pool-deep', im: 'sage',
});

Object.assign(SWIMMERS, {
  // 위에서 본 별 모양 누워 뜨기
  survival: `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#F26B4F;--suit:#2E4A7D" aria-hidden="true">
    <ellipse class="ripple" cx="100" cy="100" rx="66" ry="46"/><ellipse class="ripple b" cx="100" cy="100" rx="66" ry="46"/>
    <g class="floaty" style="transform-origin:100px 100px">
      ${limb('M94 116 L74 144')}${foot(71, 147, 55)}${limb('M106 116 L126 144')}${foot(129, 147, -55)}
      ${limb('M91 96 L61 78')}${hand(57, 76)}${limb('M109 96 L139 78')}${hand(143, 76)}
      ${torso('M100 96 V116')}
      ${frontFace({ cx: 100, cy: 73, r: 19, eyes: 'happy', mouth: 'smile' })}
    </g></svg>`,

  // 몸을 세우고 팔 스컬링, 다리 에그비터
  treading: `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#4F86D9;--suit:#F26B4F" aria-hidden="true">
    ${BACK}
    <g transform="translate(95 128)"><g class="egg">${limb('M0 0 L-14 12 L-6 25')}${foot(-5, 27, 20)}</g></g>
    <g transform="translate(105 128)"><g class="egg b">${limb('M0 0 L14 12 L6 25')}${foot(5, 27, -20)}</g></g>
    ${torso('M100 102 V128')}
    <g transform="translate(89 104)"><g class="scull">${limb('M0 0 L-28 5')}${hand(-31, 5)}</g></g>
    <g transform="translate(111 104)"><g class="scull b">${limb('M0 0 L28 5')}${hand(31, 5)}</g></g>
    <g class="headbob">${frontFace({ cx: 100, cy: 76, r: 20, goggles: true })}</g>
    ${FRONT}</svg>`,

  // 옆으로 누운 횡영과 가위차기
  sidestroke: `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#F7C948;--suit:#4F86D9" aria-hidden="true">
    ${BACK}
    <g transform="translate(84 96)"><g class="scissor">${limb('M0 0 L-20 -9 L-40 -5')}${foot(-44, -5, -10)}</g></g>
    <g transform="translate(84 96)"><g class="scissor b">${limb('M0 0 L-22 9 L-42 8')}${foot(-46, 8, 8)}</g></g>
    <g transform="translate(132 98)"><g class="sweepl">${limb('M0 0 L38 8')}${hand(41, 8)}</g></g>
    ${torso('M86 96 Q108 98 132 94')}
    <circle class="skin" cx="150" cy="88" r="19"/>
    <path class="cap" d="M140.5 104.5 A19 19 0 1 1 158 70.8 Q146 84 140.5 104.5 Z"/><path class="gl" d="M137 80 q2 -7 9 -10"/>
    <path class="strap" d="M156 86 Q148 91 142 99"/>
    <ellipse class="lens" cx="161" cy="85" rx="6" ry="5.2"/><circle class="glint" cx="159.3" cy="83.3" r="1.6"/>
    <circle class="cheek" cx="160" cy="96" r="3.8"/><path class="smile" d="M163 93 q3 3 6 0"/>
    <g transform="translate(130 91)"><g class="sweepu">${limb('M0 0 L-30 3')}${hand(-33, 3)}</g></g>
    ${FRONT}</svg>`,

  // 머리 들고 번갈아 휘젓는 개헤엄
  'dog-paddle': `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#9CCB3B;--suit:#F26B4F" aria-hidden="true">
    ${BACK}
    ${drops([[40, 84], [32, 90]])}
    <g transform="translate(84 102)"><g class="kick">${limb('M0 0 L-32 -3')}${foot(-36, -3.5, -6)}</g></g>
    <g transform="translate(84 102)"><g class="kick b">${limb('M0 0 L-30 7')}${foot(-34, 7.5, 10)}</g></g>
    <g transform="translate(128 99)"><g class="paddle b">${limb('M0 0 L22 10')}${hand(25, 11)}</g></g>
    ${torso('M86 102 Q106 104 128 97')}
    <g class="headbob">
      ${sideHead({ cx: 140, cy: 74, cap: { r: 19, d: 'M121.3 77.3 A19 19 0 0 1 157.9 67.5 Q140 77 121.3 77.3 Z' }, glint: 'M127 66 q6 -8 16 -8', strap: 'M146 76 Q134 78 122 80', lens: [151, 76], cheek: [147, 85], mouth: '<path class="mouth-o" d="M152 83 q4 5 8 0 z"/>' })}
    </g>
    <g transform="translate(128 99)"><g class="paddle">${limb('M0 0 L22 10')}${hand(25, 11)}</g></g>
    ${FRONT}</svg>`,

  // 누워서 두 팔을 동시에 젓는 엘리멘터리 백스트로크
  'elementary-backstroke': `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#2E4A7D;--suit:#F7C948" aria-hidden="true">
    ${BACK}
    <g transform="translate(86 96)"><g class="frogleg">${limb('M0 0 L-20 8 L-38 0')}${foot(-42, 0, -6)}</g></g>
    <g transform="translate(86 96)"><g class="frogleg b">${limb('M0 0 L-20 -6 L-38 2')}${foot(-42, 2, 6)}</g></g>
    <g transform="translate(126 95)"><g class="ebarm b">${limb('M0 0 L-30 4')}${hand(-33, 4)}</g></g>
    ${torso('M88 96 Q108 90 130 95')}
    <circle class="skin" cx="148" cy="90" r="19"/>
    <path class="cap" d="M148 71 A19 19 0 0 0 131.5 99.5 Q144 88 148 71 Z"/><path class="gl" d="M137 81 q2 -6 7 -8"/>
    <path class="strap" d="M150 80 Q141 83 134 91"/>
    <ellipse class="lens" cx="155" cy="79" rx="6.2" ry="5.3"/><circle class="glint" cx="153.2" cy="77.2" r="1.6"/>
    <circle class="cheek" cx="161" cy="88" r="3.8"/><path class="smile" d="M152 90 q4 4 9 0"/>
    <g transform="translate(126 95)"><g class="ebarm">${limb('M0 0 L-30 4')}${hand(-33, 4)}</g></g>
    ${FRONT}</svg>`,

  // 스타트대에서 다이빙
  start: `<svg class="sw ch" viewBox="14 34 172 129" style="--cap:#F26B4F;--suit:#2E4A7D" aria-hidden="true">
    ${BACK}
    <path class="block" d="M18 70 h36 l-5 9 h-26 z"/><rect class="block2" x="28" y="79" width="16" height="22" rx="2"/>
    <g class="dive">
      ${limb('M86 70 L60 57')}${limb('M86 74 L62 64')}${foot(57, 55, 30)}${foot(59, 62, 30)}
      ${torso('M88 72 Q104 78 116 84')}
      ${limb('M118 84 L146 97')}${hand(149, 98)}
      <circle class="skin" cx="122" cy="80" r="14"/>
      <path class="cap" d="M108.8 84.8 A14 14 0 0 1 135.3 75.7 Q121 77 108.8 84.8 Z"/><path class="gl" d="M113 76 q4 -6 11 -7"/>
      <ellipse class="lens" cx="129" cy="85" rx="4.8" ry="4.1"/><circle class="glint" cx="127.7" cy="83.7" r="1.2"/>
      <circle class="cheek" cx="122" cy="90" r="3"/>
    </g>
    ${drops([[150, 88], [158, 84], [142, 84]])}
    ${FRONT}</svg>`,

  // 벽 앞에서 공처럼 구르는 플립턴
  turns: `<svg class="sw ch deep" viewBox="14 34 172 129" style="--cap:#4F86D9;--suit:#F26B4F" aria-hidden="true">
    ${BACK}
    <rect class="wall" x="168" y="30" width="22" height="140"/><path d="M168 60 H190 M168 90 H190 M168 120 H190 M168 150 H190" class="thin"/>
    <path d="M179 112 v26 M172 125 h14" stroke-width="4"/>
    <path class="turnarrow" d="M104 104 A30 30 0 1 1 112 146"/>
    <circle class="bubble" cx="118" cy="100" r="3"/><circle class="bubble b" cx="124" cy="92" r="2.2"/>
    <g transform="translate(134 124)"><g class="flip">
      <circle class="suitball" cx="0" cy="4" r="15"/>
      ${limb('M-8 10 Q8 20 16 6')}${foot(18, 3, -70)}
      <circle class="skin" cx="5" cy="-11" r="11"/>
      <path class="cap" d="M-5.4 -7.6 A11 11 0 0 1 15.8 -13.2 Q5 -12 -5.4 -7.6 Z"/>
      <ellipse class="lens" cx="11" cy="-7" rx="4" ry="3.4"/><circle class="glint" cx="10" cy="-8" r="1"/>
    </g></g>
    ${FRONT}</svg>`,

  // 물속 유선형 돌핀킥
  underwater: `<svg class="sw ch deep" viewBox="14 34 172 129" style="--cap:#F7C948;--suit:#2E4A7D" aria-hidden="true">
    ${BACK}
    <circle class="bubble" cx="150" cy="108" r="3.2"/><circle class="bubble b" cx="156" cy="100" r="2.4"/><circle class="bubble c" cx="146" cy="98" r="2"/>
    <g class="bodyroll" style="transform-origin:110px 124px">
      <g transform="translate(98 126)"><g class="dolphin">${limb('M0 0 Q-16 -2 -32 2')}${limb('M0 3 Q-16 2 -32 7')}<ellipse class="skin" cx="-37" cy="5" rx="8" ry="5.5" transform="rotate(-10 -37 5)"/></g></g>
      ${torso('M100 126 Q114 128 128 124')}
      ${limb('M128 116 L168 115')}${limb('M128 119 L168 119')}${hand(171, 117)}
      <circle class="skin" cx="138" cy="124" r="13"/>
      <path class="cap" d="M125.2 122 A13 13 0 0 1 150.8 122 Q138 119 125.2 122 Z"/><path class="gl" d="M129 116 q4 -5 10 -5"/>
      <ellipse class="lens" cx="146" cy="128" rx="4.6" ry="3.9"/><circle class="glint" cx="144.8" cy="126.8" r="1.1"/>
      <circle class="cheek" cx="140" cy="133" r="3"/>
    </g>
    ${FRONT}</svg>`,

  // 수모 색이 다른 네 친구 (접영, 배영, 평영, 자유형 순서)
  im: `<svg class="sw ch" viewBox="14 34 172 129" aria-hidden="true">
    ${BACK}
    ${[['#2E4A7D', 44, 80, 'open'], ['#4F86D9', 80, 76, 'smile'], ['#F7C948', 116, 80, 'open'], ['#F26B4F', 152, 76, 'smile']]
    .map(([cap, x, y, m], i) => `<g class="bob n${i}" style="--cap:${cap}"><circle class="numdot" cx="${x}" cy="${y - 30}" r="7"/><text class="num" x="${x}" y="${y - 26.5}">${i + 1}</text>${frontFace({ cx: x, cy: y, r: 15, mouth: m, eyes: i % 2 ? 'happy' : 'dot' })}</g>`).join('')}
    ${FRONT}</svg>`,
});

// 캐릭터는 어떤 비율의 칸에 들어가도 꽉 채우도록 (커버 16:9, 카드 4:3)
for (const k of Object.keys(SWIMMERS)) SWIMMERS[k] = SWIMMERS[k].replace('<svg class="sw ch', '<svg preserveAspectRatio="xMidYMid slice" class="sw ch');

// 연습법 전용 글: 같은 캐릭터를 수모 색만 바꿔 쓴다
SWIMMERS['butterfly-wave'] = SWIMMERS.underwater.replace('--cap:#F7C948', '--cap:#F26B4F');
SWIMMERS['breaststroke-kick'] = SWIMMERS.breaststroke.replace('--cap:#F7C948', '--cap:#9CCB3B');
Object.assign(STROKE_BG, { 'butterfly-wave': 'rose', 'breaststroke-kick': 'lemon' });

// 단계별 동작 그림: 같은 캐릭터의 팔·다리 각도를 단계마다 고정해 그린다. [앞 팔(다리), 뒤 팔(다리)] 회전 각도
const POSES = {
  freestyle: { arm: [[100, 280], [135, 315], [200, 20], [-20, 160]] },
  backstroke: { arm: [[85, 265], [130, 310], [220, 40], [0, 180]] },
  butterfly: { arm: [[90, 90], [135, 135], [215, 215], [300, 300]] },
  breaststroke: { kick: [[-40, 40], [-24, 24], [0, 0]] },
};
function poseSvg(key, [a, b]) {
  return SWIMMERS[key]
    .replace('class="sw ch', 'class="sw ch still')
    .replace(/<g class="(arm|frogleg) b( rev)?">/, `<g style="transform:rotate(${b}deg)">`)
    .replace(/<g class="(arm|frogleg)( rev)?">/, `<g style="transform:rotate(${a}deg)">`);
}

// 물 위로 얼굴을 내민 마스코트와 고무오리 (홈 히어로, 호흡법)
const MASCOT = (cls = '') => `<svg preserveAspectRatio="xMidYMid slice" class="sw ch mascot ${cls}" viewBox="0 0 200 130" style="--cap:#F26B4F" aria-hidden="true">
  ${BACK}
  <g transform="translate(40 98)"><g class="duck">
    <ellipse cx="0" cy="0" rx="17" ry="10" class="yel"/><circle cx="10" cy="-12" r="8" class="yel"/>
    <path d="M17 -14 l8 2 -8 3z" class="beak"/><circle cx="12" cy="-14" r="1.6" class="ink"/><path d="M-7 -2 q6 6 13 0" class="thin"/>
  </g></g>
  <circle class="bubble" cx="160" cy="58" r="4.5"/><circle class="bubble b" cx="170" cy="70" r="3"/><circle class="bubble c" cx="152" cy="72" r="2.2"/>
  <circle class="skin" cx="104" cy="80" r="34"/>
  <path class="cap" d="M70.3 76 A34 34 0 0 1 137.7 76 Q104 70 70.3 76 Z"/>
  <path class="gl" d="M80 58 q10 -14 26 -14"/>
  <path class="strap" d="M72 68 H81 M127 68 H136 M99 68 h10"/>
  <circle class="lens" cx="90" cy="68" r="9"/><circle class="lens" cx="118" cy="68" r="9"/>
  <circle class="glint" cx="87" cy="65" r="2.2"/><circle class="glint" cx="115" cy="65" r="2.2"/>
  <circle class="ink" cx="92" cy="81" r="3.8"/><circle class="ink" cx="116" cy="81" r="3.8"/>
  <circle class="glint" cx="93.3" cy="79.6" r="1.2"/><circle class="glint" cx="117.3" cy="79.6" r="1.2"/>
  <circle class="cheek" cx="82" cy="89" r="6"/><circle class="cheek" cx="126" cy="89" r="6"/>
  <path class="mouth-o" d="M97 87 q7 8 14 0 z"/>
  <g transform="translate(134 104)"><g class="wavehand">${limb('M0 0 Q12 -16 16 -36')}${hand(17, -40)}</g></g>
  ${FRONT}
</svg>`;

// 글 아이콘: 선화 + 색 채움 (fill 속성이 CSS 상속보다 우선한다)
const C = { pool: '#8AB0DF', coral: '#F26B4F', yellow: '#F7C948', paper: '#FFFDF6', navy: '#2E4A7D', skin: '#FFE3D3', lime: '#D9F26B' };
const ICON_PATHS = {
  goggles: `<path d="M30 25h20" stroke="${C.coral}" stroke-width="4"/><path d="M2 21l6 3M78 21l-6 3" stroke="${C.coral}" stroke-width="4"/><circle cx="19" cy="25" r="12" fill="${C.pool}"/><circle cx="61" cy="25" r="12" fill="${C.pool}"/><circle cx="15" cy="21" r="3" fill="#fff" stroke="none"/><circle cx="57" cy="21" r="3" fill="#fff" stroke="none"/>`,
  lane: `<path d="M6 10h68M6 40h68"/><path d="M6 25h68" stroke="${C.coral}" stroke-width="5" stroke-dasharray="6 6"/><path d="M20 18l8 7-8 7M52 18l-8 7 8 7"/>`,
  heart: `<path d="M40 44s-19-10-19-23a9.5 9.5 0 0 1 19-4a9.5 9.5 0 0 1 19 4c0 13-19 23-19 23z" fill="${C.coral}"/><path d="M28 18a5 5 0 0 1 6-3" stroke="#fff" stroke-width="3"/>`,
  calendar: `<rect x="18" y="10" width="44" height="34" rx="5" fill="${C.paper}"/><path d="M18 15a5 5 0 0 1 5-5h34a5 5 0 0 1 5 5v6H18z" fill="${C.coral}"/><path d="M28 5v10M52 5v10"/><path d="M31 32l5 5 10-10" stroke="${C.navy}" stroke-width="3.5"/>`,
  bolt: `<path d="M45 3L27 28h12l-6 19 19-27H40z" fill="${C.yellow}"/>`,
  ear: `<path d="M30 38c0 7 11 8 13-1 2-6 11-8 11-19a13.5 13.5 0 0 0-27 0" fill="${C.skin}"/><path d="M34 19a6.5 6.5 0 0 1 13 0c0 4-4 5-4 9"/><path d="M63 24c-4 5-4 9 0 10 4-1 4-5 0-10z" fill="${C.pool}"/>`,
  book: `<path d="M40 14c-6-4-14-4-22-2v29c8-2 16-2 22 2 6-4 14-4 22-2V12c-8-2-16-2-22 2z" fill="${C.paper}"/><path d="M40 14v29"/><path d="M24 20h10M24 26h10M46 20h10M46 26h10" stroke="${C.pool}" stroke-width="3"/>`,
  drop: `<path d="M40 4C32 16 25 23 25 31a15 15 0 0 0 30 0c0-8-7-15-15-27z" fill="${C.pool}"/><path d="M33 31a7 7 0 0 0 6 7" stroke="#fff" stroke-width="3"/>`,
  whistle: `<path d="M18 17h32v10H18z" fill="${C.yellow}"/><circle cx="46" cy="31" r="12" fill="${C.yellow}"/><circle cx="46" cy="31" r="4" fill="${C.paper}"/><path d="M18 17q-11-10 3-15" stroke="${C.coral}" stroke-width="3"/>`,
  sun: `<path d="M40 3v6M40 41v6M18 25h6M56 25h6M24 9l4 4M52 37l4 4M56 9l-4 4M28 37l-4 4" stroke="${C.coral}" stroke-width="3.5"/><circle cx="40" cy="25" r="11" fill="${C.yellow}"/>`,
  shirt: `<path d="M30 8l-12 8 5 9 6-3v22h22V22l6 3 5-9-12-8c-2 4-6 6-10 6s-8-2-10-6z" fill="${C.coral}"/><path d="M29 31h22" stroke="#fff" stroke-width="3.5"/>`,
  bag: `<path d="M32 16a8 8 0 0 1 16 0"/><path d="M21 16h38l-4 28H25z" fill="${C.coral}"/><path d="M28 24h24" stroke="#fff" stroke-width="3" stroke-dasharray="3 4"/>`,
  suit: `<path d="M31 5v9c0 6 4 8 4 12-4 4-7 8-7 18h24c0-10-3-14-7-18 0-4 4-6 4-12V5" fill="${C.pool}"/><path d="M31 5c3 6 15 6 18 0" /><path d="M33 34h14" stroke="#fff" stroke-width="3"/>`,
  board: `<path d="M26 46V17a14 12 0 0 1 28 0v29z" fill="${C.yellow}"/><ellipse cx="40" cy="17" rx="6" ry="3.5" fill="${C.paper}"/><path d="M30 34h20" stroke="${C.coral}" stroke-width="3"/>`,
  stretch: `<circle cx="40" cy="10" r="6" fill="${C.skin}"/><path d="M40 18L28 6M40 18L52 6" stroke="${C.coral}" stroke-width="4"/><path d="M40 17v17" stroke="${C.navy}" stroke-width="6"/><path d="M40 34l-9 12M40 34l9 12" stroke-width="3.5"/>`,
  repeat: `<path d="M24 26a16 16 0 0 1 28-11" stroke="${C.coral}" stroke-width="3.5"/><path d="M53 7v8h-8" stroke="${C.coral}" stroke-width="3.5"/><path d="M56 24a16 16 0 0 1-28 11" stroke="${C.navy}" stroke-width="3.5"/><path d="M27 43v-8h8" stroke="${C.navy}" stroke-width="3.5"/>`,
  bandage: `<g transform="rotate(-25 40 25)"><rect x="12" y="17" width="56" height="16" rx="8" fill="${C.skin}"/><rect x="32" y="17" width="16" height="16" fill="${C.pool}"/><circle cx="20" cy="25" r="1.2" fill="${C.navy}" stroke="none"/><circle cx="60" cy="25" r="1.2" fill="${C.navy}" stroke="none"/></g>`,
  ladder: `<path d="M8 44q8-5 16 0t16 0 16 0 16 0V50H8z" fill="${C.pool}" stroke="none"/><path d="M28 46V14a7 7 0 0 1 14 0M44 46V14a7 7 0 0 1 14 0" stroke-width="3.5"/><path d="M28 24h16M28 34h16" stroke="${C.coral}" stroke-width="3.5"/>`,
  buoy: `<path d="M6 42q8-5 16 0t16 0 16 0 16 0" stroke="${C.pool}" stroke-width="3.5"/><circle cx="40" cy="22" r="15" fill="${C.coral}"/><circle cx="40" cy="22" r="6" fill="${C.paper}"/><path d="M30 12l4 4M50 12l-4 4M30 32l4-4M50 32l-4-4" stroke="#fff" stroke-width="4"/>`,
  ticket: `<path d="M14 13h52v8a4 4 0 0 0 0 8v8H14v-8a4 4 0 0 0 0-8z" fill="${C.yellow}"/><path d="M50 14v22" stroke-dasharray="3 3"/><path d="M22 22h20M22 29h14" stroke="${C.navy}" stroke-width="3"/>`,
  sprout: `<path d="M40 46V24" stroke-width="3.5"/><path d="M40 28c-4-12-16-14-20-10 2 8 10 12 20 10z" fill="${C.lime}"/><path d="M40 24c2-12 14-16 20-12-2 8-10 13-20 12z" fill="${C.lime}"/><path d="M26 46h28" stroke="${C.coral}" stroke-width="4"/>`,
  watch: `<rect x="32" y="2" width="16" height="46" rx="6" fill="${C.navy}"/><rect x="26" y="12" width="28" height="26" rx="8" fill="${C.paper}"/><path d="M31 28l5-5 4 4 8-8" stroke="${C.coral}" stroke-width="3"/>`,
  medal: `<path d="M30 4l6 18M50 4l-6 18" stroke="${C.coral}" stroke-width="5"/><circle cx="40" cy="31" r="13" fill="${C.yellow}"/><path d="M40 24l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5-3.7-3.4 5-.6z" fill="${C.paper}" stroke-width="1.6"/>`,
  chart: `<path d="M16 6v38h50" stroke-width="3"/><path d="M20 34h18l8-8 8 2 10-16" stroke="${C.coral}" stroke-width="3.5"/><circle cx="64" cy="12" r="3.5" fill="${C.coral}"/>`,
  timer: `<path d="M35 5h10M40 5v7" stroke-width="3.5"/><circle cx="40" cy="28" r="16" fill="${C.paper}"/><path d="M40 28v-9" stroke="${C.coral}" stroke-width="3.5"/><circle cx="40" cy="28" r="2.5" fill="${C.navy}"/>`,
};
const icon = (name) => `<svg class="sw icon" viewBox="0 0 80 50" aria-hidden="true">${ICON_PATHS[name]}</svg>`;

function cover(a) {
  if (SWIMMERS[a.key]) return { bg: STROKE_BG[a.key], svg: SWIMMERS[a.key] };
  if (a.key === 'breathing') return { bg: STROKE_BG.breathing, svg: MASCOT() };
  return { bg: a.thumb.bg, svg: icon(a.thumb.icon) };
}

const LOGO = '<svg viewBox="0 0 40 40" class="sw" aria-hidden="true" style="stroke-width:2.2"><circle cx="20" cy="20" r="18" fill="#BFD6EC" stroke="none"/><circle cx="20" cy="22" r="11" fill="#FFE3D3"/><path d="M9 20a11 11 0 0 1 22 0q-11-3-22 0z" fill="#F26B4F"/><circle cx="16.5" cy="23" r="1.5" fill="#16213A" stroke="none"/><circle cx="23.5" cy="23" r="1.5" fill="#16213A" stroke="none"/><path d="M4 30q4-3 8 0t8 0 8 0 8 0" stroke="#fff" stroke-width="2.6"/></svg>';

// 물결: 뒤(wback), 앞(wfront), 거품선(wfoam). 50px 주기로 흘러간다.
const waveTop = (y) => `M-50 ${y} q12.5 -7 25 0` + ' t25 0'.repeat(12);
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <path id="wback" d="${waveTop(90)} V170 H-50 Z"/>
  <path id="wfront" d="${waveTop(96)} V170 H-50 Z"/>
  <path id="wfoam" d="${waveTop(96)}"/>
</defs></svg>`;

// ---------- 검사 ----------

function checkMinSentences(where, text, min) {
  const n = countSentences(text);
  need(n >= min, `${where}: 문장 ${n}개 (최소 ${min}개)`);
}

function checkMeta(lang, where, title, description) {
  const [min, max] = lang === 'ko' ? [40, 160] : [70, 175];
  const len = description.length;
  need(len >= min && len <= max, `${where}: description 길이 ${len}자 (허용 ${min}~${max})`);
  if (title.length > (lang === 'ko' ? 45 : 90)) warnings.push(`${where}: title이 길어 검색 결과에서 잘릴 수 있음 (${title.length}자)`);
}

let emptyPicks = 0;
function checkSections(where, sections) {
  for (const [i, s] of sections.entries()) {
    const at = `${where} > ${s.h || s.type + i}`;
    if (s.lead) checkMinSentences(`${at} (lead)`, s.lead, 1);
    switch (s.type) {
      case 'text': checkMinSentences(at, s.paras.join(' '), 2); break;
      case 'list': need(s.items.length >= 3, `${at}: 항목 ${s.items.length}개 (최소 3개)`);
        s.items.forEach((it, j) => checkMinSentences(`${at} #${j + 1}`, it, 1)); break;
      case 'steps': s.items.forEach((it) => checkMinSentences(`${at} > ${it.t}`, it.d, 1)); break;
      case 'table': need(s.rows.every((r) => r.length === s.head.length), `${at}: 표의 열 개수가 맞지 않음`); break;
      case 'mistakes': s.items.forEach((it) => checkMinSentences(`${at} > ${it.t}`, `${it.why} ${it.fix}`, 2)); break;
      case 'drills': s.items.forEach((it) => checkMinSentences(`${at} > ${it.t}`, it.how, 2)); break;
      case 'faq': need(s.items.length >= 2, `${at}: 질문 ${s.items.length}개 (최소 2개)`);
        s.items.forEach((it) => checkMinSentences(`${at} > ${it.q}`, it.a, 2)); break;
      case 'picks': s.items.forEach((it) => { checkMinSentences(`${at} > ${it.t}`, it.why, 2); if (!it.url) emptyPicks++; }); break;
      case 'note': checkMinSentences(at, s.text, 1); break;
      default: errors.push(`${at}: 알 수 없는 섹션 타입 ${s.type}`);
    }
  }
}

// ---------- 공통 조각 ----------

function header(c, key, cat) {
  const l = c.lang, o = otherLang(l);
  const nav = CATS.map((k) => `<a href="${href(l, k)}"${k === cat ? ' aria-current="page"' : ''}>${esc(c.cats[k].name)}</a>`).join('');
  return `<a class="skip" href="#main">${esc(c.ui.skip)}</a>
<header class="hd">
  <div class="wrap">
    <a class="logo" href="${href(l, 'home')}">${LOGO}${esc(c.siteName)}</a>
    <nav class="nav" aria-label="menu">${nav}</nav>
    <div class="hd-right">
      <a class="pill ghost" href="${href(o, key || 'home')}" hreflang="${o}" lang="${o}">${esc(c.ui.langSwitch)}</a>
      <a class="pill lime" href="${href(l, 'home')}#quiz">${esc(c.ui.findStroke)} →</a>
    </div>
  </div>
</header>`;
}

function footer(c) {
  const l = c.lang, o = otherLang(l);
  const li = (k, label) => `<li><a href="${href(l, k)}">${esc(label ?? art(l, k).name)}</a></li>`;
  const list = (cat) => inCat(l, cat).slice(0, 6).map((x) => li(x.key)).join('') + (inCat(l, cat).length > 6 ? `<li><a class="more" href="${href(l, cat)}">${esc(c.ui.viewAll)} →</a></li>` : '');
  return `<footer class="ft">
  <div class="wrap">
    <p class="big">${c.ui.footBig}</p>
    <div class="cols">
      <div><h2><a href="${href(l, 'strokes')}">${esc(c.cats.strokes.name)}</a></h2><ul>${list('strokes')}</ul></div>
      <div><h2><a href="${href(l, 'knowledge')}">${esc(c.cats.knowledge.name)}</a></h2><ul>${list('knowledge')}</ul></div>
      <div>
        <h2><a href="${href(l, 'issues')}">${esc(c.cats.issues.name)}</a></h2><ul>${list('issues')}</ul>
        <h2 class="gap"><a href="${href(l, 'store')}">${esc(c.cats.store.name)}</a></h2><ul>${list('store')}</ul>
      </div>
      <div><h2>${esc(c.siteName)}</h2><ul>${li('about', c.ui.about)}${li('contact', c.ui.contact)}${li('privacy', c.ui.privacy)}
        <li><a href="${href(o, 'home')}" hreflang="${o}" lang="${o}">${esc(c.ui.langSwitchLong)}</a></li></ul></div>
    </div>
    <div class="legal"><span>© ${config.CONTENT_UPDATED.slice(0, 4)} ${esc(c.siteName)}</span><span>${esc(c.ui.disclaimer)}</span></div>
  </div>
</footer>`;
}

const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function layout(c, { key, cat, title, description, main, ld = [], noindex = false, path, scripts = '', ogType = 'article' }) {
  const alternates = key
    ? config.LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(href(l, key))}">`).join('\n  ')
      + `\n  <link rel="alternate" hreflang="x-default" href="${abs(href(DEFAULT_LANG, key))}">`
    : '';
  const url = abs(path);
  const ogAlt = config.LANGS.filter((l) => l !== c.lang).map((l) => `<meta property="og:locale:alternate" content="${content[l].locale}">`).join('\n  ');
  const adsense = config.ADSENSE_PUB_ID
    ? `<meta name="google-adsense-account" content="ca-${config.ADSENSE_PUB_ID}">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${config.ADSENSE_PUB_ID}" crossorigin="anonymous"></script>`
    : '';
  return `<!doctype html>
<html lang="${c.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
  ${alternates}
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="${esc(c.siteName)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="${c.locale}">
  ${ogAlt}
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#F7F4EA">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
  <link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap">
  <link rel="stylesheet" href="/style.css">
  ${adsense}
  ${ld.map(jsonLd).join('\n  ')}
</head>
<body>
${SPRITE}
${header(c, key, cat)}
<main id="main">
${main}
</main>
${footer(c)}
${scripts}
</body>
</html>
`;
}

function crumbs(c, trail) {
  // trail: [[key, label], ...] 마지막은 현재 페이지
  const all = [['home', c.ui.home], ...trail];
  const html = `<nav class="crumbs" aria-label="breadcrumb">${all.map(([k, label], i) => (i < all.length - 1
    ? `<a href="${href(c.lang, k)}">${esc(stripTags(label))}</a> <span aria-hidden="true">›</span> `
    : `<span>${esc(stripTags(label))}</span>`)).join('')}</nav>`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map(([k, label], i) => ({ '@type': 'ListItem', position: i + 1, name: stripTags(label), item: abs(href(c.lang, k)) })),
  };
  return { html, ld };
}

function renderSection(c, s, a = {}) {
  const lead = s.lead ? `<p class="lead">${s.lead}</p>` : '';
  switch (s.type) {
    case 'text':
      return `<section class="blk"><h2>${s.h}</h2>${s.paras.map((p) => `<p>${fill(p)}</p>`).join('')}</section>`;
    case 'list':
      return `<section class="blk"><h2>${s.h}</h2>${lead}<ul class="bullets">${s.items.map((i) => `<li>${fill(i)}</li>`).join('')}</ul></section>`;
    case 'steps': {
      const poses = s.figs && POSES[a.key]?.[s.figs];
      if (!poses) return `<section class="blk"><h2>${s.h}</h2>${lead}<ol class="steps">${s.items.map((i) => `<li><b>${i.t}</b><span>${i.d}</span></li>`).join('')}</ol></section>`;
      return `<section class="blk"><h2>${s.h}</h2>${lead}<ol class="steps figs">${s.items.map((i, n) => `<li><div><b>${i.t}</b><span>${i.d}</span></div><figure class="pose" style="background:var(--${STROKE_BG[a.key]})">${poseSvg(a.key, poses[n])}</figure></li>`).join('')}</ol></section>`;
    }
    case 'table':
      return `<section class="blk"><h2>${s.h}</h2>${lead}<div class="table-wrap"><table><thead><tr>${s.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${s.rows.map((r) => `<tr>${r.map((d, i) => (i === 0 ? `<th scope="row">${d}</th>` : `<td>${d}</td>`)).join('')}</tr>`).join('')}</tbody></table></div></section>`;
    case 'mistakes':
      return `<section class="blk box mistakes"><h2>${s.h}</h2><ul>${s.items.map((i) => `<li><h3>${i.t}</h3><p>${i.why}</p><p><b>${esc(c.ui.mistakeFix)}</b> ${i.fix}</p></li>`).join('')}</ul></section>`;
    case 'drills':
      return `<section class="blk box drills"><h2>${s.h}</h2><ul>${s.items.map((i) => `<li><h3>${i.t}</h3><p>${i.how}</p></li>`).join('')}</ul></section>`;
    case 'faq':
      return `<section class="blk faq"><h2>${s.h}</h2>${s.items.map((i) => `<details><summary>${i.q}</summary><p>${i.a}</p></details>`).join('')}</section>`;
    case 'picks':
      return `<section class="blk picks"><h2>${s.h}</h2>${lead}<div class="pick-grid">${s.items.map((i) => `<div class="pick"><h3>${i.t}</h3><p>${i.why}</p>${i.url ? `<a class="btn ink" href="${esc(i.url)}" rel="sponsored nofollow noopener" target="_blank">${esc(c.ui.buy)} →</a>` : ''}</div>`).join('')}</div></section>`;
    case 'note':
      return `<aside class="note">${s.text}</aside>`;
    default:
      return '';
  }
}

function faqLd(sections) {
  const items = sections.filter((s) => s.type === 'faq').flatMap((s) => s.items);
  if (!items.length) return [];
  return [{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: stripTags(i.q), acceptedAnswer: { '@type': 'Answer', text: stripTags(i.a) } })),
  }];
}

function kickerOf(c, a) {
  const catName = c.cats[a.cat].name;
  if (a.level) return `${catName} · ${esc(c.ui.level)} <span class="dots" aria-label="${a.level}/3">${dots(a.level)}</span>`;
  return `${catName}${a.tag ? ` · ${esc(a.tag)}` : ''}`;
}

function postCard(c, a, { heading = 'h3', extra = '' } = {}) {
  const cv = cover(a);
  return `<a class="post" href="${href(c.lang, a.key)}" data-c="${a.cat}"${extra}>
  <div class="thumb" style="background:var(--${cv.bg})">${cv.svg}</div>
  <span class="cat">${kickerOf(c, a)}</span>
  <${heading}>${esc(a.name)}</${heading}>
  <p>${esc(a.card)}</p>
</a>`;
}

function strokeCard(c, a) {
  const cv = cover(a);
  return `<a class="sc" href="${href(c.lang, a.key)}" data-key="${a.key}">
  <div class="art" style="background:var(--${cv.bg})">${cv.svg}</div>
  <div class="meta">
    <div class="row"><h3>${esc(a.name)}</h3>${a.level ? `<span class="chip">${esc(c.ui.level)} ${dots(a.level)}</span>` : ''}</div>
    <p>${esc(a.card)}</p>
    <div class="go">${esc(c.ui.readMore)} →</div>
  </div>
</a>`;
}

function relatedBlock(c, keys) {
  return `<section class="wrap related"><h2>${esc(c.ui.related)}</h2><div class="mag">${keys.map((k) => postCard(c, art(c.lang, k))).join('')}</div></section>`;
}

const updatedLine = (c) => `<p class="meta">${esc(c.ui.updated)} <time datetime="${config.CONTENT_UPDATED}">${config.CONTENT_UPDATED}</time></p>`;

// ---------- 페이지 ----------

function articlePage(c, a) {
  const where = `[${c.lang}] ${a.key}`;
  checkMeta(c.lang, where, a.title, a.description);
  checkMinSentences(`${where} > intro`, a.intro.join(' '), a.key === 'pace' ? 2 : 3);
  checkSections(where, a.sections);
  need(a.related.length >= 3, `${where}: related ${a.related.length}개 (최소 3개)`);
  for (const r of a.related) need(art(c.lang, r), `${where}: related '${r}' 글 없음`);
  if (!SWIMMERS[a.key] && a.key !== 'breathing') need(a.thumb && ICON_PATHS[a.thumb.icon], `${where}: thumb 아이콘 없음`);
  if (c.cats[a.cat].groups) need(c.cats[a.cat].groups[a.group], `${where}: 묶음(group) 없음`);
  for (const s of a.sections.filter((x) => x.figs)) {
    const poses = POSES[a.key]?.[s.figs];
    need(poses && poses.length === s.items.length, `${where} > ${s.h}: 동작 그림(${s.figs}) 수가 단계 수와 다름`);
  }
  for (const src of a.sources || []) need(/^https:\/\//.test(src.url) && src.t, `${where}: 참고 자료 형식 오류`);

  const bc = crumbs(c, [[a.cat, c.cats[a.cat].name], [a.key, a.name]]);
  const cv = cover(a);
  const isPace = a.key === 'pace';
  const isCal = a.tool === 'calories';
  const sourcesHtml = a.sources?.length
    ? `<section class="blk sources"><h2>${esc(c.ui.sources)}</h2><ul>${a.sources.map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.t)}</a></li>`).join('')}</ul></section>`
    : '';
  const main = `<article class="wrap article">
  ${bc.html}
  <header class="art-head">
    <span class="kicker">${kickerOf(c, a)}</span>
    <h1>${a.h1}</h1>
    ${a.sub ? `<p class="sub">${esc(a.sub)}</p>` : ''}
    ${updatedLine(c)}
  </header>
  ${isPace ? paceForm(c) : isCal ? calForm(a) : `<div class="art-cover live" style="background:var(--${cv.bg})">${cv.svg}</div>`}
  <div class="art-body">
    ${a.cat === 'store' ? `<aside class="note disclosure">${esc(c.ui.disclosure)}</aside>` : ''}
    <div class="intro">${a.intro.map((t) => `<p>${t}</p>`).join('')}</div>
    ${a.sections.map((s) => renderSection(c, s, a)).join('\n    ')}
    ${sourcesHtml}
  </div>
</article>
${relatedBlock(c, a.related)}`;

  const ld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: stripTags(a.h1), description: a.description, inLanguage: c.lang, dateModified: config.CONTENT_UPDATED, mainEntityOfPage: abs(href(c.lang, a.key)), publisher: { '@type': 'Organization', name: c.siteName }, ...(a.sources?.length ? { citation: a.sources.map((x) => x.url) } : {}) },
    bc.ld,
    ...faqLd(a.sections),
  ];
  if (isCal) ld.push({ '@context': 'https://schema.org', '@type': 'WebApplication', name: a.toolText.result, url: abs(href(c.lang, a.key)), applicationCategory: 'HealthApplication', operatingSystem: 'Any', inLanguage: c.lang, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: c.lang === 'ko' ? 'KRW' : 'USD' } });
  if (isPace) ld[0] = { '@context': 'https://schema.org', '@type': 'WebApplication', name: a.name, url: abs(href(c.lang, 'pace')), description: a.description, applicationCategory: 'SportsApplication', operatingSystem: 'Any', inLanguage: c.lang, isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: c.lang === 'ko' ? 'KRW' : 'USD' } };

  return layout(c, { key: a.key, cat: a.cat, path: href(c.lang, a.key), title: a.title, description: a.description, main, ld, scripts: isPace ? paceScript(c) : isCal ? calScript(a) : '' });
}

function calForm(a) {
  const t = a.toolText;
  return `<form class="calc big" id="cal-form" novalidate onsubmit="return false">
    <div class="fields three">
      <label>${esc(t.weight)}<input name="w" inputmode="decimal" value="60"></label>
      <label>${esc(t.minutes)}<input name="m" inputmode="numeric" value="30"></label>
      <label>${esc(t.stroke)}<select name="s">${a.toolOptions.map(([label, met], i) => `<option value="${met}"${i === 0 ? ' selected' : ''}>${esc(label)}</option>`).join('')}</select></label>
    </div>
    <output id="cal-out" aria-live="polite"></output>
    <p class="calc-note">${esc(t.note)}</p>
  </form>`;
}

function calScript(a) {
  return `<script>
(() => {
  const f = document.getElementById('cal-form'), out = document.getElementById('cal-out');
  const label = ${JSON.stringify(a.toolText.result)};
  const run = () => {
    const w = parseFloat(f.w.value), m = parseFloat(f.m.value), met = parseFloat(f.s.value);
    if (!(w > 0) || !(m > 0)) { out.innerHTML = ''; return; }
    out.innerHTML = '<span><small>' + label + '</small><b>' + Math.round(met * w * m / 60) + ' kcal</b></span>';
  };
  f.addEventListener('input', run); run();
})();
</script>`;
}

function paceForm(c) {
  const f = c.pace.form;
  return `<form class="calc big" id="pace-form" novalidate>
    <div class="fields three">
      <label>${esc(f.distance)}<input name="distance" inputmode="numeric" value="100" required></label>
      <label>${esc(f.time)}<input name="time" inputmode="numeric" value="2:30" placeholder="2:30" required></label>
      <label>${esc(f.target)}<input name="target" inputmode="numeric" value="1000"></label>
    </div>
    <button class="btn ink" type="submit">${esc(f.submit)}</button>
    <output id="pace-out" aria-live="polite"></output>
  </form>`;
}

function paceScript(c) {
  const f = c.pace.form;
  return `<script>
(() => {
  const form = document.getElementById('pace-form');
  const out = document.getElementById('pace-out');
  const t = ${JSON.stringify({ pace: f.pace, eta: f.eta, invalid: f.invalid })};
  const parse = (v) => { const p = String(v).trim().split(':').map(Number); return p.some((n) => !Number.isFinite(n) || n < 0) ? NaN : p.reduce((a, n) => a * 60 + n, 0); };
  const fmt = (sec) => { sec = Math.round(sec); const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0'); };
  const run = () => {
    const d = Number(form.distance.value), sec = parse(form.time.value), target = Number(form.target.value);
    if (!(d > 0) || !(sec > 0)) { out.textContent = t.invalid; return; }
    const pace = sec / d * 100;
    out.innerHTML = '<span><small>' + t.pace + '</small><b>' + fmt(pace) + '</b></span>' + (target > 0 ? '<span><small>' + t.eta + '</small><b>' + fmt(pace * target / 100) + '</b></span>' : '');
  };
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  run();
})();
</script>`;
}

const CAT_NO = { strokes: '01', knowledge: '02', issues: '03', store: '04' };

function hubPage(c, cat) {
  const h = c.cats[cat];
  const where = `[${c.lang}] ${cat}`;
  checkMeta(c.lang, where, h.title, h.description);
  checkMinSentences(`${where} > intro`, h.intro.join(' '), 3);
  const list = inCat(c.lang, cat);
  const bc = crumbs(c, [[cat, h.name]]);

  let body;
  if (cat === 'strokes') {
    const G = h.groups;
    const basicAll = list.filter((a) => a.group === 'basic');
    const strokes = basicAll.filter((a) => SWIMMERS[a.key]);
    const basics = basicAll.filter((a) => !SWIMMERS[a.key]);
    const group = (g) => `<section class="grp" id="${g}"><div class="grp-head"><h2>${esc(G[g].name)}</h2><p>${G[g].lead}</p></div><div class="strokes grid4">${list.filter((a) => a.group === g).map((a) => strokeCard(c, a)).join('')}</div></section>`;
    body = `<nav class="grp-nav">${Object.keys(G).map((g) => `<a class="pill ghost" href="#${g}">${esc(G[g].name)}</a>`).join('')}</nav>
  <section class="grp" id="basic"><div class="grp-head"><h2>${esc(G.basic.name)}</h2><p>${G.basic.lead}</p></div><div class="strokes grid4">${strokes.map((a) => strokeCard(c, a)).join('')}</div></section>
  <section class="blk">
    <h2>${esc(h.orderTitle)}</h2>
    <p class="lead">${h.orderLead}</p>
    <ol class="steps path">${[...basics, ...strokes].map((a) => `<li><a href="${href(c.lang, a.key)}"><b>${esc(a.name)}</b></a><span>${esc(a.card)}</span></li>`).join('')}</ol>
  </section>
  ${group('survival')}
  ${group('skills')}`;
  } else if (h.groups) {
    const G = h.groups;
    body = `<nav class="grp-nav">${Object.keys(G).map((g) => `<a class="pill ghost" href="#${g}">${esc(G[g].name)}</a>`).join('')}</nav>
  ${Object.keys(G).map((g) => `<section class="grp" id="${g}"><div class="grp-head"><h2>${esc(G[g].name)}</h2><p>${G[g].lead}</p></div><div class="mag">${list.filter((a) => a.group === g).map((a) => postCard(c, a, { heading: 'h3' })).join('')}</div></section>`).join('\n  ')}`;
  } else {
    body = `${cat === 'store' ? `<aside class="note disclosure">${esc(c.ui.disclosure)}</aside>` : ''}
  <div class="mag">${list.map((a) => postCard(c, a, { heading: 'h2' })).join('')}</div>`;
  }

  const main = `<section class="wrap hub">
  ${bc.html}
  <header class="hub-head">
    <h1><span class="no">${CAT_NO[cat]}</span>${esc(h.name)}</h1>
    <div class="hub-intro">${h.intro.map((t) => `<p>${t}</p>`).join('')}<p class="count">${list.length} ${esc(c.ui.postsCount)}</p></div>
  </header>
  ${body}
</section>`;

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: h.name, description: h.description, url: abs(href(c.lang, cat)), inLanguage: c.lang,
      mainEntity: { '@type': 'ItemList', itemListElement: list.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(href(c.lang, a.key)), name: a.name })) },
    },
    bc.ld,
  ];
  return layout(c, { key: cat, cat, path: href(c.lang, cat), title: h.title, description: h.description, main, ld, ogType: 'website' });
}

function homePage(c) {
  const h = c.home, l = c.lang, f = h.floats;
  checkMeta(l, `[${l}] home`, h.title, h.description);
  checkMinSentences(`[${l}] home > sub`, h.sub.join(' '), 3);
  for (const r of h.roadmap) need(PATHS[r.key], `[${l}] home roadmap: '${r.key}' 페이지 없음`);

  const strokes = inCat(l, 'strokes').filter((a) => a.group === 'basic' && SWIMMERS[a.key]);
  const mag = ['knowledge', 'issues', 'store'].flatMap((cat) => inCat(l, cat).filter((a) => a.key !== 'pace').slice(0, 3));
  const oxChoices = h.oxChoices || 'O / X';

  const main = `<section class="hero wrap">
  <div class="kicker">${esc(h.kicker)}</div>
  <h1>${h.h1}</h1>
  ${h.sub.map((t) => `<p class="sub">${t}</p>`).join('')}
  <div class="ctas">
    <a class="btn ink" href="#quiz">${esc(h.cta1)}</a>
    <a class="btn line" href="#roadmap">${esc(h.cta2)}</a>
  </div>
  ${MASCOT('hero-mascot live')}
  <div class="floats">
    <div class="float f-tip"><span class="tag">${esc(f.tipTag)}</span><b id="tip">${esc(h.tips[0])}</b></div>
    <a class="float f-pace" href="${href(l, 'pace')}"><span class="tag">${esc(f.paceTag)}</span><span class="bigno">${esc(f.paceBig)}</span><span>${esc(f.paceNote)}</span></a>
    <a class="float f-ox" href="#ox"><span class="tag">${esc(f.oxTag)}</span><b>${esc(f.oxQ)}</b></a>
    <a class="float f-sticker" href="#roadmap"><svg viewBox="0 0 60 60" class="sw ch" aria-hidden="true" style="--cap:#4F86D9"><circle cx="30" cy="32" r="22" class="skin"/><path class="cap" d="M8 29a22 22 0 0 1 44 0q-22-5-44 0z"/><path class="gl" d="M16 18q5-7 13-8"/><circle class="ink" cx="23" cy="35" r="2.4"/><circle class="ink" cx="37" cy="35" r="2.4"/><circle class="cheek" cx="17" cy="41" r="3.5"/><circle class="cheek" cx="43" cy="41" r="3.5"/><path class="mouth-o" d="M25 41q5 6 10 0z"/></svg><span><b>${esc(f.stickerTitle)}</b>${esc(f.stickerSub)}</span></a>
  </div>
</section>

<section class="sec wrap" id="strokes">
  <div class="sec-head">
    <h2><span class="no">01</span><a href="${href(l, 'strokes')}">${esc(c.cats.strokes.name)}</a></h2>
    <p>${h.strokesP}</p>
  </div>
  <div class="strokes">${strokes.map((a) => strokeCard(c, a)).join('')}</div>
</section>

<section class="sec wrap" id="quiz">
  <div class="sec-head"><h2><span class="no">02</span>${esc(h.quizH)}</h2><p>${h.quizP}</p></div>
  <div class="quiz">
    <div class="quiz-box"><div class="progress" id="qprog"></div><p class="q" id="qtext"></p><div class="opts" id="qopts"></div></div>
    <div class="quiz-result" id="qres">
      <div class="art" id="qart"></div>
      <div class="label" id="qlabel">${esc(h.quiz.preview)}</div>
      <h3 id="qtitle">?</h3>
      <p id="qdesc">${esc(h.quiz.previewText)}</p>
      <div class="acts" id="qacts" hidden>
        <a class="btn ink" id="qlink" href="${href(l, 'strokes')}">${esc(h.quiz.go)}</a>
        <button class="btn line" id="qshare" type="button">${esc(h.quiz.share)}</button>
        <button class="btn line" id="qretry" type="button">${esc(h.quiz.retry)}</button>
      </div>
    </div>
  </div>
</section>

<section class="sec wrap" id="roadmap">
  <div class="sec-head"><h2><span class="no">03</span>${esc(h.roadmapH)}</h2><p>${h.roadmapP}</p></div>
  <div class="lane">
    <div class="lane-rope" aria-hidden="true"></div>
    <ol>${h.roadmap.map((r) => `<li><div class="dist">${esc(r.dist)}<small>m</small></div><a class="stop" href="${href(l, r.key)}"><b>${esc(r.t)}</b><span>${esc(r.d)}</span></a></li>`).join('')}</ol>
  </div>
</section>

<section class="sec wrap" id="ox">
  <div class="sec-head"><h2><span class="no">04</span>${esc(h.oxH)}</h2><p>${h.oxP}</p></div>
  <div class="duo">
    <div class="ox">${h.ox.map((x) => `<button class="oxc" type="button"><span class="in">
      <span class="face front"><b>${esc(x.q)}</b><span class="hint">${esc(h.oxHint)} <span>${esc(oxChoices)}</span></span></span>
      <span class="face back"><span class="ans">${esc(x.a)}</span><span class="exp">${esc(x.exp)}</span></span>
    </span></button>`).join('')}</div>
    <form class="calc" id="calc" onsubmit="return false">
      <div class="calc-top">
        <span class="calc-label">${esc(h.calc.label)}</span>
        <div class="ctabs" role="tablist">
          <button type="button" role="tab" aria-selected="true" data-t="pace">${esc(h.calc.tabPace)}</button>
          <button type="button" role="tab" aria-selected="false" data-t="cal">${esc(h.calc.tabCal)}</button>
        </div>
      </div>
      <div class="cpanel" data-p="pace">
        <h3>${esc(h.calc.h)}</h3>
        <div class="fields">
          <label>${esc(h.calc.distance)}<input id="cd" inputmode="numeric" value="50"></label>
          <label>${esc(h.calc.time)}<input id="ct" inputmode="numeric" value="1:10"></label>
        </div>
        <div class="result" id="cr">2:20<small>/100m</small></div>
        <a href="${href(l, 'pace')}">${esc(h.calc.link)} →</a>
      </div>
      <div class="cpanel" data-p="cal" hidden>
        <h3>${esc(h.calc.calH)}</h3>
        <div class="fields">
          <label>${esc(h.calc.weight)}<input id="kw" inputmode="decimal" value="60"></label>
          <label>${esc(h.calc.minutes)}<input id="km" inputmode="numeric" value="30"></label>
          <label class="full">${esc(h.calc.stroke)}<select id="ks">${art(l, 'calories').toolOptions.map(([label, met], i) => `<option value="${met}"${i === 0 ? ' selected' : ''}>${esc(label)}</option>`).join('')}</select></label>
        </div>
        <div class="result" id="kr">174<small>kcal</small></div>
        <a href="${href(l, 'calories')}">${esc(h.calc.calLink)} →</a>
      </div>
    </form>
  </div>
</section>

<section class="sec wrap" id="magazine">
  <div class="sec-head">
    <h2><span class="no">06</span>${esc(h.magH)}</h2>
    <div class="tabs" id="tabs">
      <button class="on" data-f="all" type="button">${esc(h.magAll)}</button>
      ${['knowledge', 'issues', 'store'].map((k) => `<button data-f="${k}" type="button">${esc(c.cats[k].name)}</button>`).join('')}
    </div>
  </div>
  <div class="mag" id="mag">${mag.map((a) => postCard(c, a)).join('')}</div>
</section>`;

  const data = {
    tips: h.tips,
    q: h.quiz,
    href: Object.fromEntries(strokes.map((a) => [a.key, href(l, a.key)])),
  };
  const script = `<script>
(() => {
  const D = ${JSON.stringify(data).replace(/</g, '\\u003c')};
  const $ = (id) => document.getElementById(id);
  $('tip').textContent = D.tips[Math.floor(Date.now() / 864e5) % D.tips.length];

  const Q = D.q.questions; let step = 0, score = {};
  const renderQ = () => {
    $('qprog').innerHTML = Q.map((_, i) => '<i class="' + (i <= step ? 'on' : '') + '"></i>').join('');
    $('qtext').textContent = 'Q' + (step + 1) + '. ' + Q[step].q;
    $('qopts').innerHTML = Q[step].o.map((o, i) => '<button class="opt" type="button" data-i="' + i + '"></button>').join('');
    $('qopts').querySelectorAll('.opt').forEach((b, i) => { b.textContent = Q[step].o[i][0]; });
  };
  const show = () => {
    const key = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
    const r = D.q.results[key];
    $('qart').innerHTML = document.querySelector('.sc[data-key="' + key + '"] svg').outerHTML;
    $('qlabel').textContent = D.q.resultLabel;
    $('qtitle').textContent = D.q.resultTitle.replace('{name}', r.t);
    $('qdesc').textContent = r.d;
    $('qlink').href = D.href[key];
    $('qacts').hidden = false;
    $('qtext').textContent = D.q.done;
    $('qopts').innerHTML = '';
    $('qprog').innerHTML = Q.map(() => '<i class="on"></i>').join('');
  };
  $('qopts').addEventListener('click', (e) => {
    const b = e.target.closest('.opt'); if (!b) return;
    for (const [k, v] of Object.entries(Q[step].o[b.dataset.i][1])) score[k] = (score[k] || 0) + v;
    step++; step < Q.length ? renderQ() : show();
  });
  $('qretry').onclick = () => { step = 0; score = {}; $('qacts').hidden = true; $('qart').innerHTML = ''; $('qtitle').textContent = '?'; $('qlabel').textContent = D.q.preview; $('qdesc').textContent = D.q.previewText; renderQ(); };
  $('qshare').onclick = async () => {
    const text = $('qtitle').textContent + ' ' + D.q.shareText;
    const url = location.origin + location.pathname + '#quiz';
    try { if (navigator.share) await navigator.share({ text, url }); else { await navigator.clipboard.writeText(text + ' ' + url); $('qshare').textContent = D.q.copied; } } catch (e) {}
  };
  renderQ();

  document.querySelectorAll('.oxc').forEach((c) => c.addEventListener('click', () => c.classList.toggle('flip')));

  const calc = () => {
    const d = +$('cd').value, p = $('ct').value.split(':').map(Number), s = p.reduce((a, n) => a * 60 + n, 0);
    if (!(d > 0) || !(s > 0) || p.some(isNaN)) { $('cr').innerHTML = '–<small>/100m</small>'; return; }
    const x = Math.round(s / d * 100);
    $('cr').innerHTML = Math.floor(x / 60) + ':' + String(x % 60).padStart(2, '0') + '<small>/100m</small>';
  };
  $('cd').oninput = $('ct').oninput = calc; calc();
  const kcal = () => {
    const w = parseFloat($('kw').value), m = parseFloat($('km').value), met = parseFloat($('ks').value);
    $('kr').innerHTML = (w > 0 && m > 0 ? Math.round(met * w * m / 60) : '–') + '<small>kcal</small>';
  };
  $('kw').oninput = $('km').oninput = $('ks').onchange = kcal; kcal();
  document.querySelectorAll('.ctabs button').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.ctabs button').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    document.querySelectorAll('.cpanel').forEach((p) => { p.hidden = p.dataset.p !== b.dataset.t; });
  }));

  $('tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('#tabs button').forEach((x) => x.classList.toggle('on', x === b));
    document.querySelectorAll('#mag .post').forEach((p) => { p.hidden = b.dataset.f !== 'all' && p.dataset.c !== b.dataset.f; });
  });
})();
</script>`;

  return layout(c, {
    key: 'home', path: href(l, 'home'), title: h.title, description: h.description, main, scripts: script, ogType: 'website',
    ld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: c.siteName, url: abs(href(l, 'home')), inLanguage: l, description: h.description }],
  });
}

function infoPage(c, key) {
  const p = c[key];
  checkMeta(c.lang, `[${c.lang}] ${key}`, p.title, p.description);
  const bc = crumbs(c, [[key, p.h1]]);
  const main = `<article class="wrap article prose">
  ${bc.html}
  <header class="art-head"><h1>${esc(p.h1)}</h1>${updatedLine(c)}</header>
  <div class="art-body">
  ${p.body.map((b) => `<section class="blk"><h2>${b.h}</h2>${(b.paras || []).map((t) => `<p>${fill(t)}</p>`).join('')}${b.list ? `<ul class="bullets">${b.list.map((t) => `<li>${fill(t)}</li>`).join('')}</ul>` : ''}</section>`).join('\n  ')}
  </div>
</article>`;
  return layout(c, { key, path: href(c.lang, key), title: p.title, description: p.description, main, ld: [bc.ld] });
}

function notFoundPage(c) {
  const l = c.lang;
  const picks = ['breathing', 'freestyle', 'goggles', 'lane-etiquette', 'chlorine', 'beginner-checklist'].map((k) => art(l, k));
  const main = `<section class="wrap hub">
  <header class="hub-head">
    <h1>${esc(c.ui.notFoundTitle)}</h1>
    <div class="hub-intro"><p>${esc(c.ui.notFoundBody)}</p></div>
  </header>
  <div class="cat-links">${CATS.map((k) => `<a class="pill" href="${href(l, k)}">${esc(c.cats[k].name)} →</a>`).join('')}</div>
  <div class="mag">${picks.map((a) => postCard(c, a, { heading: 'h2' })).join('')}</div>
  <p><a class="btn ink" href="${href(l, 'home')}">${esc(c.ui.notFoundHome)}</a></p>
</section>`;
  return layout(c, { key: null, path: (l === DEFAULT_LANG ? '' : `/${l}`) + '/404.html', title: `${c.ui.notFoundTitle} | ${c.siteName}`, description: c.ui.notFoundBody, main, noindex: true });
}

// ---------- 빌드 ----------

for (const l of config.LANGS.slice(1)) {
  const a = pageKeys(DEFAULT_LANG).join(), b = pageKeys(l).join();
  need(a === b, `hreflang 대칭 깨짐: ${DEFAULT_LANG}(${a}) vs ${l}(${b})`);
  for (const x of ARTICLES[l]) need(x.cat === art(DEFAULT_LANG, x.key)?.cat, `[${l}] ${x.key}: 카테고리가 기본 언어와 다름`);
}
for (const l of config.LANGS) {
  const keys = ARTICLES[l].map((a) => a.key);
  need(new Set(keys).size === keys.length, `[${l}] 글 key 중복`);
}

const out = new Map(); // dist 경로 → html
for (const l of config.LANGS) {
  const c = content[l];
  const put = (key, html) => out.set(href(l, key) + 'index.html', html);
  put('home', homePage(c));
  for (const cat of CATS) put(cat, hubPage(c, cat));
  for (const a of ARTICLES[l]) put(a.key, articlePage(c, a));
  for (const k of INFO) put(k, infoPage(c, k));
  out.set((l === DEFAULT_LANG ? '' : `/${l}`) + '/404.html', notFoundPage(c));
}

// 글·메뉴 페이지의 <main> 안 내부 링크 3개 이상 + 모든 내부 링크가 실제 파일을 가리키는지
const staticFiles = new Set((await readdir(join(ROOT, 'static'))).map((f) => '/' + f));
const needLinks = new Set(config.LANGS.flatMap((l) => [...CATS, ...ARTICLES[l].map((a) => a.key)].map((k) => href(l, k))));
for (const [file, html] of out) {
  const self = file.replace(/index\.html$/, '');
  const mainHtml = html.split('<main')[1].split('</main>')[0];
  if (needLinks.has(self)) {
    const internal = new Set([...mainHtml.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]).filter((u) => u !== self));
    need(internal.size >= 3, `${self}: 본문 내부 링크 ${internal.size}개 (최소 3개)`);
  }
  for (const [, u] of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const ok = u.endsWith('/') ? out.has(u + 'index.html') : staticFiles.has(u);
    need(ok, `${file}: 깨진 내부 링크 ${u}`);
  }
}

// 중복 title/description 방지
for (const attr of ['<title>', 'name="description" content="']) {
  const seen = new Map();
  for (const [file, html] of out) {
    if (file.endsWith('404.html')) continue;
    const v = html.split(attr)[1].split(/[<"]/)[0];
    if (seen.has(v)) errors.push(`${file}와 ${seen.get(v)}의 ${attr.includes('title') ? 'title' : 'description'} 중복`);
    seen.set(v, file);
  }
}

if (!config.CONTACT_EMAIL) warnings.push('CONTACT_EMAIL 미설정: contact/개인정보처리방침에 자리표시가 나갑니다. 애드센스 신청 전 반드시 채우세요.');
if (!config.ADSENSE_PUB_ID) warnings.push('ADSENSE_PUB_ID 미설정: ads.txt에 주석만 들어가고 애드센스 스크립트가 빠집니다.');
if (emptyPicks) warnings.push(`스토어 추천 ${emptyPicks}곳에 쿠팡 링크(url)가 비어 있어 버튼이 숨겨집니다.`);

if (errors.length) {
  console.error(`\n빌드 실패: 규칙 위반 ${errors.length}건\n` + errors.map((e) => '  ✗ ' + e).join('\n'));
  process.exit(1);
}

// 쓰기
await rm(DIST, { recursive: true, force: true });
for (const [file, html] of out) {
  const target = join(DIST, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}
await cp(join(ROOT, 'static'), DIST, { recursive: true });

const sitemapUrls = config.LANGS.flatMap((l) => pageKeys(l).map((k) => {
  const alts = config.LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${abs(href(a, k))}"/>`).join('\n');
  return `  <url>\n    <loc>${abs(href(l, k))}</loc>\n    <lastmod>${config.CONTENT_UPDATED}</lastmod>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(href(DEFAULT_LANG, k))}"/>\n  </url>`;
}));
await writeFile(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls.join('\n')}
</urlset>
`);
await writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
await writeFile(join(DIST, 'ads.txt'), config.ADSENSE_PUB_ID
  ? `google.com, ${config.ADSENSE_PUB_ID}, DIRECT, f08c47fec0942fa0\n`
  : '# AdSense publisher ID not set yet (site.config.mjs > ADSENSE_PUB_ID)\n');
await writeFile(join(DIST, `${config.INDEXNOW_KEY}.txt`), config.INDEXNOW_KEY);

for (const w of warnings) console.warn('  ⚠ ' + w);
console.log(`빌드 완료: 페이지 ${out.size}개 (${config.LANGS.join(', ')}) → dist/`);
