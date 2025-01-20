import { useState } from 'react';
import clsx from 'clsx';
import useAuthStore from '@/store/authStore';
import groupCommentsByDate from '@/utils/groupCommentsByDate';
import Icon from '@/components/atoms/Icon';
import ChatItem from '@/components/molecules/ChatItem';
import { Comment } from '@/apis/feed';
import { usePostFeedChat } from '@/hooks/queries/feed.query';

interface FeedDetailChatProps {
  comments: Comment[];
  feedId: number;
}

const FeedDetailChat = ({ comments, feedId }: FeedDetailChatProps) => {
  const userId = useAuthStore((state) => state.userInfo?.userId);
  const userImage = useAuthStore((state) => state.userInfo?.profileUrl);
  const groupedComments = groupCommentsByDate(comments);
  const [hovered, setHovered] = useState(false);
  const [comment, setComment] = useState<string>('');
  const { mutate: postComment, isPending } = usePostFeedChat();

  const submitComment = () => {
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    postComment(
      { id: feedId, content: comment },
      {
        onSuccess: () => {
          setComment('');
        },
        onError: (error) => {
          console.error('댓글 작성 실패:', error);
          alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  return (
    <div className='mt-3 w-full h-fit flex flex-col gap-[20px] px-[30px]'>
      {groupedComments && groupedComments.length > 0 ? (
        <div
          className={clsx(
            'relative bg-lightgray w-full h-[600px] rounded-[20px] overflow-hidden p-4'
          )}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={
            hovered
              ? {
                  paddingBottom: '20px',
                  boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.2)',
                  backgroundColor: 'lightgray',
                }
              : {}
          }
        >
          <div
            className={clsx(
              'w-full h-full overflow-y-auto p-2',
              '[&::-webkit-scrollbar]:w-[10px]',
              '[&::-webkit-scrollbar-thumb]:bg-gray-400',
              '[&::-webkit-scrollbar-thumb]:rounded-full',
              '[&::-webkit-scrollbar-track]:bg-gray-200',
              'scroll-pr-4'
            )}
          >
            {groupedComments.map(({ date, comments }) => (
              <div key={date} className='mb-4 flex flex-col gap-[20px]'>
                <h3 className='text-caption1 text-gray font-bold mb-2 flex justify-center'>
                  {date}
                </h3>
                {comments.map((chat) => (
                  <ChatItem
                    key={chat.commentId}
                    chat={chat}
                    isCurrentUser={userId === chat.userId}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='w-full h-[30px]' />
      )}
      <div className='w-full h-[40px] flex gap-[10px] mb-[40px]'>
        <img
          src={userImage}
          alt='User Avatar'
          className='w-[40px] h-[40px] rounded-full'
        />
        <div className='w-full bg-lightgray px-[20px] py-2 rounded-full flex items-center'>
          <input
            className='w-full bg-lightgray focus:outline-none'
            placeholder='내용을 입력해주세요.'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isPending}
          />
          <div
            className='absolute left-[730px] bg-white w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer'
            onClick={submitComment}
          >
            <Icon type='arrowLongUp' className='w-[20px] h-[20px]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetailChat;
