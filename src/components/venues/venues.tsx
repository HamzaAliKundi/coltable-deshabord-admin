import { useState } from "react";
import Pagination from "../../common/Pagination";

const Venues = () => {
    const venues = [
        { id: 1, name: "Grand Ballroom", location: "Downtown Hotel", capacity: "500", status: "pending", image: "/events/event.svg" },
        { id: 2, name: "Rooftop Garden", location: "City Center", capacity: "200", status: "approved", image: "/events/event.svg" },
        { id: 3, name: "Convention Hall", location: "Business District", capacity: "1000", status: "rejected", image: "/events/event.svg" },
        { id: 4, name: "Beach Club", location: "Coastal Area", capacity: "300", status: "pending", image: "/events/event.svg" },
    ];

    const getStatusColor = (status: string) => {
        if (status === 'approved') return 'text-green-500';
        if (status === 'rejected') return 'text-red-500';
        return 'text-yellow-500';
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
          {venues.map((venue) => (
            <div key={venue.id} className="bg-[#212121] rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img src={venue.image} alt={venue.name} className="w-full sm:w-20 h-20 rounded-[8px] object-cover"/>
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-white font-['Space_Grotesk'] font-bold text-base sm:text-lg capitalize">{venue.name}</h2>
                <div className="flex flex-col sm:flex-row flex-wrap gap-x-4 text-gray-400 text-xs sm:text-sm">
                  <p>Location: {venue.location}</p>
                  <p>Capacity: {venue.capacity}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 bg-[#FF00A2] text-white text-xs sm:text-sm font-medium rounded-[30px]">View Detail</button>
                <button className="flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 border-2 border-gray-600 text-white text-xs sm:text-sm font-medium rounded-[30px]">Approve</button>
                <button className="flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 border-2 border-gray-600 text-white text-xs sm:text-sm font-medium rounded-[30px]">Reject</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Pagination />
        </div>
      </div>
    )
}

export default Venues
