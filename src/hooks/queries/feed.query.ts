import {
  FeedChatResponse,
  FeedResponse,
  fetchFeed,
  fetchFeedChat,
} from '@/apis/feed';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useFetchFeed = (
  id: number
): UseQueryResult<FeedResponse, Error> => {
  return useQuery<FeedResponse>({
    queryKey: ['feed', id],
    queryFn: () => fetchFeed(id),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useFetchFeedChat = (
  id: number
): UseQueryResult<FeedChatResponse, Error> => {
  return useQuery<FeedChatResponse>({
    queryKey: ['feedChat', id],
    queryFn: () => fetchFeedChat(id),
    retry: 10,
    refetchInterval: 60 * 1000,
  });
};
