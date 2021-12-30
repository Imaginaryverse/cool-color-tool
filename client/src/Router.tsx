import { FC, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  HomePage,
  GeneratorPage,
  LoginPage,
  PalettesPage,
  NotFoundPage,
} from './pages';
import { AppState } from './store/Store';

const Router: FC = () => {
  const { user } = useContext(AppState);

  return (
    <Routes>
      <Route
        path='/'
        element={user ? <HomePage /> : <Navigate replace to='/login' />}
      />
      <Route
        path='/generator'
        element={user ? <GeneratorPage /> : <Navigate replace to='/login' />}
      />
      <Route
        path='/palettes'
        element={user ? <PalettesPage /> : <Navigate replace to='/login' />}
      />
      <Route
        path='/login'
        element={!user ? <LoginPage /> : <Navigate replace to='/' />}
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
