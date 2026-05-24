'use client';
import { useState } from 'react';
import { useAdmin } from '../../../components/admin/AdminProductsContext';
import Icon from '../../../components/ui/Icon';

export default function SetariAdmin() {
  const { settings, setSettings } = useAdmin();
  const [form, setForm] = useState(settings);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('general');

  const showToast = (msg, ok=true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  };

  const f = k => e => setForm(v => ({ ...v, [k]: e.target.value }));

  const save = () => {
    setSettings(form);
    showToast('Setări salvate cu succes!');
  };

  const tabs = [
    { id:'general', icon:'settings', label:'General' },
    { id:'livrare', icon:'truck', label:'Livrare & Prețuri' },
    { id:'promo', icon:'percent', label:'Coduri promo' },
    { id:'seo', icon:'search', label:'SEO' },
    { id:'cont', icon:'shield', label:'Cont & Securitate' },
  ];

  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>Setări site</h1>
        <p style={{ fontSize:13, color:'var(--text2)' }}>Configurează magazinul tău YUPO.</p>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:0, background:'white', border:'1.5px solid var(--border)',
        borderRadius:12, overflow:'hidden', marginBottom:20, boxShadow:'var(--shadow)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ flex:1, padding:'12px 16px', display:'flex', alignItems:'center',
              justifyContent:'center', gap:8, fontSize:13, fontWeight:600, cursor:'pointer',
              border:'none', borderRight:'1px solid var(--border)', transition:'all .2s',
              color: activeTab===t.id ? 'var(--g)' : 'var(--text3)',
              background: activeTab===t.id ? 'var(--g3)' : 'white' }}>
            <Icon name={t.icon} size={14} color="currentColor"/>
            {t.label}
          </button>
        ))}
      </div>

      {/* General */}
      {activeTab === 'general' && (
        <div style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:12,
          padding:28, boxShadow:'var(--shadow)' }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:20, display:'flex',
            alignItems:'center', gap:9, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
            <Icon name="settings" size={17} color="var(--g)"/>Informații magazin
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {[
              ['siteName','Nume magazin','YUPO Beauty'],
              ['email','Email contact','contact@yupo.ro'],
              ['phone','Telefon','0787 301 034'],
              ['address','Adresă','Str. Leordeni 161i bis, Popești-Leordeni'],
            ].map(([key, label, ph]) => (
              <div key={key}>
                <label style={{ fontSize:10, fontWeight:700, color:'var(--text2)', textTransform:'uppercase',
                  letterSpacing:'.08em', display:'block', marginBottom:6 }}>{label}</label>
                <input value={form[key]||''} onChange={f(key)}
                  style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                    padding:'10px 13px', fontSize:13, outline:'none', color:'var(--text)' }}
                  placeholder={ph}/>
              </div>
            ))}
          </div>
          <div style={{ marginTop:20, display:'flex', gap:10, alignItems:'center' }}>
            <button onClick={save}
              style={{ background:'var(--g)', color:'white', border:'none', borderRadius:9,
                padding:'11px 28px', fontSize:13, fontWeight:700, cursor:'pointer',
                display:'flex', alignItems:'center', gap:7 }}>
              <Icon name="check" size={14} color="white"/>Salvează setările
            </button>
          </div>
        </div>
      )}

      {/* Livrare */}
      {activeTab === 'livrare' && (
        <div style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:12,
          padding:28, boxShadow:'var(--shadow)' }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:20, display:'flex',
            alignItems:'center', gap:9, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
            <Icon name="truck" size={17} color="var(--g)"/>Livrare & Costuri
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {[
              ['shippingCost','Cost livrare (lei)','10'],
              ['shippingFree','Livrare gratuită de la (lei)','250'],
            ].map(([key,label,ph]) => (
              <div key={key}>
                <label style={{ fontSize:10, fontWeight:700, color:'var(--text2)', textTransform:'uppercase',
                  letterSpacing:'.08em', display:'block', marginBottom:6 }}>{label}</label>
                <input value={form[key]||''} onChange={f(key)} type="number"
                  style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                    padding:'10px 13px', fontSize:13, outline:'none' }}
                  placeholder={ph}/>
              </div>
            ))}
          </div>
          <div style={{ marginTop:16, background:'var(--g3)', border:'1px solid #c8e6c9',
            borderRadius:10, padding:'14px 16px', fontSize:13, color:'var(--g)' }}>
            <Icon name="info" size={14} color="currentColor" style={{ marginRight:6 }}/>
            Setările de livrare se aplică automat în coș și la checkout.
          </div>
          <button onClick={save} style={{ marginTop:20, background:'var(--g)', color:'white',
            border:'none', borderRadius:9, padding:'11px 28px', fontSize:13, fontWeight:700,
            cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
            <Icon name="check" size={14} color="white"/>Salvează
          </button>
        </div>
      )}

      {/* Promo codes */}
      {activeTab === 'promo' && (
        <div style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:12,
          padding:28, boxShadow:'var(--shadow)' }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:20, display:'flex',
            alignItems:'center', gap:9, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
            <Icon name="percent" size={17} color="var(--g)"/>Coduri promoționale
          </div>
          <div style={{ overflowX:'auto', borderRadius:10, border:'1.5px solid var(--border)' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#f8f8fc' }}>
                  {['Cod','Tip','Valoare','Comandă minimă','Status'].map(h => (
                    <th key={h} style={{ padding:'11px 14px', textAlign:'left', fontSize:10,
                      fontWeight:700, color:'var(--text2)', textTransform:'uppercase',
                      letterSpacing:'.08em', borderBottom:'1.5px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(form.promoCodes||[]).map((promo, i) => (
                  <tr key={i} style={{ borderBottom:'1px solid #f0f0f4' }}>
                    <td style={{ padding:'12px 14px', fontWeight:800, color:'var(--g)',
                      fontFamily:'monospace', fontSize:14 }}>{promo.code}</td>
                    <td style={{ padding:'12px 14px', fontSize:13 }}>
                      {promo.type === 'percent' ? 'Procentual' : 'Valoare fixă'}
                    </td>
                    <td style={{ padding:'12px 14px', fontWeight:700, fontSize:13 }}>
                      {promo.type === 'percent' ? `${promo.value}%` : `${promo.value} lei`}
                    </td>
                    <td style={{ padding:'12px 14px', fontSize:13, color:'var(--text2)' }}>
                      {promo.minOrder} lei
                    </td>
                    <td style={{ padding:'12px 14px' }}>
                      <button
                        onClick={() => setForm(v => ({
                          ...v,
                          promoCodes: v.promoCodes.map((p,j) =>
                            j===i ? {...p, active:!p.active} : p)
                        }))}
                        style={{ width:38, height:20, borderRadius:10, border:'none',
                          cursor:'pointer', position:'relative', transition:'background .25s',
                          background: promo.active ? 'var(--g)' : '#ccc' }}>
                        <span style={{ position:'absolute', top:2, width:16, height:16,
                          borderRadius:'50%', background:'white', transition:'left .25s',
                          left: promo.active ? '20px' : '2px', boxShadow:'0 1px 3px rgba(0,0,0,.2)' }}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop:16, background:'#f8f9fa', border:'1px solid var(--border)',
            borderRadius:10, padding:'14px 16px', fontSize:13, color:'var(--text2)' }}>
            <strong>Coduri active:</strong> YUPO15 (15% reducere, min 100 lei) · WELCOME30 (30 lei, min 150 lei)
          </div>
          <button onClick={save} style={{ marginTop:16, background:'var(--g)', color:'white',
            border:'none', borderRadius:9, padding:'11px 28px', fontSize:13, fontWeight:700,
            cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
            <Icon name="check" size={14} color="white"/>Salvează codurile
          </button>
        </div>
      )}

      {/* SEO */}
      {activeTab === 'seo' && (
        <div style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:12,
          padding:28, boxShadow:'var(--shadow)' }}>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:20, display:'flex',
            alignItems:'center', gap:9, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
            <Icon name="search" size={17} color="var(--g)"/>SEO & Meta tags
          </div>
          {[
            ['seoTitle','Meta Title implicit','YUPO – Parfumuri Arabești & Beauty'],
            ['seoDesc','Meta Description','Parfumuri arabești autentice, cosmetice și produse de îngrijire premium...'],
            ['googleVerify','Google Search Console verification','Codul de verificare Google'],
            ['fbPixel','Facebook Pixel ID','ex: 123456789012345'],
            ['gaId','Google Analytics ID','ex: G-XXXXXXXXXX'],
          ].map(([key, label, ph]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ fontSize:10, fontWeight:700, color:'var(--text2)', textTransform:'uppercase',
                letterSpacing:'.08em', display:'block', marginBottom:6 }}>{label}</label>
              {key === 'seoDesc'
                ? <textarea value={form[key]||''} onChange={f(key)} rows={3}
                    style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                      padding:'10px 13px', fontSize:13, outline:'none', resize:'vertical',
                      fontFamily:'Inter,sans-serif' }} placeholder={ph}/>
                : <input value={form[key]||''} onChange={f(key)}
                    style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                      padding:'10px 13px', fontSize:13, outline:'none' }} placeholder={ph}/>}
            </div>
          ))}
          <button onClick={save} style={{ background:'var(--g)', color:'white', border:'none',
            borderRadius:9, padding:'11px 28px', fontSize:13, fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', gap:7 }}>
            <Icon name="check" size={14} color="white"/>Salvează SEO
          </button>
        </div>
      )}

      {/* Cont */}
      {activeTab === 'cont' && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:12,
            padding:28, boxShadow:'var(--shadow)' }}>
            <div style={{ fontWeight:700, fontSize:15, marginBottom:20, display:'flex',
              alignItems:'center', gap:9, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
              <Icon name="lock" size={17} color="var(--g)"/>Schimbă parola admin
            </div>
            {['Parolă curentă','Parolă nouă','Confirmă parola nouă'].map(label => (
              <div key={label} style={{ marginBottom:14 }}>
                <label style={{ fontSize:10, fontWeight:700, color:'var(--text2)', textTransform:'uppercase',
                  letterSpacing:'.08em', display:'block', marginBottom:6 }}>{label}</label>
                <input type="password" placeholder="••••••••"
                  style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                    padding:'10px 13px', fontSize:13, outline:'none' }}/>
              </div>
            ))}
            <button onClick={() => showToast('Parola a fost schimbată!')}
              style={{ background:'var(--g)', color:'white', border:'none', borderRadius:9,
                padding:'11px 24px', fontSize:13, fontWeight:700, cursor:'pointer',
                display:'flex', alignItems:'center', gap:7 }}>
              <Icon name="check" size={14} color="white"/>Schimbă parola
            </button>
          </div>

          <div style={{ background:'#fff5f5', border:'1.5px solid rgba(229,57,53,.25)',
            borderRadius:12, padding:24 }}>
            <div style={{ fontWeight:700, fontSize:14, color:'var(--red)', marginBottom:8 }}>
              Zonă periculoasă
            </div>
            <p style={{ fontSize:13, color:'var(--text2)', marginBottom:16, lineHeight:1.6 }}>
              Resetarea catalogului de produse va șterge toate produsele importate. Comenzile nu vor fi afectate.
            </p>
            <button onClick={() => {
              if (confirm('Ești sigur? Această acțiune nu poate fi anulată.')) {
                showToast('Catalog resetat!', false);
              }
            }} style={{ background:'rgba(229,57,53,.1)', border:'1px solid rgba(229,57,53,.3)',
              color:'var(--red)', borderRadius:9, padding:'9px 20px', fontSize:13,
              fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
              <Icon name="trash" size={13} color="currentColor"/>Resetează catalogul
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position:'fixed', bottom:22, right:22, background:'#1a1a2e', color:'white',
          borderRadius:9, padding:'12px 18px', fontSize:13, fontWeight:500, zIndex:9999,
          display:'flex', alignItems:'center', gap:8, boxShadow:'0 6px 24px rgba(0,0,0,.3)',
          animation:'fadeIn .3s' }}>
          <Icon name={toast.ok?'check':'x'} size={13} color={toast.ok?'#66bb6a':'#ef5350'}/>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
