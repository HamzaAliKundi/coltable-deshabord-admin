import { useState } from "react";
import Pagination from "../../common/Pagination";
import {
  useGetAdminEventsQuery,
  useUpdateEventStatusMutation,
} from "../../apis/events";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

// Define event types for better type safety
type EventType = "drag-show" | "drag-brunch" | "drag-bingo" | "drag-trivia" | "other";

interface Event {
  _id: string;
  title: string;
  host: string;
  type: EventType;
  theme: string;
  startTime: string;
  endTime: string;
  image?: string;
  status: string;
  description?: string;
  startDate: string; // Make this required
}

const PerformerEvents = () => {
  const [updatingEventId, setUpdatingEventId] = useState<string | null>(null);
  const [updatingAction, setUpdatingAction] = useState<
    "approve" | "reject" | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: events,
    isLoading,
    refetch,
    isFetching,
  } = useGetAdminEventsQuery(
    {
      page: currentPage,
      limit: 4,
      userType: "performer",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Fix TypeScript error in formatEventType
  const formatEventType = (type: EventType) => {
    const types: Record<EventType, string> = {
      "drag-show": "Drag Show",
      "drag-brunch": "Drag Brunch",
      "drag-bingo": "Drag Bingo",
      "drag-trivia": "Drag Trivia",
      other: "Other",
    };
    return types[type] || "Other";
  };

  const [updateEventStatus] = useUpdateEventStatusMutation();

  const handleStatusUpdate = async (
    eventId: string,
    status: "approved" | "rejected"
  ) => {
    try {
      setUpdatingEventId(eventId);
      setUpdatingAction(status === "approved" ? "approve" : "reject");
      await updateEventStatus({ eventId, status }).unwrap();
      toast.success(`Event ${status} successfully`);
      refetch();
    } catch (error) {
      toast.error("Failed to update event status");
    } finally {
      setUpdatingEventId(null);
      setUpdatingAction(null);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") return "text-[#FF00A2]";
    if (status === "rejected") return "text-[#FF00A2]";
    return "text-[#FF00A2]";
  };

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

  // Modified formatDate function with proper typing
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

  // Modified formatTime function with proper typing
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

  const getButtonStyles = (
    status: string,
    buttonType: "approve" | "reject"
  ) => {
    const baseStyles =
      "flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 text-white text-xs sm:text-sm font-medium rounded-[30px]";

    if (buttonType === "approve") {
      if (status === "approved") {
        return `${baseStyles} bg-[#FF00A2] cursor-not-allowed opacity-50`;
      }
      if (status === "rejected") {
        return `${baseStyles} border-2 border-[#FF00A2] hover:bg-[#FF00A2] transition-colors`;
      }
      return `${baseStyles} border-2 border-[#FF00A2] hover:bg-[#FF00A2] transition-colors`;
    } else {
      if (status === "rejected") {
        return `${baseStyles} bg-[#FF00A2] cursor-not-allowed opacity-50`;
      }
      if (status === "approved") {
        return `${baseStyles} border-2 border-[#FF00A2] hover:bg-[#FF00A2] transition-colors`;
      }
      return `${baseStyles} border-2 border-[#FF00A2] hover:bg-[#FF00A2] transition-colors`;
    }
  };

  if (isFetching || isLoading) {
    return (
      <div className="col-span-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF00A2]"></div>
      </div>
    );
  }

  if (!events) return null;

  return (
    <div className="bg-black p-4 md:p-8 w-full mb-32">
      <div className="space-y-4">
        {events.docs.map((event: Event) => (
          <div
            key={event._id}
            className="bg-[#212121] rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <img
              src={event.image || "/events/event.svg"}
              alt={event.title}
              className="w-full sm:w-20 h-20 rounded-[8px] object-cover"
            />
            <div className="flex-1 w-full sm:w-auto">
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-base sm:text-lg capitalize">
                {event.title}
              </h2>
              <div className="flex flex-col sm:flex-row flex-wrap gap-x-4 text-gray-400 text-xs sm:text-sm">
                {/* <p>Host: {event.host}</p> */}
                <p>Type: {formatEventType(event.type)}</p>
                <p>Date: {event.startDate ? formatDate(event.startDate) : "N/A"}</p>
                <p>Time: {event.startTime ? formatTime(event.startTime) : "N/A"}</p>
                <p className={getStatusColor(event.status)}>
                  Status: {event.status}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Link
                to={`/events/${event._id}`}
                className="flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 bg-[#FF00A2] text-white text-xs sm:text-sm font-medium rounded-[30px] flex items-center justify-center"
              >
                View Detail
              </Link>
              <button
                disabled={
                  event.status === "approved" ||
                  (updatingEventId === event._id &&
                    updatingAction === "approve")
                }
                className={getButtonStyles(event.status, "approve")}
                onClick={() => handleStatusUpdate(event._id, "approved")}
              >
                {updatingEventId === event._id &&
                updatingAction === "approve" ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : event.status === "approved" ? (
                  "Approved"
                ) : (
                  "Approve"
                )}
              </button>
              <button
                disabled={
                  event.status === "rejected" ||
                  (updatingEventId === event._id && updatingAction === "reject")
                }
                className={getButtonStyles(event.status, "reject")}
                onClick={() => handleStatusUpdate(event._id, "rejected")}
              >
                {updatingEventId === event._id &&
                updatingAction === "reject" ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : event.status === "rejected" ? (
                  "Rejected"
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          totalPages={events.totalPages}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default PerformerEvents;
