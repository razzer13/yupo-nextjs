'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '../ui/Icon';
import { useCart } from './CartContext';
import { CATEGORIES } from '../../lib/utils';
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

  const go = (val) => {
    setQ(val); setShow(false);
    router.push(`/cautare?q=${encodeURIComponent(val)}`);
  };

  return (
    <div ref={ref} style={{ flex:1, position:'relative' }}>
      <div className="search-form">
        <button className="search-cam-btn" aria-label="Caută după imagine">
          <Icon name="camera" size={16} color="currentColor"/>
        </button>
        <input className="search-input" placeholder="Caută parfumuri, cosmetice, produse..."
          value={q} onChange={e => handleChange(e.target.value)}
          onFocus={() => suggestions.length && setShow(true)}
          onKeyDown={e => e.key === 'Enter' && go(q)}
          aria-label="Căutare produse"/>
        <button className="search-go" onClick={() => go(q)} aria-label="Caută">
          <Icon name="search" size={17} color="white"/>
        </button>
      </div>
      {show && suggestions.length > 0 && (
        <div className="suggestions-box">
          <div style={{ padding:'7px 14px 5px', fontSize:10, fontWeight:700, color:'var(--text3)',
            textTransform:'uppercase', letterSpacing:'.08em', borderBottom:'1px solid var(--border)' }}>
            Sugestii ({suggestions.length})
          </div>
          {suggestions.map(p => (
            <Link key={p.id} href={`/produs/${p.slug}`}
              onClick={() => setShow(false)}
              className="suggestion-item">
              <div style={{ width:36, height:36, borderRadius:8, background:'#f5f5f5',
                border:'1px solid var(--border)', overflow:'hidden', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                {p.image
                  ? <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <Icon name="tag" size={16} color="#c8e6c9"/>}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{p.brand} · {p.category}</div>
              </div>
              <div style={{ fontSize:13, fontWeight:800, color:'var(--g)', flexShrink:0 }}>
                {p.salePrice || p.price} lei
              </div>
            </Link>
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
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-inner">
          <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
            <span className="tb-item"><Icon name="truck" size={12} color="currentColor"/>Livrare gratuită peste 250 lei</span>
            <span className="tb-divider"/>
            <a href="tel:+40787301034" className="tb-item" style={{ color:'inherit' }}>
              <Icon name="phone" size={12} color="currentColor"/>0787 301 034
            </a>
            <span className="tb-divider"/>
            <span className="tb-item"><Icon name="clock" size={12} color="currentColor"/>L-D 9:00–21:00</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <Link href="/auth" className="tb-item" style={{ color:'rgba(255,255,255,.82)' }}>
              <Icon name="user" size={12} color="currentColor"/>Contul meu
            </Link>
            <span className="tb-divider"/>
            <Link href="/admin" className="tb-admin">
              <Icon name="settings" size={11} color="currentColor"/>Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo-link">
            <div className="logo-icon">
              <Icon name="shield" size={20} color="white"/>
            </div>
            <div>
              <div className="logo-text">YUPO</div>
              <div className="logo-sub">Beauty & Parfumuri</div>
            </div>
          </Link>

          <SearchBox/>

          <div className="hdr-actions">
            <Link href="/auth" className="hdr-btn">
              <Icon name="user" size={19} color="currentColor"/>
              <span>Cont</span>
            </Link>
            <Link href="/wishlist" className="hdr-btn">
              <Icon name="heart" size={19} color="currentColor"/>
              <span>Favorite</span>
            </Link>
            <Link href="/reduceri" className="reduceri-btn">
              <Icon name="percent" size={14} color="currentColor"/>Reduceri
            </Link>
            <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Coș cumpărături">
              <Icon name="cart" size={16} color="white"/>
              <span>Coș</span>
              {cartCount > 0 && <span className="cart-cnt">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
