import ReactDOM from 'react-dom';
import { useEffect, PropsWithChildren } from 'react';

interface ModalProps {
  width?: string;
  height?: string;
  onClose: () => void;
  className?: string;
}

const ModalRoot = ({
  width = '818px',
  height = '500px',
  onClose,
  children,
  className = '',
}: PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className='w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 z-50 flex justify-center items-center cursor-pointer'
      onClick={onClose}
    >
      <div
        className='absolute top-50% left-50% -translate-x-50% -translate-y-50% cursor-default z-50 bg-background flex flex-col gap-[20px] px-[30px]'
        onClick={(e) => e.stopPropagation()}
        style={{ width, height }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalRoot;
