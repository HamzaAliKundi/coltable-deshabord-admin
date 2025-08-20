import { useState, useEffect } from "react";
import PerformerEvents from "./PerformerEvents";
import VenueEvents from "./VenueEvents";
import AdminEvents from "./AdminEvents";
import { Link } from "react-router-dom";

const Events = () => {
  const [activeTab, setActiveTab] = useState("performer");
  const [pastFilter, setPastFilter] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePastFilterChange = (value: string) => {
    setPastFilter(value === "past");
  };

  // Reset to first page when filter changes
  useEffect(() => {
    // This will trigger a refetch in child components when pastFilter changes
  }, [pastFilter]);

  const renderContent = () => {
    switch (activeTab) {
      case "performer":
        return <PerformerEvents key={`performer-${pastFilter}`} pastFilter={pastFilter} />;
      case "venue":
        return <VenueEvents key={`venue-${pastFilter}`} pastFilter={pastFilter} />;
      case "admin":
        return <AdminEvents key={`admin-${pastFilter}`} pastFilter={pastFilter} />;
      default:
        return <PerformerEvents key={`performer-${pastFilter}`} pastFilter={pastFilter} />;
    }
  };

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 w-full md:w-auto">
          <button
            className={`w-full md:w-auto px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "performer" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleTabChange("performer")}
          >
            Events by Performers
            {activeTab === "performer" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
          <button
            className={`w-full md:w-auto px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "venue" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleTabChange("venue")}
          >
            Events by Venues
            {activeTab === "venue" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
          <button
            className={`w-full md:w-auto px-3 md:px-6 py-2 md:py-4 font-bold text-sm md:text-base transition-all duration-300 relative whitespace-nowrap ${
              activeTab === "admin" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleTabChange("admin")}
          >
            Events by Admin
            {activeTab === "admin" && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
            )}
          </button>
        </div>
        <div className="relative w-full md:w-auto">
          <select 
            className="w-full md:w-[121px] h-[30px] sm:h-[35px] rounded-[8px] border border-[#FF00A2] bg-[#212121] text-white px-2 sm:px-3 pr-6 sm:pr-8 appearance-none outline-none text-xs sm:text-sm cursor-pointer hover:bg-[#2a2a2a] transition-colors"
            onChange={(e) => handlePastFilterChange(e.target.value)}
            value={pastFilter ? "past" : "all"}
            style={{
              color: 'white',
              backgroundColor: '#212121'
            }}
          >
            <option value="all" className="bg-[#212121] text-white hover:bg-[#2a2a2a]">All Events</option>
            <option value="past" className="bg-[#212121] text-white hover:bg-[#2a2a2a]">Past Events</option>
          </select>
          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
      <div className="text-white  flex justify-end">
        <Link
          to="/events/create-event"
          className=" flex gap-2 items-center font-['Space_Grotesk']"
        >
          <img src="/events/event-create.svg" alt="create-event" />
          CREATE NEW EVENT
        </Link>
      </div>
      {renderContent()}
    </div>
  );
};

export default Events;
