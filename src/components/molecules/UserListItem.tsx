import React, { ReactNode } from 'react';

interface Props {
  profileIcon: ReactNode;
  name: string;
  label1: string;
  label2: string;
}

const UserListItem = ({ profileIcon, name, label1, label2 }: Props) => {
  return (
    <div className='flex'>
      <div>{profileIcon}</div>
      <div className='flex flex-col'>
        <div>{name}</div>
        <div>{label1}</div>
      </div>
      <div>{label2}</div>
    </div>
  );
};

export default UserListItem;
