import Avatar from '@/components/atoms/Avatar';
import HubDetailUser from '@/components/atoms/contents/HubDetailUser';
import ContentsHubUser from '@/components/molecules/contents/ContentsHubUser';
import DetailContents from '@/components/molecules/contents/DetailContents';
import HubDetailTitle from '@/components/molecules/contents/HubDetailTitle';
import HubInfo from '@/components/molecules/contents/HubInfo';
import HubInfoTag from '@/components/molecules/contents/HubInfoTag';
import HubIntroduce from '@/components/molecules/contents/HubIntroduce';
import HubSkill from '@/components/molecules/contents/HubSkill';
import HubTitle from '@/components/molecules/contents/HubTitle';
import HubDetailFooter from '@/components/molecules/HubDetailFooter';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleItemsKey } from '@/constants/hub/roleItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { skillTagItemsKey } from '@/constants/hub/skillTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

interface HubDetailProps {
  title: string;
  hubType: HubTagItemsKey;
  workType: meetingTagItemskey;
  status: statusTagItemskey;
  detailRoles: roleTagItemsKey[];
  skills: skillTagItemsKey[];
  role: roleItemsKey;
  startDate: string;
  duration: string;
  content: string;
  createdAt: string;
  projectId: number;
  bookmarkCount: number;
  applyCount: number;
  viewCount: number;
  manager: {
    userId?: number;
    profileUrl: string;
    nickname: string;
    introduce: string;
    role?: string;
  };
  isOwnConnectionHub: boolean;
}

const HubDetail = ({
  title,
  hubType,
  workType,
  status,
  skills,
  role,
  detailRoles,
  startDate,
  content,
  duration,
  manager,
  createdAt,
  isOwnConnectionHub,
  projectId,
  bookmarkCount,
  applyCount,
  viewCount,
}: HubDetailProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsHubUser
        profileUrl={manager.profileUrl}
        nickname={manager.nickname}
        role={manager.role}
        createdAt={createdAt}
        userId={manager.userId}
        projectId={projectId}
      />

      <div className='flex flex-col w-full bg-white rounded-[20px] p-[20px]'>
        <div className='flex flex-col gap-[20px]'>
          <HubTitle hubType={hubType} title={title} />
          <HubInfoTag workType={workType} status={status} role={role} />
          <HubInfo
            startDate={startDate}
            duration={duration}
            workType={workType}
            role={role}
            detailRoles={detailRoles}
          />
          <HubSkill skills={skills} />

          <div className='flex'>
            <HubDetailTitle title='허브 소개' />
          </div>
          <div>
            <DetailContents content={content} />
          </div>

          {!isOwnConnectionHub && (
            <>
              <div className='flex'>
                <HubDetailTitle title='허브 매니저 소개' />
              </div>
              <div className='flex border rounded-[10px]'>
                <div className='flex w-full mx-[20px] my-[30px]'>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center gap-[20px]'>
                      <Avatar src={manager.profileUrl || undefined} size='sm' />
                      <div className='flex'>
                        <HubDetailUser
                          nickname={manager.nickname}
                          introduce={manager.introduce}
                        />
                      </div>
                    </div>
                    <div className='flex'>
                      <HubIntroduce />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <HubDetailFooter
        bookmarkCount={bookmarkCount}
        applyCount={applyCount}
        viewCount={viewCount}
        projectId={projectId}
      />
    </div>
  );
};

export default HubDetail;
