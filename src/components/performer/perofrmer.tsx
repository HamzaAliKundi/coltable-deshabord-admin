import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../common/Pagination';
import { useUpdatePerformerStatusMutation, useDeletePerformerMutation } from '../../apis/performer';

interface PerformerProps {
  perFormerData: any[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  isPageLoading: boolean;
  onPageChange: (page: number) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  refetch: () => void;
}

const Performer = ({ 
  perFormerData, 
  isLoading, 
  currentPage,
  totalPages,
  isPageLoading,
  onPageChange,
  activeTab,
  onTabChange,
  refetch 
}: PerformerProps) => {
  const [updateStatus] = useUpdatePerformerStatusMutation();
  const [deletePerformer] = useDeletePerformerMutation();
  const [loadingApprove, setLoadingApprove] = useState('');
  const [loadingReject, setLoadingReject] = useState('');
  const [loadingDelete, setLoadingDelete] = useState('');

  const filteredUsers = activeTab === 'all' 
    ? perFormerData 
    : perFormerData?.filter((user: any) => user.status === 'rejected');

  // Calculate filtered total pages
  const filteredTotalPages = activeTab === 'all' 
    ? totalPages 
    : Math.ceil((filteredUsers?.length || 0) / 10);

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
      await deletePerformer(id).unwrap();
      await refetch();
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setLoadingDelete('');
    }
  };

  return (
    <div className="bg-black p-4 sm:p-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="flex gap-4 sm:gap-8">
          <button
            className={`px-3 sm:px-6 py-2 sm:py-4 font-bold text-[8px] sm:text-[10px] md:text-[12px] lg:text-sm transition-all duration-300 relative ${
              activeTab === "all" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => onTabChange("all")}
          >
            All Accounts
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
          <button
            className={`px-3 sm:px-6 py-2 sm:py-4 font-bold text-[8px] sm:text-[10px] md:text-[12px] lg:text-sm transition-all duration-300 relative ${
              activeTab === "rejected" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => onTabChange("rejected")}
          >
            Rejected Accounts
            {activeTab === "rejected" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
        </div>
        <div className="relative">
          <select className="w-[100px] sm:w-[121px] h-[30px] sm:h-[35px] rounded-[8px] border border-[#FF00A2] bg-transparent text-white px-2 sm:px-3 pr-6 sm:pr-8 appearance-none outline-none text-xs sm:text-sm">
            <option value="">Filter by</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#BEBEBE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF00A2]"></div>
          </div>
        ) : (
          filteredUsers?.map((user: any) => (
            <div
              key={user._id}
              className="w-[calc(100%-8px)] max-w-[250px] h-[250px] sm:h-[300px] relative"
            >
              <div className="relative">
                <img
                  src={user.images[0]}
                  alt={user.firstName}
                  className="w-full h-[120px] sm:h-[150px] rounded-[8px] object-cover"
                />
                <div className="w-1/2 -bottom-0.5 absolute left-12 h-[2px] sm:h-[3px] bg-[#FF00A2] rounded-[10px]"></div>
                <div className="absolute bottom-[-20px] sm:bottom-[-25px] left-[20px] sm:left-[25px]">
                  <img
                    src="/users/crown.svg"
                    alt="Crown"
                    className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
                  />
                </div>
              </div>

              <div className="bg-[] text-black rounded-b-[8px] px-3 sm:px-4 pb-3 sm:pb-4 mt-[-8px] flex flex-col justify-between h-[120px] sm:h-[150px]">
                <h3 className="font-['Space_Grotesk'] text-white font-bold text-base sm:text-lg md:text-lg mt-6 sm:mt-8">
                  {user.firstName}
                </h3>

                <div className="space-y-1 sm:space-y-2">
                  {activeTab === "all" ? (
                    <>
                      {user.status === 'approved' ? (
                        <button 
                          className="w-full h-5 sm:h-7 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                          disabled={true}
                        >
                          Approved Profile
                        </button>
                      ) : (
                        <button 
                          className="w-full h-5 sm:h-7 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                          onClick={() => handleApprove(user._id)}
                          disabled={loadingApprove === user._id}
                        >
                          {loadingApprove === user._id ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                          ) : 'Approve Profile'}
                        </button>
                      )}
                      <div className="flex gap-1 sm:gap-2">
                        <button 
                          className="w-1/2 h-5 sm:h-7 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                          onClick={() => handleDelete(user._id)}
                          disabled={loadingDelete === user._id}
                        >
                          {loadingDelete === user._id ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                          ) : 'Delete'}
                        </button>
                        {user.status === 'rejected' ? (
                          <button 
                            className="w-1/2 h-5 sm:h-7 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                            disabled={true}
                          >
                            Rejected
                          </button>
                        ) : (
                          <button 
                            className="w-1/2 h-5 sm:h-7 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                            onClick={() => handleReject(user._id)}
                            disabled={loadingReject === user._id}
                          >
                            {loadingReject === user._id ? (
                              <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                            ) : 'Reject'}
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center mb-1">
                        <button 
                          className="w-full h-5 sm:h-7 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                          onClick={() => handleApprove(user._id)}
                          disabled={loadingApprove === user._id}
                        >
                          {loadingApprove === user._id ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                          ) : 'Approve Profile'}
                        </button>
                      </div>
                      <button 
                        className="w-full h-5 sm:h-7 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                        onClick={() => handleDelete(user._id)}
                        disabled={loadingDelete === user._id}
                      >
                        {loadingDelete === user._id ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                        ) : 'Delete Profile'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-8">
        {filteredUsers?.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={filteredTotalPages}
            isLoading={isPageLoading}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Performer;