import HubDetail from '@/components/molecules/contents/HubDetail';
import { useFetchHub } from '@/hooks/queries/hub.query';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConnectionHubDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: ProjectData,
    isLoading: ProjectLoading,
    isError,
    refetch,
  } = useFetchHub(Number(projectId));

  useEffect(() => {
    refetch();
  }, [projectId, refetch]);

  const currentUserId = useAuthStore((state) => state.userInfo.userId);

  console.log('ProjectData:', ProjectData);
  console.log('Current User ID:', currentUserId);

  const project = ProjectData?.project;

  if (ProjectLoading) {
    return <div>피드 로딩중...</div>;
  }

  if (isError || !project) {
    return <div>프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className='flex p-10px'>
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
        projectId={project.projectId}
        isOwnConnectionHub={project.manager.userId === currentUserId}
      />
    </div>
  );
};

export default ConnectionHubDetail;
