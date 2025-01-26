import HubDetail from '@/components/molecules/contents/HubDetail';
import { useFetchHub } from '@/hooks/queries/hub.query';
import { useParams } from 'react-router-dom';

const ConnectionHubDetail = () => {
  const { projectId } = useParams<{ projectId: string }>(); // URL에서 projectId 가져오기
  const {
    data: ProjectData,
    isLoading: ProjectLoading,
    isError,
  } = useFetchHub(Number(projectId));

  console.log('ProjectData:', ProjectData);

  // project가 undefined일 수 있으므로 기본값 처리
  const project = ProjectData?.project;

  // 로딩 중 처리
  if (ProjectLoading) {
    return <div>피드 로딩중...</div>;
  }

  // 에러 또는 데이터 없음 처리
  if (isError || !project) {
    return <div>프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className='flex p-10px'>
      {/* project가 존재하므로 안전하게 접근 */}
      <HubDetail
        title={project.title}
        hubType={project.hubType}
        workType={project.workType}
        status={project.status}
        detailRoles={project.detailRoles}
        skills={project.skills}
        role={project.role}
        startDate={project.startDate}
        duration={project.duration}
        content={project.content}
        createdAt={project.createdAt}
        manager={project.manager}
        isOwnConnectionHub={project.manager.userId === Number(projectId)}
      />
    </div>
  );
};

export default ConnectionHubDetail;
