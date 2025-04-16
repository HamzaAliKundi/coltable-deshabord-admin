import React, { useState } from 'react'

const Ad = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index: any) => {
    setIsModalOpen(true);
    setSelectedImage(index);
  };

  const AdSection = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-[#212121] rounded-lg p-6 mb-6">
      <h2 className="text-[#FF00A2] text-[20px] font-['Space_Grotesk'] leading-[100%] tracking-[0%] uppercase mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square bg-[#1A1A1A] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[#878787] text-[14px] font-['Space_Grotesk'] leading-[140%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32 mt-6">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-white text-xl md:text-2xl font-bold">
          Advertisement
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AdSection 
            title="Advertisement Banner"
            description="Please upload an image with the dimensions 1200 x 300 pixels"
          />
          <AdSection 
            title="Advertisement Banner Performer Profile"
            description="Please upload an image with the dimensions 1200 x 300 pixels"
          />
          <AdSection 
            title="Advertisement Banner Venue Profile"
            description="Please upload an image with the dimensions 1200 x 300 pixels"
          />
        </div>
        <div className="bg-[#212121] rounded-lg p-6">
          <h2 className="text-white text-lg font-bold mb-4">Preview</h2>
          <div className="aspect-video bg-[#1A1A1A] rounded-lg flex items-center justify-center">
            <p className="text-[#878787] text-sm">Preview will appear here</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-[#212121] rounded-lg p-10 max-w-[90%] w-[600px] relative">
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

            <div className="mb-8 aspect-video bg-black rounded-lg flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="w-[150px] sm:w-[200px] px-4 sm:px-6 md:px-8 py-2 rounded-full bg-[#FF00A2] text-white text-sm md:text-base"
              >
                +Upload/Replace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ad
