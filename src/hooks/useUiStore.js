import { useDispatch, useSelector } from 'react-redux';
import { onDateToggleModalOpen } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDatemodalOpen } = useSelector(state => state.ui);

  const onToggleModalOpen = () => {
    dispatch(onDateToggleModalOpen());
  };

  return {
    isDatemodalOpen,

    onToggleModalOpen,
  };
};
