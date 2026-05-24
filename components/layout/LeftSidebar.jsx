'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../ui/Icon';
import { CATEGORIES } from '../../lib/utils';

const items = [
  { href:'/', icon:'home', label:'Acasă' },
  ...CATEGORIES.map(c => ({ href:`/${c.slug}`, icon:'tag', label:c.name.split(' ')[0], emoji:c.icon })),
  { href:'/reduceri', icon:'percent', label:'Reduceri', red:true },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <nav className="left-sidebar" aria-label="Categorii">
      {items.slice(0, 14).map((item, i) => (
        <Link key={i} href={item.href}
          className={`sb-btn${pathname === item.href ? ' active' : ''}${item.red ? ' red' : ''}`}
          title={item.label}>
          {item.emoji
            ? <span style={{ fontSize:20, lineHeight:1 }}>{item.emoji}</span>
            : <Icon name={item.icon} size={20} color="currentColor"/>}
          <span className="sb-lbl">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
