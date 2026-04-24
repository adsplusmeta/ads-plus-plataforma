// app.jsx

const PlaceholderView = ({ title, icon }) => (
  <div className="fade-up" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:16 }}>
    <div style={{ width:72, height:72, borderRadius:18, background:'rgba(0,180,216,0.06)', border:'1px solid rgba(0,180,216,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <Icon name={icon} size={32} color="rgba(0,180,216,0.35)"/>
    </div>
    <div style={{ fontFamily:'var(--font-d)', fontSize:20, fontWeight:700, color:'var(--text-2)' }}>{title}</div>
    <div style={{ fontSize:13, color:'var(--text-2)', opacity:0.5 }}>Próximamente disponible</div>
  </div>
);

const Toast = ({ message, onDismiss }) => {
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--success)', flexShrink:0, boxShadow:'0 0 6px rgba(57,211,83,0.6)' }}></div>
      {message}
    </div>
  );
};

const useBreakpoint = () => {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, width: w };
};

const App = () => {
  const [view,        setView]        = React.useState('dashboard');
  const [collapsed,   setCollapsed]   = React.useState(false);
  const [modal,       setModal]       = React.useState(false);
  const [toast,       setToast]       = React.useState(null);
  const [mobileOpen,  setMobileOpen]  = React.useState(false);
  const { isMobile, isTablet }        = useBreakpoint();

  React.useEffect(() => {
    if (isTablet && !isMobile) setCollapsed(true);
    if (!isMobile && !isTablet) setCollapsed(false);
  }, [isMobile, isTablet]);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  };

  const handleNav = v => {
    setView(v);
    if (isMobile) setMobileOpen(false);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <DashboardView onNewCampaign={()=>setModal(true)} showToast={showToast}/>;
      case 'campaigns': return <CampaignsView onNewCampaign={()=>setModal(true)}/>;
      case 'adsets':    return <PlaceholderView title="Conjuntos de Anuncios" icon="adsets"/>;
      case 'ads':       return <PlaceholderView title="Anuncios" icon="ads"/>;
      case 'reports':   return <ReportsView/>;
      case 'settings':  return <SettingsView/>;
      default:          return <DashboardView onNewCampaign={()=>setModal(true)} showToast={showToast}/>;
    }
  };

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg-main)' }}>
      {/* Mobile overlay backdrop */}
      {isMobile && mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:40, backdropFilter:'blur(2px)' }}/>
      )}

      <Sidebar
        activeView={view}
        setActiveView={handleNav}
        collapsed={isMobile ? false : collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <TopBar
          activeView={view}
          onNewCampaign={()=>setModal(true)}
          isMobile={isMobile}
          onMenuToggle={() => setMobileOpen(o => !o)}
        />
        <div style={{ flex:1, overflow:'hidden' }}>
          {renderView()}
        </div>
      </div>

      <NewCampaignModal
        open={modal}
        onClose={()=>setModal(false)}
        onCreated={()=>showToast('¡Campaña creada exitosamente!')}
      />

      {toast && <Toast message={toast} onDismiss={()=>setToast(null)}/>}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
