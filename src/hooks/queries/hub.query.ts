// import { fetchHubs, HubsResponse } from '@/apis/hub.api';

import { fetchHub, fetchHubs, HubsResponse } from '@/apis/hub.api';
import { roleItems } from '@/constants/hub/roleItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
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
        skip: pageParam as number,
        limit,
        role,
        unit,
        sort,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.page || lastPage.page.lastCursor === null) {
        return undefined;
      }
      return lastPage.page.lastCursor;
    },
    initialPageParam: 0,
  });
};

// // 피드 상세 불러오기
export const useFetchHub = (
  projectId: number
): UseQueryResult<HubsResponse, Error> => {
  return useQuery<HubsResponse>({
    queryKey: ['project'],
    queryFn: () => fetchHub(projectId),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
