import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleEventQuery } from "../../../apis/events";
import { toast } from "react-hot-toast";

interface Event {
    _id: string;
    user: string;
    userType: string;
    title: string;
    host: string;
    type: string;
    theme: string;
    startTime: string;
    endTime: string;
    image?: string;
    venuesList: any[];
    performersList: any[];
    description?: string;
    isPrivate: boolean | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    audienceType: string;
    eventCategory: string;
    isEquipmentProvidedByVenue: string;
    isEquipmentProvidedByPerformer: string;
    hasCoverings: string;
    hasPrivateDressingArea: string;
    hosts: number;
    performers: number;
    assignedPerformers: number;
    eventCallTime: string;
    musicFormat: string;
    specialRequirements: string;
}

const VenuesDetailPage = () => {
    const { id } = useParams();
    const { data: response, isLoading } = useGetSingleEventQuery(id);
    const event = response?.event;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!response?.success || !event) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Event not found
            </div>
        );
    }

    return (
        <div className="bg-black p-4 md:p-8 w-full mb-32">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#212121] rounded-[8px] p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <img 
                            src={event.image || "/events/event.svg"} 
                            alt={event.title} 
                            className="w-full md:w-1/3 h-48 md:h-64 rounded-[8px] object-cover"
                        />
                        <div className="flex-1">
                            <h1 className="text-white font-['Space_Grotesk'] font-bold text-2xl md:text-3xl mb-4 capitalize">{event.title}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
                                <div>
                                    <p className="text-sm">Host: {event.host}</p>
                                    <p className="text-sm">Type: {event.type}</p>
                                    <p className="text-sm">Theme: {event.theme}</p>
                                    <p className="text-sm">Date: {formatDate(event.startTime)}</p>
                                    <p className="text-sm">Time: {formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                                    <p className="text-sm">Audience Type: {event.audienceType}</p>
                                    <p className="text-sm">Event Category: {event.eventCategory}</p>
                                </div>
                                <div>
                                    <p className="text-sm">Status: <span className={`${event.status === 'approved' ? 'text-green-500' : event.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>{event.status}</span></p>
                                    <p className="text-sm">Created: {formatDate(event.createdAt)}</p>
                                    <p className="text-sm">Updated: {formatDate(event.updatedAt)}</p>
                                    <p className="text-sm">Private Event: {event.isPrivate ? 'Yes' : 'No'}</p>
                                    <p className="text-sm">Hosts Required: {event.hosts}</p>
                                    <p className="text-sm">Performers Required: {event.performers}</p>
                                    <p className="text-sm">Assigned Performers: {event.assignedPerformers}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#2A2A2A] p-4 rounded-[8px]">
                            <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-4">Venue Requirements</h2>
                            <div className="space-y-2 text-gray-400">
                                <p className="text-sm">Equipment Provided by Venue: {event.isEquipmentProvidedByVenue}</p>
                                <p className="text-sm">Equipment Provided by Performer: {event.isEquipmentProvidedByPerformer}</p>
                                <p className="text-sm">Has Coverings: {event.hasCoverings}</p>
                                <p className="text-sm">Has Private Dressing Area: {event.hasPrivateDressingArea}</p>
                            </div>
                        </div>

                        <div className="bg-[#2A2A2A] p-4 rounded-[8px]">
                            <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-4">Event Details</h2>
                            <div className="space-y-2 text-gray-400">
                                <p className="text-sm">Event Call Time: {event.eventCallTime}</p>
                                <p className="text-sm">Music Format: {formatDate(event.musicFormat)}</p>
                                {event.specialRequirements && (
                                    <p className="text-sm">Special Requirements: {event.specialRequirements}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {(event.venuesList?.length > 0 || event.performersList?.length > 0) && (
                        <div className="mt-6">
                            <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-2">Participants</h2>
                            {event.venuesList?.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-gray-400 text-sm mb-2">Venues ({event.venuesList.length})</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {event.venuesList.map((venue: any) => (
                                            <span key={venue._id} className="bg-[#FF00A2]/20 text-white px-3 py-1 rounded-full text-sm">
                                                {venue.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {event.performersList?.length > 0 && (
                                <div>
                                    <h3 className="text-gray-400 text-sm mb-2">Performers ({event.performersList.length})</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {event.performersList.map((performer: any) => (
                                            <span key={performer._id} className="bg-[#FF00A2]/20 text-white px-3 py-1 rounded-full text-sm">
                                                {performer.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VenuesDetailPage;
