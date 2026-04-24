// topbar.jsx
const TopBar = ({ activeView, onNewCampaign }) => {
  const [notifOpen, setNotifOpen]   = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const labels = { dashboard:'Dashboard', campaigns:'Campañas', adsets:'Conjuntos', ads:'Anuncios', reports:'Reportes', settings:'Configuración' };

  const notifs = [
    { text:'Black Friday Q2 superó el 90% del presupuesto', time:'hace 5 min',  color:'var(--warning)' },
    { text:'Retargeting IG alcanzó 100 conversiones',       time:'hace 1 hora', color:'var(--success)' },
    { text:'Awareness Mayo en revisión por Meta',           time:'hace 3 horas',color:'var(--error)'   },
  ];

  React.useEffect(() => {
    const close = () => { setNotifOpen(false); setProfileOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const stopProp = e => e.stopPropagation();

  return (
    <div style={{
      height:56, flexShrink:0,
      background:'rgba(10,15,22,0.96)',
      borderBottom:'1px solid var(--border)',
      backdropFilter:'blur(12px)',
      display:'flex', alignItems:'center',
      justifyContent:'space-between',
      padding:'0 20px', gap:12,
    }}>
      {/* Breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13 }}>
        <span style={{ color:'var(--text-2)' }}>Cuenta principal</span>
        <Icon name="chevronRight" size={13} color="var(--text-2)" />
        <span style={{ color:'var(--text-1)', fontWeight:600, fontFamily:'var(--font-d)' }}>{labels[activeView]}</span>
      </div>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>

        {/* Search pill */}
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          background:'rgba(30,45,61,0.5)',
          border:'1px solid var(--border)',
          borderRadius:8, padding:'6px 12px',
          cursor:'text', color:'var(--text-2)', fontSize:13,
        }}>
          <Icon name="search" size={14} />
          <span>Buscar...</span>
          <span style={{ fontSize:10, background:'rgba(30,45,61,0.8)', borderRadius:4, padding:'2px 5px', fontFamily:'var(--font-m)', color:'var(--text-2)' }}>⌘K</span>
        </div>

        {/* Notifications */}
        <div style={{ position:'relative' }} onClick={stopProp}>
          <button onClick={() => { setNotifOpen(n => !n); setProfileOpen(false); }} style={{
            width:36, height:36, borderRadius:8,
            background:'rgba(30,45,61,0.5)', border:'1px solid var(--border)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', color:'var(--text-2)', position:'relative',
            transition:'background 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(0,180,216,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(30,45,61,0.5)'}
          >
            <Icon name="bell" size={16} />
            <div style={{ position:'absolute', top:7, right:7, width:7, height:7, borderRadius:'50%', background:'var(--accent)', border:'1.5px solid var(--bg-main)' }}></div>
          </button>
          {notifOpen && (
            <div style={{
              position:'absolute', top:44, right:0, width:292,
              background:'var(--bg-card)', border:'1px solid var(--border)',
              borderRadius:10, zIndex:200,
              boxShadow:'0 8px 32px rgba(0,0,0,0.6)',
              overflow:'hidden',
            }}>
              <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', fontSize:12, fontWeight:700, color:'var(--text-2)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Notificaciones</div>
              {notifs.map((n, i) => (
                <div key={i} style={{ padding:'10px 16px', borderBottom:'1px solid rgba(30,45,61,0.4)', cursor:'pointer', transition:'background 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(0,180,216,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <div style={{ display:'flex', gap:8 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:n.color, flexShrink:0, marginTop:4 }}></div>
                    <div>
                      <div style={{ fontSize:12, color:'var(--text-1)', lineHeight:1.45 }}>{n.text}</div>
                      <div style={{ fontSize:11, color:'var(--text-2)', marginTop:3 }}>{n.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div style={{ position:'relative' }} onClick={stopProp}>
          <button onClick={() => { setProfileOpen(n => !n); setNotifOpen(false); }} style={{
            width:36, height:36, borderRadius:'50%',
            background:'linear-gradient(135deg,#00B4D8,#023E8A)',
            border:'2px solid var(--border)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', fontSize:12, fontWeight:700, color:'white',
          }}>AC</button>
          {profileOpen && (
            <div style={{
              position:'absolute', top:44, right:0, width:200,
              background:'var(--bg-card)', border:'1px solid var(--border)',
              borderRadius:10, zIndex:200,
              boxShadow:'0 8px 32px rgba(0,0,0,0.6)',
              overflow:'hidden',
            }}>
              <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)' }}>
                <div style={{ fontSize:13, fontWeight:600 }}>Cuenta principal</div>
                <div style={{ fontSize:11, color:'var(--text-2)' }}>admin@adsplus.io</div>
              </div>
              {['Perfil','Configuración','Cerrar sesión'].map((item, i) => (
                <div key={item} style={{ padding:'10px 16px', fontSize:13, cursor:'pointer', color: i===2 ? 'var(--error)' : 'var(--text-1)', transition:'background 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(0,180,216,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >{item}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { TopBar });
