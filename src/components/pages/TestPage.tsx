import PostFeedModal from '@/components/organisms/modals/PostFeedModal';
import useTiptapStore from '@/store/useTiptap.store';
import TiptapEditor from '@/components/organisms/TiptapEditor';
import useTiptapStore from '@/store/tiptapStore';

const TestPage = () => {
  return (
    <div className='relative w-full h-full'>
      {/* <TiptapEditor content={content} setContent={setContent} /> */}
      <PostFeedModal />
    </div>
  );
};

export default TestPage;
