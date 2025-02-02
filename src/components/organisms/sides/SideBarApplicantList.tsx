import Avatar from '@/components/atoms/Avatar';
import {
  applicantsStatus,
  changeHubStatus,
  useFetchApplicants,
} from '@/hooks/queries/hub.query';
import useAuthStore from '@/store/authStore';
import { useProjectStore } from '@/store/hubDetailStore';
import { useNavigate, useParams } from 'react-router-dom';

const SideBarApplicantList = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: ApplicantData,
    isLoading: ApplicantLoading,
    isError,
    refetch,
  } = useFetchApplicants(Number(projectId));

  const writeUserId = useAuthStore((state) => state.userInfo.userId);

  const navigate = useNavigate();
  const changeStatusMutation = applicantsStatus();
  const hubTitle = useProjectStore((state) => state.project?.title);
  const hubStatusMutation = changeHubStatus();

  const handleStatusChange = (
    userId: number,
    status: 'Accepted' | 'Rejected'
  ) => {
    if (
      !window.confirm(
        `정말 ${status === 'Accepted' ? '수락' : '거절'}하시겠습니까?`
      )
    )
      return;

    changeStatusMutation.mutate(
      { projectId: Number(projectId), userId, status },
      {
        onSuccess: () => {
          refetch(); // ✅ 상태 변경 후 지원자 목록 갱신
        },
      }
    );
  };

  const handleInvite = () => {
    if (
      window.confirm(
        '초대를 진행하면 허브 모집이 마감됩니다. 계속하시겠습니까?'
      )
    ) {
      // ✅ 허브 마감 (recruiting: false)
      hubStatusMutation.mutate(
        {
          projectId: Number(projectId),
          recruiting: false,
        },
        {
          onSuccess: () => {
            refetch(); // ✅ 허브 상태 변경 후 지원자 목록 갱신

            const acceptedApplicants =
              ApplicantData?.applicants.filter(
                (applicant) => applicant.status === 'Accepted'
              ) || [];
            const userIds = [
              ...acceptedApplicants.map((applicant) => applicant.userId),
              writeUserId,
            ];

            console.log('초대된 사용자:', userIds); // ✅ 초대된 사용자 확인

            // ✅ 초대된 사용자와 함께 채팅으로 이동
            navigate('/chat', {
              state: { userIds, title: hubTitle },
            });
          },
        }
      );
    }
  };

  if (ApplicantLoading) {
    return <div className='text-center text-gray-500'>지원자 로딩 중...</div>;
  }

  if (isError || !ApplicantData?.applicants.length) {
    return <div className='text-center text-gray-500'>지원자가 없습니다.</div>;
  }

  // const acceptedApplicants = ApplicantData.applicants.filter(
  //   (applicant) => applicant.status === 'Accepted'
  // );
  // const userIds = [
  //   ...acceptedApplicants.map((applicant) => applicant.userId),
  //   writeUserId,
  // ];

  return (
    <div className='flex flex-col bg-white rounded-[10px] py-[20px] px-[20px] gap-[30px]'>
      {ApplicantData.applicants.map((applicant, index) => (
        <div
          key={applicant.userId}
          className='flex items-center justify-between'
        >
          <div className='flex items-center gap-[10px]'>
            <div className='text-[14px]'>{index + 1}</div>
            <Avatar
              src={applicant.profileUrl}
              alt={applicant.nickname}
              size='xxs'
            />
            <div className='text-[14px] font-medium'>{applicant.nickname}</div>
          </div>
          <div className='flex gap-[10px]'>
            {applicant.status === 'Pending' ? (
              <>
                <button
                  onClick={() =>
                    handleStatusChange(applicant.userId, 'Accepted')
                  }
                  className='w-[45px] h-[30px] text-[12px] bg-[#00C859] text-white rounded'
                >
                  수락
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(applicant.userId, 'Rejected')
                  }
                  className='w-[45px] h-[30px] text-[12px] bg-[#FF5E5E] text-white rounded'
                >
                  거절
                </button>
              </>
            ) : (
              <div className='text-[12px] font-medium'>
                {applicant.status === 'Accepted' ? '✅ 수락됨' : '❌ 거절됨'}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className='flex flex-col'>
        <button
          onClick={handleInvite}
          className='flex w-full items-center justify-center h-[40px] text-[14px] bg-gradient-to-r from-[#e7acff] to-[#6eddff] text-white rounded-md'
        >
          {hubTitle} 초대
        </button>
      </div>
    </div>
  );
};

export default SideBarApplicantList;
