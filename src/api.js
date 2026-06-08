import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('prode_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
}

export default api
