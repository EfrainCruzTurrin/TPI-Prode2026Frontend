import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'
import LoginPage    from './LoginPage'
import RegisterPage from './RegisterPage'
import HomePage     from './HomePage'
import EquiposAdminPage from "./admin/EquiposAdminPage";
import FechasAdminPage from "./admin/FechasAdminPage";
import PartidosAdminPage from "./admin/PartidosAdminPage";
import PronosticosPage from "./pronosticos/PronosticosPage";

function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  return auth?.accessToken
    ? children
    : <Navigate to="/login" replace />;;
}

function PublicRoute({ children }) {
  const { auth } = useAuth();

  return auth?.accessToken
    ? <Navigate to="/home" replace />
    : children;
}

function AppRoutes() {
  return (
    <Routes> 
      <Route path="/" element={<Navigate to="/login" replace />} /> 
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} /> 
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} /> 
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} /> 
      <Route path="/admin/equipos" element={<ProtectedRoute><EquiposAdminPage /></ProtectedRoute>} /> 
      <Route path="/admin/fechas" element={<ProtectedRoute><FechasAdminPage /></ProtectedRoute>} />
      <Route path="/admin/partidos" element={<ProtectedRoute><PartidosAdminPage /></ProtectedRoute>} />
      <Route path="/pronosticos" element={<ProtectedRoute><PronosticosPage /></ProtectedRoute>}/>
    </Routes>
  ) 
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}