import Icon from '@/components/atoms/Icon';
import { usePatchFeedLike } from '@/hooks/queries/feed.query';
import useAuthStore from '@/store/authStore';
import { Post } from '@/types/feed.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

interface FeedDetailFooterProps
  extends Pick<
    Post,
    'commentCount' | 'likeCount' | 'viewCount' | 'isLiked' | 'postId'
  > {}

const FeedDetailFooter = ({
  commentCount,
  likeCount: initialLikesCount,
  viewCount,
  isLiked: initialIsLiked,
  postId,
}: FeedDetailFooterProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuthStore(
    useShallow((state) => ({
      isLoggedIn: state.isLoggedIn,
      userInfo: state.userInfo,
    }))
  );
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: toggleLike } = usePatchFeedLike();

  const handleLikeClick = () => {
    if (!isLoggedIn || !userInfo.userId) {
      const answer = window.confirm(
        '로그인이 필요합니다. 로그인을 하시겠습니까?'
      );
      if (answer) {
        navigate('/login');
        return;
      }
      return;
    }
    if (isLoading) return;
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLoading(true);
    toggleLike(
      { id: postId },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: () => {
          console.error('좋아요 상태 변경 실패');
          setIsLiked((prev) => !prev);
          setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
          setIsLoading(false);
        },
      }
    );
  };
  return (
    <div className='fixed bottom-[10px] bg-[#4B4B4B] ml-[20px] w-[760px] h-[40px] rounded-[10px] py-[10px] px-[200px] flex text-white text-heading2'>
      <div className='flex w-full justify-between'>
        <div className='flex'>
          <Icon
            type='chatBubbleOvalLeftEllipsis'
            className='w-[24px] h-[24px] text-white'
          />
          &nbsp;
          {commentCount}
        </div>
        <div
          className={`flex cursor-pointer ${
            isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleLikeClick}
        >
          <Icon
            type={isLiked ? 'likeSolid' : 'like'}
            color={isLiked ? 'red' : 'black'}
            className='w-[24px] h-[24px] text-white'
          />
          &nbsp;
          {likesCount}
        </div>
        <div className='flex'>
          <Icon type='eye' className='w-[24px] h-[24px] text-white' />
          &nbsp;
          {viewCount}
        </div>
      </div>
    </div>
  );
};

export default FeedDetailFooter;
