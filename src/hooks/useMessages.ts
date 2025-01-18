import { fetchChannelMessages } from '@/apis/channel.api';
import { LIMIT } from '@/constants/limit';
import { ChatState, useChatStore } from '@/store/chatStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useMessagesInfinite = (
  currentChannelId: NonNullable<ChatState['currentChannelId']>
) => {
  const setHttpMessages = useChatStore((state) => state.setHttpMessages);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
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
  const httpMessages = data?.pages
    .flatMap((page) => page.messages)
    .toReversed();

  useEffect(() => {
    if (data && currentPage) {
      console.log(data.pages[(currentPage as number) - 1].messages);
      setHttpMessages(
        data.pages[(currentPage as number) - 1].messages,
        currentChannelId
      );
    }
  }, [data, currentPage, currentChannelId]);

  return {
    messages: httpMessages,
    fetchNextPage,
    hasNextPage,
    isFetching,
    currentPage,
  };
};
