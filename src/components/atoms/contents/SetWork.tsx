import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

interface SetWorkProps {
  selectedWorkType: string;
  onChange: (value: string) => void;
}

const SetWork = ({ selectedWorkType, onChange }: SetWorkProps) => {
  return (
    <Select onValueChange={onChange} value={selectedWorkType}>
      <SelectTrigger className='w-[120px] border-black h-[44px]'>
        <SelectValue placeholder='작업 방식' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='대면'>대면</SelectItem>
        <SelectItem value='원격'>원격</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SetWork;
