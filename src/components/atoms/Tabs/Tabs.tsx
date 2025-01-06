import { useTabsStore } from '@/store/tabStore';
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';
import { useShallow } from 'zustand/shallow';

interface IProps {
  children: ReactNode;
}

const Tabs = ({ children }: IProps) => {
  const [setTabs, setActiveTab] = useTabsStore(
    useShallow((state) => [state.setTabs, state.setActiveTab])
  );

  useEffect(() => {
    const tabs = Children.toArray(children)
      .filter((el): el is ReactElement => isValidElement(el))
      .map((el) => el.props.children);
    setTabs(tabs);
    setActiveTab(tabs[0]);
  }, [children]);

  return (
    <div className='w-full h-[38px] px-[5px] flex items-center bg-[#DCDCDC] rounded-[5px]'>
      {children}
    </div>
  );
};

const Tab = ({ children, index }: IProps & { index: number }) => {
  const text = children as string;
  const [tabs, activeTab, setActiveTab] = useTabsStore(
    useShallow((state) => [state.tabs, state.activeTab, state.setActiveTab])
  );

  return (
    <>
      <button
        className={`w-[164px] h-[28px] flex items-center justify-center rounded-[5px] ${activeTab === text ? 'bg-white font-medium' : 'bg-none text-darkgray font-regular'}`}
        onClick={() => setActiveTab(text)}
      >
        {children}
      </button>
      {index < tabs.length - 1 && (
        <div className='h-[19px] w-[1px] bg-[#BDBDBD] mx-[10px]' />
      )}
    </>
  );
};

Tabs.Tab = Tab;

export default Tabs;
