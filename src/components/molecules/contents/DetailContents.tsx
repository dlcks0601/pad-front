interface DetailContentsProps {
  content: string;
}

const DetailContents = ({ content }: DetailContentsProps) => {
  return (
    <div className='flex w-full border rounded-[10px] h-[400px] p-[10px]'>
      {content}
    </div>
  );
};

export default DetailContents;
