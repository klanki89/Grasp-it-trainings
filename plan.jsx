/* plan.jsx — generating state, plan overview, session detail. */

function Generating({ accent, goalName }) {
  const lines = ['Reading your goal', 'Sequencing 16 sessions', 'Placing benchmark WODs', 'Balancing intensity'];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(lines.length - 1, x + 1)), 520);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="screen generating">
      <div className="gen-rings" style={{ '--ga': accent }}>
        <div className="gen-ring r1" />
        <div className="gen-ring r2" />
        <div className="gen-ring r3" />
        <div className="gen-core"><Icon name="sparkle" size={34} color="#fff" stroke={2} /></div>
      </div>
      <div className="gen-title">Building your<br />{goalName} plan</div>
      <div className="gen-status">{lines[i]}<span className="dots" /></div>
    </div>
  );
}

function IntensityDots({ level, accent }) {
  return (
    <span className="intensity" aria-label={'Intensity ' + level + ' of 5'}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className="idot" style={n <= level ? { background: accent } : undefined} />
      ))}
    </span>
  );
}

function SessionCard({ s, accent, phaseColor, phaseName, style, onOpen }) {
  const meta = (
    <div className="sc-meta">
      <span className="sc-dur"><Icon name="clock" size={14} /> {s.durationMin} min</span>
      <IntensityDots level={s.intensity} accent={accent} />
    </div>
  );
  if (style === 'compact') {
    return (
      <button className="scard compact" onClick={onOpen}>
        <span className="sc-n mono" style={{ color: phaseColor }}>{('0' + s.n).slice(-2)}</span>
        <span className="sc-body">
          <span className="sc-title">{s.title}</span>
          <span className="sc-focus">{s.focus}</span>
        </span>
        {s.famous && <span className="famtag mini">WOD</span>}
        <Icon name="chevronRight" size={18} color="var(--ink-3)" />
      </button>
    );
  }
  if (style === 'timeline') {
    return (
      <button className="scard timeline" onClick={onOpen}>
        <span className="tl-rail"><span className="tl-dot" style={{ background: phaseColor }} /></span>
        <span className="tl-card">
          <span className="sc-head">
            <span className="sc-n mono">Session {('0' + s.n).slice(-2)}</span>
            {s.famous && <span className="famtag">Benchmark WOD</span>}
          </span>
          <span className="sc-title">{s.title}</span>
          <span className="sc-focus">{s.focus}</span>
          {meta}
        </span>
      </button>
    );
  }
  // stacked (default)
  return (
    <button className="scard stacked" onClick={onOpen}>
      <span className="sc-toprow">
        <span className="sc-n-tile mono" style={{ background: phaseColor + '1A', color: phaseColor }}>{('0' + s.n).slice(-2)}</span>
        <span className="sc-body">
          <span className="sc-title">{s.title}</span>
          <span className="sc-focus">{s.focus}</span>
        </span>
        {s.famous && <span className="famtag">Benchmark</span>}
      </span>
      {meta}
    </button>
  );
}

function PlanScreen({ plan, goal, accent, cardStyle, onOpenSession, onRestart, onExport }) {
  const G = window.GRASP;
  const phaseOrder = ['base', 'thr', 'int', 'peak'];
  const grouped = phaseOrder.map((pid) => ({
    pid, ...G.phases[pid],
    sessions: plan.sessions.filter((s) => s.phase === pid),
  })).filter((g) => g.sessions.length);

  const famousCount = plan.sessions.filter((s) => s.famous).length;

  return (
    <div className="screen plan">
      <div className="plan-hero" style={{ '--ga': accent }}>
        <div className="plan-hero-top">
          <span className="eyebrow" style={{ color: '#fff', opacity: 0.85 }}>Your plan</span>
          <div className="plan-hero-actions">
            <button className="restart" onClick={onExport} aria-label="Save as PDF"><Icon name="download" size={18} color="#fff" /></button>
            <button className="restart" onClick={onRestart} aria-label="Start over"><Icon name="repeat" size={18} color="#fff" /></button>
          </div>
        </div>
        <div className="plan-icon"><Icon name={goal.icon} size={26} color="#fff" stroke={2} /></div>
        <h1 className="plan-title">{plan.title}</h1>
        <p className="plan-sub">{plan.weeks}</p>
        <div className="plan-stats">
          <div className="pstat"><span className="pstat-n mono">{plan.sessions.length}</span><span className="pstat-l">sessions</span></div>
          <div className="pstat"><span className="pstat-n mono">{grouped.length}</span><span className="pstat-l">phases</span></div>
          <div className="pstat"><span className="pstat-n mono">{famousCount}</span><span className="pstat-l">benchmarks</span></div>
        </div>
      </div>

      <div className="plan-tags">
        {plan.prefs.map((p) => <span key={p} className="tagpill like"><Icon name="check" size={13} /> {p}</span>)}
        {plan.dislikes.map((d) => <span key={d} className="tagpill avoid"><Icon name="close" size={13} /> {d.replace(/^No /, '')}</span>)}
      </div>

      <div className="plan-body">
        {grouped.map((grp) => (
          <div key={grp.pid} className="phase-group">
            <div className="phase-head">
              <span className="phase-dot" style={{ background: grp.color }} />
              <span className="phase-name">{grp.name}</span>
              <span className="phase-count mono">{grp.sessions.length}</span>
            </div>
            <div className={'phase-cards ' + cardStyle}>
              {grp.sessions.map((s) => (
                <SessionCard key={s.n} s={s} accent={accent} phaseColor={grp.color} phaseName={grp.name}
                  style={cardStyle} onOpen={() => onOpenSession(s.n)} />
              ))}
            </div>
          </div>
        ))}
        <button className="pdf-btn" onClick={onExport}>
          <Icon name="download" size={19} stroke={2} />
          Save plan as PDF
        </button>
        <div className="plan-end">Plan complete · {plan.sessions.length} sessions built around your inputs</div>
      </div>
    </div>
  );
}

function Block({ icon, label, accent, children, tint }) {
  return (
    <div className="block">
      <div className="block-head">
        <span className="block-icon" style={{ background: tint || 'var(--tile)', color: accent }}>
          <Icon name={icon} size={18} stroke={2} />
        </span>
        <span className="block-label">{label}</span>
      </div>
      <div className="block-body">{children}</div>
    </div>
  );
}

function SessionDetail({ s, plan, goal, accent, onBack, onOpenWod }) {
  const G = window.GRASP;
  const phase = G.phases[s.phase];
  const wod = s.wod;
  return (
    <div className="screen detail">
      <TopBar onBack={onBack} title={'Session ' + ('0' + s.n).slice(-2)} />
      <div className="detail-body">
        <div className="detail-head">
          <span className="phase-chip" style={{ background: phase.color + '1A', color: phase.color }}>{phase.name}</span>
          <h1 className="detail-title">{s.title}</h1>
          <p className="detail-focus">{s.focus}</p>
          <div className="detail-meta">
            <span className="dm"><Icon name="clock" size={16} /> {s.durationMin} min</span>
            <span className="dm"><Icon name="flame" size={16} /> Intensity <IntensityDots level={s.intensity} accent={accent} /></span>
          </div>
        </div>

        <Block icon="warmup" label="Warm-up" accent={accent}>
          <ul className="bullets">
            {s.warmup.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </Block>

        <Block icon="target" label={s.primer.label} accent={accent}>
          {s.primer.note && <p className="block-note">{s.primer.note}</p>}
          {s.primer.items.map((it, i) => (
            <div key={i} className="primer-item">
              <div className="pi-text">
                <div className="pi-move">{it.move}</div>
                <div className="pi-detail">{it.detail}</div>
              </div>
              {it.link && (
                <a className="vidlink" href={it.link} target="_blank" rel="noreferrer" aria-label="Watch demo">
                  <Icon name="youtube" size={20} color={accent} />
                </a>
              )}
            </div>
          ))}
        </Block>

        <div className="wod-block" style={{ '--ga': accent }}>
          <div className="wod-top">
            <span className="wod-eyebrow">Conditioning</span>
            <span className="wod-format mono">{wod.format}</span>
          </div>
          {wod.name && <div className="wod-name">{wod.name}</div>}
          <ul className="wod-struct">
            {wod.structure.map((line, i) => (
              <li key={i} className={line.startsWith('—') || line.endsWith(':') ? 'wod-note-line' : ''}>{line}</li>
            ))}
          </ul>
          <div className="wod-foot">
            {wod.rx && <span className="rx mono">RX · {wod.rx}</span>}
            {wod.cap && <span className="cap mono"><Icon name="clock" size={14} /> Cap {wod.cap}</span>}
          </div>
          {wod.notes && <p className="wod-notes">{wod.notes}</p>}
          {s.famous && (
            <button className="bench-btn" onClick={() => onOpenWod(s.famous)}>
              <Icon name="medal" size={18} stroke={2} />
              View benchmark scores
              <Icon name="chevronRight" size={18} />
            </button>
          )}
        </div>

        <Block icon="stretch" label="Cool-down" accent={accent}>
          <ul className="bullets">
            {s.cooldown.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </Block>

        <div className="detail-nav">
          {s.n > 1 && <button className="navchip" onClick={() => onBack(s.n - 1)}><Icon name="chevronLeft" size={18} /> Prev</button>}
          <span style={{ flex: 1 }} />
          {s.n < plan.sessions.length && <button className="navchip" onClick={() => onBack(s.n + 1)}>Next <Icon name="chevronRight" size={18} /></button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Generating, PlanScreen, SessionDetail, IntensityDots });
