import { useDispatch, useSelector } from 'react-redux';
import {
  onChekingCredentials,
  onLogin,
  onLogout,
  onClearErrorMessage,
  onRegisterErrorMessage,
} from '../store';
import { calendarApi } from '../api';

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(state => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(onChekingCredentials());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      const { token, name, uid } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name, uid }));
    } catch (error) {
      dispatch(onLogout('wrong credentials'));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 100);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChekingCredentials());
    try {
      const { data } = await calendarApi.post('/auth/new', { email, password, name });
      const { token, name: userName, id } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ userName, id }));
    } catch (error) {
      const { data } = error.response;
      const errorsList = data.errors
        ? Object.values(data.errors).map(({ msg }) => ({ error: msg }))
        : [{ msg: data.msg }];
      dispatch(onRegisterErrorMessage(errorsList));
    }
  };

  const startLogout = async () => {
    dispatch(onLogout());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startLogout,
    startRegister,
  };
};
