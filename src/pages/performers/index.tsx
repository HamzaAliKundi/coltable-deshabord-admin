import { useEffect, useState } from 'react';
import { useGetAllPerformersQuery } from '../../apis/performer';
import Performer from '../../components/performer/perofrmer';
import { cityOptions } from '../../city';
import toast from 'react-hot-toast';

interface FilterState {
  city: string;
  status: string;
}

const PerformerPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<FilterState>({ city: 'all', status: 'all' });
  const ITEMS_PER_PAGE = 8;
  
  // API call for all accounts
  const { 
    data: allData, 
    isLoading: isAllLoading, 
    isFetching: isAllFetching, 
    refetch: refetchAll 
  } = useGetAllPerformersQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    address: selectedFilter.city !== 'all' ? selectedFilter.city : undefined,
    status: selectedFilter.status !== 'all' ? selectedFilter.status : undefined
  });

  // API call for rejected accounts
  const { 
    data: rejectedData, 
    isLoading: isRejectedLoading, 
    isFetching: isRejectedFetching, 
    refetch: refetchRejected 
  } = useGetAllPerformersQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    address: selectedFilter.city !== 'all' ? selectedFilter.city : undefined,
    status: 'rejected'
  });

  // Effect to handle tab changes
  useEffect(() => {
    if (activeTab === 'rejected') {
      refetchRejected().then(() => {
        // toast.success('Rejected accounts loaded successfully');
      }).catch(() => {
        // toast.error('Failed to load rejected accounts');
      });
    } else {
      refetchAll().then(() => {
        // toast.success('All accounts loaded successfully');
      }).catch(() => {
        // toast.error('Failed to load all accounts');
      });
    }
  }, [activeTab, currentPage, selectedFilter]);

  const displayData = activeTab === 'all' 
    ? allData?.docs || []
    : rejectedData?.docs || [];

  const totalPages = activeTab === 'all'
    ? allData?.totalPages || 1
    : rejectedData?.totalPages || 1;

  const isLoading = activeTab === 'all' ? isAllLoading : isRejectedLoading;
  const isFetching = activeTab === 'all' ? isAllFetching : isRejectedFetching;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: FilterState) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        refetch={activeTab === 'all' ? refetchAll : refetchRejected}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        cityOptions={cityOptions}
      />
    </div>
  );
}

export default PerformerPage;
