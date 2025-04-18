import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../common/Pagination';

const Users = () => {
  const [activeTab, setActiveTab] = useState('all');

  const users = [
    { id: 1, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "pending" },
    { id: 2, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "approved" },
    { id: 3, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "pending" },
    { id: 4, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "approved" },
    { id: 5, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "rejected" },
    { id: 6, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "pending" },
    { id: 7, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "approved" },
    { id: 8, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "pending" },
    { id: 9, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "approved" },
    { id: 10, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "rejected" },
    { id: 11, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "pending" },
    { id: 12, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "approved" },
    { id: 13, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "pending" },
    { id: 14, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "approved" },
    { id: 15, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "rejected" },
    { id: 16, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "pending" },
    { id: 17, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "approved" },
    { id: 18, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "pending" },
    { id: 19, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "approved" },
    { id: 20, name: "Adriana LaRue", mainImage: "/users/singer.svg", logoImage: "/users/crown.svg", status: "rejected" }
  ];

  const filteredUsers = activeTab === 'all' ? users : users.filter(user => user.status === 'rejected');

  return (
    <div className="bg-black p-4 sm:p-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="flex gap-4 sm:gap-8">
          <button
            className={`px-3 sm:px-6 py-2 sm:py-4 font-bold text-[8px] sm:text-[10px] md:text-[12px] lg:text-sm transition-all duration-300 relative ${
              activeTab === "all" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("all")}
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
            onClick={() => setActiveTab("rejected")}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="w-full max-w-[250px] mx-auto h-[250px] sm:h-[300px] relative"
          >
            <div className="relative">
              <img
                src={user.mainImage}
                alt={user.name}
                className="w-full h-[120px] sm:h-[150px] rounded-[8px] object-cover"
              />
              <div className="w-1/2 -bottom-0.5 absolute left-12 h-[2px] sm:h-[3px] bg-[#FF00A2] rounded-[10px]"></div>
              <div className="absolute bottom-[-20px] sm:bottom-[-25px] left-[20px] sm:left-[25px]">
                <img
                  src={user.logoImage}
                  alt="Crown"
                  className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
                />
              </div>
            </div>

            <div className="bg-[] text-black rounded-b-[8px] px-3 sm:px-4 pb-3 sm:pb-4 mt-[-8px] flex flex-col justify-between h-[120px] sm:h-[150px]">
              <h3 className="font-['Space_Grotesk'] text-white font-bold text-base sm:text-lg md:text-lg mt-6 sm:mt-8">
                {user.name}
              </h3>

              <div className="space-y-1 sm:space-y-2">
                {user.status === "pending" ? (
                  <>
                    <div className="flex gap-1 sm:gap-2">
                      <button className="w-1/2 h-5 sm:h-7 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase">
                        View Profile
                      </button>
                      <button className="w-1/2 h-5 sm:h-7 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase">
                        Edit Profile
                      </button>
                    </div>
                    <button className="w-full h-5 sm:h-7 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase">
                      Other Options
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center mb-1">
                      <button className="w-full h-5 sm:h-7 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase">
                        Approve Profile
                      </button>
                    </div>
                    <button className="w-full h-5 sm:h-7 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[6px] sm:text-[10px] uppercase">
                      Reject Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Pagination />
      </div>
    </div>
  );
};

export default Users;