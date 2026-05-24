'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon, { StarRating } from '../ui/Icon';
import { useCart } from '../layout/CartContext';
import { useToast } from '../layout/ToastContext';
import { formatPrice, getDiscountPct } from '../../lib/utils';

export default function ProductCard({ product: p, onCompare, onStockNotif }) {
  const [fav, setFav] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const { addToCart } = useCart();
  const toast = useToast();

  const price = p.salePrice || p.price;
  const pct = getDiscountPct(p.price, p.salePrice);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p);
    toast?.show(`✓ ${p.name.slice(0, 28)}... adăugat în coș!`);
  };

  return (
    <article className="prod-card">
      <Link href={`/produs/${p.slug}`} style={{ display:'contents' }}>
        <div className="prod-img-wrap">
          <div className="prod-badges">
            {p.salePrice && <span className="badge badge-sale">-{pct}%</span>}
            {p.badge === 'nou' && <span className="badge badge-nou">NOU</span>}
            {p.badge === 'top' && <span className="badge badge-top">TOP</span>}
          </div>
          <button className={`prod-fav${fav ? ' on' : ''}`}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setFav(v => !v); }}
            aria-label={fav ? 'Elimină din favorite' : 'Adaugă la favorite'}>
            <Icon name="heart" size={14} color={fav ? '#e53935' : '#bbb'}/>
          </button>
          {p.image && !imgErr
            ? <img src={p.image} alt={p.name} loading="lazy"
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
                onError={() => setImgErr(true)}/>
            : <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%' }}>
                <Icon name="tag" size={52} color="#c8e6c9"/>
              </div>}
        </div>

        <div className="prod-info">
          <div className="prod-brand">{p.brand}</div>
          <div className="prod-name">{p.name}</div>
          <StarRating n={p.rating || 4} size={11}/>
          <div className="prod-price" style={{ marginTop:'auto' }}>
            {p.salePrice && (
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:1 }}>
                <span className="price-old">{p.price} lei</span>
                <span className="price-save">-{(p.price - p.salePrice).toFixed(0)} lei</span>
              </div>
            )}
            <div>
              <span className="price-dela">De la </span>
              <span className="price-main">{price} lei</span>
            </div>
          </div>
          <div className="prod-meta">
            <span>SKU: {p.sku || p.id}</span>
            <span className={p.stock < 10 ? 'stoc-low' : 'stoc-ok'}>
              ● {p.stock > 0 ? `Stoc: ${p.stock}` : 'Indisponibil'}
            </span>
          </div>
        </div>
      </Link>

      <div className="prod-actions" style={{ padding:'0 11px 12px' }}>
        {p.stock > 0
          ? <button className="add-to-cart" style={{ flex:1 }} onClick={handleAdd}>
              <Icon name="cart" size={13} color="white"/>Adaugă în coș
            </button>
          : <button style={{ flex:1, background:'none', border:'1.5px solid var(--red)',
              color:'var(--red)', borderRadius:7, padding:'8px 0', fontSize:11, fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center', gap:5, cursor:'pointer' }}
              onClick={e => { e.preventDefault(); onStockNotif?.(p); }}>
              🔔 Alertează-mă
            </button>}
        {onCompare && (
          <button className="compare-btn" onClick={e => { e.preventDefault(); onCompare(p); }}
            title="Adaugă la comparare" aria-label="Compară produs">
            <Icon name="eye" size={14} color="currentColor"/>
          </button>
        )}
      </div>
    </article>
  );
}
