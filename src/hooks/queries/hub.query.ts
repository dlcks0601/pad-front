// import { fetchHubs, HubsResponse } from '@/apis/hub.api';

import {
  deleteHub,
  fetchBookmarkStatus,
  fetchHub,
  fetchHubs,
  HubResponse,
  HubsResponse,
  togledBookmark,
} from '@/apis/hub.api';
import { roleItems } from '@/constants/hub/roleItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import queryClient from '@/utils/queryClient';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export const useInfiniteFetchHubs = (
  skip: number,
  limit: number,
  role: keyof typeof roleItems,
  unit: keyof typeof roleTagItems,
  sort: string
): UseInfiniteQueryResult<InfiniteData<HubsResponse>, Error> => {
  return useInfiniteQuery<
    HubsResponse,
    Error,
    InfiniteData<HubsResponse>,
    [string, string, string]
  >({
    queryKey: ['projects', sort, role],
    queryFn: ({ pageParam }) =>
      fetchHubs({
        cursor: pageParam as number,
        skip,
        limit,
        role,
        unit,
        sort,
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

export const useFetchHub = (
  projectId: number
): UseQueryResult<HubResponse, Error> => {
  return useQuery<HubResponse>({
    queryKey: ['project'],
    queryFn: () => fetchHub(projectId),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useDeleteHub = () => {
  return useMutation({
    mutationFn: async (projectId: number) => {
      return deleteHub(projectId);
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ['project'],
      });
      console.log(`허브 ${projectId} 삭제 성공`);
    },
    onError: (error) => {
      console.error('허브 삭제 중 오류 발생', error);
    },
  });
};

// 허브 북마크
export const useTogledHubBookmark = () => {
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: number }) => {
      return togledBookmark(projectId);
    },
    onSuccess: () => {
      console.log('허브 북마크 변경 성공');
    },
    onError: (error) => {
      console.error('허브 북마크 처리중 오류 발생:', error);
    },
  });
};

export const useFetchBookmarkStatus = (projectId: number) => {
  return useQuery({
    queryKey: ['bookmarkStatus', projectId],
    queryFn: () => fetchBookmarkStatus(projectId),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
