export type StyleType = 'tutorial' | 'til' | 'troubleshooting';

export type ToneType = 'kind' | 'minimal' | 'formal';

export interface GeneratedContent {
  title: string;
  content: string;
  hashtags: string[];
  metaDescription: string;
}

export interface GenerateFormState {
  style: StyleType;
  tone: ToneType;
  topic: string;
  keywords: string;
  setStyle: (v: StyleType) => void;
  setTone: (v: ToneType) => void;
  setTopic: (v: string) => void;
  setKeywords: (v: string) => void;
}
