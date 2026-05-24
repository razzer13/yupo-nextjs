import Link from 'next/link';
import { CATEGORIES, getSaleProducts, getProductsByCategory, SITE_NAME } from '../../lib/utils';
import ProductCard from '../../components/shop/ProductCard';
import Icon from '../../components/ui/Icon';

export const metadata = {
  title: `${SITE_NAME} – Parfumuri Arabești Autentice & Beauty | Livrare 1-2 Zile România`,
  description: 'Cumpără parfumuri arabești originale Lattafa, Rasasi, Armaf, Khadlaj. Livrare 1-2 zile în toată România.',
};

function CategoriesMenu() {
  const cats = CATEGORIES.slice(0, 9);
  return (
    <div style={{ width:210, flexShrink:0, background:'white',
      border:'1px solid var(--border)', borderRadius:10, overflow:'hidden',
      boxShadow:'var(--shadow)', alignSelf:'flex-start' }}>
      <div style={{ background:'var(--g)', padding:'11px 14px',
        display:'flex', alignItems:'center', gap:8 }}>
        <Icon name="list" size={15} color="white"/>
        <span style={{ color:'white', fontWeight:700, fontSize:13 }}>Toate Categoriile</span>
      </div>
      {cats.map(cat => (
        <Link key={cat.slug} href={`/${cat.slug}`}
          style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'8px 14px', textDecoration:'none', color:'var(--text)',
            fontSize:12, fontWeight:500, borderBottom:'1px solid #f5f5f5' }}>
          <div style={{ display:'flex', alignItems:'center', gap:9 }}>
            <Icon name="tag" size={13} color={cat.color || 'var(--g)'}/>
            {cat.name}
          </div>
          <Icon name="chevronRight" size={11} color="var(--text3)"/>
        </Link>
      ))}
      <Link href="/categorii"
        style={{ display:'flex', alignItems:'center', justifyContent:'center',
          padding:'9px 14px', textDecoration:'none', color:'var(--g)',
          fontSize:12, fontWeight:700, background:'var(--g3)',
          borderTop:'1px solid var(--border)' }}>
        Vezi toate →
      </Link>
    </div>
  );
}

function HeroBanner() {
  return (
    <div style={{ flex:1, background:'linear-gradient(115deg,#1b5e20 0%,#2e7d32 50%,#388e3c 100%)',
      borderRadius:10, padding:'36px 32px', position:'relative',
      overflow:'hidden', display:'flex', alignItems:'center', minHeight:320 }}>
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
  const saleProducts = getSaleProducts(3);
  return (
    <div style={{ width:200, flexShrink:0, display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ background:'white', border:'1px solid var(--border)', borderRadius:10,
        padding:14, boxShadow:'var(--shadow)' }}>
        <div style={{ fontWeight:700, fontSize:13, marginBottom:12,
          display:'flex', alignItems:'center', gap:7 }}>
          <Icon name="user" size={15} color="var(--g)"/>Bună ziua, Vizitator
        </div>
        {[
          { icon:'truck', text:'Livrare Rapidă' },
          { icon:'phone', text:'+40 787 301 034' },
          { icon:'shield', text:'Plată Securizată' },
          { icon:'refreshCw', text:'Retur Garantat' },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display:'flex', alignItems:'center', gap:8,
            fontSize:12, color:'var(--text2)', marginBottom:7 }}>
            <Icon name={icon} size={12} color="var(--g)"/>{text}
          </div>
        ))}
        <p style={{ fontSize:11, color:'var(--text3)', margin:'10px 0 12px',
          lineHeight:1.5, borderTop:'1px solid var(--border)', paddingTop:10 }}>
          Autentifică-te pentru a salva favoritele și istoricul comenzilor.
        </p>
        <div style={{ display:'flex', gap:7 }}>
          <Link href="/auth"
            style={{ flex:1, border:'1.5px solid var(--g)', color:'var(--g)',
              borderRadius:8, padding:'8px 0', fontSize:11, fontWeight:700,
              textDecoration:'none', display:'flex', alignItems:'center',
              justifyContent:'center', gap:4 }}>
            <Icon name="user" size={11} color="currentColor"/>Autentificare
          </Link>
          <Link href="/auth?tab=register"
            style={{ flex:1, background:'var(--g)', color:'white', borderRadius:8,
              padding:'8px 0', fontSize:11, fontWeight:700, textDecoration:'none',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
            <Icon name="plus" size={11} color="white"/>Cont Nou
          </Link>
        </div>
      </div>
      {saleProducts.length > 0 && (
        <div style={{ background:'white', border:'1px solid var(--border)', borderRadius:10,
          overflow:'hidden', boxShadow:'var(--shadow)' }}>
          <div style={{ background:'var(--red)', padding:'8px 12px',
            display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:13 }}>🔥</span>
            <span style={{ color:'white', fontWeight:700, fontSize:12 }}>Oferte Flash</span>
          </div>
          {saleProducts.map(p => (
            <Link key={p.id} href={`/produs/${p.slug}`}
              style={{ display:'flex', gap:9, padding:'9px 11px',
                textDecoration:'none', borderBottom:'1px solid #f5f5f5' }}>
              <div style={{ width:40, height:40, borderRadius:7, background:'#f5f5f5',
                border:'1px solid var(--border)', overflow:'hidden', flexShrink:0 }}>
                {p.image && <img src={p.image} alt={p.name}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}/>}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:11, fontWeight:500, color:'var(--text)',
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                  maxWidth:120, marginBottom:3 }}>{p.name}</div>
                <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                  <span style={{ fontSize:12, fontWeight:800, color:'var(--red)' }}>
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
      <div style={{ display:'flex', gap:12, marginBottom:18, alignItems:'flex-start' }}>
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
