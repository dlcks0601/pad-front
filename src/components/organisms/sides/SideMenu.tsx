import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';
import Logo from '@/components/atoms/Logo';
import Menu from '@/components/molecules/Menu';
import Avatar from '@/components/atoms/Avatar';
import Icon from '@/components/atoms/Icon';
import SearchModal from '@/components/organisms/modals/SearchModal';
import { useModal } from '@/hooks/useModal';
import useAuthStore from '@/store/authStore';
import { useLogout } from '@/hooks/queries/auth.query';

interface MessageProp {
  type: 'follow' | 'application' | 'applicationStatus' | 'like' | 'comment';
  message: string;
  senderNickname: string;
  senderProfileUrl: string;
  timestamp: string;
}

const SideMenu = () => {
  const navigate = useNavigate();
  const token = useAuthStore.getState().accessToken;
  const { logout, isLoggedIn, userInfo } = useAuthStore((state) => state);
  const { mutate } = useLogout();

  // 모달 관련 상태
  const {
    isOpen: isSearchModalOpen,
    openModal: openSearchModal,
    closeModal: closeSearchModal,
  } = useModal();

  // UI 상태
  const [showLogin, setShowLogin] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [newNotification, setNewNotification] = useState(false); // 🔔 새 알림 감지

  // 알림 상태
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const loginRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // SSE 연결 및 알림 수신
  // SSE 연결 및 알림 수신
  useEffect(() => {
    if (!token) return;

    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_BASE_SERVER_URL}/notifications/stream`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    eventSource.addEventListener('open', () => {
      console.log('✅ SSE 연결 성공');
    });

    eventSource.addEventListener('message', (event) => {
      console.log('message 이벤트 호출');
      const data: MessageProp = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewNotification(true); // 🔔 새로운 알림 감지
    });

    eventSource.addEventListener('error', () => {
      console.log('🔴 SSE 연결 실패. 10초 후 재시도...');
      eventSource.close();
      setTimeout(() => {
        window.location.reload(); // SSE 재연결
      }, 20000);
    });

    return () => {
      console.log('🔴 SSE 연결 종료');
      eventSource.close();
    };
  }, [token]);
  // token 변경 시만 재연결

  // 로그인 창 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setShowLogin(false);
      }
    };

    if (showLogin) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogin]);

  // 알림 창 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotificationBox(false);
      }
    };

    if (showNotificationBox) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationBox]);

  const handleNotificationClick = () => {
    setShowNotificationBox((prev) => !prev);
    setNewNotification(false); // 📩 알림 확인 후 뱃지 제거
  };

  const menuItems: {
    type: 'search' | 'bell' | 'mail' | 'home' | 'star';
    label: string;
    onClick?: () => void;
    hasNotification?: boolean;
  }[] = [
    {
      type: 'bell',
      label: '알림',
      onClick: handleNotificationClick,
      hasNotification: newNotification, // 🔔 알림 여부 추가
    },
    {
      type: 'mail',
      label: '메세지',
      onClick: () => navigate('/chat'),
    },
    {
      type: 'home',
      label: '피드',
      onClick: () => navigate('/'),
    },
    {
      type: 'search',
      label: '검색',
      onClick: openSearchModal,
    },
    {
      type: 'star',
      label: '커넥션 허브',
      onClick: () => navigate('/connectionhub'),
    },
  ];

  return (
    <>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}

      <div className='flex flex-col justify-between items-center h-full py-[20px]'>
        <div className='mb-8 cursor-pointer' onClick={() => navigate('/')}>
          <Logo />
        </div>

        <Menu items={menuItems} />

        {/* 알림 박스 */}
        {showNotificationBox && (
          <div
            ref={notificationRef}
            className='absolute left-[90px] top-[50px] w-[370px] h-[700px] bg-white bg-opacity-95 rounded-xl drop-shadow-lg px-[20px] py-[20px] overflow-y-auto z-50'
          >
            <div className='flex w-full flex-col items-center gap-[10px]'>
              <div className='text-[18px] font-semibold text-[#48484a]'>
                알림 📫
              </div>
              {messages.length === 0 ? (
                <div className='text-[16px] text-[#828282]'>
                  현재 새로운 알림이 없습니다.
                </div>
              ) : (
                <div className='flex w-full flex-col gap-[20px]'>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className='flex w-full justify-start text-[14px] items-center gap-[10px]'
                    >
                      <Avatar src={message.senderProfileUrl} size={'xs'} />
                      <div>
                        <strong>{message.senderNickname}</strong>:{' '}
                        {message.message}
                      </div>
                      <small className='text-gray-500'>
                        {new Date(message.timestamp).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 프로필 아바타 */}
        <div className='relative' ref={loginRef}>
          <Avatar
            size='sm'
            alt='User Avatar'
            className='cursor-pointer border-4 border-transparent hover:border-[#c7c7c7] transition-shadow duration-300'
            onClick={() => setShowLogin((prev) => !prev)}
          />

          {showLogin && (
            <div className='absolute top-[-30%] w-max left-full transform -translate-y-1/2 z-50'>
              <div className='flex ml-4 w-full bg-white rounded-xl items-center px-[10px] py-[10px] drop-shadow-lg'>
                <div className='flex w-full flex-col gap-[10px]'>
                  <button
                    onClick={() =>
                      navigate(
                        isLoggedIn ? `/@${userInfo?.nickname}` : '/login'
                      )
                    }
                    className='group flex w-full rounded-lg px-1 py-2 items-center gap-[20px] hover:bg-[#f3f4f6]'
                  >
                    <Icon
                      type='user'
                      color='gray'
                      className='w-[30px] h-[30px]'
                    />
                    <div className='text-[18px] text-[#48484a]'>
                      {isLoggedIn ? '마이페이지' : '로그인'}
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      isLoggedIn
                        ? mutate(undefined, { onSuccess: logout })
                        : navigate('/signup')
                    }
                    className='group flex w-full rounded-lg px-1 py-1.5 items-center gap-[20px] hover:bg-[#f3f4f6]'
                  >
                    <Icon
                      type={isLoggedIn ? 'logout' : 'join'}
                      color='gray'
                      className='w-[30px] h-[30px]'
                    />
                    <div className='text-[18px] text-[#48484a]'>
                      {isLoggedIn ? '로그아웃' : '회원가입'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
