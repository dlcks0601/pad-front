import Tabs from '@/components/organisms/Tabs';

const MyPageTabs = ['소개', '지원서', '피드', '커넥션 허브'];

const MyPageTemplate = () => {
  return (
    <div className='w-full min-h-screen max-w-[1920px]'>
      <div className='max-w-screen-center h-full mx-auto py-5 px-[30px] flex flex-col gap-[17px]'>
        <div className='h-[166px]'></div>
        <div className='h-[38px]'>
          <Tabs>
            {MyPageTabs.map((tab, index) => (
              <Tabs.TabItem key={tab} hideDivider={index == 3}>
                {tab}
              </Tabs.TabItem>
            ))}
          </Tabs>
        </div>
        <div className='h-[250px] py-[10px]'></div>
        <div className='h-[166px]'></div>
        <div className='h-[166px]'></div>
        <div className='flex items-center justify-center h-9'></div>
      </div>
    </div>
  );
};

export default MyPageTemplate;
