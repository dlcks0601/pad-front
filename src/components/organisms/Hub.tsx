import { useEffect, useState } from 'react';
import { HubContents } from '@/components/molecules/contents/ContentsItem';
// 실제 API와 연동하기 위한 fetchHubs 함수 (경로는 프로젝트 구조에 맞게 수정)
import { fetchHubs } from '@/apis/hub.api';
import { HubItem } from '@/mocks/mock-data/hubItem'; // 실제 API 응답 형태에 맞춰 타입 조정 필요
import { useNavigate } from 'react-router-dom';

interface HubProps {
  keyword?: string;
}

const Hub = ({ keyword }: HubProps) => {
  const [data, setData] = useState<HubItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 이동을 위해 useNavigate 훅 사용
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchHubs({
          skip: 0,
          limit: 10,
          sort: 'null',
          cursor: 0,
        });

        console.log('fetchHubs response:', response);
        console.log('projects:', response.projects);

        setData(response.projects);
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    getProjects();
  }, []);

  const handleClickProject = (projectId: number) => {
    // 예: /projects/2
    navigate(`/projects/${projectId}`);
  };

  // 1) 로딩 상태
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 2) 에러 상태
  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  // 3) 검색어(keyword)가 있으면 제목/내용에 해당 키워드가 있는지 필터링
  const filteredData = keyword
    ? data.filter(
        (item) => item.title.includes(keyword) || item.content.includes(keyword)
      )
    : data;

  // 4) 실제 렌더링
  return (
    <div className='flex flex-col gap-[30px] w-full h-full'>
      {filteredData.map((item) => (
        <div
          key={item.projectId}
          onClick={() => handleClickProject(item.projectId)}
          className='cursor-pointer'
        >
          <HubContents
            key={item.projectId}
            user={item.user}
            title={item.title}
            workType={item.workType}
            status={item.status}
            hubType={item.hubType}
            detailRoles={item.detailRoles}
            role={item.role}
            bookMarkCount={item.bookMarkCount}
            applyCount={item.applyCount}
            viewCount={item.viewCount}
            thumbnailUrl={item.thumbnailUrl}
            startDate={item.startDate}
            duration={item.duration}
            createdAt={item.createdAt}
          />
        </div>
      ))}

      {/* 5) 검색어가 있는데도 필터된 결과가 없다면 */}
      {keyword && !filteredData.length && (
        <div className='flex flex-col justify-center items-center'>
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default Hub;
