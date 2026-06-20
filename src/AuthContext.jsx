import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('prodeAuth');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (authData) => {
    localStorage.setItem('prodeAuth', JSON.stringify(authData));
    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('refreshToken', authData.refreshToken);
    setAuth(authData);
  }

  const logout = () => {
    localStorage.removeItem('prodeAuth');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
