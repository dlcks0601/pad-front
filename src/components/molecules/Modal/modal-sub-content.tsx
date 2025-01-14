import { PropsWithChildren } from 'react';

interface ModalSubContentProps extends PropsWithChildren {
  className?: string;
  px?: string;
  py?: string;
}

const ModalSubContent = ({
  children,
  className = '',
}: ModalSubContentProps) => {
  return (
    <div
      className={`rounded-[20px] w-[758px] h-fit flex flex-col gap-[20px] px-[20px] bg-blue-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default ModalSubContent;
