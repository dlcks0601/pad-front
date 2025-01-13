import { ReactNode } from 'react';

interface ModalTitleProps {
  children: ReactNode;
}

const ModalTitle = ({ children }: ModalTitleProps) => {
  return <h1 className='text-[22px] font-medium mb-3'>{children}</h1>;
};

export default ModalTitle;
