import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import useAuthStore from '@/store/authStore';

const MobileHamburgarMenu = () => {
  const { userInfo, isLoggedIn } = useAuthStore();

  return (
    <div className='absolute mt-1 px-1 w-full h-36'>
      <nav className='w-full h-fit border rounded-md bg-white px-1 py-1'>
        <div className='w-full px-2 py-[6px] flex items-center gap-2'>
          <div className='w-5 h-5'>
            <Icon type='homeSolid' color={'gray'} />
          </div>
          <div className='text-sm'>피드</div>
        </div>
        <div className='w-full px-2 py-[6px] flex items-center gap-2'>
          <div className='w-5 h-5'>
            <Icon type='mail' />
          </div>
          <div className='text-sm'>메세지</div>
        </div>
        <div className='w-full px-2 py-[6px] flex items-center gap-2'>
          <div className='w-5 h-5'>
            <Icon type='star' />
          </div>
          <div className='text-sm'>커넥션 허브</div>
        </div>
        <div className='w-full px-2 py-[6px] flex items-center gap-2'>
          {isLoggedIn ? (
            <>
              <Avatar
                size='xxxs'
                alt='User Avatar'
                className='cursor-pointer border-4 border-transparent hover:border-[#c7c7c7] transition-shadow duration-300'
                src={userInfo?.profileUrl || undefined}
              />
              <div className='text-md'>마이 페이지</div>{' '}
            </>
          ) : (
            <a
              className='border rounded-sm border-black px-2 py-1 w-full text-center font-semibold'
              href='/login'
            >
              로그인/회원가입
            </a>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileHamburgarMenu;
