### JBLOG

Notion을 CMS로 사용하는 Next.js(앱 라우터) 기반의 블로그/프로젝트 포트폴리오입니다. 게시글/프로젝트 메타데이터는 Notion 데이터베이스에서 가져오고, 본문은 react-notion-x로 렌더링합니다.

### 기술 스택

- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS 4
- **CMS & Rendering**: @notionhq/client, notion-client, react-notion-x, KaTeX, Prism (Tomorrow)
- **기타**: ofetch 기반 ky shim, TypeScript

### 주요 기능

- **블로그 목록**: Notion DB에서 상태가 "완료"인 글만 필터링하여 표시, 태그/커버 노출
- **블로그 상세**: 커버/작성일/태그 메타데이터 표시, 본문을 react-notion-x로 렌더링(코드 하이라이트/수식 지원)
- **프로젝트 목록**: PIN 속성으로 고정된 항목 우선 정렬, 기간/기술 태그 노출
- **프로젝트 상세**: 기간, 사이트, GitHub, 회고 링크, 종류(select) 등 메타데이터 표시 및 본문 렌더링
- **이미지 최적화**: Next/Image 사용, S3/외부 도메인 화이트리스트 설정

### 라우팅

- `/` 블로그 목록
- `/posts/[pageId]` 글 상세 (Notion Page ID)
- `/projects` 프로젝트 목록
- `/projects/[projectId]` 프로젝트 상세 (Notion Page ID)

### 구성 메모

- `next.config.ts`

  - webpack alias로 `ky`를 `src/lib/ky-shim.ts`에 매핑하여 Next 15 환경에서 notion-client의 ky 의존성 문제를 우회합니다.
  - `images.domains`에 외부 이미지 도메인(S3 등)을 허용합니다.

- `src/lib/ky-shim.ts`
  - ofetch 기반으로 ky 호환 인터페이스의 `post().json()`만 최소 구현했습니다.
