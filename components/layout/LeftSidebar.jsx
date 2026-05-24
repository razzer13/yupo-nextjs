'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../ui/Icon';

// Bara stanga - doar items de baza pentru toti
// Comenzi apare doar daca e admin logat
const BASE_ITEMS = [
  { href:'/', icon:'home', label:'Acasă' },
  { href:'/categorii', icon:'grid', label:'Categorii' },
  { href:'/produse', icon:'package', label:'Produse' },
  { href:'/reduceri', icon:'percent', label:'Reduceri', red:true },
  { href:'/dropshipping', icon:'truck', label:'Dropship' },
];

const ADMIN_ITEMS = [
  { href:'/admin', icon:'settings', label:'Admin', admin:true },
];

export default function LeftSidebar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificam daca e admin din localStorage
    const adminLoggedIn = localStorage.getItem('yupo_admin') === 'true';
    setIsAdmin(adminLoggedIn);
  }, []);

  const items = isAdmin ? [...BASE_ITEMS, ...ADMIN_ITEMS] : BASE_ITEMS;

  return (
    <nav style={{
      width:72, flexShrink:0, background:'white',
      borderRight:'1px solid var(--border)',
      display:'flex', flexDirection:'column',
      position:'sticky', top:62,
      height:'calc(100vh - 62px)',
      overflowY:'auto', overflowX:'hidden',
      padding:'8px 0', gap:2,
    }} aria-label="Navigare principală">
      {items.map((item, i) => {
        const active = item.href === '/'
          ? pathname === '/'
          : pathname.startsWith(item.href);
        return (
          <Link key={i} href={item.href}
            title={item.label}
            style={{
              display:'flex', flexDirection:'column',
              alignItems:'center', gap:4,
              padding:'10px 4px',
              color: item.admin ? 'white' :
                     item.red ? (active ? 'white' : 'var(--red)') :
                     active ? 'var(--g)' : 'var(--text3)',
              fontSize:10, fontWeight:500,
              textDecoration:'none',
              transition:'all .18s',
              borderLeft: active ? `3px solid ${item.red?'var(--red)':item.admin?'#7b2fbe':'var(--g)'}` : '3px solid transparent',
              background: item.admin ? 'linear-gradient(135deg,#7b2fbe,#9c27b0)' :
                          item.red && active ? 'rgba(229,57,53,.1)' :
                          active ? 'var(--g3)' : 'none',
              borderRadius: item.admin ? '0 8px 8px 0' : 0,
              margin: item.admin ? '4px 4px 4px 0' : 0,
            }}>
            <Icon name={item.icon} size={22} color="currentColor"/>
            <span style={{ fontSize:9.5, textAlign:'center', lineHeight:1.2, maxWidth:60 }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
