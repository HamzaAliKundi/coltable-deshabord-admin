import { useState } from 'react';
import Venues from '../../components/venues/venues';
import { useGetAllVenuesQuery } from '../../apis/venues';

const VenuesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, refetch } = useGetAllVenuesQuery({
    page: currentPage,
    limit: 4
  });

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <Venues
      venuesData={data?.docs || []}
      isLoading={isLoading}
      currentPage={currentPage}
      totalPages={data?.totalPages || 0}
      isPageLoading={isFetching}
      onPageChange={handlePageChange}
      refetch={refetch}
    />
  );
};

export default VenuesPage;
