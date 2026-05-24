'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '../ui/Icon';
import { useCart } from './CartContext';

const PROMOS = [
  { code:'YUPO15', type:'percent', value:15, minOrder:100 },
  { code:'WELCOME30', type:'fixed', value:30, minOrder:150 },
];

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promo, setPromo] = useState(null);
  const [promoErr, setPromoErr] = useState('');
  const router = useRouter();

  if (!cartOpen) return null;

  const disc = promo ? (promo.type === 'percent' ? Math.round(cartTotal * promo.value / 100) : promo.value) : 0;
  const shipping = cartTotal >= 250 ? 0 : 10;
  const total = cartTotal - disc + shipping;

  const applyPromo = () => {
    const p = PROMOS.find(x => x.code === promoCode.toUpperCase().trim() && cartTotal >= x.minOrder);
    if (!p) { setPromoErr('Cod invalid sau comandă minimă neîndeplinită.'); return; }
    setPromo(p); setPromoErr('');
  };

  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)}/>
      <div className="cart-drawer" role="dialog" aria-label="Coș cumpărături">
        {/* Header */}
        <div className="cart-hdr">
          <span style={{ fontWeight:700, fontSize:15, display:'flex', alignItems:'center', gap:8 }}>
            <Icon name="cart" size={17} color="white"/>
            Coșul meu ({cart.reduce((s,i)=>s+i.qty,0)} produse)
          </span>
          <button style={{ background:'rgba(255,255,255,.18)', border:'none', color:'white',
            width:30, height:30, borderRadius:7, cursor:'pointer', display:'flex',
            alignItems:'center', justifyContent:'center' }}
            onClick={() => setCartOpen(false)} aria-label="Închide coș">
            <Icon name="x" size={16} color="white"/>
          </button>
        </div>

        {/* Items */}
        <div className="cart-body">
          {cart.length === 0
            ? <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text3)' }}>
                <Icon name="cart" size={48} color="#ddd" style={{ display:'block', margin:'0 auto 12px' }}/>
                <div style={{ fontWeight:600 }}>Coșul este gol</div>
                <button onClick={() => setCartOpen(false)} className="btn-g" style={{ marginTop:16 }}>
                  Continuă cumpărăturile
                </button>
              </div>
            : cart.map(item => (
              <div key={item.id} style={{ display:'flex', gap:11, padding:'12px 0',
                borderBottom:'1px solid var(--border)', alignItems:'flex-start' }}>
                <Link href={`/produs/${item.slug}`} onClick={() => setCartOpen(false)}
                  style={{ width:58, height:58, borderRadius:9, border:'1px solid var(--border)',
                    background:'#f5f5f5', overflow:'hidden', flexShrink:0, display:'block' }}>
                  {item.image
                    ? <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    : <Icon name="tag" size={24} color="#c8e6c9"/>}
                </Link>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12.5, fontWeight:600, marginBottom:4, overflow:'hidden',
                    textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.name}</div>
                  <div style={{ fontSize:15, fontWeight:800, color:'var(--g)', marginBottom:6 }}>
                    {((item.salePrice || item.price) * item.qty).toFixed(0)} lei
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <button style={{ width:25, height:25, borderRadius:6, border:'1.5px solid var(--border)',
                      background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center',
                      cursor:'pointer' }} onClick={() => updateQty(item.id, -1)}>
                      <Icon name="minus" size={11} color="var(--text2)"/>
                    </button>
                    <span style={{ fontSize:13, fontWeight:700, minWidth:22, textAlign:'center' }}>{item.qty}</span>
                    <button style={{ width:25, height:25, borderRadius:6, border:'1.5px solid var(--border)',
                      background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center',
                      cursor:'pointer' }} onClick={() => updateQty(item.id, 1)}>
                      <Icon name="plus" size={11} color="var(--text2)"/>
                    </button>
                  </div>
                </div>
                <button style={{ background:'none', border:'none', color:'var(--text3)',
                  cursor:'pointer', padding:4 }} onClick={() => removeFromCart(item.id)}
                  aria-label="Șterge produs">
                  <Icon name="x" size={14} color="currentColor"/>
                </button>
              </div>
            ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {cartTotal < 250 && (
              <div style={{ background:'var(--g3)', borderRadius:8, padding:'8px 12px',
                fontSize:12, fontWeight:600, color:'var(--g)', display:'flex',
                alignItems:'center', gap:6, marginBottom:10 }}>
                <Icon name="truck" size={13} color="var(--g)"/>
                Mai adaugă {(250 - cartTotal).toFixed(0)} lei pentru livrare gratuită
              </div>
            )}
            <div style={{ display:'flex', gap:7, marginBottom:10 }}>
              <input style={{ flex:1, border:'1.5px solid var(--border)', borderRadius:8,
                padding:'8px 12px', fontSize:12.5, outline:'none', color:'var(--text)' }}
                placeholder="Cod promoțional" value={promoCode}
                onChange={e => { setPromoCode(e.target.value); setPromoErr(''); }}/>
              <button style={{ background:'var(--g)', color:'white', border:'none', borderRadius:8,
                padding:'8px 14px', fontSize:12, fontWeight:700, cursor:'pointer' }}
                onClick={applyPromo}>Aplică</button>
            </div>
            {promoErr && <div style={{ fontSize:11, color:'var(--red)', marginBottom:8 }}>{promoErr}</div>}
            {promo && <div style={{ fontSize:11, color:'var(--g)', marginBottom:8 }}>✓ Cod aplicat: -{disc} lei</div>}

            {[
              ['Subtotal', `${cartTotal.toFixed(0)} lei`, false],
              disc > 0 && ['Reducere', `-${disc} lei`, 'red'],
              ['Livrare', shipping === 0 ? 'Gratuită 🎉' : `${shipping} lei`, shipping === 0 ? 'green' : false],
            ].filter(Boolean).map(([label, val, color]) => (
              <div key={label} style={{ display:'flex', justifyContent:'space-between',
                fontSize:13, color: color === 'red' ? 'var(--red)' : color === 'green' ? 'var(--g)' : 'var(--text2)',
                marginBottom:5 }}>
                <span>{label}</span><span>{val}</span>
              </div>
            ))}

            <div style={{ display:'flex', justifyContent:'space-between', fontSize:16,
              fontWeight:800, borderTop:'2px solid var(--border)', paddingTop:9, marginTop:6 }}>
              <span>Total</span>
              <span style={{ color:'var(--g)' }}>{total.toFixed(0)} lei</span>
            </div>

            <button className="checkout-btn" onClick={() => { setCartOpen(false); router.push('/checkout'); }}>
              <Icon name="lock" size={15} color="#333"/>Finalizează comanda
            </button>
          </div>
        )}
      </div>
    </>
  );
}
