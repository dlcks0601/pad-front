import Messages from '@/components/organisms/chat/Messages';
import { ChatState } from '@/store/chatStore';

interface ChatMessagesProps {
  currentChannelId: ChatState['currentChannelId'];
}

const ChatMessages = ({ currentChannelId }: ChatMessagesProps) => {
  return currentChannelId ? (
    <Messages currentChannelId={currentChannelId} />
  ) : (
    <div className='grow px-[56px]'>채널을 선택해주세요</div>
  );
};

export default ChatMessages;
