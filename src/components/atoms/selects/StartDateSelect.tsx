import { Calendar } from '@/components/ui/calendar';
import useHubStore from '@/store/postHubStore';
import { cn } from '@/utils/cn';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from '@radix-ui/themes';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

const StartDateSelect = () => {
  const { startDate, setStartDate } = useHubStore((state) => ({
    startDate: state.startDate,
    setStartDate: state.setStartDate,
  }));

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setStartDate(format(selectedDate, 'yyyy-MM-dd'));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-[280px] h-[44px] justify-start text-left font-normal bg-white border-black',
            !startDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {startDate || <span>날짜를 선택해주세요.</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={startDate ? new Date(startDate) : undefined}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default StartDateSelect;
