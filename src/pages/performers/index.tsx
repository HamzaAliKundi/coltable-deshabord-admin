import { useEffect, useState } from 'react';
import { useGetAllPerformersQuery } from '../../apis/performer';
import Performer from '../../components/performer/perofrmer';

const PerformerPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [perFormerData, setPerFormerData] = useState([]);
  
  const { data, isLoading, isFetching, refetch } = useGetAllPerformersQuery({
    page: currentPage,
    limit: 8
  });

  useEffect(() => setPerFormerData(data?.docs || []), [data]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Reset page to 1 when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div>
      <Performer 
        perFormerData={perFormerData} 
        isLoading={isLoading} 
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        isPageLoading={isFetching}
        onPageChange={handlePageChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        refetch={refetch}
      />
    </div>
  );
}

export default PerformerPage;
