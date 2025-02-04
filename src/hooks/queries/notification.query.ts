import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import queryClient from '@/utils/queryClient';
import {
  fetchMissedNotifications,
  patchNotificationsAsRead,
  MissedNotificationsResponse,
} from '@/apis/notification.api';
import useAuthStore from '@/store/authStore';
import { querySuccessHandler } from '@/utils/querySuccessHandler';

export const useFetchMissedNotifications = (): UseQueryResult<
  MissedNotificationsResponse,
  Error
> => {
  const token = useAuthStore.getState().accessToken;
  return useQuery<MissedNotificationsResponse>({
    queryKey: ['missedNotifications'],
    queryFn: fetchMissedNotifications,
    enabled: !!token,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
  });
};

// 특정 알림 읽음 처리
export const usePatchNotificationAsRead = (): UseMutationResult<
  unknown,
  Error,
  { notificationId: string },
  unknown
> => {
  return useMutation({
    mutationFn: async ({ notificationId }: { notificationId: string }) => {
      return patchNotificationsAsRead(notificationId);
    },
    onSuccess: () => querySuccessHandler('missedNotifications'),
    onError: (error) => {
      console.error('알림 읽음 처리 중 오류 발생:', error);
    },
  });
};

// 모든 알림 읽음 처리
export const usePatchAllNotificationsAsRead = (): UseMutationResult<
  unknown,
  Error,
  void,
  unknown
> => {
  return useMutation({
    mutationFn: async () => {
      const missedNotifications =
        queryClient.getQueryData<MissedNotificationsResponse>([
          'missedNotifications',
        ]);
      if (!missedNotifications) return;

      await Promise.all(
        missedNotifications.notifications.map((notification) =>
          patchNotificationsAsRead(String(notification.notificationId))
        )
      );
    },
    onSuccess: () => querySuccessHandler('missedNotifications'),
    onError: (error) => {
      console.error('모든 알림 읽음 처리 중 오류 발생:', error);
    },
  });
};
