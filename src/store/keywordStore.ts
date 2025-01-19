import { create } from 'zustand';

interface KeywordState {
  keyword: string;
}

interface KeywordAction {
  setKeyword: (value: string) => void;
}

export const useKeywordStore = create<KeywordState & KeywordAction>()(
  (set, _) => ({
    keyword: '',
    setKeyword: (value) => {
      set(() => ({ keyword: value }));
    },
  })
);
