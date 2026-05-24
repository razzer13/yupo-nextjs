import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, getCategoryBySlug, getProductsByCategory, generateCategoryMeta } from '../../../lib/utils';
import { PRODUCTS } from '../../../lib/products';
import ProductCard from '../../../components/shop/ProductCard';
import Icon from '../../../components/ui/Icon';

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: 'Pagina negăsită' };
  return {
    ...generateCategoryMeta(cat),
    alternates: { canonical: `https://yupo.ro/${cat.slug}` },
  };
}

export default function CategoryPage({ params, searchParams }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const sort = searchParams?.sort || 'default';
  const page = parseInt(searchParams?.page || '1');
  const PER_PAGE = 20;

  let products = getProductsByCategory(params.slug);

  if (sort === 'pret-asc') products = [...products].sort((a,b) => (a.salePrice||a.price)-(b.salePrice||b.price));
  else if (sort === 'pret-desc') products = [...products].sort((a,b) => (b.salePrice||b.price)-(a.salePrice||a.price));
  else if (sort === 'nume') products = [...products].sort((a,b) => a.name.localeCompare(b.name, 'ro'));
  else if (sort === 'reducere') products = [...products].filter(p => p.salePrice)
    .sort((a,b) => ((b.price-b.salePrice)/b.price)-((a.price-a.salePrice)/a.price));

  const total = products.length;
  const totalPages = Math.ceil(total / PER_PAGE);
  const paginated = products.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const allBrands = [...new Set(products.map(p=>p.brand).filter(Boolean))].sort();

  return (
    <div className="anim">
      {/* Breadcrumb */}
      <nav className="bc" aria-label="Breadcrumb">
        <Link href="/">Acasă</Link>
        <span className="sep">›</span>
        <span className="current">{cat.name}</span>
      </nav>

      {/* Banner */}
      <div style={{ background:`linear-gradient(115deg,${cat.color}22,${cat.color}55)`,
        borderRadius:12, height:120, display:'flex', alignItems:'center', padding:'0 28px',
        marginBottom:14, border:`1.5px solid ${cat.color}33` }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, marginBottom:4, display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:32 }}>{cat.icon}</span>{cat.name}
          </h1>
          <p style={{ fontSize:13, color:'var(--text2)' }}>{total} produse disponibile</p>
        </div>
      </div>

      {/* SEO description */}
      {cat.desc && (
        <p style={{ fontSize:13, color:'var(--text2)', marginBottom:14, lineHeight:1.7,
          background:'white', padding:'12px 16px', borderRadius:9, border:'1px solid var(--border)' }}>
          {cat.desc}
        </p>
      )}

      <div className="cat-page-layout">
        {/* Filters sidebar */}
        <aside className="filter-col" aria-label="Filtre">
          <div className="filter-section">
            <div className="filter-sec-title">Brand ({allBrands.length})</div>
            <div style={{ maxHeight:200, overflowY:'auto' }}>
              {allBrands.slice(0,20).map(b => (
                <label key={b} className="filter-check">
                  <input type="checkbox"/>
                  {b}
                  <span style={{ marginLeft:'auto', fontSize:10, color:'var(--text3)' }}>
                    ({products.filter(p=>p.brand===b).length})
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <div className="filter-sec-title">Disponibilitate</div>
            <label className="filter-check"><input type="checkbox"/>În stoc</label>
            <label className="filter-check"><input type="checkbox"/>Cu reducere</label>
          </div>
          <div className="filter-section">
            <div className="filter-sec-title">Preț (lei)</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
              <input className="fi" placeholder="Min" style={{ padding:'8px 10px' }}/>
              <input className="fi" placeholder="Max" style={{ padding:'8px 10px' }}/>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div>
          {/* Sort bar */}
          <div className="sort-bar">
            <span style={{ fontSize:13, color:'var(--text2)' }}>
              <strong style={{ color:'var(--text)' }}>{total}</strong> produse
            </span>
            <form style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
              <label style={{ fontSize:12, color:'var(--text2)' }}>Sortare:</label>
              <select name="sort" defaultValue={sort} className="sort-sel"
                onChange={e => window.location.search = `?sort=${e.target.value}`}>
                <option value="default">Implicit</option>
                <option value="pret-asc">Preț crescător</option>
                <option value="pret-desc">Preț descrescător</option>
                <option value="nume">Alfabetic</option>
                <option value="reducere">Reducere maximă</option>
              </select>
            </form>
          </div>

          {/* Grid */}
          <div className="products-grid">
            {paginated.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>

          {total === 0 && (
            <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text3)' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
              <div style={{ fontWeight:600, fontSize:16 }}>Niciun produs în această categorie</div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav style={{ display:'flex', gap:6, justifyContent:'center', marginTop:24 }}
              aria-label="Paginare">
              {Array.from({ length:Math.min(totalPages, 7) }, (_,i) => i+1).map(p => (
                <Link key={p} href={`/${params.slug}?sort=${sort}&page=${p}`}
                  style={{ width:36, height:36, borderRadius:8, border:'1.5px solid',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:13, fontWeight:600, textDecoration:'none',
                    borderColor: page===p ? 'var(--g)' : 'var(--border)',
                    background: page===p ? 'var(--g)' : 'white',
                    color: page===p ? 'white' : 'var(--text)' }}>
                  {p}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
