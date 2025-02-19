import { SearchState } from '@/store/searchStore';
import { SearchChannelMessagesResponse } from '@/types/message.type';
import { FetcherMessage } from '@/utils/fetcher';
import { useEffect, useState } from 'react';

export const useSearchUpDown = (
  data:
    | (SearchChannelMessagesResponse & {
        message: FetcherMessage;
      })
    | undefined,
  searchDirection: SearchState['searchDirection']
) => {
  const [isFirstMessage, setIsFirstMessage] = useState(false);
  const [isLastMessage, setIsLastMessage] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.message.code === 404) {
      alert(data.message.text);
      switch (searchDirection) {
        case 'backward':
          setIsFirstMessage(true);
          break;
        case 'forward':
          setIsLastMessage(true);
          break;
      }
    } else {
      setIsFirstMessage(false);
      setIsLastMessage(false);
    }
  }, [data]);

  return { isFirstMessage, isLastMessage };
};
