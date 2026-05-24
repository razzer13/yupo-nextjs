import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', background:'#f0f2f5', fontFamily:'Inter,sans-serif', textAlign:'center', padding:20 }}>
      <div style={{ fontSize:80, marginBottom:16 }}>🔍</div>
      <h1 style={{ fontSize:32, fontWeight:800, color:'#1a1a2e', marginBottom:8 }}>Pagina nu a fost găsită</h1>
      <p style={{ fontSize:16, color:'#5a5a72', marginBottom:28, lineHeight:1.6 }}>
        Pagina pe care o cauți nu există sau a fost mutată.
      </p>
      <div style={{ display:'flex', gap:12 }}>
        <Link href="/" style={{ background:'#2e7d32', color:'white', borderRadius:9,
          padding:'12px 24px', fontSize:14, fontWeight:700, textDecoration:'none' }}>
          ← Înapoi acasă
        </Link>
        <Link href="/cautare" style={{ background:'none', border:'1.5px solid #e0e0e0',
          color:'#5a5a72', borderRadius:9, padding:'11px 22px', fontSize:14, fontWeight:600, textDecoration:'none' }}>
          Caută produse
        </Link>
      </div>
    </div>
  );
}
