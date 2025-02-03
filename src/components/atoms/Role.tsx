import { roleItems, RoleItemKeys } from '@/constants/hub/roleItems';

export interface RoleProps {
  role: RoleItemKeys;
}

const Role = ({ role }: RoleProps) => {
  return (
    <div className='flex text-[14px] font-extrabold'>{roleItems[role]}</div>
  );
};

export default Role;
