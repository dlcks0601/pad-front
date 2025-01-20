import Messages from '@/components/organisms/chat/Messages';
import { useInfiniteMessages } from '@/hooks/useInfiniteMessages';
import { ChatState, useChatStore } from '@/store/chatStore';
import { useSearchStore } from '@/store/searchStore';
import { UIEvent, useEffect, useRef } from 'react';

interface ChatMessagesProps {
  currentChannelId: NonNullable<ChatState['currentChannelId']>;
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  // 메시지 관련 로직
  const { hasNextPage, isLoading, fetchNextPage, currentPage } =
    useInfiniteMessages(currentChannelId);
  const messages = useChatStore((state) => state.messages[currentChannelId]);
  const previousHeightRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const setLoadMore = useSearchStore((state) => state.setLoadMore);
  setLoadMore(fetchNextPage);

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const scrollContainer = e.currentTarget;
    if (scrollContainer.scrollTop === 0) {
      loadMore();
    }
  };

  // 스크롤 위치 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !currentPage) return;
    if (currentPage === 1) {
      // 스크롤이 가장 아래로 내려가도록 설정
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    } else {
      // 패칭된 메시지 아이템 개수에 비례하여 내려가도록 설정 (scrollTop = 현재 전체 스크롤 높이 - 이전 전체 스크롤 높이)
      const newHeight = scrollContainer.scrollHeight;
      scrollContainer.scrollTop =
        scrollContainer.scrollTop + (newHeight - previousHeightRef.current);
    }
    previousHeightRef.current = scrollContainer.scrollHeight;
  }, [currentPage, messages]);
  if (isLoading) {
    return <div>메시지 불러오는중...</div>;
  }
  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className='grow pl-[56px] pr-[46px] flex flex-col overflow-y-scroll mr-[10px] hover:mr-0 scrollbar'
    >
      <Messages messages={messages} />
    </div>
  );
};

export default ChatMessages;
