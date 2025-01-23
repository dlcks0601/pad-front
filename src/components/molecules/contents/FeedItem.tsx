import ContentsThumbnail from '@/components/atoms/contents/ContentsThumbnail';
import FeedBody from '@/components/molecules/contents/FeedBody';
import { TagItemKey } from '@/constants/tagItem';
import { useNavigate } from 'react-router-dom';

interface FeedItemProps {
  title: string;
  content: string;
  tags: TagItemKey[];
  thumbnail?: string;
  postId: number;
}

const FeedItem = ({
  title,
  content,
  tags,
  thumbnail,
  postId,
}: FeedItemProps) => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/feed/${postId}`);
  };
  return (
    <div
      className='flex w-full justify-between items-center gap-10'
      onClick={navigateToDetail}
    >
      <FeedBody title={title} content={content} tags={tags} />
      {thumbnail && (
        <div className='w-[180px] flex-shrink-0'>
          <ContentsThumbnail src={thumbnail} />
        </div>
      )}
    </div>
  );
};

export default FeedItem;
