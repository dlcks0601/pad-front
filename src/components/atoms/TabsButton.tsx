import { ReactNode } from 'react';

interface IProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

const TabsButton = ({ isActive, onClick, children }: IProps) => {
  return (
    <button
      className={`w-[164px] h-[28px] flex items-center justify-center rounded-[5px] ${isActive ? 'bg-white font-medium' : 'bg-none text-darkgray font-regular'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TabsButton;
