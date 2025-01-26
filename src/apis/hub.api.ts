import { API_PATH } from '@/apis/api-path';
import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleItems } from '@/constants/hub/roleItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import { skillTagItems } from '@/constants/hub/skillTagItems';
import {
  statusTagItems,
  statusTagItemskey,
} from '@/constants/hub/statusTagItems';
import fetcher from '@/utils/fetcher';
import { promises } from 'dns';

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
    lastCursor: number;
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
  skip: number;
  limit: number;
  role?: keyof typeof roleItems;
  unit?: keyof typeof roleTagItems;
  sort: string;
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

// 허브 메인
export const fetchHubs = async ({
  cursor,
  skip,
  limit,
  role,
  unit,
  sort,
}: HubsRequest): Promise<HubsResponse> => {
  const apiPath = API_PATH.projects;

  const params: Record<string, unknown> = {
    cursor,
    skip,
    limit,
    role,
    unit,
    sort,
  };

  const response = await fetcher<HubsResponse>({
    url: apiPath,
    method: 'GET',
    params,
  });
  return response.data;
};

// 허브 디테일
export const fetchHub = async (projectId: number): Promise<HubResponse> => {
  const apiPath = API_PATH.project.replace(':projectId', projectId.toString());
  const response = await fetcher<HubResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

// 허브 사이드바
export const fetchBestHubs = async (): Promise<HubWeeklyResponse> => {
  const apiPath = API_PATH.hubWeeklyBest;
  const response = await fetcher<HubWeeklyResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export const postHub = async (
  title: string,
  content: string,
  role: keyof typeof roleItems,
  hub_type: keyof typeof hubTagItems,
  start_date: string,
  duration: string,
  work_type: keyof typeof meetingTagItems,
  recruiting: boolean,
  skills: (keyof typeof skillTagItems)[],
  detail_roles: (keyof typeof roleTagItems)[]
) => {
  console.log('허브 작성 요청됨');
  const apiPath = API_PATH.project;

  const response = await fetcher({
    url: apiPath,
    method: 'POST',
    data: {
      title,
      content,
      role,
      hub_type,
      start_date,
      duration,
      work_type,
      skills,
      detail_roles,
      recruiting,
    } as HubPost,
  });
  return response.data;
};

// 북마크 추가 및 삭제
export const togledBookmark = async (
  projectId: number
): Promise<BookmarkResponse> => {
  const apiPath = API_PATH.hubBookmark.replace(
    ':projectId',
    projectId.toString()
  );
  const response = await fetcher<BookmarkResponse>({
    url: apiPath,
    method: 'POST',
  });
  return response.data;
};

// 북마크 상태 확인
export const fetchBookmarkStatus = async (
  projectId: number
): Promise<BookmarkResponse> => {
  const apiPath = API_PATH.hubBookmark.replace(
    ':projectId',
    projectId.toString()
  );
  const response = await fetcher<BookmarkResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};
