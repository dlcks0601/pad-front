import HubDetail from '@/components/molecules/contents/HubDetail';
import { useFetchHub } from '@/hooks/queries/hub.query';
import useAuthStore from '@/store/authStore';
import { useProjectStore } from '@/store/hubDetailStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConnectionHubDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: ProjectData,
    isLoading: ProjectLoading,
    isError,
    // refetch,
  } = useFetchHub(Number(projectId));
  // const setProject = useProjectStore((state) => state.setProject);
  // const currentUserId = useAuthStore((state) => state.userInfo.userId);
  // const projectState = useProjectStore((state) => state.project);

  const setProject = useProjectStore((state) => state.setProject);
  const isOwnConnectionHub = useProjectStore(
    (state) => state.isOwnConnectionHub
  );
  const currentUserId = useAuthStore((state) => state.userInfo.userId);
  console.log(
    '✅ Zustand 저장된 프로젝트 데이터:',
    useProjectStore.getState().project
  );
  console.log('✅ Zustand 저장된 isOwnConnectionHub:', isOwnConnectionHub);

  // useEffect(() => {
  //   refetch();
  // }, [projectId, refetch]);
  useEffect(() => {
    if (ProjectData?.project) {
      setProject(ProjectData.project, currentUserId); // currentUserId 추가
    }
  }, [ProjectData, currentUserId, setProject]);

  console.log('ProjectData:', ProjectData);
  console.log('Current User ID:', currentUserId);

  // const project = ProjectData?.project;

  if (ProjectLoading) {
    return <div>피드 로딩 중...</div>;
  }

  if (isError || !ProjectData?.project) {
    return <div>프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className='flex p-10px'>
      <HubDetail
        title={ProjectData.project.title}
        hubType={ProjectData.project.hubType}
        workType={ProjectData.project.workType}
        status={ProjectData.project.status}
        detailRoles={ProjectData.project.detailRoles}
        skills={ProjectData.project.skills}
        role={ProjectData.project.role}
        startDate={ProjectData.project.startDate}
        duration={ProjectData.project.duration}
        content={ProjectData.project.content}
        createdAt={ProjectData.project.createdAt}
        manager={ProjectData.project.manager}
        projectId={ProjectData.project.projectId}
        isOwnConnectionHub={isOwnConnectionHub}
      />
    </div>
  );
};

export default ConnectionHubDetail;
