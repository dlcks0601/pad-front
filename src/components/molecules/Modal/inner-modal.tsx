import { PropsWithChildren } from 'react';

interface InnerModalProps extends PropsWithChildren {
  className?: string;
  px?: string;
  py?: string;
}

const InnerModal = ({
  children,
  className = '',
  px = '50px',
  py = '30px',
}: InnerModalProps) => {
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

export default InnerModal;
