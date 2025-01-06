import ChatSidebar from '@/components/organisms/ChatSidebar';
import React from 'react';

const ChatPage = () => {
  return (
    <div className='flex max-w-[1240px]'>
      <div>
        <ChatSidebar />
      </div>
      <div>right</div>
    </div>
  );
};

export default ChatPage;
