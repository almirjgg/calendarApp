import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);

  const setActiveEvent = calendarEvent => {
    console.log({ calendarEvent });

    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSaveEvent = async calendarEvent => {
    //Todo: Guardar en base de datos

    //Todo bien
    if (calendarEvent._id) {
      //actualizar
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
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
