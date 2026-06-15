import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('prode_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (userData) => {
    localStorage.setItem('prode_user', JSON.stringify(userData))
    localStorage.setItem('prode_token', userData.accessToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('prode_user')
    localStorage.removeItem('prode_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
