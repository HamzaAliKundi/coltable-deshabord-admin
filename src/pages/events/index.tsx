import React from 'react'
import Events from '../../components/events/events';
import { useGetPerformerEventsQuery } from '../../apis/events';

const EventsPage = () => {
  const { data: performerEvents, isLoading: performerEventsLoading } = useGetPerformerEventsQuery();
  console.log("performerEvents", performerEvents);
  
  return (
    <div>
      <Events />
    </div>
  )
}

export default EventsPage;
