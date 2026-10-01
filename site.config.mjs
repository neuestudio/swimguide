// 사이트 전역 설정. 도메인을 구매하면 SITE_URL만 바꾸고 다시 빌드한다.
export default {
  // 정식 주소 (끝에 / 없이). canonical, hreflang, 사이트맵, og:url 모두 이 값을 기준으로 만든다.
  SITE_URL: 'https://swimguide.swimguide.workers.dev',

  // 구글 애드센스 게시자 ID (예: 'pub-1234567890123456'). 비어 있으면 ads.txt에 주석만 들어간다.
  ADSENSE_PUB_ID: '',

  // contact 페이지와 개인정보처리방침에 공개되는 이메일. 비어 있으면 빌드 시 경고를 띄운다.
  CONTACT_EMAIL: '',

  // IndexNow 키. /<키>.txt 로 공개된다.
  INDEXNOW_KEY: '888dc33b9555251482125b2cf007899a',

  // 첫 번째 언어가 기본 언어(루트 경로)이자 x-default.
  LANGS: ['ko', 'en'],

  // 개인정보처리방침 시행일
  POLICY_DATE: '2026-09-30',

  // 콘텐츠 최종 수정일. 페이지의 "최종 수정"과 사이트맵 lastmod에 쓰인다. 글을 고치면 같이 바꾼다.
  CONTENT_UPDATED: '2026-10-01',
};
