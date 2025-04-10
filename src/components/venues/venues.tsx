import React, { useState } from 'react'

const Venues = () => {
  const [activeTab, setActiveTab] = useState("listing");

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32">
      {/* Tab Navigation */}
      <div className="flex gap-4 md:gap-8 mb-6 md:mb-8 overflow-x-auto">
        <button
          className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
            activeTab === "listing" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("listing")}
        >
          Event Listing
          {activeTab === "listing" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
          )}
        </button>
        <button
          className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
            activeTab === "create" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create an Event
          {activeTab === "create" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
          )}
        </button>
      </div>
      <h1 className="font-['Space_Grotesk'] font-normal text-[32px] leading-none text-white capitalize">Event Listing</h1>
           {/* Event Card */}
        <div className="bg-[#212121] mt-7 rounded-[8px] overflow-hidden w-full max-w-[600px] flex flex-col md:flex-row">
          {/* Left side - Image with date badge */}
          <div className="p-2 md:p-4">
            <img 
              src="/events/event.svg" 
              alt="Festival crowd" 
              className="w-full h-[250px] md:w-[275px] md:h-[250px] lg:w-[275] lg:h-[300px] rounded-[8px] object-cover"
            />
          </div>
          
          {/* Right side - Event details */}
          <div className="flex-1 p-3 md:p-3 flex flex-col">
            {/* Event title */}
            <h2 className="text-white font-['Space_Grotesk'] font-bold text-lg md:text-2xl capitalize mb-4 md:mb-0">
              Barcelona Food Truck Festival 2018
            </h2>

            <div className="flex flex-col gap-2 mt-2 md:mt-6 lg:mt-8">
              <div className="flex items-center gap-2">
                <img src="/venues/time.svg" alt="Time" className="w-5 h-5" />
                <p className="font-['Space_Grotesk'] font-normal text-base leading-none text-white">Start 20:00pm - 22:00pm</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <img src="/venues/location.svg" alt="Location" className="w-5 h-5" />
                <p className="font-['Space_Grotesk'] font-normal text-base leading-none text-white">Manhattan, New York</p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="mt-6  space-y-2 md:space-y-4">
              <div className="flex gap-2 md:gap-3">
                <button className="w-full md:w-[144px] h-[40px] bg-[#FF00A2] md:h-[56px]  md:border-[3px] border-[#FF00A2]  text-white text-sm md:text-base font-normal rounded-[82px]">
                  VIEW DETAILS
                </button>
                <button className="w-[60px] md:w-[90px] h-[40px] bg-[#FF00A2] md:h-[56px] md:border-[3px] border-[#FF00A2]  text-white text-sm md:text-base font-normal rounded-[82px]">
                  REJECTS
                </button>
              </div>

              <button className="w-full md:w-[258px] h-[40px] md:h-[51px] bg-[#FF00A2] text-white text-sm md:text-base font-medium rounded-[30px]">
                APPROVED
              </button>
            </div>
          </div>
        </div>
        
    </div>
  );
}

export default Venues
