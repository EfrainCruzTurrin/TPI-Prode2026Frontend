import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'
import LoginPage    from './LoginPage'
import RegisterPage from './RegisterPage'
import HomePage     from './HomePage'
import EquiposAdminPage from "./admin/EquiposAdminPage";
import FechasAdminPage from "./admin/FechasAdminPage";
import PartidosAdminPage from "./admin/PartidosAdminPage";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  return token
    ? children
    : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/home"     element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/admin/equipos"  element={<EquiposAdminPage />} />
      <Route path="/admin/fechas"   element={<FechasAdminPage />} />
      <Route path="/admin/partidos" element={<PartidosAdminPage />} />
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