'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import GenerateForm from '@/components/GenerateForm/GenerateForm';
import type { StyleType, ToneType, GeneratedContent } from '@/types/generate';
import ResultViewer from '@/components/ResultViewer';

export default function Page() {
  const [style, setStyle] = useState<StyleType>('tutorial'); // 글 템플릿
  const [tone, setTone] = useState<ToneType>('kind'); // 작성 스타일
  const [topic, setTopic] = useState(''); // 주제
  const [keywords, setKeywords] = useState(''); // 키워드
  const [result, setResult] = useState<GeneratedContent | null>(null); // 결과
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

  const form = {
    style,
    tone,
    topic,
    keywords,
    setStyle,
    setTone,
    setTopic,
    setKeywords,
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full px-8 max-w-3xl">
        <Hero />
        <GenerateForm form={form} loading={loading} onSubmit={handleSubmit} />
        {result && <ResultViewer result={result} />}
      </div>
    </main>
  );
}
