import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function HomePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      fontFamily: 'Barlow, sans-serif',
      background: 'var(--dark)',
      color: 'var(--white)',
      textAlign: 'center',
      padding: '24px'
    }}>
      <div style={{ fontSize: '64px' }}>🏆</div>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', letterSpacing: '4px', color: '#C9A84C' }}>
        ¡BIENVENIDO AL PRODE!
      </h1>
      <p style={{ color: '#8892a4', fontSize: '16px' }}>
        Hola, <strong style={{ color: 'white' }}>{user?.email}</strong>
      </p>
      <p style={{ color: '#4ade80', fontSize: '14px' }}>
        ✅ Login exitoso. Token JWT recibido correctamente.
      </p>

      {/* Botón admin — solo visible si el rol es ADMIN */}
      {user?.rol === 'ADMIN' && (
        <button
          onClick={() => navigate('/admin')}
          style={{
            marginTop: '8px',
            padding: '12px 32px',
            background: 'rgba(240, 192, 64, 0.15)',
            border: '1px solid #f0c040',
            borderRadius: '10px',
            color: '#f0c040',
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '16px',
            letterSpacing: '2px',
            cursor: 'pointer',
          }}
        >
          🔐 PANEL ADMINISTRADOR
        </button>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: '8px',
          padding: '12px 32px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '10px',
          color: 'white',
          fontFamily: 'Barlow Condensed, sans-serif',
          fontSize: '16px',
          letterSpacing: '2px',
          cursor: 'pointer'
        }}
      >
        CERRAR SESIÓN
      </button>
    </div>
  )
}