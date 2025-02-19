import Icon from '@/components/atoms/Icon';
import SearchInput from '@/components/molecules/chat/SearchInput';
import { useSearchMessagesQuery } from '@/hooks/chat/useSearchMessages';
import { useSearchUpDown } from '@/hooks/chat/useSearchUpDown';
import { SearchState, useSearchStore } from '@/store/searchStore';
import { Channel } from '@/types/channel.type';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

interface SearchMessageProps {
  currentChannelId: Channel['channelId'];
}

const SearchMessage = ({ currentChannelId }: SearchMessageProps) => {
  const [keyword, setKeyword] = useState('');
  const { setState, searchMode, searchDirection } = useSearchStore(
    useShallow((state) => ({
      setState: state.setState,
      searchMode: state.searchMode,
      searchDirection: state.searchDirection,
    }))
  );

  const { data, isFetching, refetch } =
    useSearchMessagesQuery(currentChannelId);

  const { isFirstMessage, isLastMessage } = useSearchUpDown(
    data,
    searchDirection
  );

  const handleUpDown = (direciton: SearchState['searchDirection']) => {
    if (isFetching) return;

    setState({ searchDirection: direciton });
    refetch();
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || isFetching) return;

    setState({
      searchDirection: 'backward',
      searchKeyword: keyword,
      searchMode: true,
      // searchCursors: null,
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // setState({ searchKeyword: e.target.value });
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (!data) return;
    if (data.cursors) {
      setState({
        searchCursors: data.cursors,
      });
    }
  }, [data?.cursors]);

  return (
    <div className='shrink-0 flex items-center gap-2'>
      {searchMode && (
        <>
          <button
            className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
            aria-label='이전 메시지'
            disabled={isFirstMessage}
            onClick={() => handleUpDown('backward')}
          >
            <Icon type='arrow' className='w-[20px] h-[20px] text-inherit' />
          </button>
          <button
            className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
            aria-label='다음 메시지'
            disabled={isLastMessage}
            onClick={() => handleUpDown('forward')}
          >
            <Icon
              type='arrow'
              className='transform rotate-180 w-[20px] h-[20px] text-inherit'
            />
          </button>
        </>
      )}
      <SearchInput
        value={keyword}
        onChange={handleInput}
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default SearchMessage;
