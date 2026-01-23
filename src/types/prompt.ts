export interface Prompt {
  id: string;
  title: string;
  prompt_text: string;
  category: string | null;
  tags: string[];
}

export type Category = string;
