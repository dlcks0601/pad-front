import Input from '@/components/atoms/Input';
import Modal2 from '@/components/molecules/Modal';
import Modal from '@/components/organisms/modals/Modal';
import { useState } from 'react';

const PostFeedModal = () => {
  const [content, setContent] = useState<string>('');

  const onClose = () => {
    console.log('모달 닫힘');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <Modal2 onClose={onClose}>
      <Modal2.Title>2025년 01년 13일</Modal2.Title>
      <Modal2.ModalSubContent>hello</Modal2.ModalSubContent>
      <Modal2.ModalContent px='30px' py='20px' className='bg-gray'>
        <Input
          bgColor='light'
          placeholder='제목을 입력해주세요'
          value={content}
          onChange={onChange}
          className='border-0 px-0 text-heading1'
        />
      </Modal2.ModalContent>
    </Modal2>
  );
};

export default PostFeedModal;
