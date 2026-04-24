// charts.jsx
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
        PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ReferenceLine } = window.Recharts;

/* ── Sparkline ── */
const Sparkline = ({ data, color='#00B4D8', width=80, height=32 }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data), min = Math.min(...data), range = (max - min) || 1;
  const pts = data.map((v,i) => `${(i/(data.length-1))*width},${height - ((v-min)/range)*height}`).join(' ');
  const area = `0,${height} ${pts} ${width},${height}`;
  const uid = color.replace(/[^a-z0-9]/gi,'');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display:'block', overflow:'visible' }}>
      <defs>
        <linearGradient id={`sg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${uid})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

/* ── Custom tooltips ── */
const BarTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#0D1117', border:'1px solid rgba(0,180,216,0.25)', borderRadius:8, padding:'8px 12px', fontSize:12, boxShadow:'0 4px 16px rgba(0,0,0,0.6)' }}>
      <div style={{ color:'#8B949E', marginBottom:4 }}>{label}</div>
      <div style={{ color:'#F0F6FC', fontFamily:'var(--font-m)', fontWeight:600 }}>${payload[0].value.toLocaleString()}</div>
    </div>
  );
};

const PieTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#0D1117', border:'1px solid rgba(0,180,216,0.25)', borderRadius:8, padding:'8px 12px', fontSize:12, boxShadow:'0 4px 16px rgba(0,0,0,0.6)' }}>
      <div style={{ color: payload[0].payload.color, fontWeight:600 }}>{payload[0].name}</div>
      <div style={{ color:'#F0F6FC', fontFamily:'var(--font-m)' }}>{payload[0].value}%</div>
    </div>
  );
};

const ReportTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#0D1117', border:'1px solid rgba(0,180,216,0.25)', borderRadius:8, padding:'10px 14px', fontSize:12, boxShadow:'0 4px 16px rgba(0,0,0,0.6)' }}>
      <div style={{ color:'#8B949E', marginBottom:6, fontWeight:600 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.color, marginBottom:2 }}>
          {p.name}: <span style={{ fontFamily:'var(--font-m)', fontWeight:700, color:'#F0F6FC' }}>
            {p.name==='Inversión' ? `$${p.value.toLocaleString()}` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Investment chart (bar / line / area) ── */
const InvestmentChart = ({ data, chartType='bar' }) => {
  const avg = data.reduce((s,d)=>s+d.value,0)/data.length;
  const common = {
    margin:{ top:10, right:4, left:-18, bottom:0 },
    data,
  };
  const axes = <>
    <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,61,0.7)" vertical={false}/>
    <XAxis dataKey="date" tick={{ fill:'#8B949E', fontSize:10, fontFamily:'var(--font-m)' }} axisLine={false} tickLine={false}/>
    <YAxis tickFormatter={v=>`$${v/1000}k`} tick={{ fill:'#8B949E', fontSize:10, fontFamily:'var(--font-m)' }} axisLine={false} tickLine={false}/>
    <Tooltip content={<BarTip/>} cursor={{ fill:'rgba(0,180,216,0.04)' }}/>
  </>;

  if (chartType==='bar') return (
    <ResponsiveContainer width="100%" height={190}>
      <BarChart {...common} barSize={14}>
        <defs><linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00B4D8"/><stop offset="100%" stopColor="#0077B6"/></linearGradient></defs>
        {axes}
        <ReferenceLine y={avg} stroke="#E3B341" strokeDasharray="5 4" strokeWidth={1.5}/>
        <Bar dataKey="value" fill="url(#bGrad)" radius={[3,3,0,0]}/>
      </BarChart>
    </ResponsiveContainer>
  );
  if (chartType==='line') return (
    <ResponsiveContainer width="100%" height={190}>
      <LineChart {...common}>
        {axes}
        <Line type="monotone" dataKey="value" stroke="#00B4D8" strokeWidth={2.5} dot={false} activeDot={{ r:4, fill:'#00B4D8' }}/>
      </LineChart>
    </ResponsiveContainer>
  );
  return (
    <ResponsiveContainer width="100%" height={190}>
      <AreaChart {...common}>
        <defs><linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00B4D8" stopOpacity="0.25"/><stop offset="100%" stopColor="#00B4D8" stopOpacity="0"/></linearGradient></defs>
        {axes}
        <Area type="monotone" dataKey="value" stroke="#00B4D8" strokeWidth={2.5} fill="url(#aGrad)" dot={false}/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

/* ── Donut chart ── */
const DonutChart = ({ data }) => {
  const [active, setActive] = React.useState(null);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:20 }}>
      <div style={{ position:'relative', flexShrink:0 }}>
        <PieChart width={130} height={130}>
          <Pie data={data} cx={60} cy={60} innerRadius={42} outerRadius={62}
            paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}
            onMouseEnter={(_,i)=>setActive(i)} onMouseLeave={()=>setActive(null)}>
            {data.map((e,i)=>(
              <Cell key={i} fill={e.color} opacity={active===null||active===i?1:0.35} stroke="none"/>
            ))}
          </Pie>
          <Tooltip content={<PieTip/>}/>
        </PieChart>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center', pointerEvents:'none' }}>
          <div style={{ fontFamily:'var(--font-m)', fontSize:17, fontWeight:700, color:'var(--text-1)', lineHeight:1 }}>623</div>
          <div style={{ fontSize:9, color:'var(--text-2)', textTransform:'uppercase', letterSpacing:'0.05em', marginTop:3 }}>resultados</div>
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {data.map((item,i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8, opacity:active===null||active===i?1:0.35, transition:'opacity 0.15s', cursor:'default' }}
            onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}>
            <div style={{ width:8, height:8, borderRadius:2, background:item.color, flexShrink:0 }}></div>
            <span style={{ fontSize:12, color:'var(--text-2)' }}>{item.name}</span>
            <span style={{ fontSize:12, fontFamily:'var(--font-m)', fontWeight:700, color:'var(--text-1)', marginLeft:'auto', paddingLeft:12 }}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Report charts ── */
const ReportLineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={210}>
    <LineChart data={data} margin={{ top:10, right:20, left:-10, bottom:0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,61,0.7)" vertical={false}/>
      <XAxis dataKey="date" tick={{ fill:'#8B949E', fontSize:11, fontFamily:'var(--font-m)' }} axisLine={false} tickLine={false}/>
      <YAxis yAxisId="l" tickFormatter={v=>`$${v/1000}k`} tick={{ fill:'#8B949E', fontSize:11, fontFamily:'var(--font-m)' }} axisLine={false} tickLine={false}/>
      <YAxis yAxisId="r" orientation="right" tick={{ fill:'#8B949E', fontSize:11, fontFamily:'var(--font-m)' }} axisLine={false} tickLine={false}/>
      <Tooltip content={<ReportTip/>}/>
      <Line yAxisId="l" type="monotone" dataKey="investment" stroke="#00B4D8" strokeWidth={2.5} dot={{ fill:'#00B4D8', r:4 }} name="Inversión"/>
      <Line yAxisId="r" type="monotone" dataKey="results" stroke="#39D353" strokeWidth={2.5} dot={{ fill:'#39D353', r:4 }} name="Resultados" strokeDasharray="6 3"/>
    </LineChart>
  </ResponsiveContainer>
);

const CompareBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={210}>
    <BarChart data={data} margin={{ top:10, right:4, left:-10, bottom:0 }} barGap={3}>
      <defs>
        <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00B4D8"/><stop offset="100%" stopColor="#0077B6"/></linearGradient>
        <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#39D353"/><stop offset="100%" stopColor="#1a7a28"/></linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,61,0.7)" vertical={false}/>
      <XAxis dataKey="name" tick={{ fill:'#8B949E', fontSize:10, fontFamily:'var(--font-m)' }} axisLine={false} tickLine={false}/>
      <YAxis tick={{ fill:'#8B949E', fontSize:10, fontFamily:'var(--font-m)' }} axisLine={false} tickLine={false}/>
      <Tooltip content={<ReportTip/>}/>
      <Bar dataKey="investment" fill="url(#cg1)" radius={[3,3,0,0]} name="Inversión" barSize={14}/>
      <Bar dataKey="results"    fill="url(#cg2)" radius={[3,3,0,0]} name="Resultados" barSize={14}/>
    </BarChart>
  </ResponsiveContainer>
);

Object.assign(window, { Sparkline, InvestmentChart, DonutChart, ReportLineChart, CompareBarChart });
