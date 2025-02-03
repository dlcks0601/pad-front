import Button from '@/components/atoms/Button';
import { useProjectStore } from '@/store/hubDetailStore';
import { Plus, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HubIntroduce = () => {
  const navigate = useNavigate();
  const targetUserId = useProjectStore(
    (state) => state.project?.manager.userId
  );
  return (
    <div className='flex gap-[10px]'>
      <Button
        width='90px'
        height='40px'
        variants='filled'
        radius='md'
        className='bg-white text-black shadow-xl'
      >
        <Plus className='mr-2 w-5 h-5' /> 팔로우
      </Button>
      <Button
        width='90px'
        height='40px'
        variants='filled'
        radius='md'
        className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] text-white shadow-xl'
        onClick={() => navigate('/chat', { state: { targetUserId } })}
      >
        <Send className='mr-2 w-5 h-5' /> 메세지
      </Button>
    </div>
  );
};
export default HubIntroduce;
