import ReactDOM from 'react-dom';
import { useEffect, PropsWithChildren } from 'react';

interface ModalProps {
  width?: string;
  height?: string;
  hasCloseButton?: boolean;
  onClose: () => void;
  className?: string;
  portalTarget?: HTMLElement;
}

const ModalRoot = ({
  width = '818px',
  height = '500px',
  hasCloseButton = true,
  onClose,
  children,
  className = '',
  portalTarget = document.body,
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
        className='absolute top-50% left-50% -translate-x-50% -translate-y-50% cursor-default z-50'
        onClick={(e) => e.stopPropagation()}
        style={{ width, height }}
      >
        {children}
      </div>
    </div>,
    portalTarget
  );
};

export default ModalRoot;
