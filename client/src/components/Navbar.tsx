import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../store/Store';

type TRouteName = 'Home' | 'Generator' | 'Login' | 'Palettes';

type TRoute = {
  path: string;
  name: TRouteName;
};

export const routes: TRoute[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/generator',
    name: 'Generator',
  },
  {
    path: '/palettes',
    name: 'Palettes',
  },
];

const Navbar: FC = () => {
  const { user, logout } = useContext(AppState);

  return (
    <nav className='navbar'>
      {routes.map((route, i) => (
        <Link key={i} to={route.path}>
          {route.name}
        </Link>
      ))}
      {user && (
        <button type='button' onClick={() => logout()}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
