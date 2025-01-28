import {
  deleteHub,
  fetchBookmarkStatus,
  fetchHub,
  fetchHubs,
  HubRequest,
  HubResponse,
  HubsResponse,
  postHub,
  togledBookmark,
} from '@/apis/hub.api';
import { roleItems, roleItemsKey } from '@/constants/hub/roleItems';
import { roleTagItems, roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import queryClient from '@/utils/queryClient';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export const useInfiniteFetchHubs = (
  sort: boolean,
  role: string,
  unit: string
): UseInfiniteQueryResult<InfiniteData<HubsResponse>, Error> => {
  return useInfiniteQuery<
    HubsResponse,
    Error,
    InfiniteData<HubsResponse>,
    [string, boolean, string, string]
  >({
    queryKey: ['projects', sort, unit, role],
    queryFn: ({ pageParam }) =>
      fetchHubs({
        cursor: pageParam as number,
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

export const usePostHub = (): UseMutationResult<
  unknown,
  Error,
  HubRequest,
  unknown
> => {
  return useMutation({
    mutationFn: async ({
      title,
      content,
      role,
      hub_type,
      start_date,
      duration,
      work_type,
      recruiting,
      skills,
      detail_roles,
    }: HubRequest) => {
      return postHub({
        title,
        content,
        role,
        hub_type,
        start_date,
        duration,
        work_type,
        recruiting,
        skills,
        detail_roles,
      });
    },
    onSuccess: () => {
      console.log('허브 작성 성공');
    },
    onError: (error) => {
      console.error('허브 작성 중 오류 발생:', error);
    },
  });
};
