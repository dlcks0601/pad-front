import { fetchChannelMessages } from '@/apis/channel.api';
import { LIMIT } from '@/constants/limit';
import { ChatState, useChatStore } from '@/store/chatStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useInfiniteMessages = (
  currentChannelId: NonNullable<ChatState['currentChannelId']>
) => {
  const setMessages = useChatStore((state) => state.setMessages);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['messages', currentChannelId],
    queryFn: ({ pageParam }) =>
      fetchChannelMessages({
        channelId: currentChannelId,
        limit: LIMIT.MESSAGES,
        currentPage: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const isLastPage = lastPage.messages.length < LIMIT.MESSAGES;
      return isLastPage ? null : lastPageParam + 1;
    },
  });

  const currentPage = data?.pageParams[data.pageParams.length - 1];
  const messages =
    data?.pages[(currentPage as number) - 1]?.messages.toReversed();

  useEffect(() => {
    if (currentPage && messages) {
      setMessages(messages ? messages : [], currentChannelId);
    }
  }, [data, currentChannelId]);

  return {
    fetchNextPage,
    hasNextPage,
    isLoading,
    currentPage,
  };
};
