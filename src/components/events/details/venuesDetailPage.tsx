import { useParams } from "react-router-dom";
import { useGetSingleEventQuery } from "../../../apis/events";

// Define event types for better type safety
type EventType = "drag-show" | "drag-brunch" | "drag-bingo" | "drag-trivia" | "other";

export const outdoorCoveringOptions = [
  { label: "Indoor Stage", value: "indoor_stage" },
  { label: "Outdoor Stage", value: "outdoor_stage" },
  {
    label: "Indoor Open Floor Of Venue - Hardwood/Concrete",
    value: "indoor_open_floor_hardwood",
  },
  {
    label: "Indoor Open Floor Of Venue - Carpet",
    value: "indoor_open_floor_carpet",
  },
  { label: "Outdoor Patio - Hardwood", value: "outdoor_patio_hardwood" },
  { label: "Outdoor - Grass", value: "outdoor_grass" },
] as const;

interface Performer {
  _id: string;
  fullDragName: string;
}

interface Event {
  _id: string;
  title: string;
  host: string;
  type: EventType;
  startDate: string;
  startTime: string;
  endTime: string;
  eventCallTime: string;
  image?: string;
  audienceType?: string;
  hasCoverings?: string;
  hasPrivateDressingArea?: string;
  isEquipmentProvidedByPerformer?: string;
  isEquipmentProvidedByVenue?: string;
  hosts?: number;
  performers?: number;
  assignedPerformers?: number;
  description?: string;
  specialRequirements?: string;
  musicFormat?: string;
  performersList?: Performer[];
}

const EventRequestDetail = () => {
  const { id } = useParams();
  const { data: getEventsByVenuesById, isLoading } = useGetSingleEventQuery(id);

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
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Modified extractTime function with proper typing
  const extractTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = getLocalDateSafe(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Fixed formatEventType with proper typing
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

  // Add timezone info function
  const getTimezoneInfo = () => {
    return new Date().toLocaleTimeString(undefined, { timeZoneName: 'short' }).split(' ')[2];
  };

  const selectedCovering = getEventsByVenuesById?.event?.hasCoverings;
  const selectedLabel = outdoorCoveringOptions.find(
    (option) => option.value === selectedCovering
  )?.label;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-2 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="col-span-1 lg:col-span-8 p-4 md:px-8 py-2 bg-black">
      <h1 className="font-tangerine text-xl md:text-[64px] text-white font-bold mb-4 lg:mb-8 text-center">
        {getEventsByVenuesById?.event?.title}
      </h1>

      {/* Event Image */}
      <div className="relative flex justify-center">
        <img
          src={getEventsByVenuesById?.event?.image}
          alt={getEventsByVenuesById?.event?.title}
          className="w-full md:max-w-[550px] h-auto max-h-[300px] object-contain mx-auto rounded-lg"
        />
      </div>

      {/* About Section */}
      <div className="mb-6 lg:mb-8 mt-12">
        <h2 className="bg-[#FF00A2] text-white py-2 px-4 rounded-md mb-4 text-lg lg:text-xl text-center">
          About {getEventsByVenuesById?.event?.title}
        </h2>
      </div>

      {/* Basic Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div>
          <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
            Event Details
          </h3>
          <ul className="text-white/90 space-y-2">
            <li>
              <span className="font-medium">Host:</span>{" "}
              {getEventsByVenuesById?.event?.host}
            </li>
            <li>
              <span className="font-medium">Type:</span>{" "}
              {formatEventType(getEventsByVenuesById?.event?.type as EventType)}
            </li>
            <li>
              <span className="font-medium">Audience:</span>{" "}
              {getEventsByVenuesById?.event?.audienceType}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
            Event Timing
          </h3>
          <ul className="text-white/90 space-y-2">
            <li>
              <span className="font-medium">Start Date:</span>{" "}
              {getEventsByVenuesById?.event?.startDate ? 
                formatDate(getEventsByVenuesById.event.startDate) : "N/A"}
            </li>
            <li>
              <span className="font-medium">Starts:</span>{" "}
              {getEventsByVenuesById?.event?.startTime ? 
                extractTime(getEventsByVenuesById.event.startTime) : "N/A"}
            </li>
            <li>
              <span className="font-medium">Ends:</span>{" "}
              {getEventsByVenuesById?.event?.endTime ? 
                extractTime(getEventsByVenuesById.event.endTime) : "N/A"}
            </li>
            <li>
              <span className="font-medium">Call Time:</span>{" "}
              {getEventsByVenuesById?.event?.eventCallTime ? 
                extractTime(getEventsByVenuesById.event.eventCallTime) : "N/A"}
            </li>
            <li>
              <span className="font-medium">Music Deadline:</span>{" "}
              {getEventsByVenuesById?.event?.musicFormat || "N/A"}
            </li>
          </ul>
        </div>
      </div>

      {/* Performers Section */}
      <div className="mt-8">
        <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
          Performers Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/90">
          <div>
            <p>
              <span className="font-medium">Number of Hosts:</span>{" "}
              {getEventsByVenuesById?.event?.hosts}
            </p>
            <p>
              <span className="font-medium">Number of Performers:</span>{" "}
              {getEventsByVenuesById?.event?.performers}
            </p>
            <p>
              <span className="font-medium">Numbers per Performer:</span>{" "}
              {getEventsByVenuesById?.event?.assignedPerformers}
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Dressing Area:</span>{" "}
              {getEventsByVenuesById?.event?.hasPrivateDressingArea === "yes"
                ? "Available"
                : "Not available"}
            </p>
            <p>
              <span className="font-medium">Equipment Responsibility:</span>{" "}
              {getEventsByVenuesById?.event?.isEquipmentProvidedByPerformer ===
              "yes"
                ? "Yes"
                : "No"}
            </p>

            <p>
              <span className="font-medium">Performers:</span>{" "}
              {getEventsByVenuesById?.event?.performersList
                ?.filter((performer: any) => performer?.fullDragName)
                .map((performer: any) => performer.fullDragName)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="mt-8">
        <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
          Equipment & Facilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
          <div>
            <p>
              <span className="font-medium">Venue Equipment:</span>{" "}
              {getEventsByVenuesById?.event?.isEquipmentProvidedByVenue}
            </p>
            <p>
              <span className="font-medium">Stage:</span> {selectedLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      {getEventsByVenuesById?.event?.description && (
        <div className="mt-8">
          <h3 className="text-white border-b-[3px] border-[#FF00A2] mb-3 pb-1 text-lg">
            Description & Special Request
          </h3>
          <div className="text-white/90">
            <p className="font-medium">Description:</p>
            <div 
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ 
                __html: getEventsByVenuesById?.event?.description?.replace(/\n/g, '<br />') || "N/A" 
              }}
            />
            <p className="font-medium mt-4">Special Request For Performer:</p>
            <div 
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ 
                __html: getEventsByVenuesById?.event?.specialRequirements?.replace(/\n/g, '<br />') || "N/A" 
              }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {/* <div className="mt-20 flex flex-col md:flex-row items-center md:items-start mb-6 md:mb-0 justify-center gap-6 md:gap-4 ">
        <button className="w-[222px] h-[62px] bg-[#FF00A2] hover:bg-[#d40085] text-white rounded-[83px] shadow-md font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] uppercase flex items-center justify-center">
          Approve
        </button>
        <button className="w-[222px] h-[62px] bg-transparent border-2 border-[#FF00A2] text-white rounded-[83px] shadow-md font-['Space_Grotesk'] font-normal text-[20px] leading-[100%] uppercase flex items-center justify-center">
          Reject
        </button>
      </div> */}
    </div>
  );
};

export default EventRequestDetail;
