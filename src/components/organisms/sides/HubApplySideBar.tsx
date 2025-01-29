import { useParams } from 'react-router-dom';
import { changeHubStatus } from '@/hooks/queries/hub.query';
import { useProjectStore } from '@/store/hubDetailStore';
import { useFetchHub } from '@/hooks/queries/hub.query';

const HubApplySideBar = () => {
  const { projectId } = useParams<{ projectId: string }>(); // URL에서 projectId 추출
  const mutation = changeHubStatus();
  const hubStatus = useProjectStore((state) => state.project?.status); // 현재 상태 가져오기
  const { refetch } = useFetchHub(Number(projectId)); // 최신 데이터 가져오기

  const handleCloseRecruitment = () => {
    if (!projectId) {
      console.error('Project ID가 없습니다!');
      return;
    }

    // 사용자 확인
    const isConfirmed = window.confirm('정말 마감하시겠습니까?');
    if (!isConfirmed) return;

    mutation.mutate(
      {
        projectId: Number(projectId), // 문자열을 숫자로 변환
        recruiting: false,
      },
      {
        onSuccess: () => {
          refetch(); // ✅ 상태 변경 후 최신 데이터 불러오기
        },
      }
    );
  };

  const handleOpenRecruitment = () => {
    if (!projectId) {
      console.error('Project ID가 없습니다!');
      return;
    }

    // 사용자 확인
    const isConfirmed = window.confirm('정말 모집을 다시 오픈하시겠습니까?');
    if (!isConfirmed) return;

    mutation.mutate(
      {
        projectId: Number(projectId),
        recruiting: true,
      },
      {
        onSuccess: () => {
          refetch(); // ✅ 상태 변경 후 최신 데이터 불러오기
        },
      }
    );
  };

  return (
    <div className='flex w-full flex-col gap-[10px]'>
      <div className='text-[14px] font-medium text-black'>👥 지원자 목록</div>
      <div className='flex w-full flex-col bg-white rounded-[10px] py-[20px] px-[20px] gap-[30px]'></div>

      <div className='flex gap-4'>
        {/* ✅ hubStatus가 'OPEN'일 때 '마감' 버튼 표시 */}
        {hubStatus === 'OPEN' && (
          <button
            onClick={handleCloseRecruitment}
            className='bg-gradient-to-r from-[#FF8800] to-[#FFA9BE] w-[314px] h-[50px] rounded-md text-white'
          >
            마감
          </button>
        )}

        {/* ✅ hubStatus가 'CLOSE'일 때 '오픈' 버튼 표시 */}
        {hubStatus === 'CLOSED' && (
          <button
            onClick={handleOpenRecruitment}
            className='bg-gradient-to-r from-[#91ff85] to-[#c14eff] w-[314px] h-[50px] rounded-md text-white'
          >
            오픈
          </button>
        )}
      </div>
    </div>
  );
};

export default HubApplySideBar;
