import { FC, useContext } from 'react';
import { AppState } from '../store/Store';

const HomePage: FC = () => {
  const { user } = useContext(AppState);

  return (
    <div className='page home-page'>
      <p>Home Page</p>
      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default HomePage;
