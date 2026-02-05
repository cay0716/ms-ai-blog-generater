'use client';

import { useState } from 'react';
// import { Viewer } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';

const Viewer = dynamic(
  () => import('@toast-ui/react-editor').then(m => m.Viewer),
  { ssr: false }
);

export default function Page() {
  // 1️⃣ 템플릿 / 말투
  const [style, setStyle] = useState<'tutorial' | 'til' | 'troubleshooting'>('til');
  const [tone, setTone] = useState<'kind' | 'minimal' | 'formal'>('kind');

  // 2️⃣ 주제 / 키워드
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');

  // 3️⃣ 결과
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 방어 로직: 주제가 없으면 API를 호출하지 않음
    if (!topic.trim()) {
      alert("주제를 입력해주세요!");
      return;
    }
    
    setLoading(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        keywords: keywords.split(',').map(k => k.trim()),
        style,
        tone,
      }),
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full px-8 max-w-3xl bg-amber-300">
        <div className='w-full text-center'>
          <h1 className="text-xl font-bold">AI로 개발 블로그를 간단하게 작성해 보세요.</h1>
          <p className='text-xs'>개발 기록을 남기면, AI가 글로 정리해 드립니다.</p>
        </div>
        <form action="" onSubmit={handleSubmit} className=''>
          <fieldset>
            <legend>글 설정</legend>
            {/* 1. 템플릿 선택 */}
            <div>
              <label className="">글 템플릿</label>
              <select value={style} onChange={e => setStyle(e.target.value as any)}>
                <option value="tutorial">튜토리얼</option>
                <option value="til">TIL</option>
                <option value="troubleshooting">트러블 슈팅</option>
              </select>
            </div>
            {/* 2. 말투 선택 */}
            <div>
              <label className="">말투</label>
              <select value={tone} onChange={e => setTone(e.target.value as any)}>
                <option value="kind">친절한 설명체</option>
                <option value="minimal">간결한 개발자체</option>
                <option value="formal">개발 일지체</option>
              </select>
            </div>
          </fieldset>
          <fieldset>
            <legend>내용 입력</legend>
            {/* 3. 주제 */}
            <div>
              <label className="">주제</label>
              <input
                className="w-full border p-2"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="예: Next.js App Router에서 API Route 만들기"
              />
            </div>
            {/* 4. 키워드 */}
            <div>
              <label className="">
                키워드
              </label>
              <input
                className=""
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="예: Next.js, API Route, OpenAI"
              />
              <p>쉼표로 구분하여 입력해주세요.</p>
            </div>
          </fieldset>
          {/* 전송 */}
          <button
            type='submit'
            disabled={loading}
            className=""
          >
            {loading ? '생성 중...' : '글 생성'}
          </button>
        </form>
        {/* 5. 결과 */}
        {result && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold">{result.title}</h2>
              <Viewer initialValue={result.content} />
            <div>
              <strong>해시태그:</strong> {result.hashtags?.join(', ')}
            </div>
            <div>
              <strong>메타 설명:</strong> {result.metaDescription}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
