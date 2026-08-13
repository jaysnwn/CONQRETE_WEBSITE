export default function AssemblyLine() {
  return (
    <section className="assembly-section">
      <div className="assembly-header">
        <h2 className="assembly-title">Under Construction</h2>
        <span className="assembly-sub">// LIVE BUILD STATUS</span>
      </div>
      <div className="assembly-track">
        <div className="belt" style={{ borderBottom: '1px solid #e4e4e7' }}></div>
        <div className="belt-items">
          <div className="belt-item"><div className="belt-item-box">🎧<span className="belt-item-spark">⚡</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '35%' }}></div></div></div><span className="belt-item-label">EARPHONES</span></div>
          <div className="belt-item"><div className="belt-item-box">🔧<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '80%', animationDelay: '.5s' }}></div></div></div><span className="belt-item-label">TOOLING</span></div>
          <div className="belt-item"><div className="belt-item-box">🔋<span className="belt-item-spark" style={{ animationDelay: '1s' }}>✨</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '55%', animationDelay: '.3s' }}></div></div></div><span className="belt-item-label">POWER BANK</span></div>
          <div className="belt-item"><div className="belt-item-box">📦<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '20%', animationDelay: '.7s' }}></div></div></div><span className="belt-item-label">PACKAGING</span></div>
          <div className="belt-item"><div className="belt-item-box">⚡<span className="belt-item-spark" style={{ animationDelay: '.5s' }}>🔥</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '60%', animationDelay: '.2s' }}></div></div></div><span className="belt-item-label">C-CABLE</span></div>
          <div className="belt-item"><div className="belt-item-box">🔌<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '40%', animationDelay: '.9s' }}></div></div></div><span className="belt-item-label">ADAPTER</span></div>
          <div className="belt-item"><div className="belt-item-box">🛠️<span className="belt-item-spark" style={{ animationDelay: '1.5s' }}>⚡</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '90%', animationDelay: '.4s' }}></div></div></div><span className="belt-item-label">ASSEMBLY</span></div>
          <div className="belt-item"><div className="belt-item-box">🏭<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '70%', animationDelay: '.6s' }}></div></div></div><span className="belt-item-label">FACTORY</span></div>
          {/* Duplicated for infinite scroll effect */}
          <div className="belt-item"><div className="belt-item-box">🎧<span className="belt-item-spark">⚡</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '35%' }}></div></div></div><span className="belt-item-label">EARPHONES</span></div>
          <div className="belt-item"><div className="belt-item-box">🔧<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '80%', animationDelay: '.5s' }}></div></div></div><span className="belt-item-label">TOOLING</span></div>
          <div className="belt-item"><div className="belt-item-box">🔋<span className="belt-item-spark" style={{ animationDelay: '1s' }}>✨</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '55%', animationDelay: '.3s' }}></div></div></div><span className="belt-item-label">POWER BANK</span></div>
          <div className="belt-item"><div className="belt-item-box">📦<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '20%', animationDelay: '.7s' }}></div></div></div><span className="belt-item-label">PACKAGING</span></div>
          <div className="belt-item"><div className="belt-item-box">⚡<span className="belt-item-spark" style={{ animationDelay: '.5s' }}>🔥</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '60%', animationDelay: '.2s' }}></div></div></div><span className="belt-item-label">C-CABLE</span></div>
          <div className="belt-item"><div className="belt-item-box">🔌<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '40%', animationDelay: '.9s' }}></div></div></div><span className="belt-item-label">ADAPTER</span></div>
          <div className="belt-item"><div className="belt-item-box">🛠️<span className="belt-item-spark" style={{ animationDelay: '1.5s' }}>⚡</span><div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '90%', animationDelay: '.4s' }}></div></div></div><span className="belt-item-label">ASSEMBLY</span></div>
          <div className="belt-item"><div className="belt-item-box">🏭<div className="belt-item-progress"><div className="belt-item-fill" style={{ width: '70%', animationDelay: '.6s' }}></div></div></div><span className="belt-item-label">FACTORY</span></div>
        </div>
        <div className="sparks-container">
          <div className="spark" style={{ '--dur': '.7s', '--delay': '0s', '--tx': '14px', '--ty': '-28px' } as React.CSSProperties}></div>
          <div className="spark" style={{ '--dur': '.9s', '--delay': '.2s', '--tx': '-10px', '--ty': '-34px' } as React.CSSProperties}></div>
          <div className="spark" style={{ '--dur': '.6s', '--delay': '.4s', '--tx': '22px', '--ty': '-18px' } as React.CSSProperties}></div>
          <div className="spark" style={{ '--dur': '.8s', '--delay': '.6s', '--tx': '-18px', '--ty': '-25px' } as React.CSSProperties}></div>
          <div className="spark" style={{ '--dur': '1s', '--delay': '.1s', '--tx': '8px', '--ty': '-40px' } as React.CSSProperties}></div>
        </div>
      </div>
      <div className="assembly-status">
        <div className="status-item"><div className="status-dot"></div>PRODUCTION ACTIVE</div>
        <div className="status-item"><div className="status-dot orange"></div>DESIGN PHASE: 60%</div>
        <div className="status-item"><div className="status-dot red"></div>TOOLING: IN PROGRESS</div>
        <div className="status-item"><div className="status-dot gray"></div>LAUNCH: Q3 2026</div>
      </div>
    </section>
  );
}
