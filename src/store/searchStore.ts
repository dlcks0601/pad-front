import {
  FetchChannelMessagesRequest,
  SearchChannelMessagesResponse,
} from '@/types/message.type';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SearchState {
  searchDirection: FetchChannelMessagesRequest['direction'];
  searchCursors: SearchChannelMessagesResponse['cursors'];
  searchMode: boolean;
  searchKeyword: string;
}

export interface SearchAction {
  setState: (state: Partial<SearchState>) => void;
}

type SearchStore = SearchState & SearchAction;

export const initialState: SearchState = {
  searchDirection: 'backward',
  searchCursors: {
    prev: null,
    next: null,
    search: null,
  },
  searchMode: false,
  searchKeyword: '',
};

export const useSearchStore = create<SearchStore>()(
  immer((set) => ({
    ...initialState,
    setState: (state) => {
      set(() => ({ ...state }));
    },
  }))
);
