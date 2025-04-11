import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [activeTab, setActiveTab] = useState('all');

  const users = [
    {
      id: 1,
      name: "Adriana LaRue",
      mainImage: "/users/singer.svg",
      logoImage: "/users/crown.svg", 
      status: "pending"
    },
    {
      id: 2,
      name: "Adriana LaRue", 
      mainImage: "/users/singer.svg",
      logoImage: "/users/crown.svg",
      status: "approved"
    },
    {
      id: 3,
      name: "Adriana LaRue",
      mainImage: "/users/singer.svg",
      logoImage: "/users/crown.svg", 
      status: "pending"
    },
    {
      id: 4,
      name: "Adriana LaRue",
      mainImage: "/users/singer.svg",
      logoImage: "/users/crown.svg",
      status: "approved"
    },
    {
      id: 5,
      name: "Adriana LaRue",
      mainImage: "/users/singer.svg",
      logoImage: "/users/crown.svg",
      status: "rejected"
    },
    {
      id: 6,
      name: "Adriana LaRue",
      mainImage: "/users/singer.svg",
      logoImage: "/users/crown.svg",
      status: "pending"
    },
    {
      id: 7,
      name: "Adriana LaRue",
      mainImage: "/users/singer.svg",
      logoImage: "/users/crown.svg",
      status: "approved"
    }
  ];

  const filteredUsers = activeTab === 'all' ? users : users.filter(user => user.status === 'rejected');

  return (
    <div className="bg-black p-4 sm:p-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 sm:gap-8 mb-6 sm:mb-8">
        <button 
          className={`px-3 sm:px-6 py-2 sm:py-4 font-bold text-sm sm:text-base transition-all duration-300 relative ${
            activeTab === 'all' ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Accounts
          {activeTab === 'all' && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
          )}
        </button>
        <button
          className={`px-3 sm:px-6 py-2 sm:py-4 font-bold text-sm sm:text-base transition-all duration-300 relative ${
            activeTab === 'rejected' ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected Accounts
          {activeTab === 'rejected' && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
          )}
        </button>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
        {filteredUsers.map((user) => (
          <div key={user.id} className="w-full max-w-[350px] mx-auto h-[300px] sm:h-[500px] relative">
            {/* Main Image */}
            <div className="relative">
              <img
                src={user.mainImage}
                alt={user.name}
                className="w-full h-[150px] sm:h-[250px] rounded-[8px] object-cover"
              />
              <div className="w-1/2 -bottom-0.5 absolute left-16 h-[3px] sm:h-[4px] bg-[#FF00A2] rounded-[10px]"></div>
              {/* Logo/Icon Image */}
              <div className="absolute bottom-[-25px] sm:bottom-[-40px] left-[25px] sm:left-[35px]">
                <img
                  src={user.logoImage}
                  alt="Crown"
                  className="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px]"
                />
              </div>
            </div>

            <div className="bg-[] text-black rounded-b-[8px] px-4 sm:px-6 pb-4 sm:pb-6 mt-[-8px] flex flex-col justify-between h-[140px] sm:h-[250px]">
              <h3 className="font-['Space_Grotesk'] text-white font-bold text-lg sm:text-2xl mt-8 sm:mt-16">
                {user.name}
              </h3>

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-4">
                {user.status === 'pending' ? (
                  <>
                    <div className="flex gap-2 sm:gap-4">
                      <button className="w-1/2 h-6 sm:h-10 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] text-[8px] sm:text-sm uppercase">
                        View Profile
                      </button>
                      <button className="w-1/2 h-6 sm:h-10 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[8px] sm:text-sm uppercase">
                        Edit Profile
                      </button>
                    </div>
                    <button className="w-full h-6 sm:h-10 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[8px] sm:text-sm uppercase">
                      Other Options
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center mb-2">
                      <button className="w-full h-6 sm:h-10 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] text-[8px] sm:text-sm uppercase">
                        Approve Profile
                      </button>
                    </div>
                    <button className="w-full h-6 sm:h-10 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] text-[8px] sm:text-sm uppercase">
                        Reject Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;