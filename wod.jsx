/* wod.jsx — famous benchmark WOD detail. */

function WodDetail({ wod, accent, onBack }) {
  return (
    <div className="screen wodscreen">
      <TopBar onBack={onBack} title="Benchmark" />
      <div className="wod-detail-body">
        <div className="wd-hero" style={{ '--ga': accent }}>
          <span className="wd-tag">{wod.tag}</span>
          <h1 className="wd-name">{wod.name}</h1>
          <span className="wd-format mono">{wod.format}</span>
        </div>

        <p className="wd-desc">{wod.desc}</p>

        <div className="wd-card">
          <div className="wd-card-head">
            <span className="block-label">The workout</span>
            {wod.cap && <span className="cap mono"><Icon name="clock" size={14} /> Cap {wod.cap}</span>}
          </div>
          <ul className="wd-struct">
            {wod.structure.map((line, i) => (
              <li key={i} className={line.startsWith('—') || line.endsWith(':') ? 'wod-note-line' : ''}>{line}</li>
            ))}
          </ul>
          {wod.rx && <div className="wd-rx mono">RX · {wod.rx}</div>}
        </div>

        <div className="bench-section">
          <div className="bench-title">
            <Icon name="medal" size={18} color={accent} stroke={2} />
            <span>Benchmark results</span>
          </div>
          <div className="bench-list">
            {wod.tiers.map((t) => (
              <div key={t.rank} className={'bench-row r' + t.rank}>
                <RankBadge rank={t.rank} size={34} />
                <div className="bench-text">
                  <div className="bench-tier">{t.tier}</div>
                  <div className="bench-who">{t.who}</div>
                </div>
                <div className="bench-score mono">{t.score}</div>
              </div>
            ))}
          </div>
        </div>

        <a className="watch-btn" href={wod.video} target="_blank" rel="noreferrer" style={{ '--ga': accent }}>
          <Icon name="youtube" size={20} color="#fff" />
          Watch a demo
        </a>
      </div>
    </div>
  );
}

Object.assign(window, { WodDetail });
