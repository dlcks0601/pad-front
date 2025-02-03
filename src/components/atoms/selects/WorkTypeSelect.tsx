import {
  meetingTagItems,
  meetingTagItemskey,
} from '@/constants/hub/meetingTagItems';
import useHubStore from '@/store/postHubStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';

const WorkTypeSelect = () => {
  const { workType, setWorkType } = useHubStore((state) => ({
    workType: state.workType,
    setWorkType: state.setWorkType,
  }));

  return (
    <Select
      onValueChange={(value) => setWorkType(value as meetingTagItemskey)}
      value={workType}
    >
      <SelectTrigger className='w-[120px] border border-black h-[44px] px-2'>
        <SelectValue placeholder='작업 방식' />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(meetingTagItems).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default WorkTypeSelect;
