import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Providers from '../../components/layout/Providers';
import Link from 'next/link';

export const metadata = {
  title: 'Politica de Livrare · YUPO Beauty',
  description: '1-2 zile prin Cargus',
};

export default function Page() {
  return (
    <Providers>
      <Header/>
      <main style={{ maxWidth:900, margin:'0 auto', padding:'24px 14px 60px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--text3)', marginBottom:20 }}>
          <Link href="/" style={{ color:'var(--text3)' }}>Acasă</Link>
          <span>›</span><span style={{ color:'var(--text)', fontWeight:600 }}>Politica de Livrare</span>
        </nav>
        <div style={{ background:'linear-gradient(135deg,#1b5e20,#2e7d32)', borderRadius:14,
          padding:'40px 44px', marginBottom:24 }}>
          <h1 style={{ fontSize:28, fontWeight:800, color:'white', marginBottom:8 }}>Politica de Livrare</h1>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.75)' }}>1-2 zile prin Cargus</p>
        </div>
        <div style={{ background:'white', borderRadius:12, padding:32, boxShadow:'var(--shadow)',
          border:'1.5px solid var(--border)', fontSize:14, color:'var(--text2)', lineHeight:1.85 }}>
          <p>Pagina <strong>Politica de Livrare</strong> — conținut complet disponibil în curând.</p>
          <p style={{ marginTop:16 }}>Contact: <a href="mailto:contact@yupo.ro" style={{ color:'var(--g)', fontWeight:600 }}>contact@yupo.ro</a> | <a href="tel:+40787301034" style={{ color:'var(--g)', fontWeight:600 }}>0787 301 034</a></p>
        </div>
      </main>
      <Footer/>
    </Providers>
  );
}
