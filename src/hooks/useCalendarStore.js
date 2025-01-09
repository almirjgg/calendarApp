import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';
import { calendarApi } from '../api';
import { convertEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSaveEvent = async calendarEvent => {
    try {
      if (calendarEvent._id) {
        //actualizar
        const { data } = await calendarApi.put(`/events/${calendarEvent._id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        Swal.fire('Actualizado', 'El evento se actualizo con exito', 'success');
        return;
      }
      //crear
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, _id: data.event._id, user }));
      Swal.fire('Creado', 'El evento se creo con exito', 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');

      const calendarEvent = convertEvents(data.events);
      dispatch(onLoadEvents(calendarEvent));
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingEvent = async () => {
    try {
      if (!activeEvent) return;
      const { _id } = activeEvent;
      await calendarApi.delete(`/events/${_id}`);
      dispatch(onDeleteEvent());
      Swal.fire('Eliminado', 'El evento se elimino con exito', 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
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
    startLoadingEvents,
  };
};
