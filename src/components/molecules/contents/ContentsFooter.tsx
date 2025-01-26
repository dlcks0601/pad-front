import Icon from '@/components/atoms/Icon';

interface HubFooterProps {
  bookMarkCount: number;
  applyCount: number;
  viewCount: number;
}

export const HubFooter = ({
  bookMarkCount,
  applyCount,
  viewCount,
}: HubFooterProps) => {
  return (
    <div className='flex justify-center items-center gap-[107px]'>
      <div className='flex items-center space-x-1'>
        <Icon type='bookmark' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{bookMarkCount}</span>
      </div>
      <div className='flex items-center space-x-1'>
        <Icon type='user' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{applyCount}</span>
      </div>
      <div className='flex items-center space-x-1'>
        <Icon type='eye' color='gray' className='w-[24px] h-[24px]' />
        <span className='text-[#838383]'>{viewCount}</span>
      </div>
    </div>
  );
};
