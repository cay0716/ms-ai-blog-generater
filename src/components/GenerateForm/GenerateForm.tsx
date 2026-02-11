import ContentFieldset from '@/components/generateForm/ContentFieldset';
import { StyleFieldset } from '@/components/generateForm/StyleFieldset';
import ResultLoading from '@/components/ui/ResultLoading';
import type { GenerateFormState } from '@/types/generate';


interface Props {
  form: GenerateFormState;
  setForm: React.Dispatch<React.SetStateAction<GenerateFormState>>;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function GenerateForm({ form, setForm, loading, onSubmit, }: Props) {
  return(
    <>
      <form action="" onSubmit={onSubmit} className=''>
        <StyleFieldset style={form.style} tone={form.tone} onStyleChange={v => setForm(p => ({...p, style: v}))} onToneChange={v => setForm(p => ({ ...p, tone: v }))} />
        <ContentFieldset topic={form.topic} keywords={form.keywords} onTopicChange={v => setForm(p => ({ ...p, topic: v }))} onKeywordChange={v => setForm(p => ({ ...p, keywords: v }))} />
        {/* 전송 */}
        <button
          type='submit'
          disabled={loading}
          className="w-full text-center bg-(--brand) py-1.5 mt-2 rounded-md font-semibold
            hover:bg-(--brand-black) hover:text-white focus:bg-(--brand-black) focus:text-white transition-all"
        >
          {/* {loading ? '생성 중...' : '글 생성'} */}
          글 생성
        </button>
      </form>
      <div>
        {loading && <ResultLoading />}
      </div>
    </>
  )
}