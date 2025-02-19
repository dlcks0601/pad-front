import { searchChannelMessages } from '@/apis/channel.api';
import LoadingDots from '@/components/molecules/LoadingDots';
import Messages from '@/components/organisms/chat/Messages';
import { useInfiniteMessages } from '@/hooks/chat/useMessages';
import { useScroll } from '@/hooks/useScroll';
import { useChatStore } from '@/store/chatStore';
import { useSearchStore } from '@/store/searchStore';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import queryClient from '@/utils/queryClient';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useShallow } from 'zustand/shallow';

interface ChatMessagesProps {
  currentChannelId: Channel['channelId'];
}

let renderingCount = 1;

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  const {
    data: chatMessages,
    hasPreviousPage,
    fetchPreviousPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteMessages(currentChannelId);

  const { socketMessages, updateNeeded, setChatState } = useChatStore(
    useShallow((state) => ({
      socketMessages: state.messages[currentChannelId!],
      updateNeeded: state.updateNeeded,
      setChatState: state.setState,
    }))
  );

  const { searchMode, searchKeyword, setSearchState } = useSearchStore(
    useShallow((state) => ({
      searchMode: state.searchMode,
      searchKeyword: state.searchKeyword,
      setSearchState: state.setState,
    }))
  );

  const { ref: loadNextRef, inView: isTopInView } = useInView({
    threshold: 1,
  });

  const { ref: loadPrevRef, inView: isBottomInView } = useInView({
    threshold: 1,
  });

  const messages = deduplicateAndSortMessages([
    ...(chatMessages ? chatMessages : []),
    ...(socketMessages ? socketMessages : []),
  ]);

  const searchData = queryClient.getQueryData<
    Awaited<ReturnType<typeof searchChannelMessages>>
  >(['searchMessages', currentChannelId, searchKeyword]);

  console.log('chatMessages', renderingCount++);

  const totalImages = messages.filter((message) => message.type === 'image');

  const { handleImageLoad, scrollContainerRef } = useScroll<ReceiveMessage>({
    datas: messages,
    totalImageCount: totalImages.length,
    searchMode,
  });

  useEffect(() => {
    // 다른 사람이 채널에 입장했을 때 해당 채널의 readCount 가 1씩 증가하는데 이를 화면에 반영하기 위함
    if (updateNeeded) {
      refetch();
      setChatState({ updateNeeded: false });
    }
  }, [updateNeeded]);

  console.log({ hasNextPage, hasPreviousPage });
  useEffect(() => {
    if (isTopInView && hasNextPage) {
      setSearchState({ searchMode: false, searchDirection: 'backward' });
      fetchNextPage();
    }
  }, [isTopInView, hasNextPage]);

  useEffect(() => {
    if (isBottomInView && hasPreviousPage) {
      setSearchState({ searchMode: false, searchDirection: 'forward' });
      fetchPreviousPage();
    }
  }, [isBottomInView, hasPreviousPage]);

  if (isLoading) {
    return (
      <div className='flex justify-center grow'>
        <LoadingDots />
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className='grow pl-[56px] pr-[46px] flex flex-col overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'
    >
      {messages && (
        <>
          {hasNextPage && !isFetchingNextPage && <div ref={loadNextRef}></div>}
          {isFetching && <LoadingDots />}
          <Messages
            messages={searchMode && searchData ? searchData.messages : messages}
            handleImageLoad={handleImageLoad}
          />
          {hasPreviousPage && !isFetchingPreviousPage && (
            <div ref={loadPrevRef}></div>
          )}
        </>
      )}
    </div>
  );
};

function deduplicateAndSortMessages(
  messages: ReceiveMessage[]
): ReceiveMessage[] {
  // 1. messageId 기준으로 정렬
  const sortedMessages = messages.toSorted((a, b) => a.messageId - b.messageId);

  // 2. 중복 제거 (messageId가 동일한 경우 첫 번째 메시지만 유지)
  const uniqueMessages = sortedMessages.filter((message, index, arr) => {
    return index === 0 || message.messageId !== arr[index - 1].messageId;
  });

  return uniqueMessages;
}

export default ChatMessages;
