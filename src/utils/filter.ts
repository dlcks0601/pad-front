import { ChatState } from '@/store/chatStore';
import { ReceiveMessage } from '@/types/message.type';

export const filterChannels = (
  keyword: string,
  channels: ChatState['channels']
) => {
  return Object.fromEntries(
    Object.entries(channels).filter(([_, channel]) =>
      channel.title.includes(keyword.trim())
    )
  );
};

export const searchMessage = (messages: ReceiveMessage[], keyword: string) => {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].content.includes(keyword.trim())) {
      const messageElem = document.querySelector(
        `#message-${messages[i].messageId}`
      );
      if (messageElem) {
        messageElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return i;
    }
  }
  return -1; // 못 찾았을 경우
};
