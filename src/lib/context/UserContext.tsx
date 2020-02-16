import React, { createContext, useContext, FC, useMemo, useState, useEffect } from 'react';
import { getToken } from '../api/auth';

interface UserState {
  token: string | null;
  cookie: string | undefined;
  signOut: () => void;
}

export const useUserContext = () => useContext(useUserContext.context);
useUserContext.context = createContext<UserState>({ token: null, cookie: undefined, signOut: () => {} });

export const UserProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const userCookie = useMemo(() => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((cookie) => {
      return cookie.startsWith('user');
    });
    if (cookie == undefined) return undefined;
    return cookie;
  }, [token]);
  const [cookie] = useState(userCookie);

  const signOut = () => {
    setToken(null);
    document.cookie = `user=;max-age=0`;
  };

  const locationSearch = useMemo(() => {
    return location.search;
  }, [location.search]);

  useEffect(() => {
    if (locationSearch) {
      const setTokenFunc = async () => {
        const { res } = await getToken(locationSearch);
        if (res) {
          setToken(res.token);
          document.cookie = `user=${res.token}`;
        }
      };
      setTokenFunc();
    }
  }, [locationSearch]);

  const value = useMemo<UserState>(() => {
    return { token, signOut, cookie };
  }, [token]);

  return <useUserContext.context.Provider value={value} children={children} />;
};
