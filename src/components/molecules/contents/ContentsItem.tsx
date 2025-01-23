import FeedItem from '@/components/molecules/contents/FeedItem';
import {
  FeedFooter,
  HubFooter,
} from '@/components/molecules/contents/ContentsFooter';
import ContentsUser from '@/components/molecules/contents/ContentsUser';
import { HubTagProps } from '@/types/tags/hubTag.type';
import { RoleProps } from '@/components/atoms/Role';
import HubItem from '@/components/molecules/contents/HubItem';
import { TagItemKey } from '@/constants/tagItem';
import { hubTagItemskey } from '@/constants/hub/hubTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

interface FeedContentsProps {
  title: string;
  content: string;
  feedTags: TagItemKey[];
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  thumnailUrl?: string;
  postId: number;
  isLiked: boolean;
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
  commentsCount,
  likesCount,
  viewsCount,
  thumnailUrl,
  user,
  postId,
  isLiked,
}: FeedContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        avatarSrc={user.avatarSrc}
        name={user.name}
        job={user.job}
        time={user.time}
      />

      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <FeedItem
              title={title}
              content={content}
              tags={feedTags}
              thumnailUrl={thumnailUrl}
              postId={postId}
            />
            <FeedFooter
              commentsCount={commentsCount}
              likesCount={likesCount}
              viewsCount={viewsCount}
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
  hubTags: hubTagItemskey;
  meetingTags: meetingTagItemskey;
  roleTags: roleTagItemsKey[];
  statusTags: statusTagItemskey;
  role: RoleProps['role'];
  startDate: string;
  duration: string;
  bookmarkCount: number;
  userCount: number;
  viewsCount: number;
  thumbnailUrl?: string;
  // 유저
  user: {
    userProfileUrl: string;
    userNickname: string;
    userRole: string;
    createdAt: string;
  };
  hideUser: boolean;
}

export const HubContents = ({
  title,
  meetingTags,
  statusTags,
  roleTags,
  hubTags,
  role,
  bookmarkCount,
  userCount,
  viewsCount,
  thumbnailUrl,
  user,
  startDate,
  duration,
  hideUser,
}: HubContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        userProfileUrl={user.userProfileUrl}
        userNickname={user.userNickname}
        userRole={user.userRole}
        createdAt={user.createdAt}
      />
      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <HubItem
              title={title}
              hubTags={hubTags}
              statusTags={statusTags}
              meetingTags={meetingTags}
              roleTags={roleTags}
              role={role}
              thumbnailUrl={thumbnailUrl}
              startDate={startDate}
              duration={duration}
            />

            <HubFooter
              bookmarkCount={bookmarkCount}
              userCount={userCount}
              viewsCount={viewsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
