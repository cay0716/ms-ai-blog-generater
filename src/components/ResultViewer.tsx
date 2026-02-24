'use client'

import PrismHighlighter from "@/components/PrismHighlighter";
import ResultBtns from "@/components/ResultBtns";
import { GeneratedContent } from "@/types/generate";
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from "react";
import type { Editor as ToastEditor } from '@toast-ui/react-editor';

const Editor = dynamic(
  () => import('@toast-ui/react-editor').then(m => m.Editor),
  { ssr: false }
);

export default function ResultViewer({result} : { result: GeneratedContent }) {
  const editorRef = useRef<ToastEditor | null>(null);
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return(
    <div className="my-8 space-y-4">
      <h2 className="text-xl font-bold">{result.title}</h2>
      <hr />
        <Editor
          key={`${result.title}-${isDark}`}
          theme={isDark ? "dark" : "light"}
          ref={editorRef}
          initialValue={result.content}
          previewStyle="vertical"
          height="70vh"
          initialEditType="markdown"
          useCommandShortcut={true}
        />

      <PrismHighlighter content={result.content} />
      <hr />  
      <ResultBtns  result={result}  editorRef={editorRef}/>
      <div>
        <strong>해시태그:</strong> {result.hashtags?.join(', ')}
      </div>
      <div>
        <strong>메타 설명:</strong> {result.metaDescription}
      </div>
    </div>
  )
}