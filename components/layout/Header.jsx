'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '../ui/Icon';
import { useCart } from './CartContext';
import { PRODUCTS } from '../../lib/products';

function SearchBox() {
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setShow(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (val) => {
    setQ(val);
    if (val.length < 2) { setSuggestions([]); setShow(false); return; }
    const lower = val.toLowerCase();
    const results = PRODUCTS.filter(p => p.active && (
      p.name.toLowerCase().includes(lower) ||
      p.brand?.toLowerCase().includes(lower) ||
      p.category?.toLowerCase().includes(lower)
    )).slice(0, 7);
    setSuggestions(results);
    setShow(results.length > 0);
  };

  const go = (val) => { setQ(val); setShow(false); router.push(`/cautare?q=${encodeURIComponent(val)}`); };

  return (
    <div ref={ref} style={{ flex:1, position:'relative', maxWidth:620 }}>
      <div style={{ display:'flex', border:'2px solid var(--g)', borderRadius:9, overflow:'hidden', background:'white', height:46 }}>
        <button style={{ background:'none', border:'none', borderRight:'1px solid var(--border)',
          padding:'0 13px', color:'var(--text3)', display:'flex', alignItems:'center', cursor:'pointer', flexShrink:0 }}
          title="Caută după imagine">
          <Icon name="camera" size={17} color="currentColor"/>
        </button>
        <input style={{ flex:1, border:'none', outline:'none', padding:'0 14px',
          fontSize:14, color:'var(--text)', background:'transparent', minWidth:0 }}
          placeholder="Caută parfumuri, șampoane, creme..."
          value={q} onChange={e => handleChange(e.target.value)}
          onFocus={() => suggestions.length && setShow(true)}
          onKeyDown={e => e.key === 'Enter' && go(q)}/>
        <button onClick={() => go(q)}
          style={{ background:'var(--g)', border:'none', padding:'0 22px',
            display:'flex', alignItems:'center', color:'white', cursor:'pointer',
            transition:'background .2s', flexShrink:0 }}>
          <Icon name="search" size={18} color="white"/>
        </button>
      </div>
      {show && suggestions.length > 0 && (
        <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, right:0,
          background:'white', borderRadius:10, boxShadow:'0 8px 32px rgba(0,0,0,.15)',
          border:'1.5px solid var(--border)', zIndex:900, overflow:'hidden' }}>
          <div style={{ padding:'7px 14px 5px', fontSize:10, fontWeight:700,
            color:'var(--text3)', textTransform:'uppercase', letterSpacing:'.08em',
            borderBottom:'1px solid var(--border)' }}>
            Sugestii ({suggestions.length})
          </div>
          {suggestions.map(p => (
            <div key={p.id} onClick={() => go(p.name)}
              style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 14px',
                cursor:'pointer', borderBottom:'1px solid #f5f5f5', background:'white' }}>
              <div style={{ width:36, height:36, borderRadius:8, background:'#f5f5f5',
                border:'1px solid var(--border)', overflow:'hidden', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                {p.image
                  ? <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <Icon name="tag" size={16} color="#c8e6c9"/>}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, overflow:'hidden',
                  textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{p.brand} · {p.category}</div>
              </div>
              <div style={{ fontSize:13, fontWeight:800, color:'var(--g)', flexShrink:0 }}>
                {p.salePrice || p.price} lei
              </div>
            </div>
          ))}
          <div onClick={() => go(q)}
            style={{ padding:'9px 14px', fontSize:12, fontWeight:600, color:'var(--g)',
              cursor:'pointer', display:'flex', alignItems:'center', gap:6,
              background:'var(--g3)', borderTop:'1px solid var(--border)' }}>
            <Icon name="search" size={13} color="var(--g)"/>Caută "{q}" în toate produsele
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { cartCount, setCartOpen } = useCart();

  return (
    <header style={{ background:'white', position:'sticky', top:0, zIndex:600,
      boxShadow:'0 2px 8px rgba(0,0,0,.08)', borderBottom:'2px solid var(--g)' }}>

      {/* Topbar */}
      <div style={{ background:'var(--g)', color:'rgba(255,255,255,.85)', fontSize:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'5px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <a href="tel:+40787301034" style={{ color:'inherit', textDecoration:'none',
              display:'flex', alignItems:'center', gap:5 }}>
              <Icon name="phone" size={12} color="currentColor"/>+40 787 301 034
            </a>
            <span style={{ opacity:.35 }}>|</span>
            <a href="mailto:contact@yupo.ro" style={{ color:'inherit', textDecoration:'none',
              display:'flex', alignItems:'center', gap:5 }}>
              <Icon name="mail" size={12} color="currentColor"/>contact@yupo.ro
            </a>
            <span style={{ opacity:.35 }}>|</span>
            <span style={{ display:'flex', alignItems:'center', gap:5 }}>
              <Icon name="clock" size={12} color="currentColor"/>L-D 9:00–21:00
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <Link href="/admin" style={{ color:'inherit', textDecoration:'none',
              display:'flex', alignItems:'center', gap:5, background:'rgba(255,255,255,.15)',
              padding:'3px 12px', borderRadius:4, fontWeight:600 }}>
              <Icon name="shield" size={12} color="currentColor"/>Admin Panel
            </Link>
            <span style={{ opacity:.35 }}>|</span>
            <Link href="/b2b" style={{ color:'inherit', textDecoration:'none' }}>B2B</Link>
            <span style={{ opacity:.35 }}>|</span>
            <span>RO</span>
            <span style={{ opacity:.35 }}>|</span>
            <span>RON</span>
          </div>
        </div>
      </div>

      {/* Main header - Logo stanga, Search centrat, Butoane dreapta */}
      <div style={{ display:'flex', alignItems:'center', gap:20, padding:'10px 24px' }}>

        {/* Logo - STANGA */}
        <Link href="/" style={{ textDecoration:'none', display:'flex',
          alignItems:'center', gap:10, flexShrink:0, minWidth:160 }}>
          <div style={{ width:44, height:44, background:'var(--g)', borderRadius:10,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon name="sparkles" size={24} color="white"/>
          </div>
          <div>
            <div style={{ fontSize:24, fontWeight:800, color:'var(--g)',
              letterSpacing:'-.03em', lineHeight:1 }}>YUPO</div>
            <div style={{ fontSize:10, color:'var(--text3)', fontWeight:400 }}>beauty & parfumuri</div>
          </div>
        </Link>

        {/* Search - CENTRAT */}
        <div style={{ flex:1, display:'flex', justifyContent:'center' }}>
          <SearchBox/>
        </div>

        {/* Butoane - DREAPTA */}
        <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0, minWidth:280, justifyContent:'flex-end' }}>

          <Link href="/reduceri" className="reduceri-animated">
            <Icon name="percent" size={13} color="white"/>Reduceri
          </Link>

          <Link href="/auth"
            style={{ textDecoration:'none', display:'flex', flexDirection:'column',
              alignItems:'center', gap:2, color:'var(--text2)', padding:'6px 10px',
              borderRadius:8, fontSize:11, fontWeight:500, whiteSpace:'nowrap' }}>
            <Icon name="user" size={22} color="currentColor"/>
            Contul meu
          </Link>

          <Link href="/wishlist"
            style={{ textDecoration:'none', display:'flex', flexDirection:'column',
              alignItems:'center', gap:2, color:'var(--text2)', padding:'6px 10px',
              borderRadius:8, fontSize:11, fontWeight:500 }}>
            <Icon name="heart" size={22} color="currentColor"/>
            Favorite
          </Link>

          <button onClick={() => setCartOpen(true)}
            style={{ background:'var(--g)', color:'white', border:'none',
              borderRadius:9, padding:'10px 20px', fontSize:13, fontWeight:700,
              display:'flex', alignItems:'center', gap:8, cursor:'pointer',
              position:'relative', whiteSpace:'nowrap' }}>
            <Icon name="cart" size={18} color="white"/>
            Coș
            {cartCount > 0 && (
              <span style={{ position:'absolute', top:-6, right:-6,
                background:'var(--red)', color:'white', width:19, height:19,
                borderRadius:'50%', fontSize:10, fontWeight:700,
                display:'flex', alignItems:'center', justifyContent:'center',
                border:'2px solid white' }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
