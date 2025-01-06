import UserListItem from '@/components/molecules/UserListItem';
import React from 'react';

const ChatSidebar = () => {
  return (
    <div>
      <div>
        <input type='text' defaultValue='이름' />
      </div>
      <ul>
        <li>
          <UserListItem
            profileIcon='아이콘'
            name='이재혁'
            label1='한태동, 이찬'
            label2='1h'
          />
        </li>
      </ul>
    </div>
  );
};

export default ChatSidebar;
