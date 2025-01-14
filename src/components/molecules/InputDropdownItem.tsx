import { tagItem } from '@/constants/tagItem';

interface InputDropdownProps {
  selectedTag: tagItem[];
  setSelectedTag: React.Dispatch<React.SetStateAction<tagItem[]>>;
}

const InputDropdownItem = ({
  selectedTag,
  setSelectedTag,
}: InputDropdownProps) => {
  const selectTag = (tag: tagItem) => {
    setSelectedTag((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  };

  const cancelTag = (tag: tagItem) => {
    setSelectedTag((prev) => prev.filter((t) => t !== tag));
  };

  console.log('selectedTag: ', selectedTag);

  return (
    <ul className='absolute left-4 mt-2 w-fit border bg-white shadow rounded z-50'>
      {Object.values(tagItem).map((tag) => (
        <li key={tag} className='px-2 py-1'>
          <div className='flex cursor-pointer hover:bg-slate-200 px-2 py-1 rounded-[3px]'>
            <p className='w-[90px]' onClick={() => selectTag(tag)}>
              {tag}
            </p>
            {selectedTag.includes(tag) && (
              <p onClick={() => cancelTag(tag)}>x</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InputDropdownItem;
