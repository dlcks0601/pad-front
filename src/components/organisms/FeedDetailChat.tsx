import { Comment } from '@/apis/feed';
import React from 'react';

const FeedDetailChat = () => {
  const comments: Comment[] = [
    {
      commentId: 1,
      userId: 101,
      userName: 'John Doe',
      userRole: 'Admin',
      userProfileUrl: '/images/user1.jpg',
      comment: '이 토론 정말 흥미롭네요!',
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
            <h3 className='text-lg font-bold mb-2 bg-green-500 flex justify-center'>
              {date}
            </h3>
            {comments.map((chat) => (
              <div
                key={chat.commentId}
                className='p-3 bg-white rounded-lg shadow mb-2'
              >
                <div className='flex items-center gap-3 mb-2'>
                  <img
                    src={chat.userProfileUrl}
                    alt={chat.userName}
                    className='w-8 h-8 rounded-full'
                  />
                  <div>
                    <p className='font-bold'>{chat.userName}</p>
                    <p className='text-sm text-gray-500'>{chat.userRole}</p>
                  </div>
                </div>
                <p>{chat.comment}</p>
                <div className='text-sm text-gray-500 mt-2'>
                  <span>Likes: {chat.likeCount}</span>
                  {chat.isLiked && (
                    <span className='ml-2 text-red-500'>♥</span>
                  )}
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
