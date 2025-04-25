import { useEffect, useState } from 'react';
import { useGetAllPerformersQuery } from '../../apis/performer';
import Performer from '../../components/performer/perofrmer';
import { cityOptions } from '../../city';

const PerformerPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const ITEMS_PER_PAGE = 8;
  
  const { data, isLoading, isFetching, refetch } = useGetAllPerformersQuery({
    page: activeTab === 'all' ? currentPage : 1,
    limit: activeTab === 'all' ? ITEMS_PER_PAGE : 100,
    address: selectedFilter !== 'all' && !['approved', 'rejected'].includes(selectedFilter) ? selectedFilter : undefined,
    status: ['approved', 'rejected'].includes(selectedFilter) ? selectedFilter : undefined
  });

  const rejectedPerformers = data?.docs?.filter((user: any) => user.status === 'rejected') || [];
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const displayData = activeTab === 'all' 
    ? data?.docs || []
    : rejectedPerformers.slice(startIndex, endIndex);

  const totalPages = activeTab === 'all'
    ? data?.totalPages || 1
    : Math.ceil(rejectedPerformers.length / ITEMS_PER_PAGE);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div>
      <Performer 
        perFormerData={displayData}
        isLoading={isLoading} 
        currentPage={currentPage}
        totalPages={totalPages}
        isPageLoading={isFetching}
        onPageChange={handlePageChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        refetch={refetch}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        cityOptions={cityOptions}
      />
    </div>
  );
}

export default PerformerPage;
