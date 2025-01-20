import { API_PATH } from '@/apis/api-path';
import { Channel } from '@/types/channel.type';
import { ReceiveMessage } from '@/types/message.type';
import fetcher from '@/utils/fetcher';

export const fetchChannel = async (channelId: Channel['channelId']) => {
  const apiPath = API_PATH.channel.replace(':id', channelId.toString());
  const response = await fetcher<{ channel: Channel }>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export interface FetchChannelMessagesRequest {
  channelId: Channel['channelId'];
  limit: number;
  cursor: number;
  keyword: string;
  direction: 'forward' | 'backward';
}

export interface FetchChannelMessagesResponse {
  messages: ReceiveMessage[];
  cursor: number;
}

export const fetchChannelMessages = async ({
  channelId,
  cursor,
  limit = 30,
  keyword = '',
  direction = 'forward',
}: FetchChannelMessagesRequest) => {
  const apiPath = API_PATH.channelMessages.replace(':id', channelId.toString());
  const response = await fetcher<FetchChannelMessagesResponse>({
    url: apiPath,
    method: 'GET',
    params: {
      keyword,
      cursor,
      limit,
      direction,
    },
  });
  return response.data;
};
