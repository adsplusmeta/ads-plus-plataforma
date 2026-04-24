// reports.jsx
const ReportsView = () => {
  const [period, setPeriod] = React.useState('30');
  const [dropOpen, setDropOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(['all']);

  const toggle = id => {
    if (id==='all') { setSelected(['all']); return; }
    const next = selected.filter(c=>c!=='all');
    setSelected(next.includes(id) ? next.filter(c=>c!==id) : [...next,id]);
  };

  const totals = CAMPAIGNS_DATA.reduce((a,c)=>({ investment:a.investment+c.investment, results:a.results+c.results }),{investment:0,results:0});

  return (
    <div className="dash-padding" style={{ overflowY:'auto', height:'100%', display:'flex', flexDirection:'column', gap:20 }}>
      {/* Header */}
      <div className="fade-up" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <h1 style={{ fontFamily:'var(--font-d)', fontSize:28, fontWeight:800, color:'var(--text-1)' }}>Reportes</h1>
        <button style={{ display:'flex', alignItems:'center', gap:8, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, padding:'8px 16px', color:'var(--text-1)', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-u)' }}>
          <Icon name="download" size={15} color="var(--accent)"/>Exportar PDF
        </button>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
        <select value={period} onChange={e=>setPeriod(e.target.value)} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, padding:'8px 14px', color:'var(--text-1)', fontSize:13, fontFamily:'var(--font-u)', outline:'none', cursor:'pointer' }}>
          {[['7','Últimos 7 días'],['14','Últimos 14 días'],['30','Últimos 30 días'],['90','Últimos 90 días']].map(([v,l])=>(
            <option key={v} value={v}>{l}</option>
          ))}
        </select>

        <div style={{ position:'relative' }}>
          <button onClick={()=>setDropOpen(o=>!o)} style={{ display:'flex', alignItems:'center', gap:8, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, padding:'8px 14px', color:'var(--text-1)', cursor:'pointer', fontSize:13, fontFamily:'var(--font-u)' }}>
            <Icon name="filter" size={14} color="var(--text-2)"/>
            {selected.includes('all') ? 'Todas las campañas' : `${selected.length} seleccionadas`}
            <Icon name="chevronDown" size={13} color="var(--text-2)"/>
          </button>
          {dropOpen && (
            <div style={{ position:'absolute', top:44, left:0, zIndex:50, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:8, minWidth:230, boxShadow:'0 8px 24px rgba(0,0,0,0.5)', overflow:'hidden' }}>
              {[{id:'all',name:'Todas'},...CAMPAIGNS_DATA].map(c=>(
                <div key={c.id} onClick={()=>toggle(c.id)} style={{ padding:'9px 14px', fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:10, color:'var(--text-1)' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(0,180,216,0.05)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >
                  <div style={{ width:15, height:15, borderRadius:4, border:`1px solid ${selected.includes(c.id)?'var(--accent)':'var(--border)'}`, background:selected.includes(c.id)?'var(--accent)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {selected.includes(c.id) && <Icon name="check" size={9} color="white"/>}
                  </div>
                  {c.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="btn-grad">Generar Reporte</button>
      </div>

      {/* Charts */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <div className="card" style={{ padding:20 }}>
          <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-2)', marginBottom:3 }}>Evolución</div>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--text-1)', marginBottom:16 }}>Inversión vs Resultados</div>
          <ReportLineChart data={REPORT_DATA}/>
          <div style={{ display:'flex', gap:16, marginTop:12, justifyContent:'center' }}>
            {[{c:'#00B4D8',l:'Inversión'},{c:'#39D353',l:'Resultados'}].map(({c,l})=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--text-2)' }}>
                <div style={{ width:18, height:2, background:c, borderRadius:1 }}></div>{l}
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding:20 }}>
          <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--text-2)', marginBottom:3 }}>Comparativo</div>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--text-1)', marginBottom:16 }}>Por Campaña</div>
          <CompareBarChart data={CAMPAIGN_COMPARE}/>
        </div>
      </div>

      {/* Summary table */}
      <div className="card" style={{ overflow:'hidden' }}>
        <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', fontFamily:'var(--font-d)', fontSize:15, fontWeight:700 }}>Resumen General</div>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid var(--border)' }}>
              {['Campaña','Inversión','Resultados','CPR','Estado'].map(h=>(
                <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAMPAIGNS_DATA.map((c,i)=>(
              <tr key={c.id} style={{ borderBottom:'1px solid rgba(30,45,61,0.4)', animation:`fadeUp 0.3s ${i*40}ms ease-out both` }}>
                <td style={{ padding:'10px 14px', fontSize:13, fontWeight:600, color:'var(--text-1)' }}>{c.name}</td>
                <td style={{ padding:'10px 14px', fontFamily:'var(--font-m)', fontSize:13, color:'var(--text-1)' }}>${c.investment.toLocaleString()}</td>
                <td style={{ padding:'10px 14px', fontFamily:'var(--font-m)', fontSize:13, color:'var(--text-1)' }}>{c.results}</td>
                <td style={{ padding:'10px 14px', fontFamily:'var(--font-m)', fontSize:13, color:'var(--text-1)' }}>${c.cpr.toFixed(2)}</td>
                <td style={{ padding:'10px 14px' }}><StatusBadge status={c.status}/></td>
              </tr>
            ))}
            <tr style={{ borderTop:'2px solid var(--border)', background:'rgba(0,180,216,0.04)' }}>
              <td style={{ padding:'10px 14px', fontSize:13, fontWeight:700, color:'var(--accent)' }}>TOTAL</td>
              <td style={{ padding:'10px 14px', fontFamily:'var(--font-m)', fontSize:13, fontWeight:700, color:'var(--accent)' }}>${totals.investment.toLocaleString()}</td>
              <td style={{ padding:'10px 14px', fontFamily:'var(--font-m)', fontSize:13, fontWeight:700, color:'var(--accent)' }}>{totals.results}</td>
              <td style={{ padding:'10px 14px', fontFamily:'var(--font-m)', fontSize:13, fontWeight:700, color:'var(--accent)' }}>${(totals.investment/totals.results).toFixed(2)}</td>
              <td style={{ padding:'10px 14px', fontSize:12, color:'var(--text-2)' }}>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Object.assign(window, { ReportsView });
