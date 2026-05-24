'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from '../ui/Icon';
import { useFeatured } from './FeaturedContext';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';
import { getDiscountPct } from '../../lib/utils';

// ─── Produs Vedeta ────────────────────────────────────────────────
export function FeaturedProductPanel() {
  const { featuredProduct: p } = useFeatured();
  const { addToCart } = useCart();
  const toast = useToast();
  const [imgErr, setImgErr] = useState(false);

  if (!p) return null;
  const pct = getDiscountPct(p.price, p.salePrice);
  const price = p.salePrice || p.price;

  return (
    <div style={{ background:'white', border:'1px solid var(--border)', borderRadius:10,
      overflow:'hidden', boxShadow:'var(--shadow)' }}>
      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,var(--g),#43a047)',
        padding:'9px 14px', display:'flex', alignItems:'center', gap:7 }}>
        <span style={{ fontSize:14 }}>⭐</span>
        <span style={{ color:'white', fontWeight:700, fontSize:12 }}>Produsul Săptămânii</span>
      </div>

      {/* Imagine */}
      <Link href={`/produs/${p.slug}`} style={{ display:'block',
        background:'#f8f9fa', height:160, overflow:'hidden', position:'relative' }}>
        {p.image && !imgErr
          ? <img src={p.image} alt={p.name}
              style={{ width:'100%', height:'100%', objectFit:'contain', padding:8 }}
              onError={() => setImgErr(true)}/>
          : <div style={{ width:'100%', height:'100%', display:'flex',
              alignItems:'center', justifyContent:'center' }}>
              <Icon name="tag" size={52} color="#c8e6c9"/>
            </div>}
        {p.salePrice && (
          <span style={{ position:'absolute', top:8, left:8, background:'var(--red)',
            color:'white', fontSize:10, fontWeight:800, padding:'3px 8px',
            borderRadius:4 }}>-{pct}%</span>
        )}
      </Link>

      {/* Info */}
      <div style={{ padding:'10px 12px' }}>
        <div style={{ fontSize:10, color:'var(--text3)', marginBottom:3,
          textTransform:'uppercase', letterSpacing:'.07em' }}>{p.brand}</div>
        <Link href={`/produs/${p.slug}`} style={{ textDecoration:'none' }}>
          <div style={{ fontSize:12.5, fontWeight:600, color:'var(--text)',
            marginBottom:7, lineHeight:1.4, display:'-webkit-box',
            WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden',
            minHeight:34 }}>{p.name}</div>
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
          <span style={{ fontSize:18, fontWeight:800, color:'var(--g)' }}>{price} lei</span>
          {p.salePrice && (
            <span style={{ fontSize:12, color:'var(--text3)', textDecoration:'line-through' }}>
              {p.price} lei
            </span>
          )}
        </div>
        <button
          onClick={() => { addToCart(p); toast?.show(`✓ ${p.name.slice(0,25)}... adăugat!`); }}
          style={{ width:'100%', background:'var(--g)', color:'white', border:'none',
            borderRadius:8, padding:'9px 0', fontSize:12, fontWeight:700,
            cursor:'pointer', display:'flex', alignItems:'center',
            justifyContent:'center', gap:6 }}>
          <Icon name="cart" size={13} color="white"/>Adaugă în coș
        </button>
      </div>
    </div>
  );
}

// ─── Newsletter Panel ─────────────────────────────────────────────
export function NewsletterPanel() {
  const { newsletterTitle, newsletterDesc, addSubscriber, subscribers, removeSubscriber } = useFeatured();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState('');

  // Verificam daca emailul curent e deja abonat (din localStorage)
  const [savedEmail, setSavedEmail] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('yupo_my_email');
    if (saved) setSavedEmail(saved);
  }, []);

  const isSubscribed = savedEmail && subscribers.some(s => s.email === savedEmail);
  const mySubscription = subscribers.find(s => s.email === savedEmail);

  const handleSubmit = () => {
    if (!email.includes('@')) { setErr('Email invalid!'); return; }
    const already = subscribers.some(s => s.email === email);
    if (already) {
      setSavedEmail(email);
      localStorage.setItem('yupo_my_email', email);
      setSubmitted(true);
      return;
    }
    addSubscriber(email, name);
    localStorage.setItem('yupo_my_email', email);
    setSavedEmail(email);
    setSubmitted(true);
  };

  const handleUnsubscribe = () => {
    if (mySubscription) {
      removeSubscriber(mySubscription.id);
      localStorage.removeItem('yupo_my_email');
      setSavedEmail('');
      setSubmitted(false);
      setEmail('');
    }
  };

  return (
    <div style={{ background:'white', border:'1px solid var(--border)', borderRadius:10,
      overflow:'hidden', boxShadow:'var(--shadow)' }}>
      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#1565c0,#1976d2)',
        padding:'9px 14px', display:'flex', alignItems:'center', gap:7 }}>
        <Icon name="mail" size={13} color="white"/>
        <span style={{ color:'white', fontWeight:700, fontSize:12 }}>Newsletter</span>
      </div>

      <div style={{ padding:'14px 12px' }}>
        {/* Deja abonat */}
        {isSubscribed ? (
          <div style={{ textAlign:'center' }}>
            <div style={{ width:44, height:44, background:'var(--g3)', borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              margin:'0 auto 10px', border:'2px solid #c8e6c9' }}>
              <Icon name="check" size={22} color="var(--g)"/>
            </div>
            <div style={{ fontWeight:700, fontSize:13, color:'var(--g)', marginBottom:5 }}>
              Ești deja abonat!
            </div>
            <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5, marginBottom:10 }}>
              {savedEmail}
            </div>
            <div style={{ background:'#fff8e1', border:'1px solid #ffe082', borderRadius:8,
              padding:'8px 12px', marginBottom:12 }}>
              <div style={{ fontSize:10, color:'#b8860b', fontWeight:700, marginBottom:3 }}>
                CODUL TĂU DE REDUCERE
              </div>
              <div style={{ fontSize:18, fontWeight:800, color:'#e65100', letterSpacing:'.1em' }}>
                YUP015
              </div>
              <div style={{ fontSize:10, color:'var(--text3)' }}>10% reducere la orice comandă</div>
            </div>
            <button onClick={handleUnsubscribe}
              style={{ background:'none', border:'1px solid rgba(229,57,53,.3)',
                color:'var(--red)', borderRadius:7, padding:'7px 14px',
                fontSize:11, fontWeight:600, cursor:'pointer', width:'100%' }}>
              Dezabonare
            </button>
          </div>
        ) : submitted ? (
          /* Tocmai s-a abonat */
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:32, marginBottom:8 }}>🎉</div>
            <div style={{ fontWeight:700, fontSize:13, color:'var(--g)', marginBottom:5 }}>
              Mulțumim că te-ai abonat!
            </div>
            <div style={{ background:'#fff8e1', border:'1px solid #ffe082', borderRadius:8,
              padding:'10px 12px', marginBottom:10 }}>
              <div style={{ fontSize:10, color:'#b8860b', fontWeight:700, marginBottom:3 }}>
                CODUL TĂU DE REDUCERE
              </div>
              <div style={{ fontSize:20, fontWeight:800, color:'#e65100', letterSpacing:'.1em' }}>
                YUP015
              </div>
              <div style={{ fontSize:10, color:'var(--text3)' }}>10% reducere la prima comandă</div>
            </div>
            <div style={{ fontSize:11, color:'var(--text3)', lineHeight:1.5 }}>
              Folosește codul la checkout!
            </div>
          </div>
        ) : (
          /* Formular abonare */
          <>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:5 }}>{newsletterTitle}</div>
            <p style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5, marginBottom:12 }}>
              {newsletterDesc}
            </p>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="Numele tău (opțional)"
              style={{ width:'100%', border:'1.5px solid var(--border)', borderRadius:8,
                padding:'8px 11px', fontSize:12, outline:'none', marginBottom:7,
                color:'var(--text)', boxSizing:'border-box' }}/>
            <input value={email} onChange={e => { setEmail(e.target.value); setErr(''); }}
              placeholder="Email-ul tău *" type="email"
              style={{ width:'100%', border:`1.5px solid ${err?'var(--red)":'var(--border)'}`,
                borderRadius:8, padding:'8px 11px', fontSize:12, outline:'none',
                marginBottom:7, color:'var(--text)', boxSizing:'border-box' }}/>
            {err && <div style={{ fontSize:11, color:'var(--red)', marginBottom:7 }}>{err}</div>}
            <button onClick={handleSubmit}
              style={{ width:'100%', background:'#1565c0', color:'white', border:'none',
                borderRadius:8, padding:'9px 0', fontSize:12, fontWeight:700,
                cursor:'pointer', display:'flex', alignItems:'center',
                justifyContent:'center', gap:6 }}>
              <Icon name="mail" size={13} color="white"/>Mă abonez + 10% reducere
            </button>
            <div style={{ fontSize:10, color:'var(--text3)', textAlign:'center', marginTop:8 }}>
              Fără spam. Te poți dezabona oricând.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
