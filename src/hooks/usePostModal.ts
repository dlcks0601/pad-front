import useFeedStore from '@/store/postFeedStore';
import { useState } from 'react';

const usePostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resetFeed = useFeedStore((state) => state.resetFeed);

  const openPostModal = () => {
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    resetFeed();
    setIsModalOpen(false);
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
    setIsSubmitted,
    openPostModal,
    closePostModal,
    handleSubmitConfirmation,
  };
};

export default usePostModal;
