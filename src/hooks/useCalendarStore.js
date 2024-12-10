import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent } from '../store';

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
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  return {
    //props
    events,
    activeEvent,

    //methids
    setActiveEvent,
    startSaveEvent,
  };
};
