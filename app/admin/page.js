'use client';
import { useAdmin } from '../../components/admin/AdminProductsContext';
import Icon from '../../components/ui/Icon';
import Link from 'next/link';

function StatCard({ icon, value, label, change, color = 'var(--g)', href }) {
  const card = (
    <div style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:12,
      padding:20, boxShadow:'var(--shadow)', transition:'transform .2s, box-shadow .2s',
      cursor: href ? 'pointer' : 'default' }}
      onMouseEnter={e => href && (e.currentTarget.style.transform='translateY(-2px)',
        e.currentTarget.style.boxShadow='0 6px 20px rgba(0,0,0,.1)')}
      onMouseLeave={e => href && (e.currentTarget.style.transform='none',
        e.currentTarget.style.boxShadow='var(--shadow)')}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
        <div style={{ width:40,height:40,background:'var(--g3)',borderRadius:10,
          display:'flex',alignItems:'center',justifyContent:'center' }}>
          <Icon name={icon} size={20} color="var(--g)"/>
        </div>
        {change && (
          <span style={{ fontSize:11,fontWeight:700,color:'var(--g)',
            background:'var(--g3)',padding:'3px 10px',borderRadius:100 }}>{change}</span>
        )}
      </div>
      <div style={{ fontSize:24,fontWeight:800,color,marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:12,color:'var(--text2)' }}>{label}</div>
    </div>
  );
  return href ? <Link href={href} style={{ textDecoration:'none' }}>{card}</Link> : card;
}

export default function AdminDashboard() {
  const { stats, orders, products } = useAdmin();
  const recent = orders.slice(0, 8);

  const statusColor = {
    nou:'#1565c0', procesare:'#b8860b', expediat:'#4a6cf7',
    livrat:'var(--g)', anulat:'var(--red)'
  };
  const statusBg = {
    nou:'rgba(21,101,192,.1)', procesare:'rgba(249,168,37,.1)', expediat:'rgba(74,108,247,.1)',
    livrat:'var(--g3)', anulat:'rgba(229,57,53,.1)'
  };

  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:22,fontWeight:800,color:'var(--text)',marginBottom:4 }}>
          Dashboard
        </h1>
        <p style={{ fontSize:13,color:'var(--text2)' }}>
          Bun venit! Iată situația magazinului tău.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:28 }}>
        <StatCard icon="barChart" value={`${stats.revenue.toLocaleString()} lei`}
          label="Venituri totale" change="+12%" href="/admin/comenzi"/>
        <StatCard icon="shoppingBag" value={stats.ordersTotal}
          label="Comenzi totale" change="+8%" href="/admin/comenzi"/>
        <StatCard icon="package" value={`${stats.productsActive.toLocaleString()}`}
          label={`Produse active (${stats.productsTotal.toLocaleString()} total)`}
          change="Stabil" href="/admin/produse"/>
        <StatCard icon="alertCircle" value={stats.ordersNoi}
          label="Comenzi noi (neprocessate)" color="var(--red)" href="/admin/comenzi"/>
      </div>

      {/* Quick actions */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:28 }}>
        {[
          { href:'/admin/produse', icon:'plus', label:'Adaugă produs', color:'var(--g)' },
          { href:'/admin/import', icon:'upload', label:'Import CSV', color:'#1565c0' },
          { href:'/admin/comenzi', icon:'shoppingBag', label:'Procesează comenzi', color:'#e65100' },
          { href:'/admin/setari', icon:'settings', label:'Setări site', color:'#7b2fbe' },
        ].map(item => (
          <Link key={item.href} href={item.href}
            style={{ background:'white', border:'1.5px solid var(--border)', borderRadius:10,
              padding:'16px 14px', display:'flex', alignItems:'center', gap:12,
              textDecoration:'none', transition:'all .2s', boxShadow:'var(--shadow)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=item.color;
              e.currentTarget.style.background=item.color+'11'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)';
              e.currentTarget.style.background='white'; }}>
            <div style={{ width:38,height:38,background:item.color+'18',borderRadius:9,
              display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <Icon name={item.icon} size={18} color={item.color}/>
            </div>
            <span style={{ fontSize:13,fontWeight:600,color:'var(--text)' }}>{item.label}</span>
          </Link>
        ))}
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:20 }}>
        {/* Recent orders */}
        <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:12,
          padding:20,boxShadow:'var(--shadow)' }}>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',
            marginBottom:16,paddingBottom:12,borderBottom:'1px solid var(--border)' }}>
            <span style={{ fontWeight:700,fontSize:14,display:'flex',alignItems:'center',gap:8 }}>
              <Icon name="shoppingBag" size={16} color="var(--g)"/>Comenzi recente
            </span>
            <Link href="/admin/comenzi" style={{ fontSize:12,color:'var(--g)',fontWeight:600,textDecoration:'none' }}>
              Vezi toate →
            </Link>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%',borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#f8f8fc' }}>
                  {['ID','Client','Total','Status','Dată'].map(h => (
                    <th key={h} style={{ padding:'9px 12px',textAlign:'left',fontSize:10,
                      fontWeight:700,color:'var(--text2)',textTransform:'uppercase',
                      letterSpacing:'.08em',borderBottom:'1.5px solid var(--border)',
                      whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map(o => (
                  <tr key={o.id} style={{ borderBottom:'1px solid #f0f0f4' }}
                    onMouseEnter={e => e.currentTarget.style.background='#fafafe'}
                    onMouseLeave={e => e.currentTarget.style.background='white'}>
                    <td style={{ padding:'10px 12px',fontWeight:700,color:'var(--g)',fontSize:13 }}>{o.id}</td>
                    <td style={{ padding:'10px 12px',fontSize:13 }}>
                      <div style={{ fontWeight:600 }}>{o.customer}</div>
                      <div style={{ fontSize:11,color:'var(--text3)' }}>{o.city}</div>
                    </td>
                    <td style={{ padding:'10px 12px',fontWeight:700,color:'var(--g)',fontSize:13 }}>
                      {o.total} lei
                    </td>
                    <td style={{ padding:'10px 12px' }}>
                      <span style={{ fontSize:11,fontWeight:700,padding:'3px 9px',borderRadius:20,
                        background:statusBg[o.status]||'#f5f5f5',
                        color:statusColor[o.status]||'var(--text2)' }}>
                        {o.status.charAt(0).toUpperCase()+o.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding:'10px 12px',fontSize:12,color:'var(--text3)' }}>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats sidebar */}
        <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
          {/* Top categories */}
          <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:12,
            padding:18,boxShadow:'var(--shadow)' }}>
            <div style={{ fontWeight:700,fontSize:13,marginBottom:14,display:'flex',
              alignItems:'center',gap:7,paddingBottom:10,borderBottom:'1px solid var(--border)' }}>
              <Icon name="tag" size={14} color="var(--g)"/>Produse pe categorii
            </div>
            {Object.entries(
              products.reduce((acc,p) => { acc[p.category]=(acc[p.category]||0)+1; return acc; }, {})
            ).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([cat,count]) => {
              const pct = Math.round(count/products.length*100);
              return (
                <div key={cat} style={{ marginBottom:10 }}>
                  <div style={{ display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4 }}>
                    <span style={{ fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:150 }}>{cat}</span>
                    <span style={{ fontWeight:700,color:'var(--g)',flexShrink:0,marginLeft:8 }}>{count}</span>
                  </div>
                  <div style={{ background:'#f0f0f4',borderRadius:100,height:5,overflow:'hidden' }}>
                    <div style={{ background:'var(--g)',height:'100%',width:`${pct}%`,borderRadius:100 }}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order status breakdown */}
          <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:12,
            padding:18,boxShadow:'var(--shadow)' }}>
            <div style={{ fontWeight:700,fontSize:13,marginBottom:14,display:'flex',
              alignItems:'center',gap:7,paddingBottom:10,borderBottom:'1px solid var(--border)' }}>
              <Icon name="shoppingBag" size={14} color="var(--g)"/>Status comenzi
            </div>
            {Object.entries(
              orders.reduce((acc,o) => { acc[o.status]=(acc[o.status]||0)+1; return acc; }, {})
            ).map(([status,count]) => (
              <div key={status} style={{ display:'flex',justifyContent:'space-between',
                alignItems:'center',padding:'7px 0',borderBottom:'1px solid #f5f5f5',fontSize:13 }}>
                <span style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <span style={{ width:8,height:8,borderRadius:'50%',flexShrink:0,
                    background:statusColor[status]||'#aaa' }}/>
                  {status.charAt(0).toUpperCase()+status.slice(1)}
                </span>
                <span style={{ fontWeight:700,color:statusColor[status]||'var(--text)' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
