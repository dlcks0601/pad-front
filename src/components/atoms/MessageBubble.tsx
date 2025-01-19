import { useKeywordStore } from '@/store/keywordStore';
import { cn } from '@/utils/cn';

interface MessageBubbleProps {
  content: string;
  className?: string;
}

const MessageBubble = ({ content, className }: MessageBubbleProps) => {
  const keyword = useKeywordStore((state) => state.keyword);

  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = content.split(regex);
  return (
    <div
      className={cn(
        'bg-[#EAFBFF] px-[10px] py-[7px] text-caption1 w-fit rounded-[5px]',
        className
      )}
    >
      {keyword.trim()
        ? parts.map((part, i) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
              <mark key={i} style={{ backgroundColor: 'yellow' }}>
                {part}
              </mark>
            ) : (
              part
            )
          )
        : content}
    </div>
  );
};

export default MessageBubble;
