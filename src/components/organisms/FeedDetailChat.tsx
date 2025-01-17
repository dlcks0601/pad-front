import { Comment } from '@/apis/feed';
import useAuthStore from '@/store/authStore';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const FeedDetailChat = () => {
  const userId = useAuthStore((state) => state.userInfo?.userId);
  console.log('userId: ' + userId);
  const comments: Comment[] = [
    {
      commentId: 1,
      userId: 7,
      userName: 'John Doe',
      userRole: 'Admin',
      userProfileUrl:
        'data:image/jpeg;base64,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',
      comment:
        '이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요! 이 토론 정말 흥미롭네요!',
      createdAt: new Date('2025-01-01T10:30:00'),
      likeCount: 5,
      isLiked: true,
    },
    {
      commentId: 2,
      userId: 7,
      userName: 'Jane Smith',
      userRole: 'User',
      userProfileUrl: '/images/user2.jpg',
      comment: '저도 동의합니다. 정말 흥미로운 주제예요!',
      createdAt: new Date('2025-01-01T11:00:00'),
      likeCount: 2,
      isLiked: false,
    },
    {
      commentId: 3,
      userId: 103,
      userName: 'Alice Lee',
      userRole: 'Moderator',
      userProfileUrl: '/images/user3.jpg',
      comment: '더 많은 의견을 들어보고 싶습니다.',
      createdAt: new Date('2025-01-02T11:15:00'),
      likeCount: 3,
      isLiked: false,
    },
  ];
  const groupCommentsByDate = (comments: Comment[]) => {
    const grouped = comments.reduce(
      (acc, comment) => {
        const dateKey = comment.createdAt.toISOString().split('T')[0];
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(comment);
        return acc;
      },
      {} as Record<string, Comment[]>
    );
    return Object.entries(grouped).map(([date, comments]) => ({
      date,
      comments,
    }));
  };
  const groupedComments = groupCommentsByDate(comments);

  return (
    <div className='flex flex-col gap-[20px] mt-3 w-full h-[800px] bg-blue-500'>
      <div className='bg-lightgray w-full h-[530px] rounded-[20px] overflow-y-auto p-4'>
        {groupedComments.map(({ date, comments }) => (
          <div key={date} className='mb-4'>
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
                      'px-2 py-2 rounded-[5px] max-w-96 flex-wrap',
                      userId === chat.userId ? 'bg-[#D1F2EB]' : 'bg-[#EAFBFF]'
                    )}
                  >
                    {chat.comment}
                  </div>
                  {userId === chat.userId && (
                    <div className='flex gap-2 text-gray text-sm mt-1'>
                      <button className='hover:underline'>수정</button>
                      <button className='hover:underline'>삭제</button>
                    </div>
                  )}
                </div>
                <div className='flex flex-col justify-between items-center'>
                  <div className='flex items-center gap-1'>
                    <HandThumbUpIcon
                      className={clsx('w-4 h-4', {
                        'text-red-500': chat.isLiked,
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
    </div>
  );
};

export default FeedDetailChat;
