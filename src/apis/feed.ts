import { API_PATH } from '@/apis/api-path';
import { tagItem } from '@/constants/tagItem';
import fetcher from '@/utils/fetcher';

export interface Post {
  userId: number;
  userName: string;
  userRole: string;
  userProfileUrl: string;
  postId: number;
  title: string;
  content: string;
  tags: (keyof typeof tagItem)[];
  createdAt: Date;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  isLiked: number;
}

interface FeedResponse {
  post: Post;
}

export const fetchFeed = async (id: number) => {
  const apiPath = API_PATH.feedDetail.replace(':id', id.toString());
  const response = await fetcher<FeedResponse>({
    url: apiPath,
    method: 'GET',
  });
  console.log('fetchfeed response: ' + response.data);
  return response.data;
};
