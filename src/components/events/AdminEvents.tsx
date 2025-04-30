import { useState } from "react";
import Pagination from "../../common/Pagination";
import { useGetAdminEventsQuery } from "../../apis/events";

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
    userType: string;
    description?: string;
    audienceType?: string;
    eventCategory?: string;
    specialRequirements?: string;
}

const AdminEvents = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: events, isLoading } = useGetAdminEventsQuery({ 
        page: currentPage, 
        limit: 4,
        userType: 'admin'
    });

    const getStatusColor = (status: string) => {
        if (status === 'approved') return 'text-[#FF00A2]';
        if (status === 'rejected') return 'text-[#FF00A2]';
        return 'text-[#FF00A2]';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getButtonStyles = (status: string, buttonType: 'approve' | 'reject') => {
        const baseStyles = "flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 text-white text-xs sm:text-sm font-medium rounded-[30px]";
        
        if (buttonType === 'approve') {
            if (status === 'approved') {
                return `${baseStyles} bg-[#FF00A2] cursor-not-allowed opacity-50`;
            }
            if (status === 'rejected') {
                return `${baseStyles} border-2 border-[#FF00A2] hover:bg-[#FF00A2] transition-colors`;
            }
            return `${baseStyles} border-2 border-[#FF00A2] hover:bg-[#FF00A2] transition-colors`;
        } else {
            if (status === 'rejected') {
                return `${baseStyles} bg-[#FF00A2] cursor-not-allowed opacity-50`;
            }
            if (status === 'approved') {
                return `${baseStyles} border-2 border-[#FF00A2] hover:bg-[#FF00A2] transition-colors`;
            }
            return `${baseStyles} border-2 border-[#FF00A2] hover:bg-[#FF00A2] transition-colors`;
        }
    };

    if (!events) return null;

    return (
        <div className="bg-black p-4 md:p-8 w-full mb-32">
            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-8 h-8 border-4 border-[#FF00A2] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    events.docs.map((event: Event) => (
                        <div key={event._id} className="bg-[#212121] rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <img 
                                src={event.image || "/events/event.svg"} 
                                alt={event.title} 
                                className="w-full sm:w-20 h-20 rounded-[8px] object-cover"
                            />
                            <div className="flex-1 w-full sm:w-auto">
                                <h2 className="text-white font-['Space_Grotesk'] font-bold text-base sm:text-lg capitalize">{event.title}</h2>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-x-4 text-gray-400 text-xs sm:text-sm">
                                    <p>Host: {event.host}</p>
                                    <p>Type: {event.type}</p>
                                    <p>User Type: {event.userType}</p>
                                    {event.audienceType && <p>Audience: {event.audienceType}</p>}
                                    {event.eventCategory && <p>Category: {event.eventCategory}</p>}
                                    <p>Date: {formatDate(event.startTime)}</p>
                                    <p>Time: {formatTime(event.startTime)}</p>
                                    <p className={getStatusColor(event.status)}>Status: {event.status}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none h-[35px] sm:h-[40px] px-3 sm:px-4 bg-[#FF00A2] text-white text-xs sm:text-sm font-medium rounded-[30px]">View Detail</button>
                                <button 
                                    disabled={event.status === 'approved'}
                                    className={getButtonStyles(event.status, 'approve')}
                                >
                                    {event.status === 'approved' ? 'Approved' : 'Approve'}
                                </button>
                                <button 
                                    disabled={event.status === 'rejected'}
                                    className={getButtonStyles(event.status, 'reject')}
                                >
                                    {event.status === 'rejected' ? 'Rejected' : 'Reject'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
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

export default AdminEvents; 