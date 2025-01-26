import FeedItem from '@/components/molecules/contents/FeedItem';
import {
  FeedFooter,
  HubFooter,
} from '@/components/molecules/contents/ContentsFooter';
import ContentsUser from '@/components/molecules/contents/ContentsUser';
import HubItem from '@/components/molecules/contents/HubItem';
import { TagItemKey } from '@/constants/tagItem';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';
import { roleItemsKey } from '@/constants/hub/roleItems';

interface FeedContentsProps {
  title: string;
  content: string;
  feedTags: TagItemKey[];
  commentCount: number;
  likeCount: number;
  viewCount: number;
  thumbnailUrl?: string;
  postId: number;
  isLiked: boolean;
  createdAt: string;
  user: {
    avatarSrc: string;
    name: string;
    job: string;
    time: string;
  };
}

export const FeedContents = ({
  title,
  content,
  feedTags,
  commentCount,
  likeCount,
  viewCount,
  thumbnailUrl,
  user,
  postId,
  isLiked,
  createdAt,
}: FeedContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        profileUrl={user.avatarSrc}
        nickname={user.name}
        role={user.job}
        createdAt={createdAt}
      />

      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <FeedItem
              title={title}
              content={content}
              tags={feedTags}
              thumbnailUrl={thumbnailUrl}
              postId={postId}
            />
            <FeedFooter
              commentsCount={commentCount}
              likesCount={likeCount}
              viewsCount={viewCount}
              isLiked={isLiked}
              postId={postId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 허브 컨텐츠
interface HubContentsProps {
  title: string;
  hubType: HubTagItemsKey;
  workType: meetingTagItemskey;
  detailRoles: roleTagItemsKey[];
  status: statusTagItemskey;
  role: roleItemsKey;
  startDate: string;
  duration: string;
  bookMarkCount: number;
  applyCount: number;
  viewCount: number;
  thumbnailUrl?: string;
  createdAt: string;
  // 유저
  user: {
    userId?: number;
    profileUrl: string;
    nickname: string;
    role: string;
  };
  hideUser?: boolean;
}

export const HubContents = ({
  title,
  workType,
  status,
  detailRoles,
  hubType,
  role,
  bookMarkCount,
  applyCount,
  viewCount,
  thumbnailUrl,
  user,
  startDate,
  duration,
  hideUser,
  createdAt,
}: HubContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      {!hideUser && (
        <ContentsUser
          profileUrl={user!.profileUrl}
          nickname={user!.nickname}
          role={user!.role}
          createdAt={createdAt}
        />
      )}
      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <HubItem
              title={title}
              hubType={hubType!}
              status={status!}
              workType={workType!}
              detailRoles={detailRoles!}
              role={role}
              thumbnailUrl={thumbnailUrl}
              startDate={startDate}
              duration={duration}
            />

            <HubFooter
              bookMarkCount={bookMarkCount}
              applyCount={applyCount}
              viewCount={viewCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
