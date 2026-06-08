export default function AuthLeft() {
  return (
    <div className="auth-left">
      {/* Floating decorations */}
      <div className="floating-elements">
        <span className="float-item">⚽</span>
        <span className="float-item">🏆</span>
        <span className="float-item">⚽</span>
        <span className="float-item">🥅</span>
        <span className="float-item">⚽</span>
        <span className="float-item">🎽</span>
        <span className="float-item">⚽</span>
      </div>

      <div className="left-content">
        {/* Trophy */}
        <div className="trophy-container">
          <div className="trophy-ring" />
          <div className="trophy-ring" />
          <div className="trophy-emoji">🏆</div>
        </div>

        {/* Brand */}
        <div className="brand-title">PRODE</div>
        <div className="brand-year">MUNDIAL · 2026</div>
        <p className="brand-tagline">
          Predecí los resultados, acumulá puntos<br />
          y convertite en el campeón del prode.
        </p>

        {/* Flags */}
        <div className="flags-row">
          {['🇺🇸', '🇨🇦', '🇲🇽', '🇦🇷', '🇧🇷', '🇩🇪', '🇪🇸', '🇫🇷'].map((flag) => (
            <span key={flag} className="flag-chip">{flag}</span>
          ))}
        </div>

        {/* Score strip */}
        <div className="score-strip">
          <span className="score-badge">⭐ PLENO = 3 PTS</span>
          <span className="score-badge">✅ TENDENCIA = 1 PT</span>
        </div>
      </div>
    </div>
  )
}
