import Avatar from '@/components/atoms/Avatar';
import HubDetailUser from '@/components/atoms/contents/HubDetailUser';
import ContentsUser from '@/components/molecules/contents/ContentsUser';
import DetailContents from '@/components/molecules/contents/DetailContents';
import HubDetailTitle from '@/components/molecules/contents/HubDetailTitle';
import HubInfo from '@/components/molecules/contents/HubInfo';
import HubInfoTag from '@/components/molecules/contents/HubInfoTag';
import HubIntroduce from '@/components/molecules/contents/HubIntroduce';
import HubSkill from '@/components/molecules/contents/HubSkill';
import HubTitle from '@/components/molecules/contents/HubTitle';
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
  user: {
    userId?: number;
    profileUrl: string;
    nickname: string;
    role: string;
    createdAt?: string;
    introduce?: string;
  };
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
  user,
}: HubDetailProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        profileUrl={user.profileUrl}
        nickname={user.nickname}
        role={user.role}
        createdAt={user.createdAt}
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
          <div className='flex'>
            <HubDetailTitle title='허브 매니저 소개' />
          </div>
          <div className='flex border rounded-[10px]'>
            <div className='flex  w-full mx-[20px] my-[30px]'>
              <div className='flex w-full  items-center  justify-between'>
                <div className='flex items-center gap-[20px]'>
                  <Avatar src={user.profileUrl} size='sm' />
                  <div className='flex'>
                    <HubDetailUser
                      nickname={user.nickname}
                      introduce={user.introduce}
                    />
                  </div>
                </div>
                <div className='flex'>
                  <HubIntroduce />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubDetail;
