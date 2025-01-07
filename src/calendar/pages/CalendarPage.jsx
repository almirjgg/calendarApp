import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';

import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';
import { getMessagesES, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

// const events = [
//   {
//     title: 'Big Meeting',
//     notes: 'Notes',
//     allDay: true,
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Almir',
//     },
//   },
// ];

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { onToggleModalOpen } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? '#347cf7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };
    return {
      style,
    };
  };

  const onDoubleClickEvent = event => {
    onToggleModalOpen();
  };
  const onSelect = event => {
    setActiveEvent(event);
  };
  const onViewChange = event => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
