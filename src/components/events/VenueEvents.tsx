import { useState } from "react";
import Pagination from "../../common/Pagination";
import {
  useGetAdminEventsQuery,
  useUpdateEventStatusMutation,
} from "../../apis/events";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

interface Event {
  _id: string;
  title: string;
  host: string;
  type: string;
  theme: string;
  startTime: string;
  endTime: string;
  image?: string;
  status: string;
  audienceType?: string;
  eventCategory?: string;
  specialRequirements?: string;
  startDate?: string
}

const VenueEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingEventId, setUpdatingEventId] = useState<string | null>(null);
  const [updatingAction, setUpdatingAction] = useState<
    "approve" | "reject" | null
  >(null);

  const {
    data: events,
    isLoading,
    refetch,
    isFetching,
  } = useGetAdminEventsQuery({
    page: currentPage,
    limit: 4,
    userType: "venue",
  },
  {
      refetchOnMountOrArgChange: true
    });

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
                <p>Host: {event.host}</p>
                <p>Audience: {event.audienceType || "Unknown"}</p>
                <p>Category: {event.eventCategory || "N/A"}</p>
                <p>Date: {formatDate(event.startDate)}</p>
                <p>Time: {formatTime(event.startTime)}</p>
                <p className={getStatusColor(event.status)}>
                  Status: {event.status}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Link
                to={`/events/admin/${event._id}`}
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

export default VenueEvents;
