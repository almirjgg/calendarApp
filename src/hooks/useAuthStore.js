import { useDispatch, useSelector } from 'react-redux';
import {
  onChekingCredentials,
  onLogin,
  onLogout,
  onClearErrorMessage,
  onRegisterErrorMessage,
  onLogoutCalendar,
} from '../store';
import { calendarApi } from '../api';
import { swlHandlerError } from '../helpers';

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(state => state.auth);

  const setToken = token => {
    localStorage.setItem('token', token);
    localStorage.setItem('token-init-date', new Date().getTime());
  };

  const removeToken = () => {
    localStorage.clear();
  };

  const startLogin = async ({ email, password }) => {
    dispatch(onChekingCredentials());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      const { token, name, uid } = data;

      setToken(token);
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

      setToken(token);
      dispatch(onLogin({ userName, id }));
    } catch (error) {
      const errorsList = swlHandlerError(error);
      dispatch(onRegisterErrorMessage(errorsList));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('/auth/renew');
      const { token, name, uid } = data;

      setToken(token);
      dispatch(onLogin({ name, uid }));
    } catch (error) {
      removeToken();
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    removeToken();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startLogout,
    startRegister,
    checkAuthToken,
  };
};
