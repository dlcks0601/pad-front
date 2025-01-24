import { useState } from 'react';
import Icon from '@/components/atoms/Icon';
import { usePatchFeedLike } from '@/hooks/queries/feed.query';
import useAuthStore from '@/store/authStore';

interface FeedFooterProps {
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  isLiked: boolean;
  postId: number;
}

export const FeedFooter = ({
  commentsCount,
  likesCount: initialLikesCount,
  viewsCount,
  isLiked: initialIsLiked,
  postId,
}: FeedFooterProps) => {
  const { isLoggedIn, userInfo } = useAuthStore((state) => state);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: toggleLike } = usePatchFeedLike();

  const handleLikeClick = () => {
    if (!isLoggedIn || !userInfo.userId) {
      console.log('로그인이 필요합니다.');
      return;
    }

    if (isLoading) return; // 요청 중일 때 클릭 방지

    // 로컬 상태 즉시 반영
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLoading(true);

    // 서버 요청
    toggleLike(
      { id: postId },
      {
        onSuccess: () => {
          console.log('좋아요 상태 변경 성공');
          setIsLoading(false); // 요청 완료 후 버튼 활성화
        },
        onError: () => {
          console.error('좋아요 상태 변경 실패');
          // 실패 시 상태 복구
          setIsLiked((prev) => !prev);
          setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className='flex justify-center items-center gap-[107px]'>
      <div className='flex items-center space-x-1'>
        <Icon type='comment' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{commentsCount}</span>
      </div>

      <div
        className={`flex items-center space-x-1 ${
          isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={handleLikeClick}
      >
        <Icon
          type={isLiked ? 'likeSolid' : 'like'}
          color={isLiked ? 'red' : 'gray'}
          className='w-[24px] h-[24px]'
        />
        <span className='text-[#838383]'>{likesCount}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Icon type='eye' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{viewsCount}</span>
      </div>
    </div>
  );
};
