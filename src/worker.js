// 모든 요청이 정적 파일보다 먼저 이 Worker를 거친다.
// 1) 정식 도메인이 아닌 주소(예: 도메인 이전 후의 workers.dev)로 들어오면 같은 경로로 301
// 2) 메뉴 개편 전 옛 주소 → 새 주소 301
// 3) 페이지 주소는 항상 끝에 / 가 붙도록 301 (trailing slash 통일)

// 2026-09-30 메뉴 개편 (수영영법/수영지식/수영이슈/스토어) 전의 주소. 최소 6~12개월 유지한다.
const LEGACY = {
  '/freestyle/': '/strokes/freestyle/',
  '/backstroke/': '/strokes/backstroke/',
  '/breaststroke/': '/strokes/breaststroke/',
  '/butterfly/': '/strokes/butterfly/',
  '/breathing/': '/strokes/breathing/',
  '/tools/pace-calculator/': '/knowledge/pace-calculator/',
  '/tools/': '/knowledge/',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const canonicalHost = env.CANONICAL_HOST;
    if (canonicalHost && url.hostname !== canonicalHost) {
      url.protocol = 'https:';
      url.hostname = canonicalHost;
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname.endsWith('/index.html')) {
      url.pathname = url.pathname.slice(0, -'index.html'.length);
      return Response.redirect(url.toString(), 301);
    }

    const looksLikeFile = /\.[a-z0-9]+$/i.test(url.pathname);
    const slashed = looksLikeFile || url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
    const [, prefix = '', rest] = slashed.match(/^(\/en)?(\/.*)$/);
    if (LEGACY[rest]) {
      url.pathname = prefix + LEGACY[rest];
      return Response.redirect(url.toString(), 301);
    }

    if (slashed !== url.pathname) {
      url.pathname = slashed;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
