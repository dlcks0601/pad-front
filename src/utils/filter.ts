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

export const searchMessage = (
  messages: ReceiveMessage[],
  keyword: string,
  start: number
) => {
  const lowerKeyword = keyword.toLowerCase().trim();
  console.log({ start, keyword });
  for (let i = start; i < messages.length; i++) {
    if (messages[i].content.toLowerCase().includes(lowerKeyword)) {
      const messageElem = document.querySelector(
        `#message-${messages[i].messageId}`
      );
      if (messageElem) {
        messageElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return i + 1;
    }
  }
  return -1; // 못 찾았을 경우
};
