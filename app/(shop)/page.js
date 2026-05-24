import Link from 'next/link';
import { CATEGORIES, getSaleProducts, getProductsByCategory, SITE_NAME } from '../../lib/utils';
import ProductCard from '../../components/shop/ProductCard';
import Icon from '../../components/ui/Icon';
import { FeaturedProductPanel, NewsletterPanel } from '../../components/layout/RightPanels';

export const metadata = {
  title: `${SITE_NAME} – Parfumuri Arabești Autentice & Beauty | Livrare 1-2 Zile România`,
  description: 'Cumpără parfumuri arabești originale Lattafa, Rasasi, Armaf, Khadlaj. Livrare 1-2 zile în toată România.',
};

// Iconita SVG per categorie
function CatIcon({ name, color }) {
  const icons = {
    'parfumuri-arabe':   <path d="M12 2C9 2 6 4 6 7c0 2 1 3.5 3 5l1 8h4l1-8c2-1.5 3-3 3-5 0-3-3-5-6-5zm0 2c2 0 4 1.5 4 3s-2 4-4 4-4-2-4-4 2-3 4-3z" fill={color}/>,
    'curatenie-menaj':   <path d="M20 4H4C3 4 2 5 2 6v2h20V6c0-1-1-2-2-2zM2 10v10c0 1 1 2 2 2h16c1 0 2-1 2-2V10H2zm6 8H6v-2h2v2zm0-4H6v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z" fill={color}/>,
    'cadouri-ambient':   <path d="M20 6h-2.18A3 3 0 0012 3.67 3 3 0 006.18 6H4C3 6 2 7 2 8v2c0 .74.4 1.38 1 1.72V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7.28c.6-.34 1-.98 1-1.72V8c0-1-1-2-2-2zm-8-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 8h6v2H9V8zm-5 0h3v2H4V8zm16 11H4v-7h16v7zm0-9h-3V8h3v2z" fill={color}/>,
    'ingrijire-fata':    <path d="M12 2a9 9 0 100 18A9 9 0 0012 2zm0 2c.93 0 1.82.16 2.65.45C14.25 5.55 13.17 6 12 6s-2.25-.45-2.65-1.55A7.07 7.07 0 0112 4zm-7 8c0-1.1.25-2.13.69-3.05C6.6 9.6 7.73 10 9 10c1.57 0 2.96-.68 3.93-1.75A5.96 5.96 0 0116 10c1.27 0 2.4-.4 3.31-1.05.44.92.69 1.95.69 3.05 0 3.86-3.13 7-7 7s-7-3.14-7-7z" fill={color}/>,
    'geluri-dus':        <path d="M17 8C8 10 5.9 16.17 3.82 19.34L5.71 21l1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 .71-.71C14 19 19 12 19 8h-2zm0 0c0-2.21-1.79-4-4-4S9 5.79 9 8h8z" fill={color}/>,
    'igiena-personala':  <path d="M12 2C9.24 2 7 4.24 7 7c0 1.91.99 3.58 2.48 4.56L8.79 18h6.42l-.69-6.44C15.01 10.58 16 8.91 16 7c0-2.76-2.24-5-4-5zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" fill={color}/>,
    'creme-lotiuni':     <path d="M19 3H5C4 3 3 4 3 5v14c0 1 1 2 2 2h14c1 0 2-1 2-2V5c0-1-1-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z" fill={color}/>,
    'spray-uri-corp':    <path d="M7 5h2V3H7v2zm0 14h2v-2H7v2zm10-7h2v-2h-2v2zM3 9h2V7H3v2zm14-4h2V3h-2v2zm-4 16h2v-2h-2v2zM3 17h2v-2H3v2zm0-4h2v-2H3v2zM8 21h8V9H8v12zm2-10h4v8h-4v-8z" fill={color}/>,
    'machiaj':           <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" fill={color}/>,
    'ingrijire-par':     <path d="M15.5 2c-1.84 0-3.49.63-4.78 1.67L12 5c-.96 0-1.86.23-2.65.63l1.08 1.08A5.49 5.49 0 0115.5 13c0 3.04-2.46 5.5-5.5 5.5S4.5 16.04 4.5 13c0-1.71.78-3.24 2-4.27V6.68C4.84 8 3 10.31 3 13c0 4.42 3.58 8 8 8 4.05 0 7.41-3.01 7.93-6.93C21.14 13.5 22 11.86 22 10c0-4.42-2.91-8-6.5-8z" fill={color}/>,
    'ingrijire-corp':    <path d="M19 3H5C4 3 3 4 3 5v14c0 1 1 2 2 2h14c1 0 2-1 2-2V5c0-1-1-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill={color}/>,
    'sampoane':          <path d="M18.5 2h-13C4.67 2 4 2.67 4 3.5V4h16v-.5c0-.83-.67-1.5-1.5-1.5zM4 19c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6H4v13zm8-10c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z" fill={color}/>,
    'alte-produse':      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={color} strokeWidth="2" fill="none"/>,
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
      {icons[name] || <circle cx="12" cy="12" r="8" fill={color}/>}
    </svg>
  );
}

function CategoriesMenu() {
  return (
    <div className="grad-border" style={{ width:210, flexShrink:0, background:'white',
      borderRadius:10, overflow:'hidden',
      boxShadow:'var(--shadow)', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'var(--g)', padding:'11px 14px',
        display:'flex', alignItems:'center', gap:8 }}>
        <Icon name="list" size={15} color="white"/>
        <span style={{ color:'white', fontWeight:700, fontSize:13 }}>Toate Categoriile</span>
      </div>
      <div style={{ flex:1, overflowY:'auto' }}>
        {CATEGORIES.map(cat => (
          <Link key={cat.slug} href={`/${cat.slug}`}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'8px 14px', textDecoration:'none', color:'var(--text)',
              fontSize:12, fontWeight:500, borderBottom:'1px solid #f5f5f5' }}>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <CatIcon name={cat.slug} color={cat.color || 'var(--g)'}/>
              {cat.name}
            </div>
            <Icon name="chevronRight" size={11} color="var(--text3)"/>
          </Link>
        ))}
      </div>

    </div>
  );
}

function HeroBanner() {
  return (
    <div style={{ flex:1, background:'linear-gradient(115deg,#1b5e20 0%,#2e7d32 50%,#388e3c 100%)',
      borderRadius:10, padding:'36px 32px', position:'relative',
      overflow:'hidden', display:'flex', alignItems:'center' }}>
      <div style={{ position:'absolute', top:-50, right:-50, width:250, height:250,
        borderRadius:'50%', background:'rgba(255,255,255,.06)' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:7,
          background:'#f9a825', borderRadius:100, padding:'5px 14px',
          fontSize:11, fontWeight:700, color:'#333', marginBottom:18 }}>
          🌟 OFERTĂ EXCLUSIVĂ
        </div>
        <h1 style={{ fontSize:32, fontWeight:800, color:'white', lineHeight:1.2, marginBottom:12 }}>
          Parfumuri Arabești<br/>Autentice
        </h1>
        <p style={{ color:'rgba(255,255,255,.82)', fontSize:14, lineHeight:1.6, marginBottom:24 }}>
          Esențe rare din Orient, livrate rapid în România
        </p>
        <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
          <Link href="/parfumuri-arabe"
            style={{ background:'white', color:'var(--g)', borderRadius:9,
              padding:'11px 24px', fontSize:14, fontWeight:800, textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:7 }}>
            <Icon name="tag" size={14} color="var(--g)"/>Vezi Oferta →
          </Link>
          <div style={{ background:'rgba(255,255,255,.15)', border:'1.5px solid rgba(255,255,255,.3)',
            borderRadius:9, padding:'10px 16px', display:'inline-flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:12, color:'rgba(255,255,255,.7)' }}>cod:</span>
            <span style={{ fontSize:14, fontWeight:800, color:'white', letterSpacing:'.08em' }}>YUP015</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div style={{ width:210, flexShrink:0, display:'flex', flexDirection:'column', gap:10 }}>
      <FeaturedProductPanel/>
      <NewsletterPanel/>
    </div>
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
          <div style={{ width:34, height:34, background:'var(--g3)', borderRadius:9,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon name={icon} size={17} color="var(--g)"/>
          </div>
          <div>
            <div style={{ fontSize:12.5, fontWeight:700 }}>{title}</div>
            <div style={{ fontSize:11, color:'var(--text3)' }}>{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ title, emoji, href, color='var(--g)' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
      marginBottom:14, paddingBottom:10, borderBottom:`2px solid ${color}` }}>
      <span style={{ fontWeight:700, fontSize:15, color, display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ width:3, height:17, background:color, borderRadius:2, display:'inline-block' }}/>
        {emoji && <span style={{ fontSize:17 }}>{emoji}</span>}
        {title}
      </span>
      <Link href={href} style={{ color, fontSize:12, fontWeight:600,
        textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
        Vezi toate <Icon name="chevronRight" size={12} color="currentColor"/>
      </Link>
    </div>
  );
}

function CategoriesGrid() {
  return (
    <section style={{ marginBottom:28 }}>
      <SectionHeader title="Categorii principale" emoji="🗂️" href="/categorii"/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10 }}>
        {CATEGORIES.slice(0, 6).map(cat => (
          <Link key={cat.slug} href={`/${cat.slug}`}
            style={{ textDecoration:'none', background:'white',
              border:'1.5px solid var(--border)', borderRadius:10,
              overflow:'hidden', boxShadow:'var(--shadow)', display:'block' }}>
            <div style={{ background:cat.bg, height:80, display:'flex',
              alignItems:'center', justifyContent:'center' }}>
              <Icon name="tag" size={34} color={cat.color || 'var(--g)'}/>
            </div>
            <div style={{ padding:'7px 8px 9px', fontSize:11.5, fontWeight:600,
              color:'var(--text)', textAlign:'center', lineHeight:1.3 }}>
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductSection({ title, emoji, products, seeAllHref, color='var(--g)' }) {
  if (!products?.length) return null;
  return (
    <section style={{ marginBottom:28 }}>
      <SectionHeader title={title} emoji={emoji} href={seeAllHref} color={color}/>
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
      <div style={{ display:'flex', gap:12, marginBottom:18, alignItems:'stretch', minHeight:380 }}>
        <CategoriesMenu/>
        <HeroBanner/>
        <RightPanel/>
      </div>
      <PromoStrip/>
      <CategoriesGrid/>
      <ProductSection title="Parfumuri Arabe" emoji="🌹"
        products={parfumuri} seeAllHref="/parfumuri-arabe"/>
      {reduceri.length > 0 && (
        <ProductSection title="Reduceri speciale" emoji="🔥"
          products={reduceri} seeAllHref="/reduceri" color="var(--red)"/>
      )}
      <ProductSection title="Cadouri și Ambient" emoji="🎁"
        products={cadouri} seeAllHref="/cadouri-ambient"/>
      <ProductSection title="Curățenie și Menaj" emoji="✨"
        products={curatenie} seeAllHref="/curatenie-menaj"/>
    </div>
  );
}
