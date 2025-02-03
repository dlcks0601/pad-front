import { HubContents } from '@/components/molecules/contents/ContentsItem';
import { useSearchConnectionHub } from '@/hooks/queries/search.query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ProjectView = ({ keyword }: { keyword: string }) => {
  const { ref, inView } = useInView();

  const {
    data: hubs,
    isLoading: isProjectsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSearchConnectionHub(keyword);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isProjectsLoading) {
    return <div className='text-[14px]'>검색 결과를 가져오는 중 입니다...</div>;
  }

  if (hubs?.pages[0].projects?.length === 0) {
    return <div className='text-[14px]'>검색 결과가 존재하지 않습니다.</div>;
  }

  console.log(hubs?.pages[0].projects);

  return (
    <div className='flex flex-col gap-10'>
      {hubs?.pages[0].projects?.map((project) => (
        <HubContents
          key={project.projectId}
          {...project}
          user={{
            profileUrl: project.userProfileUrl,
            nickname: project.userNickname,
            role: project.userRole,
          }}
          createdAt={new Date().toISOString()}
        />
      ))}
      <div ref={ref} className='h-1' />
    </div>
  );
};

export default ProjectView;
