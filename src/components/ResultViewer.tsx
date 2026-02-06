import { GeneratedContent } from "@/types/generate";
import dynamic from 'next/dynamic';

const Viewer = dynamic(
  () => import('@toast-ui/react-editor').then(m => m.Viewer),
  { ssr: false }
);


export default function ResultViewer({result} : { result: GeneratedContent }) {
  return(
    <div className="mt-8 space-y-4 border rounded-md p-3">
      <h2 className="text-xl font-bold">{result.title}</h2>
      <hr />
        <Viewer initialValue={result.content} />
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