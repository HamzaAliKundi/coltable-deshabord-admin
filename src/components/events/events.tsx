import React, { useState } from 'react'

const Events = () => {
    const [activeTab, setActiveTab] = useState('performer');
  
    return (
      <div className="bg-black p-4 md:p-8 w-full mb-32">
        {/* Tab Navigation */}
        <div className="flex gap-4 md:gap-8 mb-6 md:mb-8 overflow-x-auto">
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === 'performer' ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('performer')}
          >
            Events by Performers
            {activeTab === 'performer' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
            )}
          </button>
          <button
            className={`px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === 'venue' ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('venue')}
          >
            Events by Venues
            {activeTab === 'venue' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500"></div>
            )}
          </button>
        </div>

        {/* Event Card */}
        <div className="bg-[#212121] rounded-[8px] overflow-hidden w-full max-w-[570px] flex flex-col md:flex-row">
          {/* Left side - Image with date badge */}
          <div className="p-2 md:p-4">
            <img 
              src="/events/event.svg" 
              alt="Festival crowd" 
              className="w-full md:w-[250px] h-[200px] md:h-[250px] rounded-[8px] object-cover"
            />
          </div>
          
          {/* Right side - Event details */}
          <div className="flex-1 p-3 md:p-6 flex flex-col">
            {/* Event title */}
            <h2 className="text-white font-['Space_Grotesk'] font-bold text-lg md:text-2xl capitalize mb-4 md:mb-0">
              Barcelona Food Truck Festival 2018
            </h2>
            
            {/* Action buttons */}
            <div className="mt-4 md:mt-auto space-y-2 md:space-y-4">
              {/* View details button */}
              <button className="w-full md:w-[258px] h-[40px] md:h-[51px] bg-[#FF00A2] text-white text-sm md:text-base font-medium rounded-[30px]">
                VIEW DETAILS
              </button>
              
              {/* Delete and edit buttons */}
              <div className="flex gap-2 md:gap-4">
                <button className="w-full md:w-[144px] h-[40px] md:h-[56px] border-2 md:border-[3px] border-gray-600 text-white text-sm md:text-base font-medium rounded-[82px]">
                  DELETE EVENT
                </button>
                <button className="w-[60px] md:w-[80px] h-[40px] md:h-[56px] border-2 md:border-[3px] border-gray-600 text-white text-sm md:text-base font-medium rounded-[82px]">
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Events