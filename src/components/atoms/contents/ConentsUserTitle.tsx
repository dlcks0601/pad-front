interface ContentsUserTitleProps {
  nickname: string;
  role?: string;
  createdAt: string;
}

const calculateTimeAgo = (createdAt: string): string => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};

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
