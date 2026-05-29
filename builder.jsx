/* builder.jsx — the plan builder flow (the centerpiece). */

function Stepper({ value, min, max, onChange }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="stepper">
      <button className="stepbtn" onClick={dec} disabled={value <= min} aria-label="Fewer">
        <Icon name="close" size={1} style={{ display: 'none' }} />
        <span className="stepglyph">−</span>
      </button>
      <div className="stepvalue">
        <span className="stepnum">{value}</span>
        <span className="steplabel">sessions</span>
      </div>
      <button className="stepbtn" onClick={inc} disabled={value >= max} aria-label="More">
        <span className="stepglyph">+</span>
      </button>
    </div>
  );
}

function ChipField({ options, selected, onToggle, custom, onAddCustom, onRemoveCustom, tone, placeholder }) {
  const [text, setText] = React.useState('');
  const submit = () => {
    const v = text.trim();
    if (v) { onAddCustom(v); setText(''); }
  };
  return (
    <div>
      <div className="chips">
        {options.map((opt) => {
          const on = selected.includes(opt);
          return (
            <button key={opt} className={'chip' + (on ? ' chip-on' : '') + (tone === 'avoid' ? ' chip-avoid' : '')} onClick={() => onToggle(opt)}>
              {on && <Icon name={tone === 'avoid' ? 'close' : 'check'} size={15} style={{ marginRight: 5, marginLeft: -2 }} />}
              {opt}
            </button>
          );
        })}
        {custom.map((c) => (
          <button key={'c-' + c} className={'chip chip-on chip-custom' + (tone === 'avoid' ? ' chip-avoid' : '')} onClick={() => onRemoveCustom(c)}>
            {c}
            <Icon name="close" size={14} style={{ marginLeft: 5, marginRight: -2, opacity: 0.7 }} />
          </button>
        ))}
      </div>
      <div className="freefield">
        <Icon name="plus" size={18} color="var(--ink-3)" />
        <input
          value={text}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        />
        {text.trim() && <button className="freeadd" onClick={submit}>Add</button>}
      </div>
    </div>
  );
}

function BuilderFlow({ cfg, setCfg, onGenerate, density }) {
  const [step, setStep] = React.useState(0);
  const G = window.GRASP;
  const steps = ['Goal', 'Volume', 'Priorities', 'Limits'];

  const go = (d) => setStep((s) => Math.min(steps.length - 1, Math.max(0, s + d)));

  const canContinue = step === 0 ? !!cfg.goalId : true;
  const last = step === steps.length - 1;

  const set = (patch) => setCfg({ ...cfg, ...patch });
  const toggleArr = (key, val) => {
    const arr = cfg[key];
    set({ [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] });
  };

  return (
    <div className="screen builder">
      {/* progress + brand */}
      <div className="builder-head">
        <div className="brandline">
          <span className="brandmark">Grasp it!</span>
          <span className="brandslogan">Create your own training plan</span>
        </div>
        <div className="progress">
          {steps.map((s, i) => (
            <div key={s} className={'progress-seg' + (i <= step ? ' on' : '')} />
          ))}
        </div>
        <div className="steplabels">
          <span className="eyebrow">{('0' + (step + 1)).slice(-2)} · {steps[step]}</span>
          <span className="eyebrow muted">of {('0' + steps.length).slice(-2)}</span>
        </div>
      </div>

      <div className="builder-body" key={step}>
        {step === 0 && (
          <div className="step">
            <h1 className="qtitle">What are you<br />training for?</h1>
            <p className="qsub">Pick a focus. Everything — volume, movements, intensity — is built around it.</p>
            <div className="goal-list">
              {G.goals.map((g) => {
                const on = cfg.goalId === g.id;
                return (
                  <button key={g.id} className={'goalcard' + (on ? ' on' : '')} onClick={() => set({ goalId: g.id })}
                    style={on ? { '--ga': g.accent } : undefined}>
                    <div className="goalcard-icon" style={{ background: on ? g.accent : 'var(--tile)', color: on ? '#fff' : 'var(--ink-2)' }}>
                      <Icon name={g.icon} size={26} stroke={2} />
                    </div>
                    <div className="goalcard-text">
                      <div className="goalcard-name">{g.name}</div>
                      <div className="goalcard-desc">{g.desc}</div>
                    </div>
                    <div className={'radio' + (on ? ' on' : '')} style={on ? { background: g.accent, borderColor: g.accent } : undefined}>
                      {on && <Icon name="check" size={15} color="#fff" stroke={2.4} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="step">
            <h1 className="qtitle">How many<br />sessions?</h1>
            <p className="qsub">Your plan progresses logically across every session — from base to peak.</p>
            <Stepper value={cfg.count} min={3} max={24} onChange={(v) => set({ count: v })} />
            <div className="sliderwrap">
              <input className="slider" type="range" min={3} max={24} step={1}
                value={cfg.count} onChange={(e) => set({ count: +e.target.value })}
                style={{ '--pct': ((cfg.count - 3) / (24 - 3)) * 100 + '%' }} />
              <div className="slider-ends"><span>3</span><span>24</span></div>
            </div>
            <div className="preset-row">
              {[3, 8, 16, 24].map((p) => (
                <button key={p} className={'preset' + (cfg.count === p ? ' on' : '')} onClick={() => set({ count: p })}>{p}</button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h1 className="qtitle">Anything you<br />love?</h1>
            <p className="qsub">Optional. We’ll prioritise these movements, tools and skills.</p>
            <ChipField
              options={G.prefChips}
              selected={cfg.prefs}
              onToggle={(v) => toggleArr('prefs', v)}
              custom={cfg.prefsCustom}
              onAddCustom={(v) => set({ prefsCustom: [...cfg.prefsCustom, v] })}
              onRemoveCustom={(v) => set({ prefsCustom: cfg.prefsCustom.filter((x) => x !== v) })}
              tone="like"
              placeholder="Add your own — e.g. Assault bike"
            />
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h1 className="qtitle">Anything to<br />leave out?</h1>
            <p className="qsub">Optional. These are excluded completely — no exceptions.</p>
            <ChipField
              options={G.dislikeChips}
              selected={cfg.dislikes}
              onToggle={(v) => toggleArr('dislikes', v)}
              custom={cfg.dislikesCustom}
              onAddCustom={(v) => set({ dislikesCustom: [...cfg.dislikesCustom, v] })}
              onRemoveCustom={(v) => set({ dislikesCustom: cfg.dislikesCustom.filter((x) => x !== v) })}
              tone="avoid"
              placeholder="Add your own — e.g. No skipping"
            />
          </div>
        )}
      </div>

      <div className="builder-foot">
        {step > 0 && (
          <button className="ghostbtn" onClick={() => go(-1)}>
            <Icon name="chevronLeft" size={20} /> Back
          </button>
        )}
        <button className="cta" disabled={!canContinue}
          onClick={() => { if (last) onGenerate(); else go(1); }}>
          {last ? <><Icon name="sparkle" size={20} stroke={2} /> Generate plan</> : <>Continue <Icon name="arrowRight" size={20} /></>}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { BuilderFlow });
