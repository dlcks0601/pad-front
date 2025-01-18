import { API_PATH } from '@/apis/api-path';
import { tagItem } from '@/constants/tagItem';
import fetcher from '@/utils/fetcher';

export interface Post {
  userId: number;
  userName: string;
  userNickname: string;
  userRole: string;
  userProfileUrl: string;
  postId: number;
  thumbnailUrl: string;
  content: string;
  title: string;
  tags: (keyof typeof tagItem)[];
  commentCount: number;
  likeCount: number;
  viewCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Comment {
  commentId: number;
  userId: number;
  userName: string;
  userRole: string;
  userProfileUrl: string;
  comment: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

export interface FeedsResponse {
  posts: Post[];
}

export interface FeedResponse {
  post: Post;
}

export interface FeedChatResponse {
  comments: Comment[];
}

export const fetchFeeds = async () => {
  const apiPath = API_PATH.feed;
  const response = await fetcher<FeedsResponse>({
    url: apiPath,
    method: 'GET',
  });
  console.log('피드 메인페이지 데이터 조회');
  return response.data;
};

export const fetchFeed = async (id: number) => {
  const apiPath = API_PATH.feedDetail.replace(':id', id.toString());
  const response = await fetcher<FeedResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};

export const fetchFeedChat = async (id: number) => {
  console.log('fetchFeedChat요청됨');
  const apiPath = API_PATH.feedChat.replace(':id', id.toString());
  const response = await fetcher<FeedChatResponse>({
    url: apiPath,
    method: 'GET',
  });
  return response.data;
};
