'use client'

import { GeneratedContent } from "@/types/generate";
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@toast-ui/react-editor').then(m => m.Editor),
  { ssr: false }
);

export default function ResultViewer({result} : { result: GeneratedContent }) {
  return(
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-bold">{result.title}</h2>
      <hr />
        <Editor
          initialValue={result.content}
          previewStyle="vertical"
          height="70vh"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
      <hr />  
      <div>
        <strong>해시태그:</strong> {result.hashtags?.join(', ')}
      </div>
      <div>
        <strong>메타 설명:</strong> {result.metaDescription}
      </div>
    </div>
  )
}