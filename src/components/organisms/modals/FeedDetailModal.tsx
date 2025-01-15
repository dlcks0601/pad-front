import Modal2 from '@/components/molecules/Modal';

interface FeedDetailModalProps {
  onClose: () => void;
}

const FeedDetailModal = ({ onClose }: FeedDetailModalProps) => {
  return (
    <Modal2 onClose={onClose} height='90vh'>
      FeedDetailModal
    </Modal2>
  );
};

export default FeedDetailModal;
