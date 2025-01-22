import { TagItemValue } from '@/constants/tagItem';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface FeedSearchState {
  latest: boolean;
  tags: TagItemValue | null;
}

interface FeedSearchAction {
  setLatest: (latest: boolean) => void;
  setTags: (tags: TagItemValue | null) => void;
  reset: () => void;
}

const initialState: FeedSearchState & FeedSearchAction = {
  latest: false,
  tags: null,
  setLatest: () => {},
  setTags: () => {},
  reset: () => {},
};

const useFeedSearchStore = create<FeedSearchState & FeedSearchAction>()(
  devtools(
    immer((set) => ({
      ...initialState,
      setLatest: (latest) => {
        set((state) => {
          state.latest = latest;
        });
      },
      setTags: (tags) => {
        set((state) => {
          state.tags = tags;
        });
      },
      reset: () => {
        set(() => initialState);
      },
    }))
  )
);

export default useFeedSearchStore;
