import FeedItem from '@/components/molecules/contents/FeedItem';
import {
  FeedFooter,
  HubFooter,
} from '@/components/molecules/contents/ContentsFooter';
import ContentsUser from '@/components/molecules/contents/ContentsUser';
import { HubTagProps } from '@/types/tags/hubTag.type';
import { RoleProps } from '@/components/atoms/Role';
import { RoleTagProps } from '@/types/tags/roleTag.type';
import { ProjectTagProps } from '@/types/tags/projectTag.type';
import HubItem from '@/components/molecules/contents/HubItem';
import { TagItemKey } from '@/constants/tagItem';

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
  projectTags: { label: string; variant: ProjectTagProps['variant'] }[];
  hubTags: { label: string; variant: HubTagProps['variant'] }[];
  roleTags: { label: string; variant: RoleTagProps['variant'] }[];
  role: RoleProps['role'];
  startDate: string;
  duration: string;
  bookmarkCount: number;
  userCount: number;
  viewsCount: number;
  thumbnail?: string;
  user: {
    avatarSrc: string;
    name: string;
    job: string;
    time: string;
    userId: number;
  };
}

export const HubContents = ({
  title,
  projectTags,
  hubTags,
  roleTags,
  role,
  bookmarkCount,
  userCount,
  viewsCount,
  thumbnail,
  user,
  startDate,
  duration,
}: HubContentsProps) => {
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
            <HubItem
              title={title}
              projectTags={projectTags}
              hubTags={hubTags}
              roleTags={roleTags}
              role={role}
              thumbnail={thumbnail}
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
