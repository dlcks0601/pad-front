import { fetchChannelMessages } from '@/apis/channel.api';
import { LIMIT } from '@/constants/limit';
import { isNullish } from '@/lib/utils';
import { ChatState, useChatStore } from '@/store/chatStore';
import { useSearchStore } from '@/store/searchStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useInfiniteMessages = (
  currentChannelId: NonNullable<ChatState['currentChannelId']>
) => {
  const setMessages = useChatStore((state) => state.setMessages);
  const keyword = useSearchStore((state) => state.searchKeyword);
  const direction = useSearchStore((state) => state.direction);

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['messages', currentChannelId, keyword, direction],
    queryFn: ({ pageParam }) =>
      fetchChannelMessages({
        keyword,
        channelId: currentChannelId,
        limit: LIMIT.MESSAGES,
        cursor: pageParam,
        direction: direction,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursor,
    getPreviousPageParam: (firstPage) => firstPage.cursor,
  });

  const currentPage = data?.pageParams[data.pageParams.length - 1];
  const messages = data?.pages[currentPage as number]?.messages;

  useEffect(() => {
    if (!isNullish(currentPage) && !isNullish(messages)) {
      setMessages(messages ? messages : [], currentChannelId);
    }
  }, [data, currentChannelId, keyword, direction]);

  return {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    currentPage,
  };
};
