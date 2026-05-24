'use client';
import { useState } from 'react';
import { useFeatured } from '../../../components/layout/FeaturedContext';
import { useAdmin } from '../../../components/admin/AdminProductsContext';
import Icon from '../../../components/ui/Icon';

export default function NewsletterAdmin() {
  const { subscribers, removeSubscriber, newsletterTitle, newsletterDesc, updateNewsletter } = useFeatured();
  const [title, setTitle] = useState(newsletterTitle);
  const [desc, setDesc] = useState(newsletterDesc);
  const [toast, setToast] = useState(null);
  const [tab, setTab] = useState('abonati');
  const [search, setSearch] = useState('');

  // Compose email
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [preview, setPreview] = useState(false);

  const showToast = (msg, ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),2500); };

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const csv = 'Email,Nume,Data\n' + subscribers.map(s => `${s.email},${s.name||''},${s.date}`).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'abonati-yupo.csv';
    a.click();
  };

  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>
          Newsletter ({subscribers.length} abonați)
        </h1>
        <p style={{ fontSize:13, color:'var(--text2)' }}>
          Gestionează abonații și trimite campanii email.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        {[
          { icon:'user', val:subscribers.length, lbl:'Total abonați', color:'var(--g)' },
          { icon:'mail', val:subscribers.filter(s=>{
            const d = new Date(); const weekAgo = new Date(d-7*86400000);
            return new Date(s.date.split('.').reverse().join('-')) > weekAgo;
          }).length, lbl:'Abonați această săptămână', color:'#1565c0' },
          { icon:'barChart', val:'0', lbl:'Emailuri trimise', color:'#e65100' },
        ].map((s,i) => (
          <div key={i} style={{ background:'white', border:'1.5px solid var(--border)',
            borderRadius:12, padding:20, boxShadow:'var(--shadow)' }}>
            <div style={{ width:40,height:40,background:'var(--g3)',borderRadius:10,
              display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12 }}>
              <Icon name={s.icon} size={20} color="var(--g)"/>
            </div>
            <div style={{ fontSize:24, fontWeight:800, color:s.color, marginBottom:4 }}>{s.val}</div>
            <div style={{ fontSize:12, color:'var(--text2)' }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:0, background:'white', border:'1.5px solid var(--border)',
        borderRadius:12, overflow:'hidden', marginBottom:20, boxShadow:'var(--shadow)' }}>
        {[
          ['abonati','user','Abonați'],
          ['setari','settings','Setări formular'],
          ['compune','mail','Compune email'],
        ].map(([id,icon,lbl]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ flex:1, padding:'12px 16px', display:'flex', alignItems:'center',
              justifyContent:'center', gap:8, fontSize:13, fontWeight:600, cursor:'pointer',
              border:'none', borderRight:'1px solid var(--border)', transition:'all .2s',
              color: tab===id ? 'var(--g)' : 'var(--text3)',
              background: tab===id ? 'var(--g3)' : 'white' }}>
            <Icon name={icon} size={14} color="currentColor"/>{lbl}
          </button>
        ))}
      </div>

      {/* Tab: Abonati */}
      {tab === 'abonati' && (
        <div style={{ background:'white', border:'1.5px solid var(--border)',
          borderRadius:12, overflow:'hidden', boxShadow:'var(--shadow)' }}>
          <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--border)',
            display:'flex', gap:12, alignItems:'center' }}>
            <div style={{ position:'relative', flex:1 }}>
              <div style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)' }}>
                <Icon name="search" size={14} color="var(--text3)"/>
              </div>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Caută după email sau nume..."
                style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:8,
                  padding:'8px 12px 8px 34px', fontSize:13, outline:'none' }}/>
            </div>
            <button onClick={exportCSV}
              style={{ background:'var(--g)', color:'white', border:'none', borderRadius:8,
                padding:'9px 18px', fontSize:12, fontWeight:700, cursor:'pointer',
                display:'flex', alignItems:'center', gap:6 }}>
              <Icon name="download" size={13} color="white"/>Export CSV
            </button>
          </div>
          {subscribers.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text3)' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
              <div style={{ fontWeight:600 }}>Niciun abonat încă</div>
              <p style={{ fontSize:13, marginTop:6 }}>Abonații vor apărea aici după ce se înregistrează pe site.</p>
            </div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#f8f8fc' }}>
                  {['Email','Nume','Data abonării','Acțiuni'].map(h => (
                    <th key={h} style={{ padding:'11px 16px', textAlign:'left', fontSize:10,
                      fontWeight:700, color:'var(--text2)', textTransform:'uppercase',
                      letterSpacing:'.08em', borderBottom:'1.5px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} style={{ borderBottom:'1px solid #f0f0f4' }}>
                    <td style={{ padding:'12px 16px', fontWeight:600, fontSize:13 }}>{s.email}</td>
                    <td style={{ padding:'12px 16px', fontSize:13, color:'var(--text2)' }}>{s.name || '—'}</td>
                    <td style={{ padding:'12px 16px', fontSize:12, color:'var(--text3)' }}>{s.date}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <button onClick={() => { removeSubscriber(s.id); showToast('Abonat șters'); }}
                        style={{ background:'rgba(229,57,53,.1)', border:'1px solid rgba(229,57,53,.2)',
                          color:'var(--red)', borderRadius:6, padding:'5px 10px', fontSize:11,
                          fontWeight:600, cursor:'pointer' }}>
                        Șterge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Tab: Setari formular */}
      {tab === 'setari' && (
        <div style={{ background:'white', border:'1.5px solid var(--border)',
          borderRadius:12, padding:28, boxShadow:'var(--shadow)' }}>
          <h3 style={{ fontSize:16, fontWeight:700, marginBottom:20 }}>
            Personalizează formularul de newsletter
          </h3>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:10, fontWeight:700, color:'var(--text2)',
              textTransform:'uppercase', letterSpacing:'.08em', display:'block', marginBottom:6 }}>
              Titlu formular
            </label>
            <input value={title} onChange={e=>setTitle(e.target.value)}
              style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                padding:'10px 13px', fontSize:13, outline:'none' }}/>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ fontSize:10, fontWeight:700, color:'var(--text2)',
              textTransform:'uppercase', letterSpacing:'.08em', display:'block', marginBottom:6 }}>
              Descriere / Beneficii
            </label>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={3}
              style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                padding:'10px 13px', fontSize:13, outline:'none', resize:'vertical',
                fontFamily:'Inter,sans-serif' }}/>
          </div>
          <button onClick={() => { updateNewsletter(title, desc); showToast('Setări salvate!'); }}
            style={{ background:'var(--g)', color:'white', border:'none', borderRadius:9,
              padding:'11px 28px', fontSize:13, fontWeight:700, cursor:'pointer',
              display:'flex', alignItems:'center', gap:7 }}>
            <Icon name="check" size={14} color="white"/>Salvează setările
          </button>
          <div style={{ marginTop:20, background:'var(--g3)', borderRadius:10,
            padding:16, border:'1px solid #c8e6c9' }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:10, color:'var(--g)' }}>
              Preview formular:
            </div>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:5 }}>{title}</div>
            <p style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5 }}>{desc}</p>
          </div>
        </div>
      )}

      {/* Tab: Compune email */}
      {tab === 'compune' && (
        <div style={{ background:'white', border:'1.5px solid var(--border)',
          borderRadius:12, padding:28, boxShadow:'var(--shadow)' }}>
          <div style={{ background:'#fff3e0', border:'1px solid #ffe0b2', borderRadius:10,
            padding:'12px 16px', marginBottom:20, display:'flex', gap:10,
            alignItems:'flex-start', color:'#e65100' }}>
            <Icon name="info" size={16} color="currentColor" style={{flexShrink:0}}/>
            <div style={{ fontSize:13 }}>
              <strong>Backend necesar pentru trimitere.</strong> Poți compune și previzualiza emailul acum,
              iar când adăugăm serverul, trimiterea va funcționa automat.
            </div>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:10, fontWeight:700, color:'var(--text2)',
              textTransform:'uppercase', letterSpacing:'.08em', display:'block', marginBottom:6 }}>
              Subiect email
            </label>
            <input value={subject} onChange={e=>setSubject(e.target.value)}
              placeholder="ex: Oferte speciale YUPO această săptămână 🌹"
              style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                padding:'10px 13px', fontSize:13, outline:'none' }}/>
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
              <label style={{ fontSize:10, fontWeight:700, color:'var(--text2)',
                textTransform:'uppercase', letterSpacing:'.08em' }}>
                Conținut email (HTML suportat)
              </label>
              <button onClick={() => setPreview(p=>!p)}
                style={{ fontSize:12, color:'var(--g)', background:'none', border:'none',
                  cursor:'pointer', fontWeight:600, display:'flex', alignItems:'center', gap:5 }}>
                <Icon name="eye" size={13} color="var(--g)"/>
                {preview ? 'Editează' : 'Preview'}
              </button>
            </div>
            {preview ? (
              <div style={{ border:'1.5px solid var(--border)', borderRadius:9, padding:20,
                minHeight:200, background:'#fafafa' }}
                dangerouslySetInnerHTML={{ __html: emailBody || '<p style="color:#aaa">Niciun conținut...</p>' }}/>
            ) : (
              <textarea value={emailBody} onChange={e=>setEmailBody(e.target.value)}
                rows={10} placeholder="Scrie conținutul emailului...&#10;&#10;Poți folosi HTML:&#10;<h2>Titlu</h2>&#10;<p>Paragraf</p>&#10;<img src='...' />&#10;<a href='...'>Link</a>"
                style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
                  padding:'10px 13px', fontSize:13, outline:'none', resize:'vertical',
                  fontFamily:'monospace', minHeight:200, boxSizing:'border-box' }}/>
            )}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => showToast('Email salvat ca draft!', true)}
              style={{ background:'none', border:'1.5px solid var(--border)', color:'var(--text)',
                borderRadius:9, padding:'10px 22px', fontSize:13, fontWeight:600, cursor:'pointer',
                display:'flex', alignItems:'center', gap:6 }}>
              <Icon name="edit" size={13} color="currentColor"/>Salvează draft
            </button>
            <button onClick={() => showToast('Backend necesar pentru trimitere!', false)}
              style={{ background:'#ccc', color:'white', border:'none', borderRadius:9,
                padding:'10px 22px', fontSize:13, fontWeight:700, cursor:'not-allowed',
                display:'flex', alignItems:'center', gap:6 }}>
              <Icon name="mail" size={13} color="white"/>
              Trimite la {subscribers.length} abonați (necesită backend)
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position:'fixed', bottom:22, right:22, background:'#1a1a2e',
          color:'white', borderRadius:9, padding:'12px 18px', fontSize:13, fontWeight:500,
          zIndex:9999, display:'flex', alignItems:'center', gap:8,
          boxShadow:'0 6px 24px rgba(0,0,0,.3)' }}>
          <Icon name={toast.ok?'check':'x'} size={13} color={toast.ok?'#66bb6a':'#ef5350'}/>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
