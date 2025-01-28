import { API_PATH } from '@/apis/api-path';
import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleItems, roleItemsValue } from '@/constants/hub/roleItems';
import { roleTagItems, roleTagItemsValue } from '@/constants/hub/roleTagsItems';
import { skillTagItems } from '@/constants/hub/skillTagItems';
import { statusTagItems } from '@/constants/hub/statusTagItems';
import fetcher from '@/utils/fetcher';
import { title } from 'process';

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

export const fetchHubs = async ({
  cursor,
  role,
  unit,
  sort,
}: {
  cursor: number;
  role?: string | null;
  unit?: string | null;
  sort: boolean;
}) => {
  const apiPath = API_PATH.projects;
  const params: Record<string, unknown> = {
    cursor,
    sort,
  };

  // role이 유효한 경우에만 추가
  if (role && role !== 'null') {
    params.role = role;
  }

  // unit이 유효한 경우에만 추가
  if (unit && unit !== 'null') {
    params.unit = unit;
  }

  console.log('API 요청 URL:', apiPath);
  console.log('API 요청 params:', params);

  const response = await fetcher<HubsResponse>({
    url: apiPath,
    method: 'GET',
    params,
  });

  console.log('fetchHubs 응답 데이터:', response.data);
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

// 허브 상세 삭제
export const deleteHub = async (
  projectId: number
): Promise<HubDeleteResponse> => {
  const apiPath = API_PATH.project.replace(':projectId', projectId.toString());
  const response = await fetcher<HubDeleteResponse>({
    url: apiPath,
    method: 'DELETE',
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

export const postHub = async ({
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
      recruiting,
      skills,
      detail_roles,
    } as HubRequest,
  });
  return response.data;
};
