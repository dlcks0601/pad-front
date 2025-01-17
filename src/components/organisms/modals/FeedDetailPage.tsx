import Icon from '@/components/atoms/Icon';
import FeedDetailUserInfo from '@/components/molecules/FeedDetailUserInfo';
import FeedDetail from '@/components/molecules/contents/FeedDetail';
import FeedDetailChat from '@/components/organisms/FeedDetailChat';
import feedDetailMock from '@/mocks/mock-data/feedDetail.mock';
import useAuthStore from '@/store/authStore';

const FeedDetailPage = () => {
  const mockData = feedDetailMock;
  const userId = useAuthStore((state) => state.userInfo?.userId);

  return (
    <div className='flex flex-col gap-3'>
      <FeedDetailUserInfo
        userNickname={mockData.userName}
        userProfileUrl={mockData.userProfileUrl}
        userRole={mockData.userRole}
        title={mockData.title}
        createdAt={mockData.createdAt}
        userId={mockData.userId}
        isWriter={userId === mockData.userId}
      />
      <div
        className='relative bg-white w-full flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:hidden py-[10px]'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <FeedDetail
          tags={mockData.tags}
          date={mockData.createdAt}
          title={mockData.title}
          content={mockData.content}
        />
        <FeedDetailChat />
      </div>
      <div className='fixed bottom-[10px] bg-[#4B4B4B] w-[55%] h-[40px] rounded-[10px] py-[10px] px-[200px] flex justify-between text-white text-heading2'>
        <div className='flex'>
          <Icon
            type='chatBubbleOvalLeftEllipsis'
            className='w-[24px] h-[24px] text-white'
          />
          &nbsp;
          {mockData.commentCount}
        </div>
        <div className='flex'>
          <Icon type='like' className='w-[24px] h-[24px] text-white' />
          &nbsp;
          {mockData.likeCount}
        </div>
        <div className='flex'>
          <Icon type='eye' className='w-[24px] h-[24px] text-white' />
          &nbsp;
          {mockData.viewCount}
        </div>
      </div>
    </div>
  );
};

export default FeedDetailPage;
