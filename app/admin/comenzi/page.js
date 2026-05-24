'use client';
import { useState, useMemo } from 'react';
import { useAdmin } from '../../../components/admin/AdminProductsContext';
import Icon from '../../../components/ui/Icon';

const STATUS_CONFIG = {
  nou:       { label:'Nou',       color:'#1565c0', bg:'rgba(21,101,192,.1)' },
  procesare: { label:'Procesare', color:'#b8860b', bg:'rgba(249,168,37,.1)' },
  expediat:  { label:'Expediat',  color:'#4a6cf7', bg:'rgba(74,108,247,.1)' },
  livrat:    { label:'Livrat',    color:'var(--g)', bg:'var(--g3)' },
  anulat:    { label:'Anulat',    color:'var(--red)', bg:'rgba(229,57,53,.1)' },
};

export default function ComenziAdmin() {
  const { orders, updateOrderStatus } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),2200); };

  const filtered = useMemo(() => {
    let list = orders;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(o => o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q));
    }
    if (statusFilter) list = list.filter(o => o.status === statusFilter);
    return list;
  }, [orders, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const totalRev = filtered.reduce((s,o) => s+o.total, 0);

  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22,fontWeight:800,marginBottom:4 }}>Comenzi ({orders.length})</h1>
        <p style={{ fontSize:13,color:'var(--text2)' }}>
          Venituri afișate: <strong style={{ color:'var(--g)' }}>{totalRev.toLocaleString()} lei</strong>
        </p>
      </div>

      {/* Status filter chips */}
      <div style={{ display:'flex',gap:8,marginBottom:16,flexWrap:'wrap' }}>
        <button onClick={() => { setStatusFilter(''); setPage(1); }}
          style={{ padding:'7px 16px',borderRadius:20,border:'1.5px solid',cursor:'pointer',
            fontSize:12,fontWeight:600,transition:'all .2s',
            borderColor:!statusFilter?'var(--g)':'var(--border)',
            background:!statusFilter?'var(--g)':'white',
            color:!statusFilter?'white':'var(--text2)' }}>
          Toate ({orders.length})
        </button>
        {Object.entries(STATUS_CONFIG).map(([key,cfg]) => {
          const count = orders.filter(o=>o.status===key).length;
          return (
            <button key={key} onClick={() => { setStatusFilter(key); setPage(1); }}
              style={{ padding:'7px 16px',borderRadius:20,border:'1.5px solid',cursor:'pointer',
                fontSize:12,fontWeight:600,transition:'all .2s',
                borderColor:statusFilter===key?cfg.color:'var(--border)',
                background:statusFilter===key?cfg.bg:'white',
                color:statusFilter===key?cfg.color:'var(--text2)' }}>
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:10,
        padding:'12px 16px',marginBottom:14,display:'flex',gap:12,boxShadow:'var(--shadow)' }}>
        <div style={{ position:'relative',flex:1 }}>
          <div style={{ position:'absolute',left:11,top:'50%',transform:'translateY(-50%)' }}>
            <Icon name="search" size={14} color="var(--text3)"/>
          </div>
          <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
            placeholder="Caută după ID, client sau email..."
            style={{ width:'100%',border:'1.5px solid var(--border)',borderRadius:8,
              padding:'9px 12px 9px 34px',fontSize:13,outline:'none' }}/>
        </div>
        <span style={{ fontSize:13,color:'var(--text3)',alignSelf:'center',flexShrink:0 }}>
          {filtered.length} comenzi
        </span>
      </div>

      {/* Table */}
      <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:12,
        overflow:'hidden',boxShadow:'var(--shadow)' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#f8f8fc' }}>
                {['ID Comandă','Client','Total','Produse','Status','Dată','Acțiuni'].map(h => (
                  <th key={h} style={{ padding:'11px 14px',textAlign:'left',fontSize:10,
                    fontWeight:700,color:'var(--text2)',textTransform:'uppercase',
                    letterSpacing:'.08em',borderBottom:'1.5px solid var(--border)',whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(o => {
                const cfg = STATUS_CONFIG[o.status] || STATUS_CONFIG.nou;
                return (
                  <tr key={o.id} style={{ borderBottom:'1px solid #f0f0f4',cursor:'pointer' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#fafafe'}
                    onMouseLeave={e=>e.currentTarget.style.background='white'}
                    onClick={()=>setSelected(o)}>
                    <td style={{ padding:'11px 14px',fontWeight:800,color:'var(--g)',fontSize:13 }}>{o.id}</td>
                    <td style={{ padding:'11px 14px' }}>
                      <div style={{ fontWeight:600,fontSize:13 }}>{o.customer}</div>
                      <div style={{ fontSize:11,color:'var(--text3)' }}>{o.email}</div>
                      <div style={{ fontSize:11,color:'var(--text3)' }}>{o.city}</div>
                    </td>
                    <td style={{ padding:'11px 14px',fontWeight:800,color:'var(--g)',fontSize:14,whiteSpace:'nowrap' }}>
                      {o.total} lei
                    </td>
                    <td style={{ padding:'11px 14px',fontSize:13,color:'var(--text2)',whiteSpace:'nowrap' }}>
                      {o.items} buc.
                    </td>
                    <td style={{ padding:'11px 14px' }} onClick={e=>e.stopPropagation()}>
                      <select value={o.status}
                        onChange={e=>{updateOrderStatus(o.id,e.target.value);showToast('Status actualizat!');}}
                        style={{ border:`1.5px solid ${cfg.color}`,borderRadius:8,
                          padding:'5px 10px',fontSize:12,outline:'none',cursor:'pointer',
                          background:cfg.bg,color:cfg.color,fontWeight:700 }}>
                        {Object.entries(STATUS_CONFIG).map(([k,c])=>(
                          <option key={k} value={k}>{c.label}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding:'11px 14px',fontSize:12,color:'var(--text3)',whiteSpace:'nowrap' }}>{o.date}</td>
                    <td style={{ padding:'11px 14px' }} onClick={e=>e.stopPropagation()}>
                      <div style={{ display:'flex',gap:5 }}>
                        <button onClick={()=>setSelected(o)}
                          style={{ background:'rgba(46,125,50,.1)',border:'1px solid rgba(46,125,50,.2)',
                            color:'var(--g)',borderRadius:6,padding:'5px 10px',fontSize:11,
                            fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:4 }}>
                          <Icon name="eye" size={11} color="currentColor"/>Detalii
                        </button>
                        <button style={{ background:'#f5f5f5',border:'1px solid var(--border)',
                          borderRadius:6,padding:'5px 8px',fontSize:11,cursor:'pointer',
                          display:'flex',alignItems:'center',gap:4,color:'var(--text2)' }}>
                          <Icon name="download" size={11} color="currentColor"/>Factură
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display:'flex',gap:6,justifyContent:'center',padding:14,borderTop:'1px solid var(--border)' }}>
            {[...Array(Math.min(7,totalPages))].map((_,i)=>{
              const p = page>4?page-3+i:i+1;
              if(p<1||p>totalPages) return null;
              return (
                <button key={p} onClick={()=>setPage(p)}
                  style={{ width:32,height:32,borderRadius:8,border:'1.5px solid',cursor:'pointer',
                    fontSize:13,fontWeight:600,
                    borderColor:page===p?'var(--g)':'var(--border)',
                    background:page===p?'var(--g)':'white',
                    color:page===p?'white':'var(--text)' }}>{p}</button>
              );
            })}
          </div>
        )}
      </div>

      {/* Order detail modal */}
      {selected && (
        <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.45)',zIndex:900,
          display:'flex',alignItems:'center',justifyContent:'center',padding:20 }}
          onClick={()=>setSelected(null)}>
          <div onClick={e=>e.stopPropagation()} style={{ background:'white',borderRadius:14,
            padding:28,width:'100%',maxWidth:520,maxHeight:'85vh',overflowY:'auto',
            boxShadow:'0 20px 60px rgba(0,0,0,.22)' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',
              marginBottom:20,paddingBottom:14,borderBottom:'1px solid var(--border)' }}>
              <span style={{ fontWeight:800,fontsize={18},color:'var(--g)' }}>{selected.id}</span>
              <button onClick={()=>setSelected(null)}
                style={{ background:'none',border:'none',cursor:'pointer',color:'var(--text3)' }}>
                <Icon name="x" size={18} color="currentColor"/>
              </button>
            </div>
            {[
              ['Client', selected.customer],
              ['Email', selected.email],
              ['Telefon', selected.phone],
              ['Oraș', selected.city],
              ['Produse', `${selected.items} buc.`],
              ['Total', `${selected.total} lei`],
              ['Data', selected.date],
            ].map(([k,v])=>(
              <div key={k} style={{ display:'flex',justifyContent:'space-between',
                padding:'9px 0',borderBottom:'1px solid #f5f5f5',fontSize:13 }}>
                <span style={{ color:'var(--text2)',fontWeight:500 }}>{k}</span>
                <span style={{ fontWeight:600 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop:16,display:'flex',gap:10 }}>
              <button style={{ flex:1,background:'var(--g)',color:'white',border:'none',
                borderRadius:9,padding:11,fontSize:13,fontWeight:700,cursor:'pointer' }}>
                📄 Descarcă factură
              </button>
              <button onClick={()=>setSelected(null)}
                style={{ background:'none',border:'1.5px solid var(--border)',
                  borderRadius:9,padding:'10px 18px',fontSize:13,fontWeight:600,cursor:'pointer' }}>
                Închide
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position:'fixed',bottom:22,right:22,background:'#1a1a2e',color:'white',
          borderRadius:9,padding:'12px 18px',fontSize:13,fontWeight:500,zIndex:9999,
          display:'flex',alignItems:'center',gap:8,boxShadow:'0 6px 24px rgba(0,0,0,.3)' }}>
          <Icon name="check" size={13} color="#66bb6a"/>{toast}
        </div>
      )}
    </div>
  );
}
