import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../common/Pagination';
import { useUpdatePerformerStatusMutation, useDeletePerformerMutation } from '../../apis/performer';
import toast from 'react-hot-toast';

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
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  cityOptions: { value: string; label: string }[];
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
  refetch,
  selectedFilter,
  onFilterChange,
  cityOptions
}: PerformerProps) => {
  const [updateStatus] = useUpdatePerformerStatusMutation();
  const [deletePerformer] = useDeletePerformerMutation();
  const [loadingApprove, setLoadingApprove] = useState('');
  const [loadingReject, setLoadingReject] = useState('');
  const [loadingDelete, setLoadingDelete] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredOptions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return [
      { value: 'all', label: 'All Areas & Status' },
      { value: 'approved', label: 'Approved Performers' },
      { value: 'rejected', label: 'Rejected Performers' },
      ...cityOptions
    ].filter(option => 
      option.label.toLowerCase().includes(query)
    );
  }, [searchQuery, cityOptions]);

  const selectedLabel = useMemo(() => {
    if (selectedFilter === 'all') return 'All Areas & Status';
    if (selectedFilter === 'approved') return 'Approved Performers';
    if (selectedFilter === 'rejected') return 'Rejected Performers';
    return cityOptions.find(city => city.label === selectedFilter)?.label || 'All Areas & Status';
  }, [selectedFilter, cityOptions]);

  const handleApprove = async (id: string) => {
    if (loadingApprove) return;
    try {
      setLoadingApprove(id);
     const res =  await updateStatus({ id, status: 'approved' }).unwrap();
      if (res.success === true) {
        toast.success('Performer approved successfully');
        await refetch();
      }
    } catch (error) {
      toast.error('Failed to approve performer');
    } finally {
      setLoadingApprove('');
    }
  };

  const handleReject = async (id: string) => {
    if (loadingReject) return;
    try {
      setLoadingReject(id);
      const res = await updateStatus({ id, status: 'rejected' }).unwrap();
      if (res.success === true) {
        toast.success('Performer rejected successfully');
        await refetch();
      }
    } catch (error) {
      toast.error('Failed to reject performer');
    } finally {
      setLoadingReject('');
    }
  };

  const handleDelete = async (id: string) => {
    if (loadingDelete) return;
    try {
      setLoadingDelete(id);
      const res = await deletePerformer(id).unwrap();
      if (res.success === true) {
        toast.success('Performer deleted successfully');
        await refetch();
      }
    } catch (error) {
      toast.error('Failed to delete performer');
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
          <div 
            className="w-[200px] sm:w-[250px] h-[35px] rounded-[8px] border border-[#FF00A2] bg-transparent text-white px-3 pr-8 cursor-pointer flex items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-xs sm:text-sm truncate">{selectedLabel}</span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="#BEBEBE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-[200px] sm:w-[250px] bg-[#212121] rounded-[8px] border border-[#FF00A2] z-10">
              <div className="p-2">
                <input
                  type="text"
                  className="w-full h-[30px] rounded-[4px] bg-black text-white text-xs px-2 outline-none border border-[#FF00A2]"
                  placeholder="Search city or status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                {filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`px-3 py-2 text-xs sm:text-sm cursor-pointer hover:bg-[#FF00A2]/10 ${
                      selectedFilter === option.value ? 'bg-[#FF00A2]/20' : ''
                    }`}
                    onClick={() => {
                      onFilterChange(option.value);
                      setIsDropdownOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF00A2]"></div>
          </div>
        ) : (
          perFormerData?.map((user: any) => (
            <div
              key={user._id}
              className="w-[calc(100%-8px)] max-w-[250px] cursor-pointer h-[250px] sm:h-[300px] relative"
              onClick={() => navigate(`/performers/${user._id}`)}
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
                          className="w-full cursor-pointer h-5 sm:h-7 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(user._id);
                          }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(user._id);
                          }}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(user._id);
                            }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(user._id);
                          }}
                          disabled={loadingApprove === user._id}
                        >
                          {loadingApprove === user._id ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mx-auto"></div>
                          ) : 'Approve Profile'}
                        </button>
                      </div>
                      <button 
                        className="w-full h-5 sm:h-7 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(user._id);
                        }}
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
        {perFormerData?.length > 0 && (
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

export default Performer;