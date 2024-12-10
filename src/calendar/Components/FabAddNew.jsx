import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { onToggleModalOpen } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      allDay: true,
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Almir',
      },
    });
    onToggleModalOpen();
  };
  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
