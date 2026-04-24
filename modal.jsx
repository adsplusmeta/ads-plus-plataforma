// modal.jsx
const NewCampaignModal = ({ open, onClose, onCreated }) => {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ name:'', objective:'', budget:'', startDate:'', endDate:'', audience:'', platform:'' });

  if (!open) return null;

  const steps = ['Nombre y objetivo', 'Presupuesto y fechas', 'Públicos y plataforma'];
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleCreate = () => {
    onCreated();
    onClose();
    setTimeout(()=>{ setStep(0); setForm({ name:'', objective:'', budget:'', startDate:'', endDate:'', audience:'', platform:'' }); }, 300);
  };

  const inp = {
    width:'100%', background:'#0D1117', border:'1px solid #1E2D3D',
    borderRadius:8, padding:'9px 13px', color:'#F0F6FC',
    fontSize:13, fontFamily:'var(--font-u)', outline:'none', transition:'border-color 0.15s',
  };
  const lbl = { fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#8B949E', marginBottom:6, display:'block' };

  const Step0 = () => (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <span style={lbl}>Nombre de campaña</span>
        <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Ej: Black Friday Q3" style={inp}
          onFocus={e=>e.target.style.borderColor='#00B4D8'} onBlur={e=>e.target.style.borderColor='#1E2D3D'}/>
      </div>
      <div>
        <span style={lbl}>Objetivo principal</span>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {['Conversiones','Tráfico','Alcance','Leads','Engagement','Ventas'].map(obj=>(
            <div key={obj} onClick={()=>set('objective',obj)} style={{
              padding:'10px 14px', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:500,
              border:`1px solid ${form.objective===obj?'var(--accent)':'#1E2D3D'}`,
              background: form.objective===obj ? 'rgba(0,180,216,0.1)' : 'rgba(0,0,0,0.2)',
              color: form.objective===obj ? 'var(--accent)' : '#8B949E',
              transition:'all 0.15s',
            }}>{obj}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const Step1 = () => (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <span style={lbl}>Presupuesto total (USD)</span>
        <input type="number" value={form.budget} onChange={e=>set('budget',e.target.value)} placeholder="Ej: 10000" style={inp}
          onFocus={e=>e.target.style.borderColor='#00B4D8'} onBlur={e=>e.target.style.borderColor='#1E2D3D'}/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div>
          <span style={lbl}>Fecha de inicio</span>
          <input type="date" value={form.startDate} onChange={e=>set('startDate',e.target.value)} style={inp}/>
        </div>
        <div>
          <span style={lbl}>Fecha de fin</span>
          <input type="date" value={form.endDate} onChange={e=>set('endDate',e.target.value)} style={inp}/>
        </div>
      </div>
      {form.budget && (
        <div style={{ background:'rgba(0,180,216,0.06)', border:'1px solid rgba(0,180,216,0.15)', borderRadius:8, padding:'10px 14px', fontSize:12 }}>
          <span style={{ color:'var(--accent)', fontWeight:700, fontFamily:'var(--font-m)' }}>${(Number(form.budget)/30).toFixed(2)}</span>
          <span style={{ color:'var(--text-2)' }}> · presupuesto diario estimado (30 días)</span>
        </div>
      )}
    </div>
  );

  const Step2 = () => (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <span style={lbl}>Público objetivo</span>
        <select value={form.audience} onChange={e=>set('audience',e.target.value)} style={{ ...inp, cursor:'pointer' }}>
          <option value="">Seleccionar público...</option>
          <option>Remarketing — Visitantes web</option>
          <option>Lookalike — 1%</option>
          <option>Intereses — Tecnología</option>
          <option>Comportamientos — Compradores frecuentes</option>
          <option>Público personalizado</option>
        </select>
      </div>
      <div>
        <span style={lbl}>Plataforma</span>
        <div style={{ display:'flex', gap:8 }}>
          {['Meta','Google','TikTok'].map(p=>(
            <div key={p} onClick={()=>set('platform',p)} style={{
              flex:1, padding:'12px 0', borderRadius:8, cursor:'pointer', textAlign:'center',
              border:`1px solid ${form.platform===p?'var(--accent)':'#1E2D3D'}`,
              background: form.platform===p ? 'rgba(0,180,216,0.1)' : 'rgba(0,0,0,0.2)',
              color: form.platform===p ? 'var(--accent)' : '#8B949E',
              fontSize:13, fontWeight:600, transition:'all 0.15s',
            }}>{p}</div>
          ))}
        </div>
      </div>
      {/* Summary */}
      <div style={{ background:'rgba(0,0,0,0.25)', border:'1px solid #1E2D3D', borderRadius:10, padding:14, display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#8B949E', marginBottom:2 }}>Resumen</div>
        {[{l:'Nombre',v:form.name||'—'},{l:'Objetivo',v:form.objective||'—'},{l:'Presupuesto',v:form.budget?`$${Number(form.budget).toLocaleString()}`:'—'},{l:'Plataforma',v:form.platform||'—'}].map(r=>(
          <div key={r.l} style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
            <span style={{ color:'#8B949E' }}>{r.l}</span>
            <span style={{ color:'#F0F6FC', fontWeight:600 }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{
      position:'fixed', inset:0, zIndex:1000,
      background:'rgba(0,0,0,0.72)',
      backdropFilter:'blur(10px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:16,
      animation:'fadeUp 0.2s ease-out',
    }}>
      <div style={{
        background:'#111827',
        border:'1px solid rgba(0,180,216,0.15)',
        borderRadius:16, padding:'22px 20px',
        width:'100%', maxWidth:480, position:'relative',
        maxHeight:'90vh', overflowY:'auto',
        boxShadow:'0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(0,180,216,0.06)',
        animation:'fadeUp 0.25s ease-out',
      }}>
        {/* Top accent line */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,#00B4D8,transparent)', borderRadius:'16px 16px 0 0' }}/>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
          <div>
            <div style={{ fontFamily:'var(--font-d)', fontSize:20, fontWeight:800, color:'var(--text-1)', marginBottom:3 }}>Nueva Campaña</div>
            <div style={{ fontSize:12, color:'var(--text-2)' }}>Paso {step+1} de {steps.length} — {steps[step]}</div>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:'rgba(0,0,0,0.3)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--text-2)' }}>
            <Icon name="x" size={16}/>
          </button>
        </div>

        {/* Stepper */}
        <div style={{ display:'flex', gap:8, marginBottom:24 }}>
          {steps.map((s,i)=>(
            <div key={i} style={{ flex:1 }}>
              <div style={{ height:2.5, borderRadius:2, background: i<=step ? 'var(--accent)' : 'var(--border)', transition:'background 0.3s', marginBottom:6 }}/>
              <div style={{ fontSize:10, color: i===step ? 'var(--accent)' : 'var(--text-2)', fontWeight: i===step ? 600 : 400 }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div style={{ marginBottom:24 }}>
          {step===0 && <Step0/>}
          {step===1 && <Step1/>}
          {step===2 && <Step2/>}
        </div>

        {/* Footer */}
        <div style={{ display:'flex', justifyContent:'space-between', gap:10 }}>
          <button onClick={onClose} style={{ padding:'8px 18px', borderRadius:8, border:'1px solid var(--border)', background:'transparent', color:'var(--text-2)', cursor:'pointer', fontSize:13, fontFamily:'var(--font-u)' }}>
            Cancelar
          </button>
          <div style={{ display:'flex', gap:8 }}>
            {step>0 && (
              <button onClick={()=>setStep(s=>s-1)} style={{ padding:'8px 18px', borderRadius:8, border:'1px solid var(--border)', background:'transparent', color:'var(--text-1)', cursor:'pointer', fontSize:13, fontFamily:'var(--font-u)' }}>
                ← Anterior
              </button>
            )}
            {step<steps.length-1 ? (
              <button className="btn-grad" onClick={()=>setStep(s=>s+1)}>Siguiente →</button>
            ) : (
              <button onClick={handleCreate} style={{ padding:'8px 20px', borderRadius:8, border:'none', background:'linear-gradient(135deg,#39D353,#1a7a28)', color:'white', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-u)', display:'flex', alignItems:'center', gap:6 }}>
                <Icon name="check" size={14} color="white"/>Crear Campaña
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { NewCampaignModal });
