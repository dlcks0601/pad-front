import Icon from '@/components/atoms/Icon';
import Logo from '@/components/atoms/Logo';
import MobileHamburgarMenu from '@/components/organisms/sides/MobileHamburgarMenu';
import useAuthStore from '@/store/authStore';
import { useEffect, useRef, useState } from 'react';

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div
      className='mobile-nav border-b border-lightgray w-full h-full relative'
      ref={menuRef}
    >
      <div className='w-full h-full flex items-center px-2 justify-between relative'>
        <nav
          aria-label='모바일 메뉴'
          className='flex flex-row items-center mr-1 w-full'
        >
          <a href='/' className='w-[40px] h-[16px]'>
            <Logo width='40px' height='16px' />
          </a>
          <a href='/search' className='w-full h-full ml-3'>
            <div className='w-full h-8 px-3 py-[6px] border rounded-lg border-none bg-[rgb(245, 245, 247)] flex'>
              <div className='w-5 h-5'>
                <Icon type='search' className='text-lightgray' />
              </div>
              <input
                className='w-full bg-transparent text-sm justify-self-center'
                placeholder='검색하기'
              />
            </div>
          </a>
        </nav>
        <nav className='flex w-[102px] h-8 justify-end items-center gap-2'>
          {isLoggedIn && (
            <div className='w-7 h-7'>
              <Icon type='bellSolid' color={'gray'} />
            </div>
          )}
          <div
            className='w-7 h-7 cursor-pointer'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon type={isMenuOpen ? 'xmark' : 'bar3'} />
          </div>
        </nav>
      </div>
      {isMenuOpen && <MobileHamburgarMenu />}
    </div>
  );
};

export default MobileNav;
