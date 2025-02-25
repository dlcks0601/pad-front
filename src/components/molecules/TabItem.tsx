import TabsButton from '@/components/atoms/TabsButton';
import Divider from '@/components/atoms/Divider';
import { PropsWithChildren } from 'react';

export interface TabProps {
  hideDivider?: boolean;
  isActive: boolean;
  onClick: () => void;
}

const TabItem = ({
  hideDivider,
  children,
  ...rest
}: PropsWithChildren<TabProps>) => {
  return (
    <>
      <TabsButton {...rest}>{children}</TabsButton>
      {!hideDivider && <Divider variants='vertical' color='dark' />}
    </>
  );
};

export default TabItem;
