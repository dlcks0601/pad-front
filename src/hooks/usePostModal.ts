import useFeedStore from '@/store/postFeedStore';
import { useState } from 'react';

const usePostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetFeed } = useFeedStore();

  const openPostModal = () => {
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    if (!isSubmitted) {
      const answer = window.confirm(
        '작성중인 피드가 사라집니다. 정말 나가시겠습니까?'
      );
      if (answer) {
        resetFeed();
      }
      setIsModalOpen(!answer);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleSubmitConfirmation = (onSubmit: () => void) => {
    const confirmSubmit = window.confirm('작성을 완료하시겠습니까?');
    if (confirmSubmit) {
      setIsSubmitted(true);
      setTimeout(() => {
        onSubmit();
      }, 0);
    }
  };

  return {
    isModalOpen,
    isSubmitted,
    setIsSubmitted, // ✅ 여기서 반환
    openPostModal,
    closePostModal,
    handleSubmitConfirmation,
  };
};

export default usePostModal;
