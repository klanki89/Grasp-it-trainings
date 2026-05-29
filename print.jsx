/* print.jsx — full printable plan document (all sessions detailed). */

function PrPhaseName(pid) { return (window.GRASP.phases[pid] || {}).name || ''; }

function PrintDoc({ plan, goal, accent }) {
  const G = window.GRASP;
  const phaseOrder = ['base', 'thr', 'int', 'peak'];
  const famousCount = plan.sessions.filter((s) => s.famous).length;
  const intensityText = (lvl) => '●●●●●'.slice(0, lvl) + '○○○○○'.slice(0, 5 - lvl);

  const grouped = phaseOrder.map((pid) => ({
    pid, name: G.phases[pid].name, color: G.phases[pid].color,
    sessions: plan.sessions.filter((s) => s.phase === pid),
  })).filter((g) => g.sessions.length);

  return (
    <div className="print-doc" style={{ '--ga': accent }}>
      {/* cover header */}
      <header className="pr-cover">
        <div className="pr-brandrow">
          <span className="pr-brand">Grasp it!</span>
          <span className="pr-brandtag mono">Create your own training plan</span>
        </div>
        <h1 className="pr-title">{goal.name}</h1>
        <p className="pr-sub">{plan.weeks}</p>
        <div className="pr-statgrid">
          <div className="pr-stat"><span className="mono pr-statn">{plan.sessions.length}</span><span className="pr-statl">sessions</span></div>
          <div className="pr-stat"><span className="mono pr-statn">{grouped.length}</span><span className="pr-statl">phases</span></div>
          <div className="pr-stat"><span className="mono pr-statn">{famousCount}</span><span className="pr-statl">benchmark WODs</span></div>
        </div>
        {(plan.prefs.length || plan.dislikes.length) ? (
          <div className="pr-prefs">
            {plan.prefs.length ? <div className="pr-prefrow"><span className="pr-preflbl">Priorities</span><span>{plan.prefs.join(' · ')}</span></div> : null}
            {plan.dislikes.length ? <div className="pr-prefrow"><span className="pr-preflbl avoid">Excluded</span><span>{plan.dislikes.join(' · ')}</span></div> : null}
          </div>
        ) : null}
      </header>

      {grouped.map((grp) => (
        <section key={grp.pid} className="pr-phase">
          <div className="pr-phasehd">
            <span className="pr-phasedot" style={{ background: grp.color }} />
            <span className="pr-phasename">{grp.name}</span>
            <span className="pr-phasemeta mono">{grp.sessions.length} sessions</span>
          </div>

          {grp.sessions.map((s) => (
            <article key={s.n} className="pr-session">
              <div className="pr-shd">
                <span className="pr-snum mono">Session {('0' + s.n).slice(-2)}</span>
                <span className="pr-smeta mono">{grp.name} · {s.durationMin} min · Intensity {intensityText(s.intensity)}</span>
              </div>
              <h2 className="pr-stitle">{s.title}</h2>
              <p className="pr-sfocus">{s.focus}</p>

              <div className="pr-block">
                <span className="pr-blbl">Warm-up</span>
                <ul className="pr-list">{s.warmup.map((w, i) => <li key={i}>{w}</li>)}</ul>
              </div>

              <div className="pr-block">
                <span className="pr-blbl">{s.primer.label}</span>
                {s.primer.note ? <p className="pr-note">{s.primer.note}</p> : null}
                <ul className="pr-list">
                  {s.primer.items.map((it, i) => (
                    <li key={i}><strong>{it.move}</strong> — {it.detail}{it.link ? <span className="pr-link"> · video: {it.link}</span> : null}</li>
                  ))}
                </ul>
              </div>

              <div className="pr-block pr-wod">
                <div className="pr-wodhd">
                  <span className="pr-blbl">Conditioning{s.wod.name ? ' — ' + s.wod.name : ''}</span>
                  <span className="pr-wodfmt mono">{s.wod.format}</span>
                </div>
                <ul className="pr-list pr-wodlist">
                  {s.wod.structure.map((line, i) => (
                    <li key={i} className={line.startsWith('—') || line.endsWith(':') ? 'pr-noteline' : ''}>{line}</li>
                  ))}
                </ul>
                <div className="pr-wodfoot mono">
                  {s.wod.rx ? <span>RX · {s.wod.rx}</span> : null}
                  {s.wod.cap ? <span>Cap {s.wod.cap}</span> : null}
                </div>
                {s.wod.notes ? <p className="pr-note">{s.wod.notes}</p> : null}
                {s.famous ? (() => {
                  const w = G.wods[s.famous];
                  return (
                    <table className="pr-bench">
                      <thead><tr><th>Benchmark</th><th></th><th>Score</th></tr></thead>
                      <tbody>
                        {w.tiers.map((t) => (
                          <tr key={t.rank}>
                            <td className="pr-btier">{t.tier}</td>
                            <td className="pr-bwho">{t.who}</td>
                            <td className="pr-bscore mono">{t.score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })() : null}
              </div>

              <div className="pr-block">
                <span className="pr-blbl">Cool-down</span>
                <ul className="pr-list">{s.cooldown.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
            </article>
          ))}
        </section>
      ))}

      <footer className="pr-footer mono">Grasp it! · {goal.name} · {plan.sessions.length} sessions</footer>
    </div>
  );
}

Object.assign(window, { PrintDoc });
