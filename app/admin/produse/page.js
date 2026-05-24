'use client';
import { useState, useMemo } from 'react';
import { useAdmin } from '../../../components/admin/AdminProductsContext';
import Icon from '../../../components/ui/Icon';
import { CATEGORIES } from '../../../lib/utils';

function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || {
    name:'', sku:'', ean:'', brand:'', category: CATEGORIES[0]?.name || '',
    price:'', salePrice:'', stock:'', desc:'', image:'', active:true, badge:'',
  });
  const f = k => e => setForm(v => ({ ...v, [k]: e.target.type==='checkbox' ? e.target.checked : e.target.value }));

  return (
    <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.45)',zIndex:900,
      display:'flex',alignItems:'center',justifyContent:'center',padding:20 }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:'white',borderRadius:14,
        padding:28,width:'100%',maxWidth:640,maxHeight:'90vh',overflowY:'auto',
        boxShadow:'0 20px 60px rgba(0,0,0,.22)' }}>
        <div style={{ fontWeight:800,fontSize:17,marginBottom:20,display:'flex',
          alignItems:'center',gap:9,paddingBottom:14,borderBottom:'1px solid var(--border)' }}>
          <Icon name={product ? 'edit' : 'plus'} size={18} color="var(--g)"/>
          {product ? 'Editează produs' : 'Produs nou'}
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
          {/* Name - full width */}
          <div style={{ gridColumn:'1/-1' }}>
            <label style={{ fontSize:10,fontWeight:700,color:'var(--text2)',
              textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:5 }}>
              Nume produs *
            </label>
            <input value={form.name} onChange={f('name')}
              style={{ width:'100%',border:'1.5px solid var(--border)',borderRadius:9,
                padding:'10px 13px',fontSize:13,outline:'none',color:'var(--text)' }}
              placeholder="ex: Lattafa Oud Mood 100ml"/>
          </div>

          {[
            ['sku','SKU','ex: LAT-001'],['ean','EAN/GTIN','ex: 6291107456485'],
            ['brand','Brand *','ex: Lattafa'],['price','Preț (lei) *','ex: 115'],
            ['salePrice','Preț promo','ex: 89'],['stock','Stoc *','ex: 25'],
          ].map(([key,label,ph]) => (
            <div key={key}>
              <label style={{ fontSize:10,fontWeight:700,color:'var(--text2)',
                textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:5 }}>{label}</label>
              <input value={form[key]||''} onChange={f(key)}
                style={{ width:'100%',border:'1.5px solid var(--border)',borderRadius:9,
                  padding:'10px 13px',fontSize:13,outline:'none',color:'var(--text)' }}
                placeholder={ph} type={['price','salePrice','stock'].includes(key)?'number':'text'}/>
            </div>
          ))}

          <div>
            <label style={{ fontSize:10,fontWeight:700,color:'var(--text2)',
              textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:5 }}>Categorie</label>
            <select value={form.category} onChange={f('category')}
              style={{ width:'100%',border:'1.5px solid var(--border)',borderRadius:9,
                padding:'10px 13px',fontSize:13,outline:'none',background:'white',cursor:'pointer' }}>
              {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize:10,fontWeight:700,color:'var(--text2)',
              textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:5 }}>Badge</label>
            <select value={form.badge||''} onChange={f('badge')}
              style={{ width:'100%',border:'1.5px solid var(--border)',borderRadius:9,
                padding:'10px 13px',fontSize:13,outline:'none',background:'white',cursor:'pointer' }}>
              <option value="">Fără badge</option>
              <option value="nou">NOU</option>
              <option value="top">TOP</option>
              <option value="sale">SALE</option>
            </select>
          </div>

          <div style={{ gridColumn:'1/-1' }}>
            <label style={{ fontSize:10,fontWeight:700,color:'var(--text2)',
              textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:5 }}>URL Imagine</label>
            <input value={form.image||''} onChange={f('image')}
              style={{ width:'100%',border:'1.5px solid var(--border)',borderRadius:9,
                padding:'10px 13px',fontSize:13,outline:'none',color:'var(--text)' }}
              placeholder="https://exemplu.com/imagine.jpg"/>
          </div>

          <div style={{ gridColumn:'1/-1' }}>
            <label style={{ fontSize:10,fontWeight:700,color:'var(--text2)',
              textTransform:'uppercase',letterSpacing:'.08em',display:'block',marginBottom:5 }}>Descriere</label>
            <textarea value={form.desc||''} onChange={f('desc')} rows={3}
              style={{ width:'100%',border:'1.5px solid var(--border)',borderRadius:9,
                padding:'10px 13px',fontSize:13,outline:'none',resize:'vertical',fontFamily:'Inter,sans-serif' }}
              placeholder="Descriere produs..."/>
          </div>

          <div style={{ gridColumn:'1/-1' }}>
            <label style={{ display:'flex',alignItems:'center',gap:10,cursor:'pointer',fontSize:13 }}>
              <input type="checkbox" checked={form.active} onChange={f('active')}
                style={{ accentColor:'var(--g)',width:16,height:16 }}/>
              <span style={{ fontWeight:600 }}>Produs activ (vizibil în magazin)</span>
            </label>
          </div>
        </div>

        <div style={{ display:'flex',gap:10,marginTop:20,paddingTop:16,borderTop:'1px solid var(--border)' }}>
          <button onClick={() => onSave(form)}
            style={{ flex:1,background:'var(--g)',color:'white',border:'none',borderRadius:9,
              padding:12,fontSize:13,fontWeight:700,cursor:'pointer',display:'flex',
              alignItems:'center',justifyContent:'center',gap:7 }}>
            <Icon name="check" size={14} color="white"/>
            {product ? 'Salvează modificările' : 'Adaugă produs'}
          </button>
          <button onClick={onClose}
            style={{ background:'none',border:'1.5px solid var(--border)',color:'var(--text)',
              borderRadius:9,padding:'10px 20px',fontSize:13,fontWeight:600,cursor:'pointer' }}>
            Anulează
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProduseAdmin() {
  const { products, addProduct, updateProduct, deleteProduct, toggleProduct } = useAdmin();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | product object
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState(null);
  const PER_PAGE = 25;

  const showToast = (msg, ok=true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = useMemo(() => {
    let list = products;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
    }
    if (catFilter) list = list.filter(p => p.category === catFilter);
    return list;
  }, [products, search, catFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const handleSave = (form) => {
    const data = {
      ...form,
      price: parseFloat(form.price) || 0,
      salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
      stock: parseInt(form.stock) || 0,
    };
    if (modal === 'add') { addProduct(data); showToast('Produs adăugat!'); }
    else { updateProduct(form.id, data); showToast('Produs salvat!'); }
    setModal(null);
  };

  return (
    <div style={{ padding:'28px 32px' }}>
      {/* Header */}
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22 }}>
        <div>
          <h1 style={{ fontSize:22,fontWeight:800,marginBottom:4 }}>
            Produse ({products.length.toLocaleString()})
          </h1>
          <p style={{ fontSize:13,color:'var(--text2)' }}>
            {products.filter(p=>p.active).length.toLocaleString()} active · {products.filter(p=>!p.active).length} inactive
          </p>
        </div>
        <button onClick={() => setModal('add')}
          style={{ background:'var(--g)',color:'white',border:'none',borderRadius:9,
            padding:'11px 22px',fontSize:13,fontWeight:700,cursor:'pointer',
            display:'flex',alignItems:'center',gap:7 }}>
          <Icon name="plus" size={15} color="white"/>Adaugă produs
        </button>
      </div>

      {/* Filters */}
      <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:10,
        padding:'14px 16px',marginBottom:16,display:'flex',gap:12,alignItems:'center',
        flexWrap:'wrap',boxShadow:'var(--shadow)' }}>
        <div style={{ position:'relative',flex:1,minWidth:200 }}>
          <div style={{ position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',
            pointerEvents:'none' }}>
            <Icon name="search" size={14} color="var(--text3)"/>
          </div>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Caută după nume, SKU sau brand..."
            style={{ width:'100%',border:'1.5px solid var(--border)',borderRadius:8,
              padding:'9px 12px 9px 34px',fontSize:13,outline:'none',color:'var(--text)' }}/>
        </div>
        <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }}
          style={{ border:'1.5px solid var(--border)',borderRadius:8,padding:'9px 14px',
            fontSize:13,outline:'none',background:'white',cursor:'pointer',minWidth:180 }}>
          <option value="">Toate categoriile</option>
          {CATEGORIES.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
        <span style={{ fontSize:13,color:'var(--text3)',flexShrink:0 }}>
          {filtered.length.toLocaleString()} rezultate
        </span>
        {(search || catFilter) && (
          <button onClick={() => { setSearch(''); setCatFilter(''); setPage(1); }}
            style={{ fontSize:12,color:'var(--red)',background:'none',border:'none',
              cursor:'pointer',display:'flex',alignItems:'center',gap:4,flexShrink:0 }}>
            <Icon name="x" size={12} color="currentColor"/>Resetează
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:12,
        overflow:'hidden',boxShadow:'var(--shadow)' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#f8f8fc' }}>
                {['Produs','Categorie','Brand','Preț','Promo','Stoc','Activ','Acțiuni'].map(h => (
                  <th key={h} style={{ padding:'11px 14px',textAlign:'left',fontSize:10,
                    fontWeight:700,color:'var(--text2)',textTransform:'uppercase',
                    letterSpacing:'.08em',borderBottom:'1.5px solid var(--border)',
                    whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(p => (
                <tr key={p.id} style={{ borderBottom:'1px solid #f0f0f4' }}
                  onMouseEnter={e => e.currentTarget.style.background='#fafafe'}
                  onMouseLeave={e => e.currentTarget.style.background='white'}>
                  <td style={{ padding:'10px 14px' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                      <div style={{ width:40,height:40,borderRadius:8,background:'var(--g3)',
                        border:'1px solid var(--border)',overflow:'hidden',flexShrink:0,
                        display:'flex',alignItems:'center',justifyContent:'center' }}>
                        {p.image
                          ? <img src={p.image} alt={p.name} style={{ width:'100%',height:'100%',objectFit:'cover' }}
                              onError={e => { e.target.style.display='none'; }}/>
                          : <Icon name="tag" size={16} color="var(--g)"/>}
                      </div>
                      <div style={{ minWidth:0 }}>
                        <div style={{ fontWeight:600,fontSize:12,maxWidth:220,overflow:'hidden',
                          textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{p.name}</div>
                        <div style={{ fontSize:10,color:'var(--text3)',fontFamily:'monospace' }}>
                          SKU: {p.sku || p.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:'10px 14px',fontSize:12,color:'var(--text2)',
                    maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                    {p.category}
                  </td>
                  <td style={{ padding:'10px 14px',fontSize:12,color:'var(--text2)',whiteSpace:'nowrap' }}>
                    {p.brand}
                  </td>
                  <td style={{ padding:'10px 14px',fontWeight:700,color:'var(--g)',
                    fontSize:13,whiteSpace:'nowrap' }}>
                    {p.price} lei
                  </td>
                  <td style={{ padding:'10px 14px',whiteSpace:'nowrap' }}>
                    {p.salePrice
                      ? <span style={{ fontWeight:700,color:'var(--red)',fontSize:13 }}>{p.salePrice} lei</span>
                      : <span style={{ color:'var(--text3)' }}>—</span>}
                  </td>
                  <td style={{ padding:'10px 14px' }}>
                    <span style={{ fontWeight:700,fontSize:13,
                      color: p.stock === 0 ? 'var(--red)' : p.stock < 10 ? 'var(--gold)' : 'var(--g)' }}>
                      {p.stock}
                    </span>
                  </td>
                  <td style={{ padding:'10px 14px' }}>
                    <button onClick={() => toggleProduct(p.id)}
                      style={{ width:38,height:20,borderRadius:10,border:'none',cursor:'pointer',
                        position:'relative',transition:'background .25s',flexShrink:0,
                        background: p.active ? 'var(--g)' : '#ccc' }}>
                      <span style={{ position:'absolute',top:2,width:16,height:16,borderRadius:'50%',
                        background:'white',transition:'left .25s',boxShadow:'0 1px 3px rgba(0,0,0,.2)',
                        left: p.active ? '20px' : '2px' }}/>
                    </button>
                  </td>
                  <td style={{ padding:'10px 14px' }}>
                    <div style={{ display:'flex',gap:5 }}>
                      <button onClick={() => setModal(p)}
                        style={{ background:'rgba(46,125,50,.1)',border:'1px solid rgba(46,125,50,.2)',
                          color:'var(--g)',borderRadius:6,padding:'5px 10px',fontSize:11,
                          fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:4 }}>
                        <Icon name="edit" size={11} color="currentColor"/>Edit
                      </button>
                      <button onClick={() => setConfirm(p.id)}
                        style={{ background:'rgba(229,57,53,.1)',border:'1px solid rgba(229,57,53,.2)',
                          color:'var(--red)',borderRadius:6,padding:'5px 8px',fontSize:11,
                          cursor:'pointer',display:'flex',alignItems:'center' }}>
                        <Icon name="trash" size={11} color="currentColor"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display:'flex',gap:6,justifyContent:'center',padding:'14px 0',
            borderTop:'1px solid var(--border)' }}>
            <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1}
              style={{ width:32,height:32,borderRadius:8,border:'1.5px solid var(--border)',
                background:'white',cursor:page===1?'not-allowed':'pointer',
                display:'flex',alignItems:'center',justifyContent:'center',opacity:page===1?.4:1 }}>
              <Icon name="chevronLeft" size={14} color="var(--text2)"/>
            </button>
            {Array.from({length:Math.min(7,totalPages)},(_,i)=>{
              const p = page > 4 ? page-3+i : i+1;
              if(p<1||p>totalPages) return null;
              return (
                <button key={p} onClick={()=>setPage(p)}
                  style={{ width:32,height:32,borderRadius:8,border:'1.5px solid',
                    cursor:'pointer',fontSize:13,fontWeight:600,
                    borderColor:page===p?'var(--g)':'var(--border)',
                    background:page===p?'var(--g)':'white',
                    color:page===p?'white':'var(--text)' }}>{p}</button>
              );
            })}
            <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
              style={{ width:32,height:32,borderRadius:8,border:'1.5px solid var(--border)',
                background:'white',cursor:page===totalPages?'not-allowed':'pointer',
                display:'flex',alignItems:'center',justifyContent:'center',
                opacity:page===totalPages?.4:1 }}>
              <Icon name="chevronRight" size={14} color="var(--text2)"/>
            </button>
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {confirm && (
        <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.45)',zIndex:900,
          display:'flex',alignItems:'center',justifyContent:'center',padding:20 }}>
          <div style={{ background:'white',borderRadius:14,padding:28,maxWidth:380,width:'100%',
            boxShadow:'0 20px 60px rgba(0,0,0,.22)' }}>
            <div style={{ fontSize:40,textAlign:'center',marginBottom:14 }}>🗑️</div>
            <h3 style={{ fontWeight:800,fontSize:17,textAlign:'center',marginBottom:8 }}>Ștergi produsul?</h3>
            <p style={{ fontSize:13,color:'var(--text2)',textAlign:'center',marginBottom:20 }}>
              Această acțiune nu poate fi anulată.
            </p>
            <div style={{ display:'flex',gap:10 }}>
              <button onClick={() => { deleteProduct(confirm); setConfirm(null); showToast('Produs șters'); }}
                style={{ flex:1,background:'var(--red)',color:'white',border:'none',borderRadius:9,
                  padding:12,fontSize:13,fontWeight:700,cursor:'pointer' }}>Șterge</button>
              <button onClick={() => setConfirm(null)}
                style={{ flex:1,background:'none',border:'1.5px solid var(--border)',
                  borderRadius:9,padding:11,fontSize:13,fontWeight:600,cursor:'pointer' }}>Anulează</button>
            </div>
          </div>
        </div>
      )}

      {modal && <ProductModal product={modal==='add'?null:modal} onSave={handleSave} onClose={()=>setModal(null)}/>}

      {toast && (
        <div style={{ position:'fixed',bottom:22,right:22,background:'#1a1a2e',color:'white',
          borderRadius:9,padding:'12px 18px',fontSize:13,fontWeight:500,zIndex:9999,
          display:'flex',alignItems:'center',gap:8,boxShadow:'0 6px 24px rgba(0,0,0,.3)' }}>
          <Icon name={toast.ok?'check':'x'} size={13} color={toast.ok?'#66bb6a':'#ef5350'}/>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
