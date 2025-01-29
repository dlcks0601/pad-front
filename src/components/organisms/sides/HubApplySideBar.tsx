import { useParams } from 'react-router-dom';
import { changeHubStatus } from '@/hooks/queries/hub.query';

const HubApplySideBar = () => {
  const { projectId } = useParams<{ projectId: string }>(); // URL에서 projectId 추출
  const mutation = changeHubStatus();

  const handleCloseRecruitment = () => {
    if (!projectId) {
      console.error('Project ID가 없습니다!');
      return;
    }
    mutation.mutate({
      projectId: Number(projectId), // 문자열을 숫자로 변환
      recruiting: false,
    });
  };

  const handleOpenRecruitment = () => {
    if (!projectId) {
      console.error('Project ID가 없습니다!');
      return;
    }
    mutation.mutate({
      projectId: Number(projectId), // 문자열을 숫자로 변환
      recruiting: true,
    });
  };

  return (
    <div className='flex w-full flex-col gap-[10px]'>
      <div className='text-[14px] font-medium text-balck'>👥 지원자 목록</div>
      <div className='flex w-full flex-col bg-white rounded-[10px] py-[20px] px-[20px] gap-[30px]'></div>
      <div>
        <button
          onClick={handleCloseRecruitment}
          className='bg-red-500 text-white px-4 py-2 rounded'
        >
          마감
        </button>
        <button
          onClick={handleOpenRecruitment}
          className='bg-lime-400 text-white px-4 py-2 rounded'
        >
          오픈
        </button>
      </div>
    </div>
  );
};

export default HubApplySideBar;
