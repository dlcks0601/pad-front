import HubDetail from '@/components/molecules/contents/HubDetail';
import { useFetchHub } from '@/hooks/queries/hub.query';

// import { useFetchHub } from '@/hooks/queries/hub.query';

import { useParams } from 'react-router-dom';

const ConnectionHubDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, isError } = useFetchHub(Number(projectId));

  return (
    <div className='flex p-10px'>
      {data &&
        data.projects.map((item) => (
          <HubDetail
            title={item.title}
            hubType={item.hubType}
            workType={item.workType}
            status={item.status}
            detailRoles={item.detailRoles}
            skills={item.skills}
            role={item.role}
            startDate={item.startDate}
            duration={item.duration}
            content={item.content}
            user={item.user}
          />
        ))}
    </div>
  );
};

export default ConnectionHubDetail;
