'use client';
import { useState } from 'react';
import { useFeatured } from '../../../components/layout/FeaturedContext';
import { PRODUCTS } from '../../../lib/products';
import Icon from '../../../components/ui/Icon';

export default function ProdusFeaturedAdmin() {
  const { featuredProduct, setFeatured } = useFeatured();
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),2500); };

  const filtered = search.length > 1
    ? PRODUCTS.filter(p => p.active && (
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase())
      )).slice(0, 20)
    : PRODUCTS.filter(p => p.active && p.salePrice).slice(0, 20);

  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>Produs Vedeta</h1>
        <p style={{ fontSize:13, color:'var(--text2)' }}>
          Selectează produsul care apare în panelul principal al site-ului.
        </p>
      </div>

      {/* Current featured */}
      {featuredProduct && (
        <div style={{ background:'white', border:'2px solid var(--g)', borderRadius:12,
          padding:20, marginBottom:24, boxShadow:'var(--shadow)', display:'flex', gap:16, alignItems:'center' }}>
          <div style={{ width:80, height:80, borderRadius:10, background:'#f5f5f5',
            border:'1px solid var(--border)', overflow:'hidden', flexShrink:0 }}>
            {featuredProduct.image && (
              <img src={featuredProduct.image} alt={featuredProduct.name}
                style={{ width:'100%', height:'100%', objectFit:'contain', padding:4 }}/>
            )}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:'var(--g)', fontWeight:700,
              textTransform:'uppercase', letterSpacing:'.08em', marginBottom:4 }}>
              ⭐ Produs Vedeta Curent
            </div>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>{featuredProduct.name}</div>
            <div style={{ fontSize:12, color:'var(--text2)' }}>
              {featuredProduct.brand} · {' '}
              <span style={{ color:'var(--g)', fontWeight:700 }}>
                {featuredProduct.salePrice || featuredProduct.price} lei
              </span>
              {featuredProduct.salePrice && (
                <span style={{ color:'var(--text3)', textDecoration:'line-through', marginLeft:6 }}>
                  {featuredProduct.price} lei
                </span>
              )}
            </div>
          </div>
          <div style={{ background:'var(--g3)', border:'1.5px solid #c8e6c9',
            borderRadius:9, padding:'8px 14px', fontSize:12, fontWeight:700, color:'var(--g)' }}>
            ✓ Activ pe site
          </div>
        </div>
      )}

      {/* Search + Select */}
      <div style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:12,
        padding:20, boxShadow:'var(--shadow)' }}>
        <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>
          Alege un produs nou
        </h3>
        <div style={{ position:'relative', marginBottom:16 }}>
          <div style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)' }}>
            <Icon name="search" size={14} color="var(--text3)"/>
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Caută produs după nume sau brand..."
            style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:9,
              padding:'10px 12px 10px 34px', fontSize:13, outline:'none' }}/>
        </div>
        {!search && (
          <div style={{ fontSize:12, color:'var(--text3)', marginBottom:12 }}>
            Afișez produsele cu reducere. Caută pentru a vedea toate produsele.
          </div>
        )}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
          {filtered.map(p => {
            const isActive = p.slug === featuredProduct?.slug;
            return (
              <div key={p.id}
                onClick={() => { setFeatured(p.slug); showToast(`"${p.name.slice(0,30)}..." setat ca produs vedeta!`); }}
                style={{ border:`2px solid ${isActive?'var(--g)':'var(--border)'}`,
                  borderRadius:10, overflow:'hidden', cursor:'pointer',
                  background: isActive ? 'var(--g3)' : 'white',
                  transition:'all .2s' }}>
                <div style={{ height:100, background:'#f5f5f5', display:'flex',
                  alignItems:'center', justifyContent:'center', position:'relative' }}>
                  {p.image && <img src={p.image} alt={p.name}
                    style={{ width:'100%', height:'100%', objectFit:'contain', padding:8 }}/>}
                  {isActive && (
                    <div style={{ position:'absolute', top:6, right:6,
                      background:'var(--g)', color:'white', borderRadius:'50%',
                      width:22, height:22, display:'flex', alignItems:'center',
                      justifyContent:'center' }}>
                      <Icon name="check" size={12} color="white"/>
                    </div>
                  )}
                  {p.salePrice && (
                    <div style={{ position:'absolute', top:6, left:6,
                      background:'var(--red)', color:'white', fontSize:9,
                      fontWeight:800, padding:'2px 6px', borderRadius:3 }}>
                      -{Math.round((1-p.salePrice/p.price)*100)}%
                    </div>
                  )}
                </div>
                <div style={{ padding:'8px 10px' }}>
                  <div style={{ fontSize:10, color:'var(--text3)', marginBottom:2 }}>{p.brand}</div>
                  <div style={{ fontSize:11.5, fontWeight:600, lineHeight:1.3, marginBottom:5,
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize:13, fontWeight:800, color: isActive?'var(--g)':'var(--text)' }}>
                    {p.salePrice || p.price} lei
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {toast && (
        <div style={{ position:'fixed', bottom:22, right:22, background:'#1a1a2e',
          color:'white', borderRadius:9, padding:'12px 18px', fontSize:13, fontWeight:500,
          zIndex:9999, display:'flex', alignItems:'center', gap:8,
          boxShadow:'0 6px 24px rgba(0,0,0,.3)', animation:'fadeIn .3s' }}>
          <Icon name="check" size={13} color="#66bb6a"/>{toast}
        </div>
      )}
    </div>
  );
}
