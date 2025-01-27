import TiptapEditor from '@/components/organisms/TiptapEditor';
import { HubState } from '@/store/postHubStore';
import { useState } from 'react';
import useHubStore from '@/store/postHubStore';

interface PostHubContentSecondProps {
  onPrevious: () => void;
}

const PostHubContentSecond = ({ onPrevious }: PostHubContentSecondProps) => {
  const [hubContent, setHubContent] = useState<Pick<HubState, 'content'>>({
    content: '',
  });

  const { setContent } = useHubStore();

  const handleChange = (field: keyof HubState, value: string | string[]) => {
    setHubContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isContentEmpty = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const textContent = doc.body.textContent?.trim() || '';
    return textContent === '';
  };

  const handleSaveContent = () => {
    setContent(hubContent.content);
    console.log('Content 저장됨:', hubContent.content);
  };

  return (
    <div className='flex flex-col items-start w-full h-full gap-[10px]'>
      <div className='flex text-[20px] font-semibold'>허브 소개</div>
      <div className='flex flex-col w-full px-[10px] py-[20px] h-[573px] overflow-y-scroll scrollbar-hide border rounded-md border-black'>
        <TiptapEditor
          content={hubContent.content}
          setContent={(value) => handleChange('content', value)}
        />
      </div>
      <div className='flex w-full justify-end'>
        <div className='flex gap-[10px]'>
          <button
            className='w-[50px] h-[35px] text-[14px] bg-[#FF5E5E] text-white rounded'
            onClick={onPrevious}
          >
            이전
          </button>
          <button
            className='w-[50px] h-[35px] text-[14px] bg-[#00C859] text-white rounded'
            disabled={isContentEmpty(hubContent.content)}
            onClick={handleSaveContent}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostHubContentSecond;

{
  /* {errors.content && (
          <p className='flex flex-col text-red-600 text-[14px] mt-5 absolute'>
            내용을 작성해주세요.
          </p>
        )} */
}
