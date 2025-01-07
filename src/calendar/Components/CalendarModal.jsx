import { useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHours, differenceInSeconds } from 'date-fns';

import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useMemo } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';
import { useEffect } from 'react';

registerLocale('es', es);
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
export const CalendarModal = () => {
  const { isDatemodalOpen, onToggleModalOpen } = useUiStore();
  const { activeEvent, startSaveEvent } = useCalendarStore();
  const [formSubmitter, setFormSubmitter] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const titleClass = useMemo(() => {
    if (!formSubmitter) return '';
    return formValues.title.length <= 0 ? 'is-invalid' : '';
  }, [formValues.title, formSubmitter]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setFormSubmitter(true);

    const diff = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(diff) || diff <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas', 'error');
      return;
    }
    if (formValues.title.length <= 0) {
      alert('Título es obligatorio');
      return;
    }

    await startSaveEvent(formValues);
    onToggleModalOpen();
    setFormSubmitter(false);
  };
  const onCloseModal = () => {
    onToggleModalOpen();
  };

  return (
    <Modal
      isOpen={isDatemodalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel='Example Modal'
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={event => onDateChange(event, 'start')}
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={event => onDateChange(event, 'end')}
            className='form-control'
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${titleClass}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
