import Icon from '@/components/atoms/Icon';
import SearchInput from '@/components/molecules/chat/SearchInput';
import { useChatStore } from '@/store/chatStore';
import { SearchState, useSearchStore } from '@/store/searchStore';
import { FormEvent, useState } from 'react';
import { useShallow } from 'zustand/shallow';

const SearchMessage = () => {
  const {
    setState,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    searchKeyword,
  } = useSearchStore(
    useShallow((state) => ({
      hasNextPage: state.hasNextPage,
      hasPreviousPage: state.hasPreviousPage,
      isFetchingNextPage: state.isFetchingNextPage,
      isFetchingPreviousPage: state.isFetchingPreviousPage,
      fetchNextPage: state.fetchNextPage,
      fetchPreviousPage: state.fetchPreviousPage,
      setState: state.setState,
      searchKeyword: state.searchKeyword,
    }))
  );

  const { messages, currentChannelId } = useChatStore(
    useShallow((state) => ({
      messages: state.messages,
      currentChannelId: state.currentChannelId,
    }))
  );

  const [keyword, setKeyword] = useState('');

  const loadMore = (direction: SearchState['direction']) => {
    switch (direction) {
      case 'forward':
        if (!hasNextPage || isFetchingNextPage || !fetchNextPage) return;
        setState({ direction, limit: 30 });
        fetchNextPage();
        break;
      case 'backward':
        if (!hasPreviousPage || isFetchingPreviousPage || !fetchPreviousPage)
          return;
        setState({ direction, limit: 30 });
        fetchPreviousPage();
        break;
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!currentChannelId) {
      alert('채널을 선택해주세요');
      return;
    }

    const currentMessages = messages[currentChannelId];
    // 키워드가 없거나 메시지가 없으면 리턴
    if (!keyword.trim() || !currentMessages?.length) return;

    // 키워드 하이라이트 하기 위해 전역 상태 업데이트
    setState({ searchKeyword: keyword, limit: 15 });
    loadMore('forward');
  };

  return (
    <div className='shrink-0 flex items-center gap-2'>
      {searchKeyword && (
        <>
          <button
            className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
            aria-label='이전 메시지'
            disabled={!hasNextPage}
          >
            <Icon type='arrow' className='w-[20px] h-[20px] text-inherit' />
          </button>
          <button
            className='p-[5px] bg-[#333333] text-white rounded-full hover:bg-[#555555] disabled:bg-[#949494] disabled:text-[#c5c5c5]'
            aria-label='최근 메시지'
            disabled={!hasPreviousPage}
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
        onChange={(e) => setKeyword(e.target.value)}
        onSubmit={handleSearch}
      />
    </div>
  );
};

export default SearchMessage;
