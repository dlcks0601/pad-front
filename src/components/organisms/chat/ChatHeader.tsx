import Title from '@/components/atoms/Title';
import ChatHeaderInfo from '@/components/molecules/chat/ChatHeaderInfo';
import SearchMessage from '@/components/organisms/chat/SearchMessage';
import { ChatState } from '@/store/chatStore';

interface ChatHeaderProps {
  currentChannelId: ChatState['currentChannelId'];
}

const ChatHeader = ({ currentChannelId }: ChatHeaderProps) => {
  return (
    <div className='flex justify-between items-center min-h-[76px] pl-[40px] pr-[20px] border-b-[2px] border-solid border-b-[#CCCCCC] mb-[20px]'>
      <div className='flex flex-col h-full'>
        {currentChannelId ? (
          <ChatHeaderInfo currentChannelId={currentChannelId} />
        ) : (
          <>
            <Title size='md' fontWeight='bold' lineClamp={1}>
              환영합니다! 🎉
            </Title>
            <div className='text-caption1 text-[#838383]'>
              채팅방을 선택해주세요
            </div>
          </>
        )}
      </div>
      {currentChannelId && (
        <SearchMessage currentChannelId={currentChannelId} />
      )}
    </div>
  );
};

export default ChatHeader;
