import ChatMessages from '@/components/organisms/chat/ChatMessages';
import { ChatState } from '@/store/chatStore';
interface ChatBodyProps {
  currentChannelId: ChatState['currentChannelId'];
}

const ChatBody = ({ currentChannelId }: ChatBodyProps) => {
  return currentChannelId ? (
    <ChatMessages currentChannelId={currentChannelId} />
  ) : (
    <div className='grow' />
  );
};

export default ChatBody;
