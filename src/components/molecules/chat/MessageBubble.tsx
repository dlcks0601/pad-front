import HighlightedText from '@/components/atoms/HighlightedText';
import { useSearchStore } from '@/store/searchStore';
import { ReceiveMessage } from '@/types/message.type';
import { cn } from '@/utils/cn';
import { useEffect, useRef } from 'react';

interface MessageBubbleProps {
  content: ReceiveMessage['content'];
  className?: string;
  messageId: number;
  isMyMessage: boolean;
}

const MessageBubble = ({
  content,
  className,
  messageId,
  isMyMessage,
}: MessageBubbleProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  const searchCursor = useSearchStore((state) => state.searchCursors?.search);
  const isSearchMessage = searchCursor === messageId;

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [searchCursor]);

  return (
    <div
      ref={searchCursor === messageId ? messageRef : undefined}
      className={cn(
        'px-[10px] py-[7px] text-caption1 w-fit rounded-[5px]',
        isMyMessage ? 'bg-[#EAFBFF]' : 'bg-[#ffdfe7]',
        className
      )}
    >
      {isSearchMessage ? <HighlightedText content={content} /> : content}
    </div>
  );
};

export default MessageBubble;
