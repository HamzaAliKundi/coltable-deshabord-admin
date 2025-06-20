import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleEventQuery } from "../../../apis/events";
import { toast } from "react-hot-toast";
import moment from "moment-timezone";

// Define event types for better type safety
type EventType = "drag-show" | "drag-brunch" | "drag-bingo" | "drag-trivia" | "other";

export const eventOptions = [
  { value: "drag-show", label: "Drag Show" },
  { value: "drag-brunch", label: "Drag Brunch" },
  { value: "drag-bingo", label: "Drag Bingo" },
  { value: "drag-trivia", label: "Drag Trivia" },
  { value: "other", label: "Other" },
] as const;

interface Venue {
  _id: string;
  name: string;
}

interface Performer {
  _id: string;
  name: string;
}

interface Event {
  _id: string;
  user: string;
  userType: string;
  title: string;
  host: string[];
  type: EventType;
  theme: string;
  startTime: string;
  endTime: string;
  startDate: string;
  image?: string;
  venuesList: Venue[];
  performersList: Performer[];
  description?: string;
  isPrivate: boolean | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PerformerEventDetail = () => {
  const { id } = useParams();
  const { data: response, isLoading } = useGetSingleEventQuery(id);
  const event = response?.event;

  // Safe timezone handling for dates
  const getLocalDateSafe = (dateString: string) => {
    if (!dateString) return new Date();
    const date = new Date(dateString);
    // Handle midnight UTC case
    if (
      date.getUTCHours() === 0 &&
      date.getUTCMinutes() === 0 &&
      date.getUTCSeconds() === 0
    ) {
      const localDate = new Date(date);
      const localDay = localDate.getDate();
      const utcDay = date.getUTCDate();
      if (localDay < utcDay) {
        localDate.setDate(localDate.getDate() + 1);
        return localDate;
      }
    }
    // Always add one day to fix timezone offset
    const adjustedDate = new Date(date);
    adjustedDate.setDate(date.getDate() + 1);
    return adjustedDate;
  };

  // Modified formatDate function with timezone handling
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = getLocalDateSafe(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Modified formatTime function with timezone handling
  const formatTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = getLocalDateSafe(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
  };

  // Add timezone info function
  const getTimezoneInfo = () => {
    return new Date().toLocaleTimeString(undefined, { timeZoneName: 'short' }).split(' ')[2];
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
              className="w-full md:w-1/3 h-48 md:h-64 rounded-[8px] object-contain"
            />
            <div className="flex-1">
              <h1 className="text-white font-['Space_Grotesk'] font-bold text-2xl md:text-3xl mb-4 capitalize">
                {event.title}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
                <div>
                  <p className="text-sm">Host: {event.host.join(", ")}</p>
                  <p className="text-sm">
                    Type:{" "}
                    {eventOptions.find((option) => option.value === event.type)
                      ?.label ?? "Other"}
                  </p>
                  <p className="text-sm">Date: {formatDate(event.startDate)}</p>
                  <p className="text-sm">
                    Time: {formatTime(event.startTime)} -{" "}
                    {formatTime(event.endTime)}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={`${
                        event.status === "approved"
                          ? "text-green-500"
                          : event.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {event.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    Created: {formatDate(event.createdAt)}
                  </p>
                  <p className="text-sm">
                    Updated: {formatDate(event.updatedAt)}
                  </p>
                  {event.isPrivate !== null && (
                    <p className="text-sm">
                      Private Event: {event.isPrivate ? "Yes" : "No"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {event.description && (
            <div className="mt-6">
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-2">
                Description
              </h2>
              <p className="text-gray-400 text-sm">{event.description}</p>
            </div>
          )}
          {(event.venuesList?.length > 0 ||
            event.performersList?.length > 0) && (
            <div className="mt-6">
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-2">
                Participants
              </h2>
              {event.venuesList?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-gray-400 text-sm mb-2">
                    Venues ({event.venuesList.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    
                    {/* @ts-ignore */}
                    {event.venuesList.map((venue) => (
                      <span
                        key={venue._id}
                        className="bg-[#FF00A2]/20 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {venue.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {event.performersList?.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">
                    Performers ({event.performersList.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {/* @ts-ignore */}
                    {event.performersList.map((performer) => (
                      <span
                        key={performer._id}
                        className="bg-[#FF00A2]/20 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {performer.fullDragName}
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

export default PerformerEventDetail;
