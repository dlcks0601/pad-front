import {
  FeedChatResponse,
  FeedRequest,
  FeedResponse,
  FeedsResponse,
  Post,
  deleteFeed,
  deleteFeedChat,
  fetchFeed,
  fetchFeedChats,
  fetchFeeds,
  postFeed,
  postFeedChat,
  putChatLike,
  putFeed,
} from '@/apis/feed';
import queryClient from '@/utils/queryClient';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

// 타입 에러 해결해야함
export const useInfiniteFetchFeeds = (
  latest: boolean,
  tags: string
): UseInfiniteQueryResult<InfiniteData<FeedsResponse>, Error> => {
  return useInfiniteQuery<FeedsResponse>({
    queryKey: ['feeds', latest, tags],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      fetchFeeds({
        cursor: pageParam,
        latest,
        tags,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination || lastPage.pagination.lastCursor === null) {
        return undefined;
      }
      return lastPage.pagination.lastCursor;
    },
    initialPageParam: 0,
  });
};

// 피드 상세 불러오기
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

// 피드 댓글 불러오기
export const useFetchFeedChat = (
  id: number
): UseQueryResult<FeedChatResponse, Error> => {
  return useQuery<FeedChatResponse>({
    queryKey: ['feedChats', id],
    queryFn: () => fetchFeedChats(id),
    retry: 10,
    refetchInterval: 60 * 1000,
  });
};

export const usePostFeed = () => {
  return useMutation({
    mutationFn: async ({ title, tags, content }: FeedRequest) => {
      return await postFeed(title, tags, content);
    },
    onSuccess: () => {
      console.log('피드 작성 성공');
    },
    onError: (error) => {
      console.error('피드 작성 중 오류 발생:', error);
    },
  });
};

// 피드에 댓글 작성
export const usePostFeedChat = () => {
  return useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      return await postFeedChat(id, content);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['feedChats', id] as [string, number],
      });
      console.log('댓글 작성 성공');
    },
    onError: (error) => {
      console.error('댓글 작성 중 오류 발생:', error);
    },
  });
};

export const useDeleteFeedChat = () => {
  return useMutation({
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: Post['postId'];
      commentId: number;
    }) => {
      return await deleteFeedChat(postId, commentId);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ['feedChats', postId] as [string, number],
      });
      console.log('댓글 작성 성공');
    },
    onError: (error) => {
      console.error('댓글 작성 중 오류 발생:', error);
    },
  });
};

export const useDeleteFeed = () => {
  return useMutation({
    mutationFn: async (postId: Post['postId']) => {
      return await deleteFeed(postId);
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({
        queryKey: ['feed'],
      });
      console.log(`피드 ${postId} 삭제 성공`);
    },
    onError: (error) => {
      console.error('피드 삭제 중 오류 발생:', error);
    },
  });
};

export const usePutFeed = () => {
  return useMutation({
    mutationFn: async ({
      id,
      title,
      tags,
      content,
    }: {
      id: Post['postId'];
      title: string;
      tags: string[];
      content: string;
    }) => {
      return await putFeed(id, title, tags, content);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['feed', id],
      });
      console.log(`피드 ${id} 수정 성공`);
    },
    onError: (error) => {
      console.error('피드 수정 중 오류 발생:', error);
    },
  });
};

export const usePutChat = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await putChatLike(id);
    },
    onSuccess: () => {
      console.log('댓글에 대한 좋아요 변경 성공');
    },
    onError: (error) => {
      console.error('댓글 좋아요 처리중 오류 발생:', error);
    },
  });
};
