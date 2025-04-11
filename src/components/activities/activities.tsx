import React from 'react'

const Activities = () => {
  const profiles = [
    {
      mainImage: '/users/singer.svg',
      logoImage: '/activities/crown.svg',
      name: 'Adriana LaRue'
    },
    {
      mainImage: '/users/singer.svwg', 
      logoImage: '/activities/crown.svg',
      name: 'Jessica Wild'
    },
    {
      mainImage: '/users/singer.svg',
      logoImage: '/activities/crown.svg', 
      name: 'Kandy Muse'
    }
  ]

  return (
    <div className='p-4 md:p-8 mb-32'>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
        {profiles.map((profile, index) => (
          <div key={index} className='rounded-[8px] p-2 md:p-4'>
            {/* Main Image */}
            <div className="relative">
              <img
                src={profile.mainImage}
                alt={profile.name}
                className="w-full h-[150px] md:h-[250px] rounded-[8px] object-cover"
              />
              <div className="w-1/2 -bottom-0.5 absolute left-16 h-[3px] md:h-[4px] bg-[#FF00A2] rounded-[10px]"></div>
              {/* Logo/Icon Image */}
              <div className="absolute bottom-[-25px] md:bottom-[-40px] left-[25px] md:left-[35px]">
                <img
                  src={profile.logoImage}
                  alt={`${profile.name} logo`}
                  className="w-[50px] h-[50px] md:w-[80px] md:h-[80px]"
                />
              </div>
            </div>

            <div className='mt-8 md:mt-14 flex flex-col gap-2 md:gap-4'>
              <h3 className='text-white text-base md:text-xl font-bold ml-4 md:ml-6'>{profile.name}</h3>
              <div className='flex flex-col gap-2 items-center'>
                <button className='w-full md:w-[250px] h-[40px] md:h-[51px] bg-[#FF00A2] text-white text-sm md:text-base font-medium rounded-[30px]'>
                  APPROVE PROFILE
                </button>
                <button className='w-full md:w-[250px] h-[40px] md:h-[51px] border border-white/20 text-white text-sm md:text-base font-medium rounded-[30px]'>
                  SUSPEND PROFILE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activities
