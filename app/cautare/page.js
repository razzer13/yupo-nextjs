import { Suspense } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Providers from '../../components/layout/Providers';
import LeftSidebar from '../../components/layout/LeftSidebar';
import ProductCard from '../../components/shop/ProductCard';
import { searchProducts } from '../../lib/utils';
import Link from 'next/link';

export function generateMetadata({ searchParams }) {
  const q = searchParams?.q || '';
  return {
    title: q ? `Rezultate pentru "${q}" | YUPO Beauty` : 'Căutare | YUPO Beauty',
    description: `Rezultate căutare pentru ${q} pe YUPO Beauty.`,
  };
}

export default function SearchPage({ searchParams }) {
  const q = searchParams?.q || '';
  const results = q ? searchProducts(q) : [];

  return (
    <Providers>
      <Header/>
      <div className="page-layout">
        <LeftSidebar/>
        <main className="main-content">
          <div className="anim">
            <nav className="bc">
              <Link href="/">Acasă</Link><span className="sep">›</span>
              <span className="current">Căutare{q ? `: "${q}"` : ''}</span>
            </nav>
            <div style={{ background:'white', borderRadius:12, padding:'18px 22px',
              marginBottom:14, border:'1.5px solid var(--border)', boxShadow:'var(--shadow)' }}>
              <h1 style={{ fontSize:18, fontWeight:800, marginBottom:4 }}>
                {q ? `Rezultate pentru "${q}"` : 'Caută produse'}
              </h1>
              <p style={{ fontSize:13, color:'var(--text2)' }}>
                {q ? `${results.length} produse găsite` : 'Introdu un termen de căutare'}
              </p>
            </div>
            {results.length > 0
              ? <div className="products-grid">
                  {results.map(p => <ProductCard key={p.id} product={p}/>)}
                </div>
              : q && (
                <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text3)' }}>
                  <div style={{ fontSize:48, marginBottom:12 }}>😔</div>
                  <div style={{ fontWeight:600, fontSize:16, marginBottom:8 }}>
                    Niciun rezultat pentru "{q}"
                  </div>
                  <p style={{ fontSize:13 }}>Încearcă alte cuvinte cheie sau navighează prin categorii</p>
                </div>
              )}
          </div>
        </main>
      </div>
      <Footer/>
    </Providers>
  );
}
