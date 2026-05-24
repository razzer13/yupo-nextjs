'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from '../ui/Icon';
import { CATEGORIES } from '../../lib/utils';
import { SUBCATEGORIES } from '../../lib/subcategories';

export default function CategoriesMenuClient() {
  const [hoveredCat, setHoveredCat] = useState(null);

  const hovered = CATEGORIES.find(c => c.slug === hoveredCat);
  const subcats = hoveredCat ? (SUBCATEGORIES[hoveredCat] || []) : [];

  return (
    <div style={{ width:210, flexShrink:0, position:'relative', alignSelf:'flex-start' }}
      onMouseLeave={() => setHoveredCat(null)}>

      {/* Menu principal */}
      <div className="grad-border" style={{ background:'white', borderRadius:10,
        overflow:'hidden', boxShadow:'var(--shadow)', display:'flex', flexDirection:'column' }}>
        <div style={{ background:'var(--g)', padding:'11px 14px',
          display:'flex', alignItems:'center', gap:8 }}>
          <Icon name="list" size={15} color="white"/>
          <span style={{ color:'white', fontWeight:700, fontSize:13 }}>Toate Categoriile</span>
        </div>
        {CATEGORIES.map(cat => (
          <div key={cat.slug}
            onMouseEnter={() => setHoveredCat(cat.slug)}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'8px 14px', color:'var(--text)',
              fontSize:12, fontWeight:500, borderBottom:'1px solid #f5f5f5',
              cursor:'pointer', transition:'all .15s',
              background: hoveredCat === cat.slug ? 'var(--g3)' : 'white' }}>
            <Link href={`/${cat.slug}`}
              style={{ display:'flex', alignItems:'center', gap:9, flex:1,
                textDecoration:'none', color:'inherit' }}>
              <CatIconSvg slug={cat.slug} color={hoveredCat===cat.slug ? 'var(--g)' : (cat.color||'var(--g)')}/>
              <span style={{ color: hoveredCat===cat.slug ? 'var(--g)' : 'var(--text)' }}>
                {cat.name}
              </span>
            </Link>
            {SUBCATEGORIES[cat.slug]?.length > 0 && (
              <Icon name="chevronRight" size={11}
                color={hoveredCat===cat.slug ? 'var(--g)' : 'var(--text3)'}/>
            )}
          </div>
        ))}
      </div>

      {/* Dropdown panel subcategorii */}
      {hoveredCat && subcats.length > 0 && (
        <div style={{ position:'absolute', left:'100%', top:0, width:560,
          background:'white', borderRadius:10, boxShadow:'0 8px 32px rgba(0,0,0,.15)',
          border:'1.5px solid var(--border)', zIndex:100, padding:20,
          animation:'fadeIn .15s ease', marginLeft:4 }}>

          {/* Titlu categorie */}
          <div style={{ fontWeight:800, fontSize:14, color:'var(--g)',
            marginBottom:14, paddingBottom:10, borderBottom:'2px solid var(--g)',
            display:'flex', alignItems:'center', gap:8 }}>
            <Icon name="tag" size={15} color="var(--g)"/>
            {hovered?.name}
          </div>

          {/* Grid subcategorii */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:16 }}>
            {subcats.map(sub => (
              <Link key={sub.slug} href={`/${hoveredCat}?sub=${sub.slug}`}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px',
                  borderRadius:8, border:'1px solid var(--border)', textDecoration:'none',
                  color:'var(--text)', fontSize:12, fontWeight:500, background:'#fafafa',
                  transition:'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--g3)'; e.currentTarget.style.borderColor='var(--g)'; e.currentTarget.style.color='var(--g)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#fafafa'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text)'; }}>
                <span style={{ fontSize:16 }}>{sub.icon}</span>
                {sub.name}
              </Link>
            ))}
          </div>

          {/* Banner categorie */}
          <Link href={`/${hoveredCat}`}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              background:`linear-gradient(115deg, ${hovered?.color}22, ${hovered?.color}44)`,
              border:`1px solid ${hovered?.color}33`, borderRadius:9,
              padding:'12px 16px', textDecoration:'none' }}>
            <div>
              <div style={{ fontWeight:800, fontSize:14, color:'var(--text)', marginBottom:4 }}>
                {hovered?.name}
              </div>
              <div style={{ fontSize:12, color:'var(--text2)' }}>
                Descoperă toate produsele din această categorie
              </div>
            </div>
            <div style={{ background:'var(--g)', color:'white', borderRadius:8,
              padding:'8px 16px', fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>
              Vezi toate →
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

// Iconite SVG per categorie
function CatIconSvg({ slug, color }) {
  const paths = {
    'parfumuri-arabe':   'M12 2C9 2 6 4 6 7c0 2 1 3.5 3 5l1 8h4l1-8c2-1.5 3-3 3-5 0-3-3-5-6-5zm0 2c2 0 4 1.5 4 3s-2 4-4 4-4-2-4-4 2-3 4-3z',
    'curatenie-menaj':  'M20 4H4C3 4 2 5 2 6v2h20V6c0-1-1-2-2-2zM2 10v10c0 1 1 2 2 2h16c1 0 2-1 2-2V10H2zm6 8H6v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z',
    'cadouri-ambient':  'M20 6h-2.18A3 3 0 0012 4a3 3 0 00-5.82 2H4C3 6 2 7 2 8v2c0 .74.4 1.38 1 1.72V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7.28c.6-.34 1-.98 1-1.72V8c0-1-1-2-2-2z',
    'ingrijire-fata':   'M12 2a9 9 0 100 18A9 9 0 0012 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 12c-2.67 0-5-1.33-5-3 0-1.68 2.33-3 5-3s5 1.32 5 3c0 1.67-2.33 3-5 3z',
    'geluri-dus':       'M17 8C8 10 5.9 16.17 3.82 19.34L5.71 21l1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 .71-.71C14 19 19 12 19 8h-2z',
    'igiena-personala': 'M12 2C9.24 2 7 4.24 7 7c0 1.91.99 3.58 2.48 4.56L8.79 18h6.42l-.69-6.44C15.01 10.58 16 8.91 16 7c0-2.76-2.24-5-4-5z',
    'creme-lotiuni':    'M19 3H5C4 3 3 4 3 5v14c0 1 1 2 2 2h14c1 0 2-1 2-2V5c0-1-1-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
    'spray-uri-corp':   'M7 5h2V3H7v2zm0 14h2v-2H7v2zm10-7h2v-2h-2v2zM3 9h2V7H3v2zm14-4h2V3h-2v2zm-4 16h2v-2h-2v2zM3 17h2v-2H3v2zm0-4h2v-2H3v2zM8 21h8V9H8v12zm2-10h4v8h-4v-8z',
    'machiaj':          'M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3z',
    'ingrijire-par':    'M15.5 2c-1.84 0-3.49.63-4.78 1.67L12 5c-.96 0-1.86.23-2.65.63l1.08 1.08A5.49 5.49 0 0115.5 13c0 3.04-2.46 5.5-5.5 5.5S4.5 16.04 4.5 13c0-1.71.78-3.24 2-4.27V6.68C4.84 8 3 10.31 3 13c0 4.42 3.58 8 8 8z',
    'ingrijire-corp':   'M19 3H5C4 3 3 4 3 5v14c0 1 1 2 2 2h14c1 0 2-1 2-2V5c0-1-1-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
    'sampoane':         'M18.5 2h-13C4.67 2 4 2.67 4 3.5V4h16v-.5c0-.83-.67-1.5-1.5-1.5zM4 19c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6H4v13z',
  };
  const d = paths[slug];
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
      {d ? <path d={d} fill={color}/> : <circle cx="12" cy="12" r="8" fill={color}/>}
    </svg>
  );
}
