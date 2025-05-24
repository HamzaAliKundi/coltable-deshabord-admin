import React, { useState } from "react";
import Pagination from "../../common/Pagination";
import { useGetAllImagesQuery, useUpdateImageMutation } from "../../apis/media";

interface ImageDoc {
  _id: string;
  user: string;
  userType: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Media = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageDoc | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionType, setActionType] = useState<null | 'approved' | 'rejected'>(null);

  const { data, isLoading, isError, refetch } = useGetAllImagesQuery({
    limit: 10,
    page: currentPage,
    sort: -1,
  });

  const [updateImage] = useUpdateImageMutation();

  const handleImageClick = (image: ImageDoc) => {
    setIsModalOpen(true);
    setSelectedImage(image);
  };

  const handleApproveReject = async (status: string) => {
    if (!selectedImage) return;
    setActionLoading(true);
    setActionType(status as 'approved' | 'rejected');
    try {
      await updateImage({ id: selectedImage._id, payload: { status } }).unwrap();
      setIsModalOpen(false);
      setSelectedImage(null);
      refetch();
    } catch (e) {
      // handle error if needed
    } finally {
      setActionLoading(false);
      setActionType(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-white text-xl md:text-2xl font-bold">
          Media <span className="text-[#FF00A2]">*</span>
        </h1>
        <div className="relative">
          <select className="w-[121px] h-[35px] rounded-[8px] border border-[#FF00A2] bg-transparent text-white px-3 pr-8 appearance-none outline-none text-sm">
            <option value="">Filter by</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="8"
              height="5"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#BEBEBE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="aspect-square bg-[#212121] rounded-lg animate-pulse" />
          ))
        ) : data && data.docs && data.docs.length > 0 ? (
          data.docs.map((img: ImageDoc) => (
            <div
              key={img._id}
              onClick={() => handleImageClick(img)}
              className="aspect-square bg-[#212121] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={img.image}
                alt={img._id}
                className="object-cover w-full h-full rounded-lg"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <span className="text-white text-lg font-semibold mb-2">No images found.</span>
            <span className="text-[#FF00A2] text-sm">There are currently no images to display.</span>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-[#212121] rounded-lg p-10 max-w-[90%] w-[600px] relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#E5E5E5] flex items-center justify-center hover:bg-[#FF00A2] transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Image container with padding */}
            <div className="mb-8 aspect-video bg-black rounded-lg flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage._id}
                className="object-contain max-h-60 rounded-lg"
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handleApproveReject("rejected")}
                className="w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-l-full border border-[#FF00A2] text-[#FF00A2] text-sm md:text-base flex items-center justify-center"
                disabled={actionLoading}
              >
                {actionLoading && actionType === 'rejected' ? (
                  <span className="mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-[#FF00A2] rounded-full animate-spin align-middle"></span>
                ) : null}
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleApproveReject("approved")}
                className="w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-r-full bg-[#FF00A2] text-white text-sm md:text-base flex items-center justify-center"
                disabled={actionLoading}
              >
                {actionLoading && actionType === 'approved' ? (
                  <span className="mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin align-middle"></span>
                ) : null}
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
      {data && data.docs && data.docs.length > 0 && (
        <div className="mt-12">
          <Pagination
            currentPage={data?.page || 1}
            totalPages={data?.totalPages || 1}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Media;
