'use client';
import { useState } from 'react';
import Icon, { StarRating } from '../../../components/ui/Icon';
import { useCart } from '../../../components/layout/CartContext';
import { useToast } from '../../../components/layout/ToastContext';
import { formatPrice, getDiscountPct } from '../../../lib/utils';

export default function ProductPageClient({ product: p }) {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [tab, setTab] = useState('desc');
  const [lightbox, setLightbox] = useState(false);
  const [reviewStar, setReviewStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewSent, setReviewSent] = useState(false);

  const { addToCart } = useCart();
  const toast = useToast();

  const imgs = p.images?.length ? p.images : (p.image ? [p.image] : []);
  const price = p.salePrice || p.price;
  const pct = getDiscountPct(p.price, p.salePrice);

  const handleAdd = () => {
    addToCart(p, qty);
    toast?.show(`✓ ${p.name.slice(0,30)}... adăugat în coș!`);
  };

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28,
      background:'white', borderRadius:12, padding:24, boxShadow:'var(--shadow)', marginBottom:18 }}>

      {/* Gallery */}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ aspectRatio:'1/1', borderRadius:10, border:'1.5px solid var(--border)',
          background:'#f8f8f8', display:'flex', alignItems:'center', justifyContent:'center',
          position:'relative', overflow:'hidden', cursor:'zoom-in' }}
          onClick={() => imgs.length && setLightbox(true)}>
          {imgs[activeImg]
            ? <img src={imgs[activeImg]} alt={p.name}
                style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
            : <Icon name="tag" size={120} color="#c8e6c9"/>}
          {imgs.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i-1+imgs.length)%imgs.length); }}
                style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)',
                  background:'rgba(255,255,255,.9)', border:'1px solid var(--border)', borderRadius:'50%',
                  width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <Icon name="chevronLeft" size={14} color="var(--text2)"/>
              </button>
              <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i+1)%imgs.length); }}
                style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)',
                  background:'rgba(255,255,255,.9)', border:'1px solid var(--border)', borderRadius:'50%',
                  width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <Icon name="chevronRight" size={14} color="var(--text2)"/>
              </button>
            </>
          )}
          <div style={{ position:'absolute', bottom:10, right:10, background:'rgba(0,0,0,.35)',
            color:'white', borderRadius:6, padding:'4px 9px', fontSize:11,
            display:'flex', alignItems:'center', gap:5 }}>
            <Icon name="zoomIn" size={12} color="white"/>Zoom
          </div>
        </div>
        {imgs.length > 1 && (
          <div style={{ display:'flex', gap:8 }}>
            {imgs.slice(0,4).map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)}
                style={{ width:64, height:64, borderRadius:8, cursor:'pointer', overflow:'hidden',
                  border:`2px solid ${activeImg===i?'var(--g)':'var(--border)'}`, background:'#f5f5f5' }}>
                <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ fontSize:11, color:'var(--g)', fontWeight:700, textTransform:'uppercase',
          letterSpacing:'.1em', display:'flex', alignItems:'center', gap:6 }}>
          <Icon name="tag" size={12} color="var(--g)"/>{p.category}
        </div>
        <h1 style={{ fontSize:21, fontWeight:800, color:'var(--text)', lineHeight:1.3 }}>{p.name}</h1>
        <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <span className="pill p-g"><Icon name="tag" size={10} color="currentColor"/>{p.brand}</span>
          <span style={{ background:'#f5f5f5', border:'1px solid var(--border)', color:'var(--text3)',
            fontSize:11, padding:'3px 10px', borderRadius:6, fontFamily:'monospace' }}>SKU: {p.sku||p.id}</span>
          {p.ean && <span style={{ background:'#f5f5f5', border:'1px solid var(--border)', color:'var(--text3)',
            fontSize:11, padding:'3px 10px', borderRadius:6, fontFamily:'monospace' }}>EAN: {p.ean}</span>}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 0',
          borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
          <span style={{ fontSize:24, fontWeight:800 }}>4.7</span>
          <div>
            <StarRating n={5} size={15}/>
            <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>12 recenzii</div>
          </div>
        </div>

        {/* Price */}
        <div style={{ background:'linear-gradient(135deg,#f1f8f2,#e8f5e9)', border:'1.5px solid var(--border)',
          borderRadius:10, padding:'16px 18px' }}>
          {p.salePrice && (
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
              <span style={{ fontSize:13, color:'var(--text3)', textDecoration:'line-through' }}>{p.price} lei</span>
              <span style={{ background:'var(--red)', color:'white', fontSize:10, fontWeight:700,
                padding:'2px 8px', borderRadius:20 }}>-{pct}% · -{(p.price-p.salePrice).toFixed(0)} lei</span>
            </div>
          )}
          <div style={{ fontSize:30, fontWeight:800, color:'var(--g)', lineHeight:1 }}>
            {price} <span style={{ fontSize:16 }}>lei</span>
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>TVA inclus</div>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:600,
            marginTop:8, color: p.stock > 0 ? 'var(--g)' : 'var(--red)' }}>
            <Icon name="check" size={13} color="currentColor"/>
            {p.stock > 0 ? `În stoc (${p.stock} disponibile)` : 'Stoc epuizat'}
          </div>
        </div>

        {/* Qty + Add */}
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', border:'1.5px solid var(--border)',
            borderRadius:9, overflow:'hidden', background:'white' }}>
            <button onClick={() => setQty(q => Math.max(1, q-1))}
              style={{ width:38, height:46, display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', background:'none', border:'none', color:'var(--text2)' }}>
              <Icon name="minus" size={14} color="currentColor"/>
            </button>
            <span style={{ width:44, textAlign:'center', fontSize:15, fontWeight:700 }}>{qty}</span>
            <button onClick={() => setQty(q => q+1)}
              style={{ width:38, height:46, display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', background:'none', border:'none', color:'var(--text2)' }}>
              <Icon name="plus" size={14} color="currentColor"/>
            </button>
          </div>
          <button style={{ flex:1, height:46, background:'var(--g)', color:'white', border:'none',
            borderRadius:9, fontSize:14, fontWeight:700, cursor:'pointer', display:'flex',
            alignItems:'center', justifyContent:'center', gap:8, transition:'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background='var(--g2)'}
            onMouseLeave={e => e.currentTarget.style.background='var(--g)'}
            onClick={handleAdd} disabled={p.stock === 0}
            style={{ flex:1, height:46, background: p.stock > 0 ? 'var(--g)' : '#aaa',
              color:'white', border:'none', borderRadius:9, fontSize:14, fontWeight:700,
              cursor: p.stock > 0 ? 'pointer' : 'not-allowed', display:'flex',
              alignItems:'center', justifyContent:'center', gap:8 }}>
            <Icon name="cart" size={16} color="white"/>
            {p.stock > 0 ? `Adaugă · ${(price * qty).toFixed(0)} lei` : 'Stoc epuizat'}
          </button>
          <button style={{ width:46, height:46, border:`1.5px solid ${fav?'var(--red)':'var(--border)'}`,
            borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', background: fav ? '#fff5f5' : 'white', transition:'all .2s' }}
            onClick={() => setFav(v => !v)} aria-label="Adaugă la favorite">
            <Icon name="heart" size={18} color={fav ? '#e53935' : 'var(--text3)'}/>
          </button>
        </div>

        {/* Pills */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {[['truck','Livrare 1-2 zile','Prin Cargus'],['refreshCw','Retur 14 zile','Nefolosit'],
            ['shield','Original 100%','Garantat'],['package','Ambalaj cadou','Inclus']].map(([ic,t,s]) => (
            <div key={t} style={{ display:'flex', alignItems:'flex-start', gap:10,
              background:'#f8f9fa', border:'1px solid var(--border)', borderRadius:9, padding:'10px 12px' }}>
              <div style={{ width:28,height:28,background:'var(--g3)',borderRadius:7,
                display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                <Icon name={ic} size={13} color="var(--g)"/>
              </div>
              <div>
                <div style={{ fontSize:12,fontWeight:700,marginBottom:1 }}>{t}</div>
                <div style={{ fontSize:11,color:'var(--text3)' }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs - full width */}
      <div style={{ gridColumn:'1/-1', background:'white', borderRadius:12,
        border:'1.5px solid var(--border)', overflow:'hidden', marginTop:8 }}>
        <div style={{ display:'flex', borderBottom:'2px solid var(--border)' }}>
          {[['desc','Descriere'],['specs','Specificații'],['reviews','Recenzii (12)']].map(([id,lbl]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ padding:'13px 22px', fontSize:13, fontWeight:600, cursor:'pointer',
                color: tab===id ? 'var(--g)' : 'var(--text3)', background:'none', border:'none',
                borderBottom: tab===id ? '2px solid var(--g)' : '2px solid transparent',
                marginBottom:-2, transition:'all .2s' }}>
              {lbl}
            </button>
          ))}
        </div>
        <div style={{ padding:24 }}>
          {tab === 'desc' && (
            <div>
              <p style={{ fontSize:14, color:'var(--text2)', lineHeight:1.8, marginBottom:14 }}>
                {p.desc || 'Nicio descriere disponibilă.'}
              </p>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {p.tipParfum && <span className="pill p-g">{p.tipParfum}</span>}
                {p.cantitate && <span className="pill p-b">{p.cantitate}</span>}
                {p.public && <span className="pill p-gold">{p.public}</span>}
              </div>
            </div>
          )}
          {tab === 'specs' && (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <tbody>
                {[['Denumire',p.name],['Brand',p.brand],['SKU',p.sku||p.id],
                  p.ean&&['EAN/GTIN',p.ean],['Categorie',p.category],
                  p.tipParfum&&['Tip parfum',p.tipParfum],p.cantitate&&['Cantitate',p.cantitate],
                  p.public&&['Public',p.public],['Stoc',p.stock>0?`${p.stock} buc.`:'Indisponibil'],
                  ['Preț',`${p.price} lei`],p.salePrice&&['Preț promo',`${p.salePrice} lei`],
                ].filter(Boolean).map(([k,v]) => (
                  <tr key={k}>
                    <td style={{ padding:'10px 14px',fontWeight:600,fontSize:13,width:'40%',
                      borderBottom:'1px solid var(--border)' }}>{k}</td>
                    <td style={{ padding:'10px 14px',fontSize:13,color:'var(--text2)',
                      borderBottom:'1px solid var(--border)' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === 'reviews' && (
            <div>
              <div style={{ display:'flex', gap:20, marginBottom:24 }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:32, fontWeight:800 }}>4.7</div>
                  <StarRating n={5} size={16}/>
                  <div style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>12 recenzii</div>
                </div>
              </div>
              {/* Write review */}
              <div style={{ background:'#f8f9fa', border:'1.5px dashed var(--border)',
                borderRadius:10, padding:20 }}>
                <div style={{ fontWeight:700, fontSize:14, marginBottom:12 }}>Lasă o recenzie</div>
                <div style={{ display:'flex', gap:4, marginBottom:12 }}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} style={{ fontSize:28, cursor:'pointer',
                      color: n<=(hoverStar||reviewStar) ? '#f9a825' : '#ddd' }}
                      onMouseEnter={() => setHoverStar(n)}
                      onMouseLeave={() => setHoverStar(0)}
                      onClick={() => setReviewStar(n)}>★</span>
                  ))}
                </div>
                <input className="fi" placeholder="Numele tău *" value={reviewName}
                  onChange={e => setReviewName(e.target.value)} style={{ marginBottom:10 }}/>
                <textarea className="fi" rows={3} placeholder="Descrie experiența ta..."
                  value={reviewText} onChange={e => setReviewText(e.target.value)}
                  style={{ resize:'vertical', marginBottom:12 }}/>
                {reviewSent
                  ? <div style={{ color:'var(--g)', fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
                      <Icon name="check" size={14} color="var(--g)"/>Recenzie trimisă! Mulțumim.
                    </div>
                  : <button className="btn-g" onClick={() => {
                      if (reviewStar && reviewText && reviewName) setReviewSent(true);
                    }}>
                      <Icon name="check" size={14} color="white"/>Trimite recenzia
                    </button>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && imgs[activeImg] && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.88)', zIndex:1000,
          display:'flex', alignItems:'center', justifyContent:'center', animation:'fadeIn .2s' }}
          onClick={() => setLightbox(false)}>
          <div onClick={e => e.stopPropagation()} style={{ position:'relative', maxWidth:700, width:'90%' }}>
            <button onClick={() => setLightbox(false)}
              style={{ position:'absolute', top:-44, right:0, background:'rgba(255,255,255,.15)',
                border:'none', color:'white', width:36, height:36, borderRadius:'50%', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="x" size={16} color="white"/>
            </button>
            <img src={imgs[activeImg]} alt={p.name}
              style={{ width:'100%', borderRadius:12, maxHeight:'80vh', objectFit:'contain' }}/>
          </div>
        </div>
      )}
    </div>
  );
}
