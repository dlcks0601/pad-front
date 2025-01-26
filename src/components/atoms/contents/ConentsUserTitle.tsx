interface ContentsUserTitleProps {
  nickname: string;
  role?: string;
  createdAt: string;
}

const ContentsUserTitle = ({
  nickname,
  role,
  createdAt,
}: ContentsUserTitleProps) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='font-bold text-gray-900 text-sm'>{nickname}</span>
      <div className='flex items-center gap-[2px]'>
        <span className='text-gray-500 text-sm'>{role}</span>
        <span className='w-[4px] h-[4px] bg-gray-500 rounded-full'></span>
        <span className='text-gray-400 text-sm'>{createdAt}</span>
      </div>
    </div>
  );
};

export default ContentsUserTitle;
