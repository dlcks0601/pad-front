import {
  deleteHub,
  fetchApplicants,
  fetchApplicantsStatus,
  fetchApply,
  fetchApplyStatus,
  fetchBookmarkStatus,
  fetchCancelApply,
  fetchHub,
  fetchHubs,
  fetchStatus,
  HubRequest,
  HubResponse,
  HubsResponse,
  postHub,
  putHub,
  togledBookmark,
  uploadHubImage,
} from '@/apis/hub.api';

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
    staleTime: 0,
    gcTime: 0,
    initialPageParam: 0,
  });
};

export const useFetchHub = (
  projectId: number
): UseQueryResult<HubResponse, Error> => {
  return useQuery<HubResponse>({
    queryKey: ['project', projectId],
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
        queryKey: ['project', projectId],
      });
    },
    onError: (error) => {
      console.error('허브 삭제 중 오류 발생', error);
    },
  });
};

export const useTogledHubBookmark = () => {
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: number }) => {
      return togledBookmark(projectId);
    },
    onError: (error) => {
      console.error('허브 북마크 처리중 오류 발생:', error);
    },
  });
};

export const useChangeHubStatus = () => {
  return useMutation({
    mutationFn: async ({
      projectId,
      recruiting,
    }: {
      projectId: number;
      recruiting: boolean;
    }) => {
      return fetchStatus(projectId, recruiting);
    },
    onError: (error) => {
      console.error('허브 상태 변경 중 오류 발생:', error);
    },
  });
};

export const useApplyHub = () => {
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: number }) => {
      return fetchApply(projectId);
    },
    onError: (error) => {
      console.error('허브 지원 실패', error);
    },
  });
};

export const useApplyCancel = () => {
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: number }) => {
      return fetchCancelApply(projectId);
    },
    onError: (error) => {
      console.error('허브 지원 취소 실패', error);
    },
  });
};

export const useFetchApplicants = (projectId: number) => {
  return useQuery({
    queryKey: ['applyList', projectId],
    queryFn: () => fetchApplicants(projectId),
    retry: 10,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useApplicantsStatus = () => {
  return useMutation({
    mutationFn: async ({
      projectId,
      userId,
      status,
    }: {
      projectId: number;
      userId: number;
      status: string;
    }) => {
      return fetchApplicantsStatus(projectId, userId, status);
    },
    onError: (error) => {
      console.error('지원 상태 변경 실패', error);
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

export const useFetchApplyStatus = (projectId: number) => {
  return useQuery({
    queryKey: ['applyStatus', projectId],
    queryFn: () => fetchApplyStatus(projectId),
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
    onError: (error) => {
      console.error('허브 작성 중 오류 발생:', error);
    },
  });
};

export const usePutHub = () => {
  return useMutation({
    mutationFn: async ({
      projectId,
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
    }: {
      projectId: number;
      title: string;
      content: string;
      role: string;
      hub_type: string;
      start_date: string;
      duration: string;
      work_type: string;
      recruiting: boolean;
      skills: string[];
      detail_roles: string[];
    }) => {
      return putHub(
        projectId,
        title,
        content,
        role,
        hub_type,
        start_date,
        duration,
        work_type,
        recruiting,
        skills,
        detail_roles
      );
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ['project', projectId],
      });
    },
    onError: (error) => {
      console.error('허브 수정 중 오류 발생:', error);
    },
  });
};

interface UsePostImageParams {
  file: File;
}

interface UsePostImageResponse {
  imageUrl: string;
}

export const useHubPostImage = (): UseMutationResult<
  UsePostImageResponse,
  Error,
  UsePostImageParams
> => {
  return useMutation({
    mutationFn: async ({ file }: UsePostImageParams) => {
      console.log('🖼️ 원본 이미지 크기:', file.size / 760, 'KB');
      const optimizedFile = await optimizeImage(file);
      console.log('🖼️ 최적화된 이미지 크기:', optimizedFile.size / 760, 'KB');

      return uploadHubImage(optimizedFile);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });
};

const optimizeImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas context를 가져올 수 없음');

        const MAX_WIDTH = 760;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject('Blob 변환 실패');

            const optimizedFile = new File([blob], 'optimized.webp', {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            resolve(optimizedFile);
          },
          'image/webp',
          0.8
        );
      };
    };

    reader.onerror = (error) => reject(error);
  });
};
