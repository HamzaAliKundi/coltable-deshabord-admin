import React, { useState } from 'react';
import Pagination from '../../common/Pagination';
import { useGetAllVenuesQuery, useUpdateVenueStatusMutation, useDeleteVenueMutation } from '../../apis/venues';

interface VenuesProps {
  venuesData: any[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  isPageLoading: boolean;
  onPageChange: (page: number) => void;
  refetch: () => void;
}

const Venues = ({ 
  venuesData, 
  isLoading, 
  currentPage,
  totalPages,
  isPageLoading,
  onPageChange,
  refetch 
}: VenuesProps) => {
  const [updateStatus] = useUpdateVenueStatusMutation();
  const [deleteVenue] = useDeleteVenueMutation();
  const [loadingApprove, setLoadingApprove] = useState('');
  const [loadingReject, setLoadingReject] = useState('');
  const [loadingDelete, setLoadingDelete] = useState('');

  const handleApprove = async (id: string) => {
    if (loadingApprove) return;
    try {
      setLoadingApprove(id);
      await updateStatus({ id, status: 'approved' }).unwrap();
      await refetch();
    } catch (error) {
      console.error('Failed to approve:', error);
    } finally {
      setLoadingApprove('');
    }
  };

  const handleReject = async (id: string) => {
    if (loadingReject) return;
    try {
      setLoadingReject(id);
      await updateStatus({ id, status: 'rejected' }).unwrap();
      await refetch();
    } catch (error) {
      console.error('Failed to reject:', error);
    } finally {
      setLoadingReject('');
    }
  };

  const handleDelete = async (id: string) => {
    if (loadingDelete) return;
    try {
      setLoadingDelete(id);
      await deleteVenue(id).unwrap();
      await refetch();
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setLoadingDelete('');
    }
  };

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-white text-xl md:text-2xl font-bold">Venues</h1>
        <div className="relative">
          <select className="w-[121px] h-[35px] rounded-[8px] border border-[#FF00A2] bg-transparent text-white px-3 pr-8 appearance-none outline-none text-sm">
            <option value="">Filter by</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#BEBEBE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF00A2]"></div>
          </div>
        ) : (
          venuesData?.map((venue: any) => (
            <div key={venue._id} className="bg-[#212121] rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img 
                src={venue?.logo || "/events/event.svg"} 
                alt={venue.name} 
                className="w-full sm:w-20 h-20 rounded-[8px] object-cover"
              />
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-white font-['Space_Grotesk'] font-bold text-base sm:text-lg capitalize">
                  {venue.name}
                </h2>
                <div className="flex flex-col sm:flex-row flex-wrap gap-x-4 text-gray-400 text-xs sm:text-sm">
                  <p>Location: {venue.location}</p>
                  <p>Capacity: {venue.capacity}</p>
                  <p className={`${
                    venue.status === 'approved' ? 'text-green-500' : 
                    venue.status === 'rejected' ? 'text-red-500' : 
                    'text-yellow-500'
                  }`}>
                    Status: {venue.status}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {venue.status !== 'approved' && (
                  <button 
                    className="flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 bg-[#FF00A2] text-white text-xs sm:text-sm font-medium rounded-[30px]"
                    onClick={() => handleApprove(venue._id)}
                    disabled={loadingApprove === venue._id}
                  >
                    {loadingApprove === venue._id ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                    ) : 'Approve'}
                  </button>
                )}
                {venue.status !== 'rejected' && (
                  <button 
                    className="flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 border-2 border-gray-600 text-white text-xs sm:text-sm font-medium rounded-[30px]"
                    onClick={() => handleReject(venue._id)}
                    disabled={loadingReject === venue._id}
                  >
                    {loadingReject === venue._id ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                    ) : 'Reject'}
                  </button>
                )}
                <button 
                  className="flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 border-2 border-gray-600 text-white text-xs sm:text-sm font-medium rounded-[30px]"
                  onClick={() => handleDelete(venue._id)}
                  disabled={loadingDelete === venue._id}
                >
                  {loadingDelete === venue._id ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                  ) : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-8">
        {venuesData?.length > 0 && totalPages > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isPageLoading}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Venues;
