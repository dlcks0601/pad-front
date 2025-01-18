import { useState } from 'react';
import clsx from 'clsx';
import useAuthStore from '@/store/authStore';
import groupCommentsByDate from '@/utils/groupCommentsByDate';
import Icon from '@/components/atoms/Icon';
import ChatItem from '@/components/molecules/ChatItem';
import { Comment } from '@/apis/feed';

interface FeedDetailChatProps {
  comments: Comment[];
}

const FeedDetailChat = ({ comments }: FeedDetailChatProps) => {
  const userId = useAuthStore((state) => state.userInfo?.userId);
  const userImage = useAuthStore((state) => state.userInfo?.profileUrl);
  const groupedComments = groupCommentsByDate(comments);
  const [hovered, setHovered] = useState(false);

  return (
    <div className='mt-3 w-full h-[800px] flex flex-col gap-[20px] px-[30px]'>
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

      {/* Input Section */}
      <div className='w-full h-[40px] flex gap-[10px] mb-3'>
        <img
          src={userImage}
          alt='User Avatar'
          className='w-[40px] h-[40px] rounded-full'
        />
        <div className='w-full bg-lightgray px-[20px] py-2 rounded-full flex items-center'>
          <input
            className='w-full bg-lightgray focus:outline-none'
            placeholder='내용을 입력해주세요.'
          />
          <div className='absolute left-[730px] bg-white w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer'>
            <Icon type='arrowLongUp' className='w-[20px] h-[20px]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetailChat;
