import { useMyPageStore } from '@/store/mypageStore';
import { ShortProjects } from '@/types/mypage.type';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { PenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import androidIcon from '@/assets/icons/android.svg';
import appleIcon from '@/assets/icons/apple.svg';

const MyPageProjectCard = ({
  onClickUpdate,
  ...work
}: ShortProjects & { onClickUpdate: () => void }) => {
  const { isMyPage } = useMyPageStore(useShallow((state) => state));

  const { title, description, links, projectProfileUrl } = work;
  const linkTypes = links?.map((el) => el.type);

  return (
    <div className='rounded-[10px] w-full h-[131px] bg-white p-3 flex items-center gap-[18px] relative'>
      {isMyPage && (
        <button
          className='absolute right-0 top-3 px-3 pointer-default z-10'
          onClick={onClickUpdate}
        >
          <PenIcon width={14} />
        </button>
      )}
      <Link
        to={links.filter((el) => el.type === 'Github')[0]?.url}
        className='flex items-center gap-[18px] relative'
      >
        {projectProfileUrl ? (
          <div className='w-[101px] h-[114px] rounded-[10px] overflow-hidden'>
            <img
              src={projectProfileUrl as string}
              alt='project cover image'
              className='w-full h-full object-cover'
            />
          </div>
        ) : (
          <div />
        )}

        <div className='flex flex-col h-[104px] relative'>
          <span className='font-semibold text-[20px]'>{title}</span>
          <span className='text-[13px] font-regular text-gray line-clamp-2 min-h-9'>
            {description}
          </span>
          <div className='mt-3 flex gap-1'>
            {linkTypes.includes('Web') && <GlobeAltIcon width={18} />}
            {linkTypes.includes('IOS') && (
              <img src={appleIcon} width={20} className='pb-[2px]' />
            )}
            {linkTypes.includes('Android') && (
              <img src={androidIcon} width={18} />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MyPageProjectCard;
