import React, { useState } from 'react'
import { useGetReviewsQuery, useUpdateReviewStatusMutation } from '../../apis/reviews'
import Pagination from '../../common/Pagination'
import { toast } from 'react-hot-toast'

interface ReviewCardProps {
  id: string;
  name: string;
  rating: number;
  text: string;
  status: string;
  isFirstInRow?: boolean;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  isUpdating: boolean;
}

interface Review {
  _id: string;
  name: string;
  description: string;
  rating: number;
  status: string;
  isAnonymous: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReviewsResponse {
  docs: Review[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  id, 
  name, 
  rating, 
  text, 
  status, 
  isFirstInRow,
  onApprove,
  onReject,
  isUpdating
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const maxLength = 100;
  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate && !isExpanded ? `${text.substring(0, maxLength)}...` : text;
  
  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';

  const handleApprove = async () => {
    if (isApproved) return;
    setIsApproving(true);
    try {
      await onApprove(id);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (isRejected) return;
    setIsRejecting(true);
    try {
      await onReject(id);
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className={`p-6 rounded-xl relative bg-gradient-to-r from-[#0D0D0D] to-[#FF00A2]/60`}>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <div>
              <h3 className="font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] tracking-[0%] align-middle uppercase text-white">{name}</h3>
              <div className="flex gap-0.5">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 w-[10.8px] h-[10.8px] left-[10.8px]">★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                isApproved 
                  ? 'bg-green-600 text-white cursor-default' 
                  : 'bg-[#FF00A2] hover:bg-[#FF00A2]/80 text-white'
              }`}
              onClick={handleApprove}
              disabled={isApproved || isApproving || isRejecting || isUpdating}
            >
              {isApproving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : isApproved ? 'Approved' : 'Approve'}
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                isRejected 
                  ? 'bg-red-600 text-white cursor-default' 
                  : 'bg-[#212121] hover:bg-[#333333] text-white'
              }`}
              onClick={handleReject}
              disabled={isRejected || isApproving || isRejecting || isUpdating}
            >
              {isRejecting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : isRejected ? 'Rejected' : 'Reject'}
            </button>
          </div>
        </div>
        <p className="font-['Space_Grotesk'] mt-8 font-normal text-[18px] leading-[100%] tracking-[0%] align-middle capitalize text-white/80">
          {displayText}
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-white underline ml-2 hover:text-[#FF00A2] transition-colors"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
    </div>
  )
}

const Reviews = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetReviewsQuery({ page, limit: 10 });
  const [updateReviewStatus, { isLoading: isUpdating }] = useUpdateReviewStatusMutation();

  if (isLoading) return <div className="p-4 text-center text-white">Loading reviews...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error loading reviews</div>;

  const reviewsData = data as ReviewsResponse;
  const reviews = reviewsData?.docs || [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleApprove = async (id: string) => {
    try {
      await updateReviewStatus({ id, status: 'approved' }).unwrap();
      toast.success('Review approved successfully');
    } catch (error) {
      toast.error('Failed to approve review');
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateReviewStatus({ id, status: 'rejected' }).unwrap();
      toast.success('Review rejected successfully');
    } catch (error) {
      toast.error('Failed to reject review');
      console.error('Error rejecting review:', error);
    }
  };

  return (
    <div className="p-4 md:px-8 py-16 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {reviews.map((review: Review, index: number) => (
          <ReviewCard 
            key={review._id} 
            id={review._id}
            name={review.name || "Anonymous"}
            rating={review.rating || 0}
            text={review.description || "No review text provided"}
            status={review.status}
            isFirstInRow={index % 2 === 0} 
            onApprove={handleApprove}
            onReject={handleReject}
            isUpdating={isUpdating}
          />
        ))}
      </div>
      
      {reviews.length === 0 && (
        <div className="text-center text-white mt-8">No reviews found</div>
      )}
      
      <div className="mt-8">
        <Pagination 
          currentPage={reviewsData?.page || 1}
          totalPages={reviewsData?.totalPages || 1}
          isLoading={isLoading || isUpdating}
          onPageChange={handlePageChange}
          showPagination={true}
        />
      </div>
    </div>
  )
}

export default Reviews