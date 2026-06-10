export default function AuthLeft() {
  return (
    <div className="auth-left">
      {/* Floating decorations */}
      <div className="floating-elements">
        <span className="float-item">⚽</span>
        <span className="float-item">⚽</span>
        <span className="float-item">⚽</span>
        <span className="float-item">⚽</span>
        <span className="float-item">⚽</span>
        <span className="float-item">⚽</span>
        <span className="float-item">⚽</span>
      </div>

      <div className="left-content">
        {/* Trophy image */}
        <div className="trophy-container">
          <div className="trophy-ring" />
          <div className="trophy-ring" />
          <img
            src="/trofeo.jpg"
            alt="Copa del Mundo"
            className="trophy-img"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
          />
          {/* Fallback si no está la imagen */}
          <div className="trophy-emoji" style={{ display: 'none' }}>🏆</div>
        </div>

        {/* Logo FIFA 2026 */}
        <img
          src="/logo2026.png"
          alt="FIFA World Cup 2026"
          className="fifa-logo"
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Brand title */}
        <div className="brand-title">PRODE</div>

        {/* Flags */}
        <div className="flags-row">
          {['🇺🇸', '🇨🇦', '🇲🇽', '🇦🇷', '🇧🇷', '🇩🇪', '🇪🇸', '🇫🇷'].map((flag) => (
            <span key={flag} className="flag-chip">{flag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
