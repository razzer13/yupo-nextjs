'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '../ui/Icon';

const NAV = [
  { href:'/admin', icon:'barChart', label:'Dashboard', exact:true },
  { href:'/admin/produse', icon:'package', label:'Produse' },
  { href:'/admin/comenzi', icon:'shoppingBag', label:'Comenzi' },
  { href:'/admin/import', icon:'upload', label:'Import CSV' },
  { href:'/admin/setari', icon:'settings', label:'Setări' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href, exact) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:'Inter,sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width:230, background:'#1a1a2e', flexShrink:0,
        position:'sticky', top:0, height:'100vh', overflowY:'auto',
        display:'flex', flexDirection:'column' }}>
        {/* Logo */}
        <div style={{ padding:'20px 16px 14px', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:4 }}>
            <div style={{ width:30,height:30,background:'#2e7d32',borderRadius:7,
              display:'flex',alignItems:'center',justifyContent:'center' }}>
              <Icon name="shield" size={16} color="white"/>
            </div>
            <span style={{ fontSize:18,fontWeight:800,color:'white' }}>YUPO</span>
          </div>
          <div style={{ fontSize:10,color:'rgba(255,255,255,.3)',
            textTransform:'uppercase',letterSpacing:'.12em' }}>Panou administrare</div>
        </div>

        {/* Nav */}
        <div style={{ padding:'8px 0', flex:1 }}>
          <div style={{ fontSize:9.5,color:'rgba(255,255,255,.25)',
            letterSpacing:'.14em',textTransform:'uppercase',padding:'12px 16px 5px' }}>Meniu</div>
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px',
                color: isActive(item.href, item.exact) ? 'white' : 'rgba(255,255,255,.6)',
                fontSize:13, fontWeight:500, textDecoration:'none',
                borderLeft: isActive(item.href, item.exact) ? '3px solid #66bb6a' : '3px solid transparent',
                background: isActive(item.href, item.exact) ? 'rgba(46,125,50,.22)' : 'none',
                transition:'all .2s' }}>
              <Icon name={item.icon} size={15} color="currentColor"/>{item.label}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', padding:'8px 0' }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 16px',
            color:'rgba(255,255,255,.4)', fontSize:13, textDecoration:'none', transition:'color .2s' }}>
            <Icon name="home" size={14} color="currentColor"/>Înapoi la site
          </Link>
          <Link href="/admin/setari" style={{ display:'flex', alignItems:'center', gap:10,
            padding:'10px 16px', color:'rgba(255,255,255,.4)', fontSize:13, textDecoration:'none' }}>
            <Icon name="logOut" size={14} color="currentColor"/>Deconectare
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div style={{ flex:1, background:'#f0f2f5', overflowY:'auto' }}>
        {children}
      </div>
    </div>
  );
}
