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
      status: "suspended"
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

  const filteredUsers = activeTab === 'all' ? users : users.filter(user => user.status === 'suspended');

  return (
    <div className="bg-black p-8">
      {/* Tab Navigation */}
      <div className="flex gap-8 mb-8 border-b border-gray-800">
        <button 
          className={`px-6 py-4 font-bold text-base transition-all duration-300 relative ${
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
          className={`px-6 py-4 font-bold text-base transition-all duration-300 relative ${
            activeTab === 'suspended' ? 'text-white' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('suspended')}
        >
          Suspended Accounts
          {activeTab === 'suspended' && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF00A2]"></div>
          )}
        </button>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredUsers.map((user) => (
          <div key={user.id} className="w-full max-w-[350px] mx-auto h-[500px] relative">
            {/* Main Image */}
            <div className="relative">
              <img
                src={user.mainImage}
                alt={user.name}
                className="w-full h-[250px] rounded-[8px] object-cover"
              />
              <div className="w-1/2 -bottom-0.5 absolute left-16 h-[4px] bg-[#FF00A2] rounded-[10px]"></div>
              {/* Logo/Icon Image */}
              <div className="absolute bottom-[-40px] left-[35px]">
                <img
                  src={user.logoImage}
                  alt="Crown"
                  className="w-[80px] h-[80px]"
                />
              </div>
            </div>

            <div className="bg-[] text-black rounded-b-[8px] px-6 pb-6 mt-[-8px] h-[250px] flex flex-col">
              <div className="flex-grow">
                <h3 className="font-['Space_Grotesk'] text-white font-bold text-2xl mt-16 mb-4">
                  {user.name}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {user.status === 'pending' ? (
                  <>
                    <div className="flex gap-4">
                      <button className="w-1/2 h-12 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] uppercase">
                        View Profile
                      </button>
                      <button className="w-1/2 h-12 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] uppercase">
                        Edit
                      </button>
                    </div>
                    <button className="w-full h-12 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] uppercase">
                      Delete User Accounts
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center mb-2">
                     
                      <button className="w-full h-12 rounded-full bg-[#FF00A2] text-white font-['Space_Grotesk'] uppercase">
                        Approve Profile
                      </button>
                    </div>
                    <button className="w-full h-12 rounded-full border border-gray-600 text-white font-['Space_Grotesk'] uppercase">
                      Suspend Profiles
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