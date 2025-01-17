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
    </div>
  );
};

export default FeedDetailPage;
