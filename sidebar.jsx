// sidebar.jsx
const NAV_ITEMS = [
  { id:'dashboard', label:'Dashboard',       icon:'dashboard' },
  { id:'campaigns', label:'Campañas',        icon:'campaigns' },
  { id:'adsets',    label:'Conjuntos',       icon:'adsets'    },
  { id:'ads',       label:'Anuncios',        icon:'ads'       },
  { id:'reports',   label:'Reportes',        icon:'reports'   },
  { id:'settings',  label:'Configuración',   icon:'settings'  },
];

const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed, isMobile, mobileOpen, setMobileOpen }) => {
  const [hovered, setHovered] = React.useState(null);

  const W = collapsed ? 72 : 260;

  const mobileStyle = isMobile ? {
    position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
    width: 260, minWidth: 260,
    transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
    boxShadow: mobileOpen ? '4px 0 32px rgba(0,0,0,0.7)' : 'none',
  } : {};

  return (
    <div className="sidebar-drawer" style={{
      width: isMobile ? 0 : W, minWidth: isMobile ? 0 : W,
      background: 'var(--bg-sidebar)',
      borderRight: isMobile ? 'none' : '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), min-width 0.3s cubic-bezier(0.4,0,0.2,1)',
      overflow: isMobile ? 'visible' : 'hidden', flexShrink: 0,
      position: 'relative', zIndex: 10,
      ...mobileStyle,
    }}>

      {/* Logo */}
      <div style={{
        height: 60, display: 'flex', alignItems: 'center',
        padding: '0 20px',
        justifyContent: (!isMobile && collapsed) ? 'center' : 'flex-start',
        gap: 10, borderBottom: '1px solid var(--border)', flexShrink: 0,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 16px rgba(0,180,216,0.3)',
        }}>
          <svg viewBox="0 0 680 680" width="20" height="20" fill="none">
            <circle cx="340" cy="340" r="220" stroke="white" strokeWidth="30"/>
            <path d="M260 450 L310 240" stroke="white" strokeWidth="50" strokeLinecap="round"/>
            <path d="M420 450 L370 240" stroke="white" strokeWidth="50" strokeLinecap="round"/>
            <path d="M270 340 L300 340 L310 315 L325 365 L340 305 L355 365 L370 315 L380 340 L410 340"
              stroke="white" strokeWidth="28" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="340" cy="305" r="32" fill="white"/>
          </svg>
        </div>
        {(isMobile || !collapsed) && (
          <span style={{ fontFamily:'var(--font-d)', fontWeight:800, fontSize:'0.95rem', letterSpacing:'0.12em', whiteSpace:'nowrap', color:'var(--text-1)' }}>
            ADS <span style={{ color:'var(--accent)' }}>PLUS</span>
          </span>
        )}
      </div>

      {/* User */}
      {(isMobile || !collapsed) && (
        <div style={{
          padding: '10px 16px', display:'flex', alignItems:'center', gap:10,
          borderBottom: '1px solid var(--border)', flexShrink:0,
        }}>
          <div style={{
            width:34, height:34, borderRadius:'50%', flexShrink:0,
            background:'linear-gradient(135deg,#00B4D8,#023E8A)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:12, fontWeight:700, color:'white',
          }}>AC</div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--text-1)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Cuenta principal</div>
            <div style={{ fontSize:10, color:'var(--text-2)' }}>Admin · Pro</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex:1, padding:'8px', display:'flex', flexDirection:'column', gap:2, overflowY:'auto' }}>
        {NAV_ITEMS.map(item => {
          const isActive = activeView === item.id;
          const isHov    = hovered === item.id;
          return (
            <div key={item.id}
              onClick={() => setActiveView(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              title={(!isMobile && collapsed) ? item.label : ''}
              style={{
                display:'flex', alignItems:'center', gap:10,
                padding: (!isMobile && collapsed) ? '10px 0' : '9px 12px',
                justifyContent: (!isMobile && collapsed) ? 'center' : 'flex-start',
                borderRadius: 8, cursor:'pointer',
                background: isActive ? 'rgba(0,180,216,0.12)' : isHov ? 'rgba(0,180,216,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                color: isActive ? 'var(--accent)' : isHov ? 'var(--text-1)' : 'var(--text-2)',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon name={item.icon} size={17} color={isActive ? 'var(--accent)' : isHov ? 'var(--text-1)' : 'var(--text-2)'} />
              {(isMobile || !collapsed) && (
                <span style={{ fontSize:13.5, fontWeight: isActive ? 600 : 400, whiteSpace:'nowrap' }}>
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Status */}
      <div style={{
        padding: (!isMobile && collapsed) ? '14px 0' : '12px 16px',
        borderTop:'1px solid var(--border)', flexShrink:0,
        display:'flex', alignItems:'center', gap:8,
        justifyContent: (!isMobile && collapsed) ? 'center' : 'flex-start',
      }}>
        <div style={{
          width:7, height:7, borderRadius:'50%',
          background:'var(--success)',
          boxShadow:'0 0 6px rgba(57,211,83,0.7)',
          animation:'dotPulse 2.5s ease infinite', flexShrink:0,
        }}></div>
        {(isMobile || !collapsed) && <span style={{ fontSize:11, color:'var(--text-2)', fontWeight:500 }}>Sistema Activo</span>}
      </div>

      {/* Toggle — hide on mobile */}
      {!isMobile && (
        <button onClick={() => setCollapsed(!collapsed)} style={{
          position:'absolute', top:'50%', right:-14,
          transform:'translateY(-50%)',
          width:28, height:28, borderRadius:'50%',
          background:'var(--bg-card)', border:'1px solid var(--border)',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', color:'var(--text-2)', zIndex:20,
          boxShadow:'0 2px 8px rgba(0,0,0,0.4)',
          transition:'background 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background='#1E2D3D'; e.currentTarget.style.color='var(--text-1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='var(--bg-card)'; e.currentTarget.style.color='var(--text-2)'; }}
        >
          <Icon name={collapsed ? 'chevR' : 'chevL'} size={13} />
        </button>
      )}
    </div>
  );
};

Object.assign(window, { Sidebar });
