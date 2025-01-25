import { RoleProps } from '@/components/atoms/Role';
import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleItems } from '@/constants/hub/roleItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import { statusTagItems } from '@/constants/hub/statusTagItems';

export interface HubItem {
  projectId: number;
  content: any;
  status: keyof typeof statusTagItems;
  workType: keyof typeof meetingTagItems;
  title: string;
  role: keyof typeof roleItems;
  startDate: string;
  duration: string;
  thumbnailUrl?: string;
  hubType: keyof typeof hubTagItems;
  detailRoles: (keyof typeof roleTagItems)[];
  bookMarkCount: number;
  applyCount: number;
  viewCount: number;
  user: {
    userId?: number;
    profileUrl: string;
    nickname: string;
    role: string;
    createdAt?: string;
  };
}

// export const hubItem: HubItemType[] = [
//   {
//     title:
//       '실시간 여행 계획 플랫폼 프로젝트 진행합니다! 🔥 프론트엔드 개발자 많은 지원 부탁합니다.',
//     role: 'PROGRAMMER' as const,
//     startDate: '2025-01-06',
//     duration: '6개월',
//     workType: 'ONLINE',
//     hubType: 'PROJECT',
//     status: 'OPEN',
//     detailRoles: ['HW/임베디드', 'SW/솔루션', 'IOS 개발자'],
//     bookMarkCount: 12,
//     applyCount: 5,
//     viewCount: 6,
//     thumbnailUrl: 'src/assets/images/contentimagetest.png',
//     user: {
//       profileUrl: '/src/assets/images/example.svg',
//       nickname: 'leechan',
//       role: 'Programmer',
//       createdAt: '약 4시간 전',
//     },
//   },
// ];
