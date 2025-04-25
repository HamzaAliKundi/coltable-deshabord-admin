import React, { useState } from 'react';
import Venues from '../../components/venues/venues';
import { useGetAllVenuesQuery } from '../../apis/venues';
import { useSearchParams } from 'react-router-dom';

const VenuesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 4;

  const { data, isLoading, isFetching, refetch } = useGetAllVenuesQuery({
    page,
    limit,
    status: selectedFilter === 'all' ? undefined : selectedFilter
  });

  console.log('Venues Page Raw Data:', data);
  console.log('Venues Page Loading:', isLoading);
  console.log('Venues Page Fetching:', isFetching);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleFilterChange = async (filter: string) => {
    setSelectedFilter(filter);
    setSearchParams({ page: '1' });
  };

  return (
    <Venues
      venuesData={data?.data || []}
      isLoading={isLoading}
      currentPage={page}
      totalPages={data?.totalPages || 0}
      isPageLoading={isFetching}
      onPageChange={handlePageChange}
      refetch={refetch}
      selectedFilter={selectedFilter}
      onFilterChange={handleFilterChange}
    />
  );
};

export default VenuesPage;
