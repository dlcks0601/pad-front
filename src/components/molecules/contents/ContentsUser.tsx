import Avatar from '@/components/atoms/Avatar';
import ContentsUserTitle from '@/components/atoms/contents/ConentsUserTitle';

interface ContentsUserProps {
  profileUrl: string;
  createdAt: string;
  nickname: string;
  role?: string;
}

const ContentsUser = ({
  createdAt,
  nickname,
  role,
  profileUrl,
}: ContentsUserProps) => {
  return (
    <div className='flex items-start space-x-3'>
      <Avatar src={profileUrl} size='xs' alt={`${nickname} Avatar`} />
      <ContentsUserTitle
        nickname={nickname}
        role={role}
        createdAt={createdAt}
      />
    </div>
  );
};

export default ContentsUser;
