import ContentFieldset from '@/components/GenerateForm/ContentFieldset';
import { StyleFieldset } from '@/components/GenerateForm/StyleFieldset';
import type { GenerateFormState } from '@/types/generate';


interface Props {
  form: GenerateFormState;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function GenerateForm({ form, loading, onSubmit, }: Props) {
  const {
    style,
    tone,
    topic,
    keywords,
    setStyle,
    setTone,
    setTopic,
    setKeywords,
  } = form;

  return(
    <form action="" onSubmit={onSubmit} className=''>
      <StyleFieldset style={style} tone={tone} onStyleChange={setStyle} onToneChange={setTone} />
      <ContentFieldset topic={topic} keywords={keywords} onTopicChange={setTopic} onKeywordChange={setKeywords} />
      {/* 전송 */}
      <button
        type='submit'
        disabled={loading}
        className="w-full text-center bg-(--brand) py-1.5 mt-2 rounded-md font-semibold
          hover:bg-(--brand-black) hover:text-white transition-all"
      >
        {loading ? '생성 중...' : '글 생성'}
      </button>
    </form>
  )
}