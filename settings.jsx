// settings.jsx
const SettingsView = () => {
  const [section, setSection] = React.useState('cuenta');
  const [integrations, setIntegrations] = React.useState({ meta:true, google:false, tiktok:false });
  const [notifs, setNotifs] = React.useState({ email:true, slack:false, budget:true, results:true, weekly:false });

  const sections = [
    { id:'cuenta',         label:'Cuenta',             icon:'user'       },
    { id:'equipo',         label:'Equipo & Permisos',  icon:'users'      },
    { id:'integraciones',  label:'Integraciones',       icon:'link'       },
    { id:'facturacion',    label:'Facturación',         icon:'creditCard' },
    { id:'notificaciones', label:'Notificaciones',      icon:'bell'       },
  ];

  const Toggle = ({ on, onChange }) => (
    <div onClick={onChange} style={{ cursor:'pointer', display:'flex', alignItems:'center' }}>
      <div style={{
        width:40, height:22, borderRadius:11,
        background: on ? 'var(--accent)' : 'var(--border)',
        position:'relative', transition:'background 0.2s',
        border: on ? '1px solid rgba(0,180,216,0.4)' : '1px solid var(--border)',
      }}>
        <div style={{
          position:'absolute', top:2,
          left: on ? 19 : 2,
          width:16, height:16, borderRadius:'50%',
          background:'white',
          transition:'left 0.2s ease',
          boxShadow:'0 1px 4px rgba(0,0,0,0.3)',
        }}/>
      </div>
    </div>
  );

  const inputStyle = {
    width:'100%', background:'var(--bg-input)', border:'1px solid var(--border)',
    borderRadius:8, padding:'9px 13px', color:'var(--text-1)',
    fontSize:13, fontFamily:'var(--font-u)', outline:'none', transition:'border-color 0.15s',
  };

  const sectionContent = () => {
    if (section==='cuenta') return (
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ fontFamily:'var(--font-d)', fontSize:16, fontWeight:700, marginBottom:4 }}>Información de cuenta</div>
        {[{l:'Nombre de cuenta',v:'Cuenta principal'},{l:'Email',v:'admin@adsplus.io'},{l:'Zona horaria',v:'America/Mexico_City'},{l:'Moneda predeterminada',v:'USD'}].map(f=>(
          <div key={f.l}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-2)', marginBottom:6 }}>{f.l}</div>
            <input defaultValue={f.v} style={inputStyle}
              onFocus={e=>e.target.style.borderColor='var(--accent)'}
              onBlur={e=>e.target.style.borderColor='var(--border)'}/>
          </div>
        ))}
        <button className="btn-grad" style={{ alignSelf:'flex-start', marginTop:4 }}>Guardar cambios</button>
      </div>
    );

    if (section==='equipo') return (
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--font-d)', fontSize:16, fontWeight:700 }}>Miembros del equipo</div>
          <button style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(0,180,216,0.1)', border:'1px solid rgba(0,180,216,0.2)', borderRadius:8, padding:'6px 12px', color:'var(--accent)', cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'var(--font-u)' }}>
            <Icon name="plus" size={13}/>Invitar miembro
          </button>
        </div>
        {[
          { name:'Ana García',    email:'ana@adsplus.io',    role:'Admin',      av:'AG', color:'#00B4D8' },
          { name:'Carlos López',  email:'carlos@adsplus.io', role:'Media Buyer',av:'CL', color:'#39D353' },
          { name:'María Torres',  email:'maria@adsplus.io',  role:'Viewer',     av:'MT', color:'#E3B341' },
        ].map(m=>(
          <div key={m.email} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid rgba(30,45,61,0.5)' }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:`${m.color}22`, border:`1px solid ${m.color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:m.color, flexShrink:0 }}>{m.av}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--text-1)' }}>{m.name}</div>
              <div style={{ fontSize:11, color:'var(--text-2)' }}>{m.email}</div>
            </div>
            <select defaultValue={m.role} style={{ background:'var(--bg-input)', border:'1px solid var(--border)', borderRadius:6, padding:'5px 10px', color:'var(--text-2)', fontSize:12, fontFamily:'var(--font-u)', outline:'none', cursor:'pointer' }}>
              {['Admin','Media Buyer','Viewer'].map(r=><option key={r}>{r}</option>)}
            </select>
          </div>
        ))}
      </div>
    );

    if (section==='integraciones') return (
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ fontFamily:'var(--font-d)', fontSize:16, fontWeight:700, marginBottom:4 }}>Integraciones de plataforma</div>
        {[
          { id:'meta',   name:'Meta Ads',    desc:'Facebook e Instagram Ads Manager', color:'#1877F2' },
          { id:'google', name:'Google Ads',  desc:'Search, Display, YouTube & Shopping', color:'#EA4335' },
          { id:'tiktok', name:'TikTok Ads',  desc:'TikTok for Business Manager', color:'#FF0050' },
        ].map(intg=>(
          <div key={intg.id} style={{ display:'flex', alignItems:'center', gap:14, padding:16, background:'rgba(0,0,0,0.2)', border:'1px solid var(--border)', borderRadius:10 }}>
            <div style={{ width:42, height:42, borderRadius:10, background:`${intg.color}20`, border:`1px solid ${intg.color}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <div style={{ width:18, height:18, borderRadius:4, background:intg.color }}></div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text-1)' }}>{intg.name}</div>
              <div style={{ fontSize:12, color:'var(--text-2)' }}>{intg.desc}</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:11, fontWeight:600, color:integrations[intg.id]?'var(--success)':'var(--text-2)' }}>
                {integrations[intg.id]?'Conectado':'Desconectado'}
              </span>
              <Toggle on={integrations[intg.id]} onChange={()=>setIntegrations(p=>({...p,[intg.id]:!p[intg.id]}))}/>
            </div>
          </div>
        ))}
      </div>
    );

    if (section==='facturacion') return (
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ fontFamily:'var(--font-d)', fontSize:16, fontWeight:700, marginBottom:4 }}>Facturación</div>
        <div style={{ background:'linear-gradient(135deg,rgba(0,180,216,0.08),rgba(0,119,182,0.08))', border:'1px solid rgba(0,180,216,0.2)', borderRadius:12, padding:20 }}>
          <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--accent)', marginBottom:8 }}>Plan Pro</div>
          <div style={{ fontFamily:'var(--font-m)', fontSize:30, fontWeight:700, color:'var(--text-1)', lineHeight:1 }}>
            $99<span style={{ fontSize:14, color:'var(--text-2)', fontWeight:400 }}>/mes</span>
          </div>
          <div style={{ fontSize:12, color:'var(--text-2)', marginTop:6 }}>Próximo cobro: 1 de mayo, 2026</div>
        </div>
        <div style={{ fontSize:13, fontWeight:600, color:'var(--text-1)' }}>Método de pago</div>
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:13, background:'rgba(0,0,0,0.2)', border:'1px solid var(--border)', borderRadius:9 }}>
          <Icon name="creditCard" size={20} color="var(--accent)"/>
          <span style={{ fontSize:13, color:'var(--text-1)', flex:1 }}>•••• •••• •••• 4242</span>
          <span style={{ fontSize:11, color:'var(--text-2)' }}>Vence 12/27</span>
        </div>
        <button style={{ alignSelf:'flex-start', padding:'7px 16px', background:'transparent', border:'1px solid var(--border)', borderRadius:8, color:'var(--text-2)', cursor:'pointer', fontSize:12, fontFamily:'var(--font-u)' }}>Cambiar método de pago</button>
      </div>
    );

    if (section==='notificaciones') return (
      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
        <div style={{ fontFamily:'var(--font-d)', fontSize:16, fontWeight:700, marginBottom:12 }}>Preferencias de notificación</div>
        {[
          { id:'email',   l:'Alertas por email',       d:'Recibir alertas críticas por correo electrónico' },
          { id:'slack',   l:'Integración Slack',        d:'Enviar notificaciones al canal configurado en Slack' },
          { id:'budget',  l:'Alertas de presupuesto',   d:'Cuando una campaña supere el 90% del presupuesto diario' },
          { id:'results', l:'Logros de resultados',     d:'Al alcanzar hitos de conversiones en campañas activas' },
          { id:'weekly',  l:'Reporte semanal',          d:'Resumen de rendimiento general cada lunes a las 9:00 AM' },
        ].map(n=>(
          <div key={n.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, padding:'14px 0', borderBottom:'1px solid rgba(30,45,61,0.5)' }}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--text-1)', marginBottom:2 }}>{n.l}</div>
              <div style={{ fontSize:11, color:'var(--text-2)' }}>{n.d}</div>
            </div>
            <Toggle on={notifs[n.id]} onChange={()=>setNotifs(p=>({...p,[n.id]:!p[n.id]}))}/>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dash-padding" style={{ overflowY:'auto', height:'100%', display:'flex', flexDirection:'column', gap:20 }}>
      <h1 className="fade-up" style={{ fontFamily:'var(--font-d)', fontSize:28, fontWeight:800, color:'var(--text-1)' }}>Configuración</h1>
      <div style={{ display:'grid', gridTemplateColumns:'clamp(160px,220px,220px) 1fr', gap:18 }}
        className="settings-grid">
        {/* Sub nav */}
        <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
          {sections.map(s=>(
            <button key={s.id} onClick={()=>setSection(s.id)} style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'9px 12px', borderRadius:8, border:'none', cursor:'pointer', textAlign:'left',
              background: section===s.id ? 'rgba(0,180,216,0.1)' : 'transparent',
              color:       section===s.id ? 'var(--accent)' : 'var(--text-2)',
              fontSize:13, fontWeight: section===s.id ? 600 : 400,
              fontFamily:'var(--font-u)', transition:'all 0.15s',
              borderLeft: section===s.id ? '2px solid var(--accent)' : '2px solid transparent',
            }}>
              <Icon name={s.icon} size={15} color={section===s.id?'var(--accent)':'var(--text-2)'}/>
              {s.label}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="card" style={{ padding:24 }}>
          {sectionContent()}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { SettingsView });
