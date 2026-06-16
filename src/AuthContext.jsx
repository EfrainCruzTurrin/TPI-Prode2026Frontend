import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('prodeAuth');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    localStorage.setItem('prode_user', JSON.stringify(userData))
    localStorage.setItem('prode_token', userData.accessToken)
    setUser(userData)
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
