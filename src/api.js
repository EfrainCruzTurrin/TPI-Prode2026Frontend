import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

// ── Auth ─────────────────────────────────────────────────────
export const authService = {
  register: (data) => api.post('/api/auth/register', data),
  login:    (data) => api.post('/api/auth/login', data)
}

// ── Equipos ──────────────────────────────────────────────────
export const getEquipos    = ()     => api.get('/api/equipos')
export const createEquipo  = (data) => api.post('/api/equipos', data)
export const deleteEquipo  = (id)   => api.delete(`/api/equipos/${id}`)

// ── Fechas (Jornadas) ────────────────────────────────────────
export const getFechas    = ()     => api.get('/fechas')
export const createFecha  = (data) => api.post('/fechas', data)

// ── Partidos ─────────────────────────────────────────────────
export const getPartidos    = ()        => api.get('/partidos')
export const createPartido  = (data)    => api.post('/partidos', data)
export const updatePartido  = (id, data) => api.patch(`/partidos/${id}`, data)

// ── Pronósticos ─────────────────────────────────────────────────
export const createPronostico = (data) => api.post("/api/pronostico", data);

export default api