import ContentsTime from '@/components/atoms/contents/ContentsTime';
import Role from '@/components/atoms/Role';
import {
  meetingTagItemsColors,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import { RoleItemKeys } from '@/constants/hub/roleItems';
import {
  roleTagItems,
  roleTagItemsColors,
  roleTagItemsKey,
} from '@/constants/hub/roleTagsItems';
import {
  statusTagItemsColors,
  statusTagItemskey,
} from '@/constants/hub/statusTagItems';

interface HubBodyProps {
  workType: meetingTagItemskey;
  detailRoles: roleTagItemsKey[];
  status: statusTagItemskey;
  role: RoleItemKeys;
  startDate: string;
  duration: string;
}

const HubBody = ({
  workType,
  detailRoles = [],
  role,
  startDate,
  status,
  duration,
}: HubBodyProps) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex w-full items-center gap-[20px]'>
        <Role role={role} />

        <div className='flex gap-[10px] items-center'>
          {detailRoles
            ?.filter((el) => roleTagItems[el])
            .map((detailRoles) => (
              <span
                key={detailRoles}
                className={`${roleTagItemsColors[detailRoles]} bg-lightgray inline-flex items-center px-3 py-1`}
              >
                {roleTagItems[detailRoles]}
              </span>
            ))}
        </div>
      </div>
      <div>
        <ContentsTime startDate={startDate} duration={duration} />
      </div>

      <div className='flex gap-[10px]'>
        <span
          className={`${meetingTagItemsColors[workType]} inline-flex items-center px-3 py-1 font-medium text-white`}
        >
          {workType}
        </span>
        <span
          className={`${statusTagItemsColors[status]} inline-flex items-center px-3 py-1 font-medium text-white`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default HubBody;
