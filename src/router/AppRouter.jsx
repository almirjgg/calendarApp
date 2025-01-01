import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarPage } from '../calendar';
import { LoginPage } from '../auth';
import { useSelector } from 'react-redux';

export const AppRouter = () => {
  // const { status } = useSelector(state => state.auth);
  const authStatus = 'checking';
  return (
    <Routes>
      {authStatus === 'authenticated' ? (
        <Route path='/' element={<CalendarPage />} />
      ) : (
        <Route path='/auth/*' element={<LoginPage />} />
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
