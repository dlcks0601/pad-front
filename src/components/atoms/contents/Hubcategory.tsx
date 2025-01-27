import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

interface HubCategoryProps {
  selectedHubType: string;
  onChange: (value: string) => void;
}

const HubCategory = ({ selectedHubType, onChange }: HubCategoryProps) => {
  return (
    <Select onValueChange={onChange} value={selectedHubType}>
      <SelectTrigger className='w-[120px] border-black h-[44px]'>
        <SelectValue placeholder='허브 유형' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='Project'>프로젝트</SelectItem>
        <SelectItem value='Outsourcing'>외주</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default HubCategory;
