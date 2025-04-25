import React from 'react';
import { useGetVenueByIdQuery } from '../../apis/venues';

interface VenueDetailProps {
  venueId: string;
}

const VenueDetail = ({ venueId }: VenueDetailProps) => {
  const { data: response, isLoading } = useGetVenueByIdQuery(venueId);
  const venue = response?.venue;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF00A2]"></div>
      </div>
    );
  }

  if (!response?.success || !venue) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-xl">Venue not found</p>
      </div>
    );
  }

  return (
    <div className="bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3">
            <img 
              src={venue.logo || "/events/event.svg"} 
              alt={venue.name} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-white text-2xl font-bold mb-4">{venue.name}</h1>
            <div className="space-y-4">
              <div>
                <h2 className="text-gray-400 text-sm mb-1">Description</h2>
                <p className="text-white">{venue.description}</p>
              </div>
              <div>
                <h2 className="text-gray-400 text-sm mb-1">Location</h2>
                <p className="text-white">{venue.location}</p>
              </div>
              <div>
                <h2 className="text-gray-400 text-sm mb-1">Hours of Operation</h2>
                <p className="text-white">{venue.hoursOfOperation}</p>
              </div>
              <div>
                <h2 className="text-gray-400 text-sm mb-1">Contact Information</h2>
                <p className="text-white">Email: {venue.email}</p>
                <p className="text-white">Phone: {venue.phone}</p>
              </div>
              <div>
                <h2 className="text-gray-400 text-sm mb-1">Venue Type</h2>
                <p className="text-white">{venue.venueType}</p>
              </div>
              <div>
                <h2 className="text-gray-400 text-sm mb-1">Top Drag Performers</h2>
                <p className="text-white">{venue.topDragPerformers}</p>
              </div>
              <div>
                <h2 className="text-gray-400 text-sm mb-1">Facilities</h2>
                <div className="flex flex-wrap gap-2">
                  {venue.facilities?.map((facility: string) => (
                    <span key={facility} className="bg-[#FF00A2]/20 text-white px-3 py-1 rounded-full text-sm">
                      {facility.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#212121] rounded-lg p-6 mb-8">
          <h2 className="text-white text-xl font-bold mb-4">Social Media</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {venue.socialMediaLinks?.facebook && (
              <a 
                href={venue.socialMediaLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#FF00A2]"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                Facebook
              </a>
            )}
            {venue.socialMediaLinks?.instagram && (
              <a 
                href={venue.socialMediaLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#FF00A2]"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            )}
            {venue.socialMediaLinks?.tiktok && (
              <a 
                href={venue.socialMediaLinks.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#FF00A2]"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                TikTok
              </a>
            )}
            {venue.socialMediaLinks?.youtube && (
              <a 
                href={venue.socialMediaLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#FF00A2]"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>
            )}
          </div>
        </div>

        <div className="bg-[#212121] rounded-lg p-6">
          <h2 className="text-white text-xl font-bold mb-4">Status & Ratings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Status</h3>
              <p className={`${
                venue.status === 'approved' ? 'text-green-500' : 
                venue.status === 'rejected' ? 'text-red-500' : 
                'text-yellow-500'
              }`}>
                {venue.status}
              </p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Overall Rating</h3>
              <p className="text-white">{venue.overAllRating || 'No ratings yet'}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Rating Count</h3>
              <p className="text-white">{venue.ratingCount || 0}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Created At</h3>
              <p className="text-white">{new Date(venue.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail; 