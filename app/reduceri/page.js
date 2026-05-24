import { getSaleProducts } from '../../lib/utils';
import ProductCard from '../../components/shop/ProductCard';
import Icon from '../../components/ui/Icon';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LeftSidebar from '../../components/layout/LeftSidebar';
import Providers from '../../components/layout/Providers';
import Link from 'next/link';

export const metadata = {
  title: 'Reduceri Parfumuri & Cosmetice | Oferte speciale',
  description: 'Parfumuri arabești și cosmetice premium la prețuri reduse. Reduceri de până la 50% la produse originale Lattafa, Rasasi, Armaf.',
};

export default function ReduceriPage() {
  const products = getSaleProducts();
  return (
    <Providers>
      <Header/>
      <div className="page-layout">
        <LeftSidebar/>
        <main className="main-content">
          <div className="anim">
            <nav className="bc"><Link href="/">Acasă</Link><span className="sep">›</span><span className="current">Reduceri</span></nav>
            <div style={{ background:'linear-gradient(115deg,var(--red),#c62828)', borderRadius:12,
              height:120, display:'flex', alignItems:'center', padding:'0 28px', marginBottom:14 }}>
              <div>
                <h1 style={{ fontSize:22,fontWeight:800,color:'white',marginBottom:4,display:'flex',alignItems:'center',gap:10 }}>
                  🔥 Reduceri speciale
                </h1>
                <p style={{ fontSize:13,color:'rgba(255,255,255,.8)' }}>{products.length} produse cu reducere</p>
              </div>
            </div>
            <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </Providers>
  );
}
