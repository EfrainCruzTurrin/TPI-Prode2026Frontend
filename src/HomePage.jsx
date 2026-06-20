import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function HomePage() {
  const { auth, logout } = useAuth()
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

      <button
        onClick={() => navigate("/pronosticos")}
      >
        Pronósticos
      </button>

      <div style={{ fontSize: '64px' }}>🏆</div>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', letterSpacing: '4px', color: '#C9A84C' }}>
        ¡BIENVENIDO AL PRODE!
      </h1>
      <p style={{ color: '#8892a4', fontSize: '16px' }}>
        Hola, <strong style={{ color: 'white' }}>{auth?.username}</strong> — {auth?.rol}
      </p>
      <p style={{ color: '#4ade80', fontSize: '14px' }}>
        ✅ Login exitoso. Token JWT recibido correctamente.
      </p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '16px',
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
