import HighlightedText from '@/components/atoms/HighlightedText';
import { useSearchStore } from '@/store/searchStore';
import { ReceiveMessage } from '@/types/message.type';
import { cn } from '@/utils/cn';
import { useRef } from 'react';

interface MessageBubbleProps {
  content: ReceiveMessage['content'];
  className?: string;
  messageId: number;
}

const MessageBubble = ({
  content,
  className,
  messageId,
}: MessageBubbleProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  const searchCursor = useSearchStore((state) => state.searchCursors?.search);
  const isSearchMessage = searchCursor === messageId;

  return (
    <div
      ref={messageRef}
      className={cn(
        'bg-[#EAFBFF] px-[10px] py-[7px] text-caption1 w-fit rounded-[5px]',
        className
      )}
    >
      {isSearchMessage ? <HighlightedText content={content} /> : content}
    </div>
  );
};

export default MessageBubble;
