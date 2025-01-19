import Date from '@/components/atoms/Date';
import WelcomeMessage from '@/components/molecules/chat/WelcomeMessage';
import Message from '@/components/organisms/chat/Message';
import useAuthStore from '@/store/authStore';
import { ChatState, useChatStore } from '@/store/chatStore';
import { formatDateMessages } from '@/utils/format';
import { Fragment } from 'react/jsx-runtime';

interface MessagesProps {
  currentChannelId: NonNullable<ChatState['currentChannelId']>;
}

const Messages = ({ currentChannelId }: MessagesProps) => {
  const messages = useChatStore((state) => state.messages[currentChannelId]);
  const dateMessages = Object.entries(formatDateMessages(messages));
  // 유저 정보 관련 로직
  const user = useAuthStore.getState().userInfo!;
  const myUserId = user.userId;

  return dateMessages?.length ? (
    dateMessages.map(([date, messages]) => {
      return (
        <Fragment key={date}>
          <Date className='text-gray text-caption2 text-center mt-[20px]'>
            {date}
          </Date>
          {messages.map((message, i) => {
            const isMyMessage = message.user.userId === myUserId;
            const sameBefore =
              i > 0 && message.user.userId === messages[i - 1].user.userId;
            return (
              <Message
                key={message.messageId}
                message={message}
                sameBefore={sameBefore}
                isMyMessage={isMyMessage}
              />
            );
          })}
        </Fragment>
      );
    })
  ) : (
    <WelcomeMessage />
  );
};

export default Messages;
