/* icons.jsx — clean 1.75px stroke icon set + small shared primitives. */

function Icon({ name, size = 24, color = 'currentColor', stroke = 1.75, fill = 'none', style }) {
  const p = { fill, stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    // goals
    barbell: <g {...p}><path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/></g>,
    pulse: <g {...p}><path d="M3 12h3.5l2-6 3 14 2.5-8h3.5"/><path d="M18 12h3"/></g>,
    rings: <g {...p}><circle cx="8" cy="9" r="4"/><circle cx="16" cy="9" r="4"/><path d="M8 13v6M16 13v6"/></g>,
    // ui
    chevronRight: <path d="M9 6l6 6-6 6" {...p}/>,
    chevronLeft: <path d="M15 6l-6 6 6 6" {...p}/>,
    chevronDown: <path d="M6 9l6 6 6-6" {...p}/>,
    arrowRight: <g {...p}><path d="M5 12h14M13 6l6 6-6 6"/></g>,
    check: <path d="M5 12.5l4.5 4.5L19 6.5" {...p}/>,
    plus: <g {...p}><path d="M12 5v14M5 12h14"/></g>,
    close: <g {...p}><path d="M6 6l12 12M18 6L6 18"/></g>,
    clock: <g {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></g>,
    flame: <path d="M12 3c1 3.5 4.5 4.5 4.5 8.5A4.5 4.5 0 0112 16a4.5 4.5 0 01-4.5-4.5C7.5 9 9 8 9.5 6.5 10.5 8 12 7 12 3z" {...p}/>,
    bolt: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" {...p}/>,
    sun: <g {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/></g>,
    warmup: <g {...p}><circle cx="12" cy="5.5" r="2"/><path d="M8 21l2-6 4 2 1 4M10 15l-2-4 4-2 4 3"/></g>,
    stretch: <g {...p}><circle cx="9" cy="5" r="2"/><path d="M9 7v5l-3 8M9 12l5 1 3 7M9 12l5-2"/></g>,
    target: <g {...p}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6" fill={color}/></g>,
    play: <path d="M8 5.5v13l11-6.5-11-6.5z" fill={color} stroke="none"/>,
    youtube: <g><rect x="2.5" y="6" width="19" height="12" rx="3.5" {...p}/><path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill={color} stroke="none"/></g>,
    repeat: <g {...p}><path d="M4 9l3-3 3 3M7 6v7a3 3 0 003 3h7M20 15l-3 3-3-3M17 18v-7a3 3 0 00-3-3H7"/></g>,
    sparkle: <path d="M12 3l1.8 5.4L19 10.2l-5.2 1.8L12 17.4l-1.8-5.4L5 10.2l5.2-1.8L12 3z" {...p}/>,
    medal: <g {...p}><circle cx="12" cy="14" r="5"/><path d="M9 9L7 3M15 9l2-6M12 12.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2L9.1 14.6l2-.3.9-1.8z"/></g>,
    sliders: <g {...p}><path d="M4 8h10M18 8h2M4 16h2M10 16h10"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/></g>,
    grip: <g {...p}><path d="M7 11V6.5a1.5 1.5 0 013 0V11m0-1V5.5a1.5 1.5 0 013 0V11m0-.5V6a1.5 1.5 0 013 0v7a6 6 0 01-6 6h-1a5 5 0 01-4-2.2L6 13.5a1.5 1.5 0 012.4-1.8L10 14"/></g>,
    download: <g {...p}><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"/></g>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
}

/* Small back/title bar used on pushed screens */
function TopBar({ onBack, title, accent, trailing }) {
  return (
    <div className="topbar">
      <button className="iconbtn" onClick={onBack} aria-label="Back">
        <Icon name="chevronLeft" size={22} />
      </button>
      <div className="topbar-title">{title}</div>
      <div className="topbar-trail">{trailing || <span style={{ width: 38 }} />}</div>
    </div>
  );
}

/* Rank medal chip for benchmark tiers (no emoji). */
function RankBadge({ rank, size = 30 }) {
  const palette = {
    1: { ring: '#E7B53C', face: '#FBE9B0', ink: '#7A5A12' },
    2: { ring: '#AEB2BD', face: '#E9EBF0', ink: '#565A66' },
    3: { ring: '#C2864F', face: '#F1DCC6', ink: '#774A24' },
  }[rank] || { ring: '#ccc', face: '#eee', ink: '#555' };
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flexShrink: 0,
      background: palette.face, border: `2px solid ${palette.ring}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--mono)', fontWeight: 700, fontSize: size * 0.42,
      color: palette.ink, letterSpacing: '-0.02em',
    }}>{rank}</div>
  );
}

Object.assign(window, { Icon, TopBar, RankBadge });
