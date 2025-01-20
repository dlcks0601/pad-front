import { API_PATH } from '@/apis/api-path';
import { channels } from '@/mocks/mock-data/channel.mock';
import { ReceiveMessage } from '@/types/message.type';
import { baseURL } from '@/utils/baseUrl';
import { http, HttpResponse } from 'msw';

export const chatHandlers = [
  http.get<{ id: string }>(baseURL(API_PATH.channel), ({ params }) => {
    const channel = channels.find((ch) => ch.channelId === +params.id);
    return HttpResponse.json({ channel });
  }),
  http.get<{ id: string }>(
    baseURL(API_PATH.channelMessages),
    ({ params, request }) => {
      const url = new URL(request.url);
      const limit = Number(url.searchParams.get('limit'));
      const cursor = Number(url.searchParams.get('cursor'));
      const keyword = url.searchParams.get('keyword') ?? '';
      const direction = url.searchParams.get('direction') as
        | 'forward'
        | 'backward';
      if (Number.isNaN(limit) || Number.isNaN(cursor)) {
        return HttpResponse.json(
          { error: 'limit, cursor required' },
          { status: 400 }
        );
      }
      // 채널 찾기
      const channel = channels.find((ch) => ch.channelId === +params.id);
      if (!channel) {
        return HttpResponse.json(
          { error: '일치하는 채널이 없습니다.' },
          { status: 404 }
        );
      }

      let messages: ReceiveMessage[];

      // 키워드가 있을 경우
      if (keyword) {
        const index = findIndex(cursor, channel.messages, direction, keyword);
        if (index === -1) {
          return HttpResponse.json(
            { error: 'keyword를 찾을 수 없습니다.' },
            { status: 404 }
          );
        }
        return HttpResponse.json({
          messages: channel.messages.slice(index - 15, index + 15),
          cursor: index,
        });
      }

      switch (direction) {
        case 'forward':
          messages = channel.messages.slice(cursor, cursor + limit);
          return HttpResponse.json({
            messages,
            cursor: messages.length === limit ? cursor + limit : null,
          });
        case 'backward':
          messages = channel.messages.slice(cursor - limit, cursor);
          return HttpResponse.json({
            messages,
            cursor: messages.length === limit ? cursor - limit - 1 : null,
          });
      }
    }
  ),
];

function findIndex(
  start: number,
  arr: ReceiveMessage[],
  direction: 'forward' | 'backward',
  keyword: string
) {
  switch (direction) {
    case 'forward':
      for (let i = start; i < arr.length; i++) {
        if (arr[i].content.includes(keyword)) return i;
      }
      return -1;
    case 'backward':
      for (let i = start; i >= 0; i--) {
        if (arr[i].content.includes(keyword)) return i;
      }
      return -1;
  }
}
