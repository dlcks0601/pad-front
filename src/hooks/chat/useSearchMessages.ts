import { searchChannelMessages } from '@/apis/channel.api';
import { LIMIT } from '@/constants/limit';
import { useSearchStore } from '@/store/searchStore';
import { useQuery } from '@tanstack/react-query';

export const useSearchMessagesQuery = (currentChannelId: number) => {
  const searchKeyword = useSearchStore((state) => state.searchKeyword);

  return useQuery({
    queryKey: ['searchMessages', currentChannelId, searchKeyword],
    queryFn: () =>
      searchChannelMessages({
        channelId: currentChannelId,
        cursor: useSearchStore.getState().searchCursors?.search || null,
        limit: LIMIT.SEARCH_MESSAGES,
        direction: useSearchStore.getState().searchDirection,
        keyword: searchKeyword,
      }),
    enabled: !!searchKeyword,
    staleTime: 0,
  });
};
