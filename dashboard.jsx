// dashboard.jsx

/* ── Status badge ── */
const StatusBadge = ({ status }) => {
  const cfg = {
    active:  { label:'Activa',       color:'#39D353', bg:'rgba(57,211,83,0.1)'   },
    review:  { label:'En revisión',  color:'#E3B341', bg:'rgba(227,179,65,0.1)'  },
    paused:  { label:'Pausada',      color:'#F85149', bg:'rgba(248,81,73,0.1)'   },
    archived:{ label:'Archivada',    color:'#8B949E', bg:'rgba(139,148,158,0.1)' },
  }[status] || { label:status, color:'#8B949E', bg:'rgba(139,148,158,0.1)' };
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:cfg.bg, borderRadius:6, padding:'3px 8px' }}>
      <div style={{ width:5, height:5, borderRadius:'50%', background:cfg.color, flexShrink:0 }}></div>
      <span style={{ fontSize:11, fontWeight:600, color:cfg.color }}>{cfg.label}</span>
    </div>
  );
};

/* ── KPI Card ── */
const KPICard = ({ kpi, delay=0 }) => {
  const [hov, setHov] = React.useState(false);
  const isDown = kpi.dir === 'down';
  const iconColors = { dollar:'#00B4D8', users:'#39D353', click:'#0077B6', cost:'#F85149' };
  const iconBgs    = { dollar:'rgba(0,180,216,0.1)', users:'rgba(57,211,83,0.1)', click:'rgba(0,119,182,0.1)', cost:'rgba(248,81,73,0.1)' };
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="card"
      style={{
        padding:20,
        border: `1px solid ${hov ? 'rgba(0,180,216,0.28)' : 'rgba(0,180,216,0.1)'}`,
        boxShadow: hov ? '0 0 30px rgba(0,180,216,0.08)' : 'none',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition:'all 0.2s ease',
        animation:`fadeUp 0.35s ${delay}ms ease-out both`,
        cursor:'default',
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
        <span style={{ fontSize:10, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-2)' }}>{kpi.label}</span>
        <div style={{ width:30, height:30, borderRadius:7, background:iconBgs[kpi.icon], display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon name={kpi.icon} size={14} color={iconColors[kpi.icon]}/>
        </div>
      </div>
      <div style={{ fontFamily:'var(--font-m)', fontSize:30, fontWeight:700, color:'var(--text-1)', lineHeight:1, marginBottom:10 }}>
        {kpi.value}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:600, color: isDown ? 'var(--error)' : 'var(--success)' }}>
          <Icon name={isDown?'arrowDown':'arrowUp'} size={11} color={isDown?'var(--error)':'var(--success)'}/>
          {kpi.change}
          <span style={{ color:'var(--text-2)', fontWeight:400, fontSize:11 }}> vs ant.</span>
        </div>
        <Sparkline data={kpi.spark} color={isDown?'#F85149':'#00B4D8'} width={68} height={26}/>
      </div>
    </div>
  );
};

/* ── Campaign row in table ── */
const CampRow = ({ c, delay=0 }) => {
  const [hov, setHov] = React.useState(false);
  const tColor = c.trendDir==='up' ? '#39D353' : c.trendDir==='down' ? '#F85149' : '#8B949E';
  const canActivate = c.status==='paused' || c.status==='review';

  const cellBase = { padding:'11px 14px', fontSize:13 };
  return (
    <tr
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderBottom:'1px solid rgba(30,45,61,0.5)',
        background: hov ? 'rgba(0,180,216,0.04)' : 'transparent',
        borderLeft: hov ? '2px solid var(--accent)' : '2px solid transparent',
        transition:'background 0.15s, border-color 0.15s',
        animation:`fadeUp 0.3s ${delay}ms ease-out both`,
      }}
    >
      <td style={{ ...cellBase, fontWeight:600, color:'var(--text-1)' }}>{c.name}</td>
      <td style={cellBase}><StatusBadge status={c.status}/></td>
      <td style={{ ...cellBase, fontFamily:'var(--font-m)', fontWeight:600, color:'var(--text-1)' }}>${c.investment.toLocaleString()}</td>
      <td style={{ ...cellBase, fontFamily:'var(--font-m)', color:'var(--text-1)' }}>{c.results}</td>
      <td style={{ ...cellBase, fontFamily:'var(--font-m)', color:'var(--text-1)' }}>${c.cpr.toFixed(2)}</td>
      <td style={cellBase}><Sparkline data={c.trend} color={tColor} width={60} height={22}/></td>
      <td style={cellBase}>
        <div style={{ display:'flex', gap:5 }}>
          <ActionBtn label="Editar" icon="edit"/>
          <ActionBtn label={canActivate?'Activar':'Pausar'} icon={canActivate?'play':'pause'} color={canActivate?'var(--success)':'var(--warning)'}/>
        </div>
      </td>
    </tr>
  );
};

const ActionBtn = ({ label, icon, color='var(--text-2)' }) => (
  <button style={{
    display:'flex', alignItems:'center', gap:4,
    padding:'4px 9px', borderRadius:6,
    border:'1px solid var(--border)',
    background:'transparent', cursor:'pointer',
    fontSize:11, fontWeight:600, color,
    fontFamily:'var(--font-u)', transition:'all 0.12s',
  }}
    onMouseEnter={e => { e.currentTarget.style.background='rgba(0,180,216,0.07)'; e.currentTarget.style.borderColor='rgba(0,180,216,0.3)'; }}
    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--border)'; }}
  >
    <Icon name={icon} size={12} color={color}/>{label}
  </button>
);

/* ── Dashboard View ── */
const DashboardView = ({ onNewCampaign, showToast }) => {
  const [period, setPeriod]       = React.useState('30');
  const [periodOpen, setPeriodOpen] = React.useState(false);
  const [chartType, setChartType] = React.useState('bar');
  const [sortCol, setSortCol]     = React.useState('investment');
  const [sortDir, setSortDir]     = React.useState('desc');
  const [search, setSearch]       = React.useState('');
  const [statusF, setStatusF]     = React.useState('all');
  const [page, setPage]           = React.useState(0);

  const PAGE = 5;
  const periodOpts = [
    { v:'7',label:'Últimos 7 días' },{ v:'14',label:'Últimos 14 días' },
    { v:'30',label:'Últimos 30 días' },{ v:'custom',label:'Personalizado' },
  ];

  const handleSort = col => {
    if (sortCol===col) setSortDir(d=>d==='asc'?'desc':'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const filtered = CAMPAIGNS_DATA
    .filter(c => statusF==='all' || c.status===statusF)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => {
      const d = sortDir==='asc' ? 1 : -1;
      if (sortCol==='name') return d*a.name.localeCompare(b.name);
      if (sortCol==='status') return d*a.status.localeCompare(b.status);
      return d*(a[sortCol]-b[sortCol]);
    });

  const paged = filtered.slice(page*PAGE, (page+1)*PAGE);
  const totalPages = Math.ceil(filtered.length/PAGE);

  const thStyle = (col) => ({
    padding:'11px 14px', textAlign:'left', cursor: col==='trend'||col==='actions' ? 'default' : 'pointer',
    userSelect:'none',
  });
  const thLabel = (col, label) => (
    <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color: sortCol===col ? 'var(--accent)' : 'var(--text-2)' }}
      onClick={() => col!=='trend'&&col!=='actions'&&handleSort(col)}>
      {label}
      {col!=='trend'&&col!=='actions'&&<Icon name="chevronDown" size={10} color={sortCol===col?'var(--accent)':'var(--text-2)'}/>}
    </div>
  );

  return (
    <div className="dash-padding" style={{ overflowY:'auto', height:'100%', display:'flex', flexDirection:'column', gap:20 }}>
      {/* Header */}
      <div className="fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontFamily:'var(--font-d)', fontSize:28, fontWeight:800, color:'var(--text-1)', marginBottom:3 }}>Resumen de rendimiento</h1>
          <p style={{ fontSize:13, color:'var(--text-2)' }}>Cuenta principal · {periodOpts.find(p=>p.v===period)?.label}</p>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          {/* Period */}
          <div style={{ position:'relative' }}>
            <button onClick={() => setPeriodOpen(o=>!o)} style={{
              display:'flex', alignItems:'center', gap:8,
              background:'var(--bg-card)', border:'1px solid var(--border)',
              borderRadius:8, padding:'8px 13px', color:'var(--text-1)',
              cursor:'pointer', fontSize:13, fontFamily:'var(--font-u)',
            }}>
              <Icon name="calendar" size={14} color="var(--text-2)"/>
              {periodOpts.find(p=>p.v===period)?.label}
              <Icon name="chevronDown" size={13} color="var(--text-2)"/>
            </button>
            {periodOpen && (
              <div style={{ position:'absolute', top:44, right:0, zIndex:50, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, minWidth:180, boxShadow:'0 8px 24px rgba(0,0,0,0.5)', overflow:'hidden' }}>
                {periodOpts.map(opt => (
                  <div key={opt.v} onClick={()=>{setPeriod(opt.v);setPeriodOpen(false);}} style={{ padding:'9px 14px', fontSize:13, cursor:'pointer', color:period===opt.v?'var(--accent)':'var(--text-1)', background:period===opt.v?'rgba(0,180,216,0.08)':'transparent' }}
                    onMouseEnter={e=>{if(period!==opt.v)e.currentTarget.style.background='rgba(0,180,216,0.05)';}}
                    onMouseLeave={e=>{if(period!==opt.v)e.currentTarget.style.background='transparent';}}
                  >{opt.label}</div>
                ))}
              </div>
            )}
          </div>
          <button className="btn-grad" onClick={onNewCampaign}>
            <Icon name="plus" size={15}/>Nueva Campaña
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        {KPI_DATA.map((k,i) => <KPICard key={k.label} kpi={k} delay={i*70}/>)}
      </div>

      {/* Charts */}
      <div className="chart-grid">
        <div className="card" style={{ padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-2)', marginBottom:2 }}>Inversión Diaria</div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--text-1)' }}>Últimos 14 días</div>
            </div>
            <div style={{ display:'flex', gap:3 }}>
              {[['bar','Barras'],['line','Línea'],['area','Área']].map(([t,l])=>(
                <button key={t} onClick={()=>setChartType(t)} style={{
                  padding:'4px 9px', borderRadius:6, border:'none', cursor:'pointer',
                  fontSize:11, fontWeight:600, fontFamily:'var(--font-u)',
                  background:chartType===t?'rgba(0,180,216,0.15)':'transparent',
                  color:chartType===t?'var(--accent)':'var(--text-2)',
                  transition:'all 0.15s',
                }}>{l}</button>
              ))}
            </div>
          </div>
          <InvestmentChart data={DAILY_INVESTMENT} chartType={chartType}/>
        </div>
        <div className="card" style={{ padding:20 }}>
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-2)', marginBottom:2 }}>Distribución</div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text-1)' }}>Por Objetivo</div>
          </div>
          <DonutChart data={DONUT_DATA}/>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow:'hidden' }}>
        <div style={{ padding:'12px 14px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <div style={{ fontFamily:'var(--font-d)', fontSize:15, fontWeight:700 }}>Campañas Activas</div>
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ position:'relative' }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar campaña..."
                style={{ background:'var(--bg-input)', border:'1px solid var(--border)', borderRadius:7, padding:'6px 12px 6px 30px', color:'var(--text-1)', fontSize:12, fontFamily:'var(--font-u)', width:190, outline:'none' }}/>
              <div style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)' }}><Icon name="search" size={13} color="var(--text-2)"/></div>
            </div>
            <select value={statusF} onChange={e=>{setStatusF(e.target.value);setPage(0);}} style={{ background:'var(--bg-input)', border:'1px solid var(--border)', borderRadius:7, padding:'6px 10px', color:'var(--text-2)', fontSize:12, fontFamily:'var(--font-u)', outline:'none', cursor:'pointer' }}>
              <option value="all">Todos los estados</option>
              <option value="active">Activas</option>
              <option value="review">En revisión</option>
              <option value="paused">Pausadas</option>
            </select>
          </div>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--border)' }}>
                {[['name','Nombre'],['status','Estado'],['investment','Inversión'],['results','Resultados'],['cpr','CPR'],['trend','Tendencia'],['actions','Acciones']].map(([col,lbl])=>(
                  <th key={col} style={thStyle(col)}>{thLabel(col,lbl)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((c,i) => <CampRow key={c.id} c={c} delay={i*40}/>)}
              {paged.length===0 && (
                <tr><td colSpan={7} style={{ padding:40, textAlign:'center', color:'var(--text-2)', fontSize:13 }}>No se encontraron campañas</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding:'10px 18px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:'var(--text-2)' }}>
          <span>Mostrando {page*PAGE+1}–{Math.min((page+1)*PAGE,filtered.length)} de {filtered.length} campañas</span>
          <div style={{ display:'flex', gap:5 }}>
            {['Anterior','Siguiente'].map((lbl,i) => {
              const disabled = i===0 ? page===0 : page>=totalPages-1;
              return (
                <button key={lbl} onClick={()=>setPage(p=>i===0?Math.max(0,p-1):Math.min(totalPages-1,p+1))} disabled={disabled} style={{
                  padding:'5px 12px', borderRadius:6, border:'1px solid var(--border)',
                  background:'transparent', color: disabled ? 'var(--text-2)' : 'var(--text-1)',
                  cursor: disabled ? 'not-allowed' : 'pointer', fontSize:12, fontFamily:'var(--font-u)', opacity: disabled ? 0.35 : 1,
                }}>{lbl}</button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { DashboardView, StatusBadge, ActionBtn });
