import { FC, useState, useContext, SyntheticEvent } from 'react';
import { AppState } from '../store/Store';

const LoginPage: FC = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const { login } = useContext(AppState);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (!usernameInput.length) return;

    return login(usernameInput);
  }

  return (
    <div className='page login-page'>
      <p>Login Page</p>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          placeholder='username'
          value={usernameInput}
          onChange={e => setUsernameInput(e.target.value)}
        />
        <button type='submit' disabled={!usernameInput.length}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
