import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';

import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';

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
  const { onToggleModalOpen } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#34cf7',
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
    console.log({ doubleClickEvent: event });
  };
  const onSelect = event => {
    setActiveEvent(event);
  };
  const onViewChange = event => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };
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
