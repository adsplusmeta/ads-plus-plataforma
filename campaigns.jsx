// campaigns.jsx
const CampaignCard = ({ c, delay=0 }) => {
  const [hov, setHov] = React.useState(false);
  const tColor = c.trendDir==='up' ? '#39D353' : c.trendDir==='down' ? '#F85149' : '#8B949E';
  const pct = Math.round((c.investment/c.budget)*100);
  const canActivate = c.status==='paused'||c.status==='review';
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="card"
      style={{
        padding:18,
        border:`1px solid ${hov?'rgba(0,180,216,0.28)':'rgba(0,180,216,0.1)'}`,
        transform:hov?'translateY(-2px)':'none',
        boxShadow:hov?'0 10px 36px rgba(0,0,0,0.35)':'none',
        transition:'all 0.2s ease',
        animation:`fadeUp 0.35s ${delay}ms ease-out both`,
        display:'flex', flexDirection:'column', gap:14,
      }}
    >
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text-1)', marginBottom:3 }}>{c.name}</div>
          <div style={{ fontSize:11, color:'var(--text-2)' }}>{c.objective} · {c.platform}</div>
        </div>
        <StatusBadge status={c.status}/>
      </div>

      {/* Budget bar */}
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-2)', marginBottom:5 }}>
          <span>Presupuesto</span>
          <span style={{ fontFamily:'var(--font-m)', color: pct>85?'var(--error)':'var(--text-1)', fontWeight:600 }}>{pct}%</span>
        </div>
        <div style={{ background:'var(--border)', borderRadius:4, height:5, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${pct}%`, borderRadius:4, transition:'width 0.5s ease',
            background: pct>85 ? 'linear-gradient(90deg,var(--error),#ff6b6b)' : 'linear-gradient(90deg,#00B4D8,#0077B6)' }}/>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
        {[{l:'Inversión',v:`$${c.investment.toLocaleString()}`},{l:'Resultados',v:c.results},{l:'CPR',v:`$${c.cpr.toFixed(2)}`}].map(m=>(
          <div key={m.l} style={{ textAlign:'center', background:'rgba(0,180,216,0.04)', borderRadius:7, padding:'8px 4px' }}>
            <div style={{ fontSize:9, color:'var(--text-2)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>{m.l}</div>
            <div style={{ fontFamily:'var(--font-m)', fontSize:13, fontWeight:700, color:'var(--text-1)' }}>{m.v}</div>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div style={{ display:'flex', justifyContent:'center' }}>
        <Sparkline data={c.trend} color={tColor} width={180} height={34}/>
      </div>

      {/* Actions */}
      <div style={{ display:'flex', gap:6, borderTop:'1px solid var(--border)', paddingTop:12 }}>
        {[
          { lbl:'Editar', icon:'edit', color:'var(--text-2)' },
          { lbl:canActivate?'Activar':'Pausar', icon:canActivate?'play':'pause', color:canActivate?'var(--success)':'var(--warning)' },
          { lbl:'Ver', icon:'eye', color:'var(--accent)' },
        ].map(b=>(
          <button key={b.lbl} style={{
            flex:1, padding:'6px 0', borderRadius:6,
            border:'1px solid var(--border)', background:'transparent',
            cursor:'pointer', fontSize:11, fontWeight:600, color:b.color,
            display:'flex', alignItems:'center', justifyContent:'center', gap:4,
            fontFamily:'var(--font-u)', transition:'background 0.12s',
          }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(0,180,216,0.06)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}
          >
            <Icon name={b.icon} size={12} color={b.color}/>{b.lbl}
          </button>
        ))}
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div style={{ gridColumn:'1/-1', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 0', gap:14 }}>
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <rect x="8" y="8" width="56" height="56" rx="12" stroke="rgba(0,180,216,0.3)" strokeWidth="1.5" strokeDasharray="6 4"/>
      <rect x="22" y="28" width="28" height="3.5" rx="1.75" fill="rgba(0,180,216,0.2)"/>
      <rect x="26" y="37" width="20" height="3.5" rx="1.75" fill="rgba(0,180,216,0.15)"/>
      <rect x="30" y="46" width="12" height="3.5" rx="1.75" fill="rgba(0,180,216,0.1)"/>
      <circle cx="36" cy="20" r="5" stroke="rgba(0,180,216,0.4)" strokeWidth="1.5"/>
    </svg>
    <div style={{ fontFamily:'var(--font-d)', fontSize:17, fontWeight:700, color:'var(--text-2)' }}>No hay campañas aún</div>
    <div style={{ fontSize:13, color:'var(--text-2)', opacity:0.6 }}>Crea tu primera campaña para empezar</div>
  </div>
);

const CampaignsView = ({ onNewCampaign }) => {
  const [viewMode, setViewMode]   = React.useState('cards');
  const [statusF,  setStatusF]    = React.useState('all');
  const [search,   setSearch]     = React.useState('');

  const filters = [
    { k:'all',    l:'Todas'      },
    { k:'active', l:'Activas'   },
    { k:'paused', l:'Pausadas'  },
    { k:'review', l:'En revisión'},
  ];

  const filtered = CAMPAIGNS_DATA
    .filter(c => statusF==='all' || c.status===statusF)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="dash-padding" style={{ overflowY:'auto', height:'100%', display:'flex', flexDirection:'column', gap:20 }}>
      {/* Header */}
      <div className="fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <h1 style={{ fontFamily:'var(--font-d)', fontSize:28, fontWeight:800, color:'var(--text-1)' }}>Campañas</h1>
        <button className="btn-grad" onClick={onNewCampaign}><Icon name="plus" size={15}/>Nueva Campaña</button>
      </div>

      {/* Toolbar */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
        <div style={{ display:'flex', gap:4, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
          {filters.map(f=>(
            <button key={f.k} onClick={()=>setStatusF(f.k)} style={{
              padding:'5px 13px', borderRadius:6, border:'none', cursor:'pointer',
              fontSize:12, fontWeight:600, fontFamily:'var(--font-u)',
              background: statusF===f.k ? 'var(--accent)' : 'transparent',
              color:       statusF===f.k ? 'white' : 'var(--text-2)',
              transition:'all 0.15s',
            }}>{f.l}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <div style={{ position:'relative' }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar..."
              style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:7, padding:'7px 12px 7px 30px', color:'var(--text-1)', fontSize:12, fontFamily:'var(--font-u)', width:170, outline:'none' }}/>
            <div style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)' }}><Icon name="search" size={13} color="var(--text-2)"/></div>
          </div>
          <div style={{ display:'flex', gap:2, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
            {[['cards','grid'],['list','list']].map(([mode,icon])=>(
              <button key={mode} onClick={()=>setViewMode(mode)} style={{
                width:30, height:28, borderRadius:6, border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                background: viewMode===mode ? 'rgba(0,180,216,0.15)' : 'transparent',
                color:       viewMode===mode ? 'var(--accent)' : 'var(--text-2)',
                transition:'all 0.15s',
              }}><Icon name={icon} size={14}/></button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid / Table */}
      {viewMode==='cards' ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
          {filtered.map((c,i) => <CampaignCard key={c.id} c={c} delay={i*55}/>)}
          {filtered.length===0 && <EmptyState/>}
        </div>
      ) : (
        <div className="card" style={{ overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--border)' }}>
                {['Nombre','Estado','Objetivo','Inversión','Resultados','CPR','Presupuesto'].map(h=>(
                  <th key={h} style={{ padding:'11px 14px', textAlign:'left', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c,i)=>(
                <tr key={c.id} style={{ borderBottom:'1px solid rgba(30,45,61,0.5)', transition:'background 0.12s', animation:`fadeUp 0.3s ${i*40}ms ease-out both` }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(0,180,216,0.04)';e.currentTarget.style.borderLeft='2px solid var(--accent)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderLeft='none';}}
                >
                  <td style={{ padding:'11px 14px', fontSize:13, fontWeight:600, color:'var(--text-1)' }}>{c.name}</td>
                  <td style={{ padding:'11px 14px' }}><StatusBadge status={c.status}/></td>
                  <td style={{ padding:'11px 14px', fontSize:12, color:'var(--text-2)' }}>{c.objective}</td>
                  <td style={{ padding:'11px 14px', fontFamily:'var(--font-m)', fontSize:13, color:'var(--text-1)', fontWeight:600 }}>${c.investment.toLocaleString()}</td>
                  <td style={{ padding:'11px 14px', fontFamily:'var(--font-m)', fontSize:13, color:'var(--text-1)' }}>{c.results}</td>
                  <td style={{ padding:'11px 14px', fontFamily:'var(--font-m)', fontSize:13, color:'var(--text-1)' }}>${c.cpr.toFixed(2)}</td>
                  <td style={{ padding:'11px 14px' }}>
                    <div style={{ background:'var(--border)', borderRadius:4, height:4, width:80, overflow:'hidden', marginBottom:3 }}>
                      <div style={{ height:'100%', width:`${Math.round((c.investment/c.budget)*100)}%`, background:'linear-gradient(90deg,#00B4D8,#0077B6)', borderRadius:4 }}/>
                    </div>
                    <div style={{ fontSize:10, color:'var(--text-2)' }}>{Math.round((c.investment/c.budget)*100)}% de ${c.budget.toLocaleString()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { CampaignsView, CampaignCard, EmptyState });
