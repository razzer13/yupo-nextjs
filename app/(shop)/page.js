import Link from 'next/link';
import { CATEGORIES, getFeaturedProducts, getSaleProducts, getProductsByCategory, SITE_NAME } from '../../lib/utils';
import ProductCard from '../../components/shop/ProductCard';
import Icon from '../../components/ui/Icon';

export const metadata = {
  title: `${SITE_NAME} – Parfumuri Arabești Autentice & Beauty | Livrare 1-2 Zile România`,
  description: 'Cumpără parfumuri arabești originale Lattafa, Rasasi, Armaf, Khadlaj la prețuri competitive. Cosmetice și produse de îngrijire premium. Livrare 1-2 zile în toată România.',
};

function HeroSection() {
  return (
    <div style={{ background:'linear-gradient(115deg,#1b5e20 0%,#2e7d32 45%,#388e3c 75%,#4caf50 100%)',
      borderRadius:12, padding:'44px 40px', marginBottom:14, position:'relative', overflow:'hidden',
      display:'flex', alignItems:'center', minHeight:240 }}>
      <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300,
        borderRadius:'50%', background:'rgba(255,255,255,.06)' }}/>
      <div style={{ position:'relative', zIndex:1, maxWidth:480 }}>
        <div style={{ background:'rgba(255,255,255,.15)', borderRadius:100, padding:'5px 14px',
          fontSize:11, fontWeight:700, color:'rgba(255,255,255,.9)', letterSpacing:'.08em',
          textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:6, marginBottom:16 }}>
          🌹 Colecție exclusivă
        </div>
        <h1 style={{ fontSize:32, fontWeight:800, color:'white', lineHeight:1.2, marginBottom:12 }}>
          Parfumuri Arabești<br/>Autentice în România
        </h1>
        <p style={{ color:'rgba(255,255,255,.8)', fontSize:14, lineHeight:1.7, marginBottom:20 }}>
          Lattafa, Rasasi, Armaf, Khadlaj și multe altele. 1000+ produse originale, livrare 1-2 zile.
        </p>
        <div style={{ display:'flex', gap:10 }}>
          <Link href="/parfumuri-arabe" style={{ background:'white', color:'var(--g)', borderRadius:9,
            padding:'11px 22px', fontSize:14, fontWeight:800, display:'flex', alignItems:'center', gap:7,
            textDecoration:'none' }}>
            <Icon name="tag" size={15} color="var(--g)"/>Descoperă parfumuri
          </Link>
          <Link href="/reduceri" style={{ background:'rgba(255,255,255,.15)', color:'white',
            border:'1.5px solid rgba(255,255,255,.3)', borderRadius:9, padding:'10px 18px',
            fontSize:14, fontWeight:600, textDecoration:'none' }}>
            Reduceri 🔥
          </Link>
        </div>
      </div>
    </div>
  );
}

function PromoStrip() {
  const items = [
    { icon:'truck', t:'Livrare 1-2 zile', s:'Prin Cargus în toată România' },
    { icon:'refreshCw', t:'Retur 14 zile', s:'Produse nefolosite' },
    { icon:'shield', t:'100% Autentic', s:'Produse originale garantate' },
    { icon:'gift', t:'Ambalaj cadou', s:'Inclus gratuit' },
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
      {items.map(({ icon, t, s }) => (
        <div key={t} style={{ background:'white', border:'1px solid var(--border)', borderRadius:9,
          padding:'11px 13px', display:'flex', alignItems:'center', gap:10, boxShadow:'var(--shadow)' }}>
          <div style={{ width:34,height:34,background:'var(--g3)',borderRadius:8,display:'flex',
            alignItems:'center',justifyContent:'center',flexShrink:0 }}>
            <Icon name={icon} size={17} color="var(--g)"/>
          </div>
          <div>
            <div style={{ fontSize:12,fontWeight:700,marginBottom:1 }}>{t}</div>
            <div style={{ fontSize:11,color:'var(--text3)' }}>{s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoriesSection() {
  return (
    <section className="section">
      <div className="sec-hdr">
        <span className="sec-title">
          <span className="sec-bar"/>
          <Icon name="grid" size={16} color="var(--g)"/>Categorii principale
        </span>
        <Link href="/categorii" className="see-all">
          Toate <Icon name="chevronRight" size={12} color="currentColor"/>
        </Link>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10 }}>
        {CATEGORIES.slice(0, 6).map(cat => (
          <Link key={cat.slug} href={`/${cat.slug}`}
            style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:9,
              overflow:'hidden', textAlign:'center', textDecoration:'none',
              transition:'all .22s', boxShadow:'var(--shadow)' }}
            className="cat-card-link">
            <div style={{ background:cat.bg, height:90, display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:40 }}>
              {cat.icon}
            </div>
            <div style={{ padding:'8px 6px 10px', fontSize:11.5, fontWeight:600, color:'var(--text)', lineHeight:1.3 }}>
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

async function ProductSection({ title, icon, products, seeAllHref, color = 'var(--g)' }) {
  if (!products.length) return null;
  return (
    <section className="section">
      <div className="sec-hdr" style={{ borderBottomColor: color }}>
        <span className="sec-title">
          <span className="sec-bar" style={{ background: color }}/>
          <span style={{ fontSize:18 }}>{icon}</span>
          <span style={{ color }}>{title}</span>
        </span>
        <Link href={seeAllHref} className="see-all" style={{ color }}>
          Vezi toate <Icon name="chevronRight" size={12} color="currentColor"/>
        </Link>
      </div>
      <div className="products-grid">
        {products.slice(0, 5).map(p => (
          <ProductCard key={p.id} product={p}/>
        ))}
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
    <div className="anim">
      <HeroSection/>
      <PromoStrip/>
      <CategoriesSection/>

      <ProductSection
        title="Parfumuri Arabe" icon="🌹"
        products={parfumuri} seeAllHref="/parfumuri-arabe"/>

      {reduceri.length > 0 && (
        <ProductSection
          title="Reduceri speciale" icon="🔥"
          products={reduceri} seeAllHref="/reduceri"
          color="var(--red)"/>
      )}

      <ProductSection
        title="Cadouri & Ambient" icon="🎁"
        products={cadouri} seeAllHref="/cadouri-ambient"/>

      <ProductSection
        title="Curățenie & Menaj" icon="✨"
        products={curatenie} seeAllHref="/curatenie-menaj"/>
    </div>
  );
}
