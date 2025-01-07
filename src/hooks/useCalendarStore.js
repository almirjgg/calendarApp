import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSaveEvent = async calendarEvent => {
    //TODO: actualizar bien
    if (calendarEvent._id) {
      //actualizar
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //crear
      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event._id, user }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent);
  };

  return {
    //props
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //methids
    setActiveEvent,
    startSaveEvent,
    startDeletingEvent,
  };
};
