import { API_PATH } from '@/apis/api-path';
import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleItems } from '@/constants/hub/roleItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import { skillTagItems } from '@/constants/hub/skillTagItems';
import { statusTagItems } from '@/constants/hub/statusTagItems';
import fetcher from '@/utils/fetcher';

export interface HubsResponse {
  message: {
    code: number;
    text: string;
  };
  projects: {
    projectId: number;
    title: string;
    content: string;
    thumbnailUrl?: string;
    role: keyof typeof roleItems;
    skills: (keyof typeof skillTagItems)[];
    detailRoles: (keyof typeof roleTagItems)[];
    hubType: keyof typeof hubTagItems;
    startDate: string;
    duration: string;
    workType: keyof typeof meetingTagItems;
    applyCount: number;
    bookMarkCount: number;
    viewCount: number;
    status: keyof typeof statusTagItems;
    createdAt: string;
    user: {
      userId: number;
      nickname: string;
      name: string;
      profileUrl: string;
      role: string;
    };
  }[];
  pagination: {
    lastCursor?: number;
  };
}

export interface HubResponse {
  message: {
    code: number;
    text: string;
  };
  project: {
    projectId: number;
    title: string;
    content: string;
    role: keyof typeof roleItems;
    skills: (keyof typeof skillTagItems)[];
    detailRoles: (keyof typeof roleTagItems)[];
    hubType: keyof typeof hubTagItems;
    startDate: string;
    duration: string;
    workType: keyof typeof meetingTagItems;
    applyCount?: number;
    bookMarkCount?: number;
    viewCount: number;
    status: keyof typeof statusTagItems;
    createdAt: string;
    manager: {
      userId: number;
      nickname: string;
      name: string;
      profileUrl: string;
      introduce: string;
    };
  };
  isOwnConnectionHub: boolean;
}

export interface HubDeleteResponse {
  message: {
    code: number;
    text: string;
  };
}

export interface HubWeeklyResponse {
  message: {
    code: number;
    text: string;
  };
  popularProjects: {
    projectId: number;
    title: string;
    user: {
      userId: number;
      name: string;
      nickname: string;
      profileUrl: string;
      role: keyof typeof roleItems;
    };
    hubType: keyof typeof hubTagItems;
  }[];
}

export interface HubsRequest {
  cursor: number;
  role?: string;
  unit?: string;
  sort: boolean;
}

export interface HubPost {
  title: string;
  content: string;
  role: keyof typeof roleItems;
  hub_type: keyof typeof hubTagItems;
  start_date: string;
  duration: string;
  work_type: keyof typeof meetingTagItems;
  recruiting: boolean;
  skills: (keyof typeof skillTagItems)[];
  detail_roles: (keyof typeof roleTagItems)[];
}

export interface BookmarkResponse {
  message: {
    code: number;
    text: string;
  };
  bookmarked: boolean;
}

export interface HubRequest {
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
}

export const fetchHubs = async () => {
  try {
    const apiPath = API_PATH.connectionhub;
    const response = await fetcher<HubsResponse>({
      url: apiPath,
      method: 'GET',
    });
    console.log('허브 페이지 데이터 조회 성공');
    return response.data;
  } catch (error) {
    console.error('허브 페이지 데이터 조회 실패', error);
    throw error;
  }
};

export const fetchHub = async () => {
  try {
    const apiPath = API_PATH.connectionhubdetail;
    const response = await fetcher<HubResponse>({
      url: apiPath,
      method: 'GET',
    });
    console.log('허브 디테일 페이지 데이터 조회 성공');
    return response.data;
  } catch (error) {
    console.log('허브 디테일 페이지 데이터 조회 실패', error);
    throw error;
  }
};
