import { FC, createContext, useState, useEffect } from 'react';

type TUser = {
  id: string;
  username: string;
  palettes: TPalette[];
};

type TPalette = {
  id: string;
  name: string;
  colors: string[];
  createDate: Date;
};

type TContextTypes = {
  user: TUser | null;
  login: (username: string) => void;
  logout: () => void;
};

export const AppState = createContext<TContextTypes>({
  user: null,
  login: () => {},
  logout: () => {},
});

const Context: FC = ({ children }) => {
  // const [user, setUser] = useState<TUser | null>(null);

  // FOR DEVELOPMENT
  const [user, setUser] = useState<TUser | null>({
    id: '1',
    username: 'User',
    palettes: [],
  });

  function login(username: string) {
    // placeholder authentication
    const user: TUser = {
      id: '1',
      username,
      palettes: [],
    };

    return setUser(user);
  }

  function logout() {
    return setUser(null);
  }

  return (
    <AppState.Provider value={{ user, login, logout }}>
      {children}
    </AppState.Provider>
  );
};

export default Context;
