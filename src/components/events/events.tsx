import { useState } from "react";
import Pagination from "../../common/Pagination";

const Events = () => {
    const [activeTab, setActiveTab] = useState('performer');
    
    const performerEvents = [
        { id: 1, name: "Summer Music Festival", location: "Central Park", date: "2024-06-15", time: "18:00", status: "pending", image: "/events/event.svg" },
        { id: 2, name: "Jazz Night", location: "Downtown Club", date: "2024-07-20", time: "20:00", status: "approved", image: "/events/event.svg" },
        { id: 3, name: "Rock Concert", location: "Stadium Arena", date: "2024-08-10", time: "19:30", status: "rejected", image: "/events/event.svg" },
        { id: 4, name: "EDM Party", location: "Beach Club", date: "2024-09-05", time: "22:00", status: "pending", image: "/events/event.svg" },
    ];

    const venueEvents = [
        { id: 1, name: "Food Truck Festival", location: "City Square", date: "2024-06-25", time: "12:00", status: "approved", image: "/events/event.svg" },
        { id: 2, name: "Art Exhibition", location: "Modern Art Gallery", date: "2024-07-15", time: "10:00", status: "pending", image: "/events/event.svg" },
        { id: 3, name: "Comedy Night", location: "Comedy Club", date: "2024-08-05", time: "21:00", status: "rejected", image: "/events/event.svg" },
        { id: 4, name: "Wine Tasting", location: "Vineyard Estate", date: "2024-09-15", time: "17:00", status: "approved", image: "/events/event.svg" },
    ];

    const adminEvents = [
        { id: 1, name: "Corporate Event", location: "Business Center", date: "2024-06-30", time: "09:00", status: "approved", image: "/events/event.svg" },
        { id: 2, name: "Charity Gala", location: "Grand Hotel", date: "2024-07-25", time: "19:00", status: "pending", image: "/events/event.svg" },
        { id: 3, name: "Product Launch", location: "Tech Hub", date: "2024-08-15", time: "14:00", status: "rejected", image: "/events/event.svg" },
        { id: 4, name: "Conference", location: "Convention Hall", date: "2024-09-20", time: "08:00", status: "approved", image: "/events/event.svg" },
    ];

    const getEvents = () => {
        if (activeTab === 'performer') return performerEvents;
        if (activeTab === 'venue') return venueEvents;
        return adminEvents;
    };

    const getStatusColor = (status: string) => {
        if (status === 'approved') return 'text-green-500';
        if (status === 'rejected') return 'text-red-500';
        return 'text-yellow-500';
    };
  
    return (
      <div className="bg-black p-4 md:p-8 w-full mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 w-full md:w-auto">
            <button className={`w-full md:w-auto px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${activeTab === 'performer' ? 'text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('performer')}>
              Events by Performers
              {activeTab === 'performer' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>}
            </button>
            <button className={`w-full md:w-auto px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${activeTab === 'venue' ? 'text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('venue')}>
              Events by Venues
              {activeTab === 'venue' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>}
            </button>
            <button className={`w-full md:w-auto px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${activeTab === 'admin' ? 'text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('admin')}>
              Events by Admin
              {activeTab === 'admin' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>}
            </button>
          </div>
          <div className="relative w-full md:w-auto">
            <select className="w-full md:w-[121px] h-[30px] sm:h-[35px] rounded-[8px] border border-[#FF00A2] bg-transparent text-white px-2 sm:px-3 pr-6 sm:pr-8 appearance-none outline-none text-xs sm:text-sm">
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

        <div className="space-y-4">
          {getEvents().map((event) => (
            <div key={event.id} className="bg-[#212121] rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img src={event.image} alt={event.name} className="w-full sm:w-20 h-20 rounded-[8px] object-cover"/>
              <div className="flex-1 w-full sm:w-auto">
                <h2 className="text-white font-['Space_Grotesk'] font-bold text-base sm:text-lg capitalize">{event.name}</h2>
                <div className="flex flex-col sm:flex-row flex-wrap gap-x-4 text-gray-400 text-xs sm:text-sm">
                  <p>Location: {event.location}</p>
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
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

export default Events