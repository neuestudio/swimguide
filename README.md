# swimguide — 수영 영법 가이드

Cloudflare Workers에서 서비스하는 정적 사이트(ko / en).

```
npm run build     # src/content/*.mjs → dist/ (규칙 위반 시 빌드 실패)
npm run dev       # 빌드 + 로컬 서버 (http://localhost:8787)
npm run deploy    # 빌드 + Cloudflare 배포
npm run verify    # 실제 URL 검사 (로컬 점검: npm run verify -- http://localhost:8787)
npm run indexnow  # 사이트맵 URL을 IndexNow + 네이버에 전송
```

## 구조
- `site.config.mjs` — 도메인, 애드센스 ID, 연락처 이메일, IndexNow 키, 수정일
- `src/content/ko.mjs`, `en.mjs` — 메뉴·홈·영법 글·소개/문의/개인정보. 두 언어의 페이지 키가 같아야 빌드된다(hreflang 대칭)
- `src/content/{ko,en}/knowledge.mjs`, `issues.mjs`, `store.mjs` — 수영지식·수영이슈·스토어 글. 새 글은 여기에 객체를 추가하면 메뉴 페이지, 홈, 푸터, 사이트맵에 자동으로 들어간다
- 스토어 글의 `picks[].url`에 쿠팡 파트너스 링크를 넣으면 버튼이 나타난다 (비어 있으면 숨김)
- `mockups/` — 디자인 시안 (배포에 포함되지 않음)
- `src/build.mjs` — 레이아웃·검사·사이트맵·robots·ads.txt 생성
- `src/worker.js` — trailing slash 301, 도메인 이전 301, 메뉴 개편 전 옛 주소 301
- `static/` — CSS, 파비콘

## 빌드 검사 규칙
- 인트로 3문장 이상, 텍스트 섹션 2문장 이상, FAQ 답변·드릴·실수 설명 2문장 이상, 목록 3항목 이상
- description 길이 (ko 40~160자, en 70~175자), title/description 페이지 간 중복 금지
- 글·메뉴 페이지 본문 내부 링크 3개 이상, 스토어 추천 이유 2문장 이상, 깨진 내부 링크 금지
- 모든 언어에 같은 페이지 존재 (hreflang 대칭)

## 애드센스 신청 전 체크리스트
1. 도메인 구매 → 아래 "도메인 이전" 진행
2. `site.config.mjs`에 `CONTACT_EMAIL` 입력
3. 애드센스 가입 후 `ADSENSE_PUB_ID` 입력 (`pub-` 로 시작) → 배포 → `/ads.txt` 확인
4. `npm run verify` 통과
5. Google Search Console, 네이버 서치어드바이저에 사이트 등록 + 사이트맵 제출
6. GSC에서 주요 URL "색인 생성 요청" (홈, 영법 4개, 호흡법, 계산기 × 2개 언어)
7. `npm run indexnow`

## 도메인 이전 (workers.dev → 새 도메인)
1. Cloudflare 대시보드에서 도메인을 Workers 라우트/Custom Domain으로 `swimguide`에 연결
2. `site.config.mjs` → `SITE_URL: 'https://새도메인'`
3. `wrangler.jsonc` → `"CANONICAL_HOST": "새도메인"` (`workers_dev: true`는 그대로 둔다)
4. `npm run deploy` → `npm run verify` → `npm run indexnow`
5. GSC에 새 도메인 속성 추가, 사이트맵 재제출
6. **workers.dev 주소는 최소 6~12개월 켜 둔다.** 이 기간 동안 옛 주소의 모든 경로가 새 도메인 같은 경로로 301 된다.
