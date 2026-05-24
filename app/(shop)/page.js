import Link from 'next/link';
import { CATEGORIES, getFeaturedProducts, getSaleProducts, getProductsByCategory, SITE_NAME } from '../../lib/utils';
import { PRODUCTS } from '../../lib/products';
import ProductCard from '../../components/shop/ProductCard';
import Icon from '../../components/ui/Icon';

export const metadata = {
  title: `${SITE_NAME} – Parfumuri Arabești Autentice & Beauty | Livrare 1-2 Zile România`,
  description: 'Cumpără parfumuri arabești originale Lattafa, Rasasi, Armaf, Khadlaj la prețuri competitive. Livrare 1-2 zile în toată România.',
};

// ─── Categories menu left panel ────────────────────────────────────
function CategoriesMenu() {
  return (
    <div style={{ width:230, flexShrink:0, background:'white',
      border:'1px solid var(--border)', borderRadius:10, overflow:'hidden',
      height:'fit-content', boxShadow:'var(--shadow)' }}>
      <div style={{ background:'var(--g)', padding:'12px 16px',
        display:'flex', alignItems:'center', gap:8 }}>
        <Icon name="list" size={16} color="white"/>
        <span style={{ color:'white', fontWeight:700, fontSize:14 }}>Toate Categoriile</span>
      </div>
      {CATEGORIES.map(cat => (
        <Link key={cat.slug} href={`/${cat.slug}`}
          style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'10px 16px', textDecoration:'none', color:'var(--text)',
            fontSize:13, fontWeight:500, borderBottom:'1px solid #f5f5f5',
            transition:'all .15s' }}
          onMouseEnter={e => { e.currentTarget.style.background='var(--g3)'; e.currentTarget.style.color='var(--g)'; e.currentTarget.style.paddingLeft='20px'; }}
          onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='var(--text)'; e.currentTarget.style.paddingLeft='16px'; }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:16 }}>{cat.icon}</span>
            {cat.name}
          </div>
          <Icon name="chevronRight" size={12} color="var(--text3)"/>
        </Link>
      ))}
    </div>
  );
}

// ─── Hero Banner ───────────────────────────────────────────────────
function HeroBanner() {
  return (
    <div style={{ flex:1, background:'linear-gradient(115deg,#1b5e20 0%,#2e7d32 45%,#388e3c 100%)',
      borderRadius:10, padding:'40px 36px', position:'relative',
      overflow:'hidden', minHeight:280, display:'flex', alignItems:'center' }}>
      {/* Decorative circles */}
      <div style={{ position:'absolute', top:-50, right:-50, width:260, height:260,
        borderRadius:'50%', background:'rgba(255,255,255,.06)' }}/>
      <div style={{ position:'absolute', bottom:-30, right:80, width:160, height:160,
        borderRadius:'50%', background:'rgba(255,255,255,.04)' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:7,
          background:'#f9a825', borderRadius:100, padding:'5px 14px',
          fontSize:11, fontWeight:700, color:'#333', marginBottom:16 }}>
          🌟 OFERTĂ EXCLUSIVĂ
        </div>
        <h1 style={{ fontSize:34, fontWeight:800, color:'white',
          lineHeight:1.2, marginBottom:12 }}>
          Parfumuri Arabești<br/>Autentice
        </h1>
        <p style={{ color:'rgba(255,255,255,.8)', fontSize:14,
          lineHeight:1.6, marginBottom:24 }}>
          Esențe rare din Orient, livrate rapid în România
        </p>
        <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/parfumuri-arabe" style={{ background:'white', color:'var(--g)',
            borderRadius:9, padding:'11px 24px', fontSize:14, fontWeight:800,
            textDecoration:'none', display:'flex', alignItems:'center', gap:7 }}>
            <Icon name="tag" size={15} color="var(--g)"/>Vezi Oferta →
          </Link>
          <div style={{ background:'rgba(255,255,255,.15)', border:'1.5px solid rgba(255,255,255,.3)',
            borderRadius:9, padding:'10px 16px', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:12, color:'rgba(255,255,255,.7)' }}>cod:</span>
            <span style={{ fontSize:14, fontWeight:800, color:'white',
              letterSpacing:'.08em' }}>YUP015</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Right Panel ───────────────────────────────────────────────────
function RightPanel() {
  const saleProducts = getSaleProducts(3);
  return (
    <div style={{ width:220, flexShrink:0, display:'flex', flexDirection:'column', gap:12 }}>
      {/* User greeting */}
      <div style={{ background:'white', border:'1px solid var(--border)', borderRadius:10,
        padding:16, boxShadow:'var(--shadow)' }}>
        <div style={{ fontWeight:700, fontSize:13, marginBottom:14,
          display:'flex', alignItems:'center', gap:8, color:'var(--text)' }}>
          <Icon name="user" size={16} color="var(--g)"/>Bună ziua, Vizitator
        </div>
        {[
          { icon:'truck', text:'Livrare Rapidă' },
          { icon:'phone', text:'+40 787 301 034' },
          { icon:'shield', text:'Plată Securizată' },
          { icon:'refreshCw', text:'Retur Garantat' },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display:'flex', alignItems:'center', gap:8,
            fontSize:12, color:'var(--text2)', marginBottom:8 }}>
            <Icon name={icon} size={13} color="var(--g)"/>{text}
          </div>
        ))}
        <div style={{ fontSize:11, color:'var(--text3)', margin:'12px 0 14px',
          lineHeight:1.5, borderTop:'1px solid var(--border)', paddingTop:12 }}>
          Autentifică-te pentru a salva favoritele și istoricul comenzilor.
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Link href="/auth" style={{ flex:1, border:'1.5px solid var(--g)', color:'var(--g)',
            borderRadius:8, padding:'9px 0', fontSize:12, fontWeight:700,
            textDecoration:'none', display:'flex', alignItems:'center',
            justifyContent:'center', gap:5, transition:'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--g3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='none'; }}>
            <Icon name="user" size={12} color="currentColor"/>Autentificare
          </Link>
          <Link href="/auth?tab=register" style={{ flex:1, background:'var(--g)', color:'white',
            borderRadius:8, padding:'9px 0', fontSize:12, fontWeight:700,
            textDecoration:'none', display:'flex', alignItems:'center',
            justifyContent:'center', gap:5 }}>
            <Icon name="plus" size={12} color="white"/>Cont Nou
          </Link>
        </div>
      </div>

      {/* Flash deals */}
      {saleProducts.length > 0 && (
        <div style={{ background:'white', border:'1px solid var(--border)', borderRadius:10,
          overflow:'hidden', boxShadow:'var(--shadow)' }}>
          <div style={{ background:'var(--red)', padding:'9px 14px',
            display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ fontSize:14 }}>🔥</span>
            <span style={{ color:'white', fontWeight:700, fontSize:13 }}>Oferte Flash</span>
          </div>
          {saleProducts.map(p => (
            <Link key={p.id} href={`/produs/${p.slug}`}
              style={{ display:'flex', gap:10, padding:'10px 12px',
                textDecoration:'none', borderBottom:'1px solid #f5f5f5',
                transition:'background .15s' }}
              onMouseEnter={e => e.currentTarget.style.background='#fafafa'}
              onMouseLeave={e => e.currentTarget.style.background='white'}>
              <div style={{ width:44, height:44, borderRadius:7, background:'#f5f5f5',
                border:'1px solid var(--border)', overflow:'hidden', flexShrink:0 }}>
                {p.image && <img src={p.image} alt={p.name}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}/>}
              </div>
              <div>
                <div style={{ fontSize:11, fontWeight:500, color:'var(--text)',
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                  maxWidth:130, marginBottom:3 }}>{p.name}</div>
                <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                  <span style={{ fontSize:13, fontWeight:800, color:'var(--red)' }}>
                    {p.salePrice} lei
                  </span>
                  <span style={{ fontSize:10, color:'var(--text3)', textDecoration:'line-through' }}>
                    {p.price} lei
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Categories Grid ───────────────────────────────────────────────
function CategoriesGrid() {
  return (
    <section style={{ marginBottom:28 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        marginBottom:14, paddingBottom:10,
        borderBottom:'2px solid var(--g)' }}>
        <span style={{ fontWeight:700, fontSize:15, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ width:3, height:17, background:'var(--g)', borderRadius:2, display:'inline-block' }}/>
          <Icon name="grid" size={16} color="var(--g)"/>Categorii principale
        </span>
        <Link href="/categorii" style={{ color:'var(--g)', fontSize:12,
          fontWeight:600, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
          Vezi toate <Icon name="chevronRight" size={12} color="currentColor"/>
        </Link>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }}>
        {CATEGORIES.slice(0, 5).map(cat => (
          <Link key={cat.slug} href={`/${cat.slug}`}
            style={{ textDecoration:'none', background:'white',
              border:'1.5px solid var(--border)', borderRadius:10, overflow:'hidden',
              transition:'all .22s', boxShadow:'var(--shadow)', display:'block' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=cat.color; e.currentTarget.style.boxShadow='0 6px 18px rgba(0,0,0,.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='var(--shadow)'; }}>
            <div style={{ background:cat.bg, height:90, display:'flex',
              alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:42 }}>{cat.icon}</span>
            </div>
            <div style={{ padding:'8px 10px 10px', fontSize:12, fontWeight:600,
              color:'var(--text)', textAlign:'center', lineHeight:1.3 }}>
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PromoStrip() {
  const items = [
    { icon:'truck', title:'Livrare rapidă', sub:'Gratuit peste 250 lei' },
    { icon:'refreshCw', title:'Retur gratuit', sub:'30 de zile' },
    { icon:'shield', title:'Plată securizată', sub:'SSL certificat' },
    { icon:'phone', title:'Suport 24/7', sub:'0800 000 000' },
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:24 }}>
      {items.map(({ icon, title, sub }) => (
        <div key={title} style={{ background:'white', border:'1px solid var(--border)',
          borderRadius:9, padding:'12px 14px', display:'flex', alignItems:'center',
          gap:12, boxShadow:'var(--shadow)' }}>
          <div style={{ width:36, height:36, background:'var(--g3)', borderRadius:9,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon name={icon} size={18} color="var(--g)"/>
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:700 }}>{title}</div>
            <div style={{ fontSize:11, color:'var(--text3)' }}>{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductSection({ title, icon, emoji, products, seeAllHref, color='var(--g)' }) {
  if (!products?.length) return null;
  return (
    <section style={{ marginBottom:28 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        marginBottom:14, paddingBottom:10, borderBottom:`2px solid ${color}` }}>
        <span style={{ fontWeight:700, fontSize:15, color, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ width:3, height:17, background:color, borderRadius:2, display:'inline-block' }}/>
          {emoji && <span style={{ fontSize:18 }}>{emoji}</span>}
          {icon && <Icon name={icon} size={16} color={color}/>}
          {title}
        </span>
        <Link href={seeAllHref} style={{ color, fontSize:12, fontWeight:600,
          textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
          Vezi toate <Icon name="chevronRight" size={12} color="currentColor"/>
        </Link>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }}>
        {products.slice(0, 5).map(p => <ProductCard key={p.id} product={p}/>)}
      </div>
    </section>
  );
}

export default function HomePage() {
  const parfumuri = getProductsByCategory('parfumuri-arabe', 5);
  const reduceri = getSaleProducts(5);
  const curatenie = getProductsByCategory('curatenie-menaj', 5);
  const cadouri = getProductsByCategory('cadouri-ambient', 5);

  return (
    <div style={{ animation:'fadeIn .28s ease' }}>
      {/* Top section: Categories menu + Hero + Right panel */}
      <div style={{ display:'flex', gap:14, marginBottom:18, alignItems:'flex-start' }}>
        <CategoriesMenu/>
        <HeroBanner/>
        <RightPanel/>
      </div>

      {/* Promo strip */}
      <PromoStrip/>

      {/* Categories grid */}
      <CategoriesGrid/>

      {/* Product sections */}
      <ProductSection title="Parfumuri Arabe" emoji="🌹"
        products={parfumuri} seeAllHref="/parfumuri-arabe"/>

      {reduceri.length > 0 && (
        <ProductSection title="Reduceri speciale" emoji="🔥"
          products={reduceri} seeAllHref="/reduceri" color="var(--red)"/>
      )}

      <ProductSection title="Cadouri & Ambient" emoji="🎁"
        products={cadouri} seeAllHref="/cadouri-ambient"/>

      <ProductSection title="Curățenie & Menaj" emoji="✨"
        products={curatenie} seeAllHref="/curatenie-menaj"/>
    </div>
  );
}
