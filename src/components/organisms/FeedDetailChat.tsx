import { useState, useRef } from 'react';
import clsx from 'clsx';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import feedDetailComments from '@/mocks/mock-data/feedDetailComments.mock';
import useAuthStore from '@/store/authStore';
import groupCommentsByDate from '@/utils/groupCommentsByDate';
import Icon from '@/components/atoms/Icon';

const FeedDetailChat = () => {
  const userId = useAuthStore((state) => state.userInfo?.userId);
  const userImage = useAuthStore((state) => state.userInfo?.profileUrl);
  const groupedComments = groupCommentsByDate(feedDetailComments);
  const [hovered, setHovered] = useState(false);

  return (
    <div className='mt-3 w-full h-[800px] flex flex-col gap-[20px] px-[30px]'>
      <div
        className={clsx(
          'bg-lightgray w-full h-full rounded-[20px] overflow-y-scroll scroll-pr-5px overscroll-contain p-4'
        )}
        style={
          hovered
            ? {
                paddingBottom: '20px',
                boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'lightgray',
              }
            : {}
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {groupedComments.map(({ date, comments }) => (
          <div key={date} className='mb-4 flex flex-col gap-[20px]'>
            <h3 className='text-caption1 text-gray font-bold mb-2 flex justify-center'>
              {date}
            </h3>
            {comments.map((chat) => (
              <div
                key={chat.commentId}
                className={clsx('flex gap-2', {
                  'flex-row-reverse': userId === chat.userId,
                })}
              >
                <img
                  src={chat.userProfileUrl}
                  alt={chat.userName}
                  className='w-[40px] h-[40px] rounded-full'
                />
                <div
                  className={clsx('flex flex-col', {
                    'items-end': userId === chat.userId,
                  })}
                >
                  <div className='flex gap-[10px] items-center'>
                    <p className='text-body font-semibold'>{chat.userName}</p>
                    <p className='text-caption2 text-gray'>{chat.userRole}</p>
                  </div>
                  <div
                    className={clsx(
                      'px-2 py-2 rounded-[5px] max-w-96 flex-wrap bg-[#EAFBFF]'
                    )}
                  >
                    {chat.comment}
                  </div>
                </div>
                <div className='flex flex-col-reverse justify-between items-center'>
                  <div className='flex items-center gap-1'>
                    {userId === chat.userId && (
                      <div className='flex gap-2 text-gray bg-white h-[16px] px-1 rounded-[5px]'>
                        <button className='hover:underline text-caption2'>
                          수정
                        </button>
                        <button className='hover:underline text-caption2'>
                          삭제
                        </button>
                      </div>
                    )}
                    <HandThumbUpIcon
                      className={clsx('w-4 h-4 cursor-pointer', {
                        'text-red-400': chat.isLiked,
                        'text-gray': !chat.isLiked,
                      })}
                    />
                    <div className='text-xs text-gray'>{chat.likeCount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='w-full h-[40px] flex gap-[10px] mb-3'>
        <img
          src={userImage}
          alt='/src/assets/logos/PAD.svg'
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
