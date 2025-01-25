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
    user: {
      userId: number;
      nickname: string;
      name: string;
      profileUrl: string;
      role: string;
    };
  }[];
  page: number;
  limit: number;
}

export const fetchHubs = async ({
  skip,
  limit,
  role,
  unit,
  sort,
}: {
  skip: number;
  limit: number;
  role: string;
  unit: string;
  sort: string;
}): Promise<HubsResponse> => {
  const apiPath = API_PATH.projects;

  const params: Record<string, unknown> = {
    skip,
    limit,
  };

  if (role !== 'null') {
    params.role = role;
  }
  if (unit !== 'null') {
    params.unit = unit;
  }
  if (sort !== 'null') {
    params.sort = sort;
  }

  const response = await fetcher<HubsResponse>({
    url: apiPath,
    method: 'GET',
    params,
  });
  return response.data;
};

export const fetchHub = async (projectId: number): Promise<HubsResponse> => {
  const apiPath = API_PATH.project.replace(':projectId', projectId.toString());
  const response = await fetcher<HubsResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};
