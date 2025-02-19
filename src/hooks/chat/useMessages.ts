import { fetchChannelMessages } from '@/apis/channel.api';
import { LIMIT } from '@/constants/limit';
import { useSearchStore } from '@/store/searchStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';

export const useInfiniteMessages = (currentChannelId: number) => {
  const { cursor } = useSearchStore(
    useShallow((state) => ({
      cursor: state.searchCursors,
    }))
  );
  const direction = useSearchStore.getState().searchDirection;

  return useInfiniteQuery({
    queryKey: ['messages', currentChannelId, cursor],
    queryFn: ({ pageParam }) =>
      fetchChannelMessages({
        channelId: currentChannelId,
        direction: direction, // backward | forward
        limit: LIMIT.INFINITE_MESSAGES,
        cursor: pageParam,
      }),
    initialPageParam: direction === 'backward' ? cursor.prev : cursor.next, // next | prev | null
    getNextPageParam: (lastPage) => lastPage.cursors.prev,
    getPreviousPageParam: (firstPage, allPages) =>
      allPages.length === 1 ? cursor.next : firstPage.cursors.next,
    select: (data) => data.pages.flatMap((page) => page.messages),
  });
};
