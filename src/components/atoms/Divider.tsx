import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

interface DividerProps {
  variants: 'vertical' | 'horizontal';
  color: 'light' | 'dark';
  className?: string;
}

const Divider = ({ variants, color, className }: DividerProps) => {
  const dividerStyle = cva('', {
    variants: {
      variants: {
        horizontal: 'w-full h-[1px]',
        vertical: 'h-[19px] w-[1px] mx-[10px]',
      },
      color: {
        light: 'bg-[#D9D9D9]',
        dark: 'bg-[#BDBDBD]',
      },
    },
    defaultVariants: {
      variants: 'horizontal',
      color: 'light',
    },
  });

  return <div className={cn(dividerStyle({ variants, color }), className)} />;
};

export default Divider;
