export function getMockBlogData({
  topic,
  keywords,
  style,
  tone,
}: {
  topic: string;
  keywords: string[];
  style: string;
  tone: string;
}) {
  return {
    title: `[${style}] ${topic}`,
    content: `## 오늘 배운 것

- 말투: ${tone}
- 글 유형: ${style}
- 주제: ${topic}
- 키워드: ${keywords.join(', ')}

## 개요
이 글에서는 Next.js App Router 환경에서 API Route를 구성하는 방법을 정리한다.

## 사전 준비
- Node.js 설치
- Next.js App Router 프로젝트 생성

## Step 1. route.ts 만들기
\`\`\`ts
export async function POST() {
  return new Response();
}
\`\`\`

## Step 2. 클라이언트에서 호출
API Route는 클라이언트에서 fetch를 통해 호출한다.

## 어려웠던 점
App Router 구조가 익숙하지 않아 초기에 헷갈렸다.

## 마무리
더미 데이터를 통해 전체 흐름을 먼저 검증했다.
`,
    hashtags: keywords,
    metaDescription: `${topic}에 대한 ${style} 형식의 기술 블로그 글`,
  };
}
