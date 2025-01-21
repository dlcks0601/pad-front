import InputDropdown from '@/components/molecules/InputDropdown';
import Modal2 from '@/components/molecules/Modal';
import TiptapEditor from '@/components/organisms/TiptapEditor';
import useFeedStore from '@/store/postFeedStore';
import {
  useFetchFeed,
  usePostFeed,
  usePutFeed,
} from '@/hooks/queries/feed.query';
import { date } from '@/utils/date';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface PostFeedModalProps {
  onClose: () => void;
  onSubmit: () => void;
  onRevise?: boolean;
}

const PostFeedModal = ({ onClose, onSubmit, onRevise }: PostFeedModalProps) => {
  const {
    title,
    content,
    tag: tags,
    setContent,
    setTitle,
    setTag,
    resetFeed,
  } = useFeedStore((state) => state);

  const { id } = useParams<{ id: string }>();
  const { data: FeedData, isSuccess } = useFetchFeed(Number(id));

  useEffect(() => {
    if (onRevise && isSuccess && FeedData) {
      console.log('FeedData.post.content: ', FeedData.post.content);
      setTitle(FeedData.post.title ?? '');
      setContent(FeedData.post.content ?? '');
      setTag(FeedData.post.tags ?? []);
    }
  }, [onRevise, isSuccess, FeedData, setTitle, setContent, setTag]);

  const { mutate: postFeed, isPending: isPostLoading } = usePostFeed();
  const { mutate: putFeed, isPending: isPutLoading } = usePutFeed();
  const [errors, setErrors] = useState({
    title: false,
    tags: false,
    content: false,
  });

  const handleSubmit = () => {
    const isContentEmpty = (html: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const textContent = doc.body.textContent?.trim() || '';
      return textContent === '';
    };

    const hasError = {
      title: title.trim() === '',
      tags: tags.length === 0,
      content: isContentEmpty(content),
    };
    setErrors(hasError);

    if (!hasError.title && !hasError.tags && !hasError.content) {
      if (onRevise && id) {
        putFeed(
          { id: Number(id), title, tags, content },
          {
            onSuccess: () => {
              resetFeed();
              onSubmit();
              onClose();
            },
            onError: (error) => {
              console.error('피드 수정 중 오류 발생:', error);
            },
          }
        );
      } else {
        postFeed(
          { title, tags, content },
          {
            onSuccess: () => {
              resetFeed();
              onSubmit();
              onClose();
            },
            onError: (error) => {
              console.error('폼 제출 실패:', error);
            },
          }
        );
      }
    } else {
      console.log('폼 검증 실패:', hasError);
    }
  };

  return (
    <Modal2 onClose={onClose}>
      <Modal2.Title>{date}</Modal2.Title>
      <Modal2.ModalSubContent>
        <Modal2.ModalInput
          placeholder='제목을 작성해주세요.'
          message={errors.title ? '제목을 입력해주세요.' : ''}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputDropdown />
        {errors.tags && (
          <p className='text-red-600 text-caption2 px-[20px]'>
            태그를 선택해주세요.
          </p>
        )}
      </Modal2.ModalSubContent>
      <Modal2.ModalContent px='40px' py='5px' className='bg-white'>
        <TiptapEditor content={content} setContent={setContent} />
        {errors.content && (
          <p className='text-red-600 text-caption2 absolute'>
            내용을 작성해주세요.
          </p>
        )}
      </Modal2.ModalContent>
      <div className='mb-2 flex flex-row-reverse'>
        <button
          className='bg-close px-1 py-1.5 rounded-[3px] w-fit h-fit text-caption1 text-white'
          onClick={handleSubmit}
          disabled={isPostLoading || isPutLoading}
        >
          {isPostLoading || isPutLoading ? '작성 중...' : '작성하기'}
        </button>
      </div>
    </Modal2>
  );
};

export default PostFeedModal;
