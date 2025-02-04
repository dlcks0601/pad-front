import { useSearchStore } from '@/store/searchStore';
import { ReceiveMessage } from '@/types/message.type';

interface HighlightedTextProps {
  content: ReceiveMessage['content'];
}

const HighlightedText = ({ content }: HighlightedTextProps) => {
  const keyword = useSearchStore((state) => state.searchKeyword);
  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = content.split(regex);

  return (
    <>
      {parts.map((part) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={part} style={{ backgroundColor: 'yellow' }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export default HighlightedText;
