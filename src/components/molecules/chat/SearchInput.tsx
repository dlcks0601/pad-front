import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { useChatStore } from '@/store/chatStore';
import { useKeywordStore } from '@/store/keywordStore';
import { searchMessage } from '@/utils/filter';
import { FormEvent, InputHTMLAttributes, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ ...props }: SearchInputProps) => {
  const setGlobalKeyword = useKeywordStore((state) => state.setKeyword);
  const [keyword, setKeyword] = useState('');
  const currentMatchMessageIndexRef = useRef(0);

  const { messages, currentChannelId } = useChatStore(
    useShallow((state) => ({
      messages: state.messages,
      currentChannelId: state.currentChannelId,
    }))
  );

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!currentChannelId) return alert('채널을 선택해주세요');
    setGlobalKeyword(keyword);
    currentMatchMessageIndexRef.current = searchMessage(
      messages[currentChannelId],
      keyword,
      currentMatchMessageIndexRef.current
    );
    console.log(messages[currentChannelId]);
    console.log(
      'currentMatchMessageIndexRef.current >>> ',
      currentMatchMessageIndexRef.current
    );
    if (currentMatchMessageIndexRef.current === -1)
      return alert('메시지를 찾지 못했습니다.');
  };
  return (
    <div className='relative'>
      <form onSubmit={handleSearch}>
        <button className='absolute top-1/2 left-[20px] transform -translate-y-1/2 -translate-x-1/2 w-[24px] h-[24px] text-[#CCCCCC]'>
          <Icon type='search' color='gray' className='text-[#CCCCCC]' />
        </button>
        <Input
          type='text'
          placeholder='검색'
          className='pl-[40px] placeholder-[#CCCCCC] bg-[#EDECF3]'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          {...props}
        />
      </form>
    </div>
  );
};

export default SearchInput;
