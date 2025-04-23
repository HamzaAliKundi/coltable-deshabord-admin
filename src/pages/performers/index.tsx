import { useEffect, useState } from 'react';
import { useGetAllPerformersQuery } from '../../apis/performer';
import Performer from '../../components/performer/perofrmer';

const PerformerPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perFormerData, setPerFormerData] = useState([]);
  
  const { data, isLoading, isFetching, refetch } = useGetAllPerformersQuery({
    page: currentPage,
    limit: 8
  });

  useEffect(() => setPerFormerData(data?.docs || []), [data]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div>
      <Performer 
        perFormerData={perFormerData} 
        isLoading={isLoading} 
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        isPageLoading={isFetching}
        onPageChange={handlePageChange}
        refetch={refetch}
      />
    </div>
  );
}

export default PerformerPage;
