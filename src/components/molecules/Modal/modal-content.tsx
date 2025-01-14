import { PropsWithChildren } from 'react';

interface ModalContentProps extends PropsWithChildren {
  className?: string;
  px?: string;
  py?: string;
}

const ModalContent = ({
  children,
  className = '',
  px = '50px',
  py = '30px',
}: ModalContentProps) => {
  return (
    <div
      className={`bg-white rounded-[20px] ${className}`}
      style={{
        paddingLeft: px,
        paddingRight: px,
        paddingTop: py,
        paddingBottom: py,
      }}
    >
      {children}
    </div>
  );
};

export default ModalContent;
