'use client';
import { useState } from 'react';
import { useAdmin } from '../../../components/admin/AdminProductsContext';
import Icon from '../../../components/ui/Icon';
import { CATEGORIES } from '../../../lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────
function normHeader(str) {
  return str.toLowerCase()
    .replace(/\u015f|\u015b/g,'s').replace(/\u0163|\u0162|\u021b|\u021a/g,'t')
    .replace(/\u0103|\u0102/g,'a').replace(/\u00ee|\u00ce/g,'i')
    .replace(/\u00e2|\u00c2/g,'a').replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
}

function parsePrice(s) {
  if (!s?.trim()) return null;
  const n = parseFloat(s.trim().replace(',','.'));
  return isNaN(n) || n <= 0 ? null : n;
}

function cleanHTML(s) {
  if (!s) return '';
  return s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,400);
}

function mapCategory(c) {
  if (!c) return 'Alte Produse';
  if (c.includes('Parfumuri Arabesti') || c.includes('arabesti')) return 'Parfumuri Arabe';
  if (c.includes('Spray') && c.includes('Corp')) return 'Spray-uri Corp';
  if (c.includes('Lumanari') || c.includes('Odorizante') || c.includes('Cadouri') || c.includes('Seturi')) return 'Cadouri & Ambient';
  if (c.includes('Sampoane') || c.includes('Şampoane')) return 'Șampoane';
  if (c.includes('Geluri de Dus')) return 'Geluri de Duș';
  if (c.includes('Creme corp') || c.includes('Lotiuni') || c.includes('Uleiuri corp')) return 'Creme & Loțiuni';
  if (c.includes('Scrub') || c.includes('Sapun')) return 'Îngrijire Corp';
  if (c.includes('Ingrijire par') || c.includes('Balsamuri') || c.includes('Tratamente')) return 'Îngrijire Păr';
  if (c.includes('Ingrijire fata') || c.includes('Seruri') || c.includes('Demachiante')) return 'Îngrijire Față';
  if (c.includes('Machiaj') || c.includes('Gloss')) return 'Machiaj';
  if (c.includes('Igiena') || c.includes('Deodorante')) return 'Igienă Personală';
  if (c.includes('Curatenie') || c.includes('Detergenti') || c.includes('Hartie') || c.includes('Lavete')) return 'Curățenie & Menaj';
  return 'Alte Produse';
}

function toSlug(text) {
  const ro = {'ă':'a','â':'a','î':'i','ș':'s','ț':'t','ş':'s','ţ':'t'};
  let s = text.toLowerCase();
  for (const [k,v] of Object.entries(ro)) s = s.replaceAll(k,v);
  return s.replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim().slice(0,80);
}

// Robust CSV parser
function parseCSV(text) {
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  const rows = []; let col='', inQ=false, row=[];
  for (let i=0; i<text.length; i++) {
    const ch=text[i], nx=text[i+1];
    if (ch==='"') {
      if (!inQ) inQ=true;
      else if (nx==='"') { col+='"'; i++; }
      else inQ=false;
    } else if (ch===',' && !inQ) { row.push(col); col=''; }
    else if ((ch==='\n'||ch==='\r') && !inQ) {
      if (ch==='\r'&&nx==='\n') i++;
      if (col!==''||row.length>0) { row.push(col); if(row.some(c=>c!=='')) rows.push(row); row=[]; col=''; }
    } else if ((ch==='\n'||ch==='\r') && inQ) { col+=ch; }
    else col+=ch;
  }
  if (col!==''||row.length>0) { row.push(col); if(row.some(c=>c!=='')) rows.push(row); }
  if (!rows.length) return { headers:[], rows:[] };
  const headers = rows[0].map(h=>h.trim());
  const dataRows = rows.slice(1).map(cols=>{
    const r={};
    headers.forEach((h,j)=>r[h]=(cols[j]||'').trim());
    return r;
  }).filter(r=>Object.values(r).some(v=>v!==''));
  return { headers, rows:dataRows };
}

const FUZZY_MAP = [
  { key:'name',      patterns:['nume'] },
  { key:'sku',       patterns:['sku'] },
  { key:'ean',       patterns:['gtin','upc','ean','isbn'] },
  { key:'price',     patterns:['pret obisnuit','pret normal','price','regular price'] },
  { key:'salePrice', patterns:['pret promotional','pret promo','sale price'] },
  { key:'category',  patterns:['categorii','categorie','category'] },
  { key:'brand',     patterns:['branduri','brand'] },
  { key:'desc',      patterns:['descriere scurta','short description','descriere'] },
  { key:'stock',     patterns:['stoc','stock'] },
  { key:'image',     patterns:['imagini','images','image'] },
  { key:'active',    patterns:['publicat','published'] },
  { key:'inStock',   patterns:['in stoc','stock status'] },
];

function autoDetect(headers) {
  const m={};
  headers.forEach(h => {
    const n = normHeader(h);
    for (const {key, patterns} of FUZZY_MAP) {
      if (m[key]) continue;
      if (patterns.some(p => n===p || n.startsWith(p) || n.includes(p))) { m[key]=h; break; }
    }
  });
  return m;
}

function getBrandFromAttrs(row) {
  for (let i=1; i<=6; i++) {
    const k = Object.keys(row).find(k => normHeader(k)===`nume atribut ${i}`);
    if (k && normHeader(row[k])==='brand') {
      const vk = Object.keys(row).find(k2 => normHeader(k2).includes('valoare') && normHeader(k2).includes(`atribut ${i}`));
      if (vk) return row[vk].trim();
    }
  }
  return '';
}

function convertRow(row, mapping, options) {
  const get = f => mapping[f] ? (row[mapping[f]]||'') : '';
  const brand = get('brand').trim() || getBrandFromAttrs(row) || options.defaultBrand || 'YUPO';
  const catRaw = get('category').trim();
  const category = options.mapCategories ? mapCategory(catRaw) : (catRaw||'Alte Produse');
  const stockRaw = get('stock').trim();
  const imgs = get('image').split(',').map(s=>s.trim()).filter(Boolean);
  return {
    id: Date.now() + Math.random(),
    sku: get('sku').trim(),
    ean: get('ean').trim(),
    name: get('name').trim(),
    slug: toSlug(get('name').trim()),
    category,
    categorySlug: CATEGORIES.find(c=>c.name===category)?.slug || 'alte-produse',
    brand,
    price: parsePrice(get('price')),
    salePrice: parsePrice(get('salePrice')),
    stock: /^\d+$/.test(stockRaw) ? parseInt(stockRaw) : (get('inStock')==='1'?99:0),
    desc: cleanHTML(get('desc')),
    image: imgs[0]||'',
    images: imgs.slice(0,4),
    active: get('active')===''||get('active')==='1',
    badge: parsePrice(get('salePrice'))?'sale':'',
  };
}

const FIELDS = [
  {key:'name',label:'Nume produs',required:true},
  {key:'sku',label:'SKU',required:false},
  {key:'ean',label:'EAN / GTIN',required:false},
  {key:'price',label:'Preț obișnuit',required:true},
  {key:'salePrice',label:'Preț promoțional',required:false},
  {key:'category',label:'Categorie',required:false},
  {key:'brand',label:'Brand',required:false},
  {key:'desc',label:'Descriere',required:false},
  {key:'stock',label:'Stoc',required:false},
  {key:'image',label:'Imagine URL',required:false},
  {key:'active',label:'Publicat',required:false},
];

// ─── Steps ────────────────────────────────────────────────────────
function Step({ n, label, active, done }) {
  return (
    <div style={{ flex:1,display:'flex',alignItems:'center',gap:10,padding:'13px 16px',
      borderRight:'1px solid var(--border)',
      background:active?'var(--g3)':done?'#f0faf0':'white',
      color:active?'var(--g)':done?'#43a047':'var(--text3)' }}>
      <div style={{ width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',
        justifyContent:'center',fontSize:12,fontWeight:800,flexShrink:0,
        border:`2px solid ${active?'var(--g)':done?'#43a047':'var(--border)'}`,
        background:active||done?active?'var(--g)':'#43a047':'white',
        color:active||done?'white':'var(--text3)' }}>
        {done ? <Icon name="check" size={12} color="white"/> : n}
      </div>
      <span style={{ fontSize:13,fontWeight:600 }}>{label}</span>
    </div>
  );
}

// ─── Main Import Page ─────────────────────────────────────────────
export default function ImportAdmin() {
  const { importProducts } = useAdmin();
  const [step, setStep] = useState(1);
  const [csvData, setCsvData] = useState(null);
  const [mapping, setMapping] = useState({});
  const [options, setOptions] = useState({
    mapCategories:true, updateExisting:true,
    importInactive:false, skipNoPrice:true, defaultBrand:'YUPO'
  });
  const [imported, setImported] = useState([]);
  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg,ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),3000); };

  const handleFile = (file) => {
    if (!file?.name.endsWith('.csv')) { showToast('Selectează un fișier .csv',false); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const parsed = parseCSV(e.target.result);
      if (!parsed.rows.length) { showToast('Fișierul CSV este gol sau invalid',false); return; }
      setCsvData(parsed);
      setMapping(autoDetect(parsed.headers));
      setStep(2);
    };
    reader.readAsText(file,'UTF-8');
  };

  // Validate + convert all rows
  const processedRows = csvData ? csvData.rows.map((row,i) => {
    const p = convertRow(row, mapping, options);
    const errors = [];
    if (!p.name||p.name==='0') errors.push('Nume lipsă');
    if (!p.price) errors.push('Preț lipsă');
    const omis = !errors.length && ((!options.importInactive&&!p.active)||(options.skipNoPrice&&!p.price));
    return { p, errors, omis, idx:i };
  }) : [];

  const valid = processedRows.filter(r=>!r.errors.length&&!r.omis);
  const invalid = processedRows.filter(r=>r.errors.length);
  const omise = processedRows.filter(r=>!r.errors.length&&r.omis);

  const catCounts = valid.reduce((acc,r)=>{
    acc[r.p.category]=(acc[r.p.category]||0)+1; return acc;
  },{});

  const startImport = () => {
    const prods = valid.map(r=>r.p);
    setImported(prods);
    setStep(4);
    let p=0;
    const iv = setInterval(()=>{
      p += 1.5 + Math.random()*2;
      if(p>=100){ p=100; clearInterval(iv);
        setTimeout(()=>{ importProducts(prods); setStep(5); },400); }
      setProgress(Math.round(p));
    },60);
  };

  const reset = () => { setStep(1); setCsvData(null); setMapping({}); setImported([]); setProgress(0); };

  const steps = ['Încarcă fișier','Mapare câmpuri','Verificare','Import','Finalizat'];

  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22,fontWeight:800,marginBottom:4 }}>Import Produse CSV</h1>
        <p style={{ fontSize:13,color:'var(--text2)' }}>
          Importă produse direct din export WooCommerce sau CSV personalizat.
        </p>
      </div>

      {/* Steps */}
      <div style={{ display:'flex',background:'white',border:'1.5px solid var(--border)',
        borderRadius:12,overflow:'hidden',marginBottom:22,boxShadow:'var(--shadow)' }}>
        {steps.map((label,i)=>(
          <Step key={i} n={i+1} label={label} active={step===i+1} done={step>i+1}/>
        ))}
      </div>

      {/* STEP 1: Upload */}
      {step===1 && (
        <div>
          <div style={{ background:'linear-gradient(135deg,#e3f2fd,#f1f8e9)',border:'1.5px solid var(--border)',
            borderRadius:10,padding:'16px 20px',display:'flex',alignItems:'center',
            justifyContent:'space-between',gap:14,marginBottom:18,flexWrap:'wrap' }}>
            <div>
              <div style={{ fontWeight:700,fontSize:14,marginBottom:3 }}>Import produse din CSV</div>
              <div style={{ fontSize:12,color:'var(--text2)' }}>
                Compatibil cu exportul WooCommerce și CSV personalizat UTF-8.
              </div>
            </div>
            <button onClick={()=>{
              const csv='Nume,SKU,EAN,Pret obisnuit,Pret promotional,Categorii,Brand,Descriere,Stoc,Imagini,Publicat\nProdus exemplu,SKU001,,99.99,,Parfumuri Arabe,Lattafa,Descriere,10,https://img.jpg,1';
              const a=document.createElement('a');
              a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
              a.download='yupo-template.csv'; a.click();
            }} style={{ background:'none',border:'1.5px solid var(--border)',color:'var(--text)',
              borderRadius:9,padding:'9px 18px',fontSize:13,fontWeight:600,cursor:'pointer',
              display:'flex',alignItems:'center',gap:7 }}>
              <Icon name="download" size={14} color="currentColor"/>Template CSV
            </button>
          </div>

          <div className={`dropzone${drag?' drag':''}`}
            style={{ border:`2.5px dashed ${drag?'var(--g)':'var(--border)'}`,borderRadius:12,
              padding:'56px 24px',textAlign:'center',background:drag?'var(--g3)':'white',
              position:'relative',cursor:'pointer',transition:'all .25s' }}
            onDragOver={e=>{e.preventDefault();setDrag(true);}}
            onDragLeave={()=>setDrag(false)}
            onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}>
            <input type="file" accept=".csv"
              style={{ position:'absolute',inset:0,opacity:0,cursor:'pointer',width:'100%',height:'100%' }}
              onChange={e=>handleFile(e.target.files[0])}/>
            <div style={{ width:72,height:72,background:'var(--g3)',borderRadius:18,
              display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px' }}>
              <Icon name="upload" size={36} color="var(--g)"/>
            </div>
            <div style={{ fontSize:17,fontWeight:700,marginBottom:8 }}>
              {drag?'Dă-i drumul! 🎯':'Trage CSV-ul aici sau click pentru a selecta'}
            </div>
            <div style={{ fontSize:13,color:'var(--text3)',lineHeight:1.6 }}>
              Suportă export WooCommerce, CSV personalizat · UTF-8<br/>
              Orice număr de produse · Parser robust pentru descrieri HTML
            </div>
            <div style={{ display:'flex',gap:8,justifyContent:'center',marginTop:14,flexWrap:'wrap' }}>
              {['WooCommerce CSV','CSV Personalizat','UTF-8','Diacritice RO'].map(t=>(
                <span key={t} style={{ background:'#f5f5f5',border:'1px solid var(--border)',
                  borderRadius:6,padding:'3px 10px',fontSize:11,fontWeight:600,color:'var(--text2)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Mapping */}
      {step===2 && csvData && (
        <div>
          <div style={{ background:'var(--g3)',border:'1px solid rgba(46,125,50,.25)',borderRadius:10,
            padding:'12px 16px',display:'flex',gap:10,marginBottom:18,color:'var(--g)' }}>
            <Icon name="check" size={16} color="currentColor" style={{flexShrink:0}}/>
            <div>
              <strong>Auto-detectat: {Object.keys(mapping).filter(k=>mapping[k]).length}/{FIELDS.length} câmpuri</strong>
              {' '}din {csvData.headers.length} coloane CSV · {csvData.rows.length.toLocaleString()} rânduri
            </div>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20 }}>
            {/* Field mapping */}
            <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:12,padding:20,boxShadow:'var(--shadow)' }}>
              <div style={{ fontWeight:700,fontSize:14,marginBottom:14,display:'flex',
                alignItems:'center',gap:8,paddingBottom:12,borderBottom:'1px solid var(--border)' }}>
                <Icon name="settings" size={15} color="var(--g)"/>Mapare câmpuri
              </div>
              {FIELDS.map(field=>(
                <div key={field.key} style={{ display:'grid',gridTemplateColumns:'1fr 20px 1fr',
                  gap:8,alignItems:'center',marginBottom:8 }}>
                  <div style={{ fontSize:12,fontWeight:600,background:'#f8f9fa',padding:'7px 11px',
                    borderRadius:7,border:'1px solid var(--border)',display:'flex',alignItems:'center',gap:5 }}>
                    {field.label}
                    {field.required&&<span style={{color:'var(--red)',fontWeight:800,fontSize:10}}>*</span>}
                  </div>
                  <div style={{textAlign:'center',color:'#bbb'}}><Icon name="chevronRight" size={13} color="#bbb"/></div>
                  <select value={mapping[field.key]||''}
                    onChange={e=>setMapping(m=>({...m,[field.key]:e.target.value||null}))}
                    style={{ border:`1.5px solid ${mapping[field.key]?'var(--g)':'var(--border)'}`,
                      borderRadius:7,padding:'7px 11px',fontSize:11,outline:'none',
                      background:mapping[field.key]?'var(--g3)':'white',cursor:'pointer',width:'100%' }}>
                    <option value="">— Nu importa —</option>
                    {csvData.headers.map(h=><option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* Options */}
            <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:12,padding:20,boxShadow:'var(--shadow)' }}>
              <div style={{ fontWeight:700,fontSize:14,marginBottom:14,display:'flex',
                alignItems:'center',gap:8,paddingBottom:12,borderBottom:'1px solid var(--border)' }}>
                <Icon name="settings" size={15} color="var(--g)"/>Opțiuni import
              </div>
              {[
                ['mapCategories','Mapare automată categorii','Convertește categorii WooCommerce → YUPO'],
                ['updateExisting','Actualizează produse existente','SKU existent → actualizează'],
                ['importInactive','Importă produse inactive','Include Publicat = 0'],
                ['skipNoPrice','Sari produse fără preț','Omite rândurile fără preț'],
              ].map(([key,label,sub])=>(
                <div key={key} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',
                  padding:'10px 12px',border:'1.5px solid var(--border)',borderRadius:8,marginBottom:8 }}>
                  <div>
                    <div style={{fontSize:13,fontWeight:600}}>{label}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{sub}</div>
                  </div>
                  <button className={`toggle ${options[key]?'on':'off'}`}
                    style={{ width:38,height:20,borderRadius:10,border:'none',cursor:'pointer',
                      position:'relative',transition:'background .25s',
                      background:options[key]?'var(--g)':'#ccc' }}
                    onClick={()=>setOptions(o=>({...o,[key]:!o[key]}))}>
                    <span style={{ position:'absolute',top:2,width:16,height:16,borderRadius:'50%',
                      background:'white',transition:'left .25s',
                      left:options[key]?'20px':'2px',boxShadow:'0 1px 3px rgba(0,0,0,.2)' }}/>
                  </button>
                </div>
              ))}
              <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',
                padding:'10px 12px',border:'1.5px solid var(--border)',borderRadius:8 }}>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>Brand implicit</div>
                  <div style={{fontSize:11,color:'var(--text3)'}}>Dacă brandul lipsește din CSV</div>
                </div>
                <input value={options.defaultBrand} onChange={e=>setOptions(o=>({...o,defaultBrand:e.target.value}))}
                  style={{ border:'1.5px solid var(--border)',borderRadius:7,padding:'6px 10px',
                    fontSize:12,outline:'none',width:110 }}/>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div style={{ background:'white',border:'1.5px solid var(--border)',borderRadius:12,
            padding:18,marginBottom:18,boxShadow:'var(--shadow)' }}>
            <div style={{ fontWeight:700,fontSize:14,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}>
              <Icon name="eye" size={15} color="var(--g)"/>Previzualizare primele 5 rânduri
            </div>
            <div style={{ overflowX:'auto',borderRadius:9,border:'1.5px solid var(--border)' }}>
              <table style={{ width:'100%',borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{background:'#f8f8fc'}}>
                    {['#','Img','Nume','Brand','Categorie','Preț','Promo','Stoc','Status'].map(h=>(
                      <th key={h} style={{padding:'9px 12px',textAlign:'left',fontSize:10,
                        fontWeight:700,color:'var(--text2)',textTransform:'uppercase',
                        letterSpacing:'.08em',borderBottom:'1.5px solid var(--border)',whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.rows.slice(0,5).map((row,i)=>{
                    const p=convertRow(row,mapping,options);
                    const ok=p.name&&p.price;
                    return (
                      <tr key={i} style={{borderBottom:'1px solid #f0f0f4'}}>
                        <td style={{padding:'9px 12px',color:'var(--text3)',fontWeight:700,fontSize:12}}>{i+1}</td>
                        <td style={{padding:'9px 12px'}}>
                          <div style={{width:36,height:36,borderRadius:7,background:'var(--g3)',
                            border:'1px solid var(--border)',overflow:'hidden',
                            display:'flex',alignItems:'center',justifyContent:'center'}}>
                            {p.image
                              ?<img src={p.image} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}
                                  onError={e=>e.target.style.display='none'}/>
                              :<Icon name="tag" size={14} color="var(--g)"/>}
                          </div>
                        </td>
                        <td style={{padding:'9px 12px',fontSize:12,fontWeight:500,maxWidth:200,
                          overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                          {p.name||<span style={{color:'var(--red)'}}>LIPSĂ</span>}
                        </td>
                        <td style={{padding:'9px 12px',fontSize:12,color:'var(--text2)'}}>{p.brand}</td>
                        <td style={{padding:'9px 12px',fontSize:12,color:'var(--text2)',maxWidth:140,
                          overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.category}</td>
                        <td style={{padding:'9px 12px',fontWeight:700,
                          color:p.price?'var(--g)':'var(--red)',whiteSpace:'nowrap'}}>
                          {p.price?`${p.price} lei`:'LIPSĂ'}
                        </td>
                        <td style={{padding:'9px 12px',fontSize:12,whiteSpace:'nowrap'}}>
                          {p.salePrice?`${p.salePrice} lei`:'—'}
                        </td>
                        <td style={{padding:'9px 12px',fontWeight:700,
                          color:p.stock>0?'var(--g)':'var(--text3)',fontSize:12}}>{p.stock}</td>
                        <td style={{padding:'9px 12px'}}>
                          {ok
                            ? <span style={{color:'var(--g)',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',gap:4}}>
                                <Icon name="check" size={11} color="var(--g)"/>OK
                              </span>
                            : <span style={{color:'var(--red)',fontSize:11,fontWeight:700}}>Eroare</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{display:'flex',gap:10,justifyContent:'space-between'}}>
            <button onClick={reset} style={{background:'none',border:'1.5px solid var(--border)',
              color:'var(--text)',borderRadius:9,padding:'10px 20px',fontSize:13,fontWeight:600,cursor:'pointer',
              display:'flex',alignItems:'center',gap:7}}>← Înapoi</button>
            <button onClick={()=>setStep(3)} disabled={!mapping.name||!mapping.price}
              style={{background:mapping.name&&mapping.price?'var(--g)':'#aaa',color:'white',border:'none',
                borderRadius:9,padding:'11px 28px',fontSize:13,fontWeight:700,cursor:'pointer',
                display:'flex',alignItems:'center',gap:7}}>
              <Icon name="chevronRight" size={14} color="white"/>Verifică datele ({csvData.rows.length.toLocaleString()} rânduri)
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Validate */}
      {step===3 && csvData && (
        <div>
          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
            {[
              {val:csvData.rows.length.toLocaleString(),lbl:'Total rânduri',color:'var(--text)'},
              {val:valid.length.toLocaleString(),lbl:'De importat',color:'var(--g)'},
              {val:invalid.length.toLocaleString(),lbl:'Cu erori',color:'var(--red)'},
              {val:omise.length.toLocaleString(),lbl:'Omise',color:'var(--gold)'},
            ].map((s,i)=>(
              <div key={i} style={{background:'white',border:'1.5px solid var(--border)',
                borderRadius:12,padding:20,textAlign:'center',boxShadow:'var(--shadow)'}}>
                <div style={{fontSize:26,fontWeight:800,color:s.color,marginBottom:4}}>{s.val}</div>
                <div style={{fontSize:12,color:'var(--text2)'}}>{s.lbl}</div>
              </div>
            ))}
          </div>

          {valid.length>0&&(
            <div style={{background:'var(--g3)',border:'1px solid rgba(46,125,50,.25)',borderRadius:10,
              padding:'12px 16px',display:'flex',gap:10,marginBottom:14,color:'var(--g)'}}>
              <Icon name="check" size={16} color="currentColor" style={{flexShrink:0}}/>
              <div>
                <strong>{valid.length.toLocaleString()} produse valide</strong> gata de import ·{' '}
                {valid.filter(r=>r.p.salePrice).length} cu preț promoțional ·{' '}
                {Object.keys(catCounts).length} categorii
              </div>
            </div>
          )}

          {invalid.length>0&&(
            <div style={{marginBottom:14}}>
              <div style={{background:'rgba(229,57,53,.08)',border:'1px solid rgba(229,57,53,.2)',
                borderRadius:10,padding:'12px 16px',display:'flex',gap:10,marginBottom:10,color:'var(--red)'}}>
                <Icon name="alertCircle" size={16} color="currentColor" style={{flexShrink:0}}/>
                <strong>{invalid.length} rânduri cu erori</strong> — vor fi omise automat
              </div>
              <div style={{maxHeight:180,overflowY:'auto',border:'1px solid rgba(229,57,53,.2)',
                borderRadius:9,background:'white'}}>
                {invalid.slice(0,12).map((r,i)=>(
                  <div key={i} style={{display:'flex',gap:10,padding:'7px 12px',
                    borderBottom:'1px solid #f5f5f5',fontSize:12}}>
                    <span style={{color:'var(--text3)',fontWeight:700,flexShrink:0,minWidth:55}}>Rând {r.idx+2}</span>
                    <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:'var(--text2)'}}>
                      {r.p.name||'(fără nume)'}
                    </span>
                    <span style={{color:'var(--red)',flexShrink:0}}>{r.errors[0]}</span>
                  </div>
                ))}
                {invalid.length>12&&(
                  <div style={{padding:'7px 12px',fontSize:11,color:'var(--text3)'}}>
                    ... și alte {invalid.length-12} erori
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Categories */}
          <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:12,
            padding:18,marginBottom:18,boxShadow:'var(--shadow)'}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
              <Icon name="tag" size={15} color="var(--g)"/>Categorii detectate
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).map(([cat,count])=>(
                <div key={cat} style={{background:'var(--g3)',border:'1px solid #c8e6c9',borderRadius:7,
                  padding:'5px 12px',fontSize:12,fontWeight:600,color:'var(--g)',
                  display:'flex',alignItems:'center',gap:6}}>
                  {cat}
                  <span style={{background:'white',borderRadius:20,padding:'0 6px',
                    fontSize:11,color:'var(--text2)',fontWeight:700}}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'flex',gap:10,justifyContent:'space-between'}}>
            <button onClick={()=>setStep(2)} style={{background:'none',border:'1.5px solid var(--border)',
              color:'var(--text)',borderRadius:9,padding:'10px 20px',fontSize:13,fontWeight:600,cursor:'pointer',
              display:'flex',alignItems:'center',gap:7}}>← Înapoi</button>
            <button onClick={startImport} disabled={!valid.length}
              style={{background:valid.length?'var(--g)':'#aaa',color:'white',border:'none',
                borderRadius:9,padding:'11px 28px',fontSize:13,fontWeight:700,cursor:'pointer',
                display:'flex',alignItems:'center',gap:7}}>
              <Icon name="upload" size={14} color="white"/>Importă {valid.length.toLocaleString()} produse
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Progress */}
      {step===4 && (
        <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:12,
          padding:'60px 32px',textAlign:'center',boxShadow:'var(--shadow)'}}>
          <div style={{width:80,height:80,background:'var(--g3)',borderRadius:'50%',
            display:'flex',alignItems:'center',justifyContent:'center',
            margin:'0 auto 22px',border:'3px solid #c8e6c9'}}>
            {progress<100
              ?<span style={{animation:'spin 1s linear infinite',display:'inline-block'}}>
                  <Icon name="refreshCw" size={38} color="var(--g)"/>
                </span>
              :<Icon name="check" size={38} color="var(--g)"/>}
          </div>
          <div style={{fontWeight:800,fontSize:20,marginBottom:8}}>Se importă produsele...</div>
          <div style={{fontSize:13,color:'var(--text3)',marginBottom:28}}>
            {progress<20?'Se validează datele...'
              :progress<50?'Se procesează imaginile...'
              :progress<75?'Se importă în catalog...'
              :progress<95?'Se actualizează categoriile...'
              :'Finalizare...'}
          </div>
          <div style={{maxWidth:460,margin:'0 auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,
              color:'var(--text2)',marginBottom:6}}>
              <span>Progres import</span>
              <span style={{fontWeight:800,color:'var(--g)'}}>{progress}%</span>
            </div>
            <div style={{background:'#e8f5e9',borderRadius:100,height:12,overflow:'hidden'}}>
              <div style={{height:'100%',background:'linear-gradient(90deg,var(--g),var(--g2))',
                borderRadius:100,width:`${progress}%`,transition:'width .3s'}}/>
            </div>
            <div style={{fontSize:12,color:'var(--text3)',marginTop:10}}>
              ~{Math.round(imported.length*progress/100).toLocaleString()} / {imported.length.toLocaleString()} produse procesate
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Done */}
      {step===5 && (
        <div style={{background:'white',border:'1.5px solid var(--border)',borderRadius:12,
          padding:'50px 32px',textAlign:'center',boxShadow:'var(--shadow)'}}>
          <div style={{width:88,height:88,background:'var(--g3)',borderRadius:'50%',
            display:'flex',alignItems:'center',justifyContent:'center',
            margin:'0 auto 22px',border:'4px solid #c8e6c9'}}>
            <Icon name="check" size={44} color="var(--g)"/>
          </div>
          <div style={{fontWeight:800,fontSize:24,marginBottom:8,color:'var(--g)'}}>
            Import finalizat cu succes! 🎉
          </div>
          <div style={{fontSize:16,color:'var(--text2)',marginBottom:30}}>
            <strong style={{color:'var(--g)',fontSize:36}}>{imported.length.toLocaleString()}</strong>{' '}
            produse importate în catalog
          </div>

          <div style={{background:'var(--g3)',border:'1.5px solid #c8e6c9',borderRadius:12,
            padding:20,maxWidth:540,margin:'0 auto 28px',textAlign:'left'}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:12,color:'var(--g)',
              display:'flex',alignItems:'center',gap:7}}>
              <Icon name="tag" size={14} color="var(--g)"/>Rezumat pe categorii
            </div>
            {Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).map(([cat,cnt])=>(
              <div key={cat} style={{display:'flex',justifyContent:'space-between',
                alignItems:'center',fontSize:13,padding:'6px 0',
                borderBottom:'1px solid rgba(46,125,50,.1)'}}>
                <span>{cat}</span>
                <span style={{fontWeight:700,color:'var(--g)',background:'white',
                  padding:'2px 10px',borderRadius:20,fontSize:12}}>{cnt} produse</span>
              </div>
            ))}
          </div>

          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/admin/produse"
              style={{background:'var(--g)',color:'white',borderRadius:10,padding:'12px 28px',
                fontSize:14,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
              <Icon name="package" size={16} color="white"/>Mergi la produse
            </a>
            <button onClick={reset}
              style={{background:'none',border:'1.5px solid var(--border)',color:'var(--text)',
                borderRadius:10,padding:'11px 24px',fontSize:14,fontWeight:600,cursor:'pointer',
                display:'flex',alignItems:'center',gap:8}}>
              <Icon name="upload" size={15} color="currentColor"/>Importă alt fișier
            </button>
          </div>
        </div>
      )}

      {toast&&(
        <div style={{position:'fixed',bottom:22,right:22,background:'#1a1a2e',color:'white',
          borderRadius:9,padding:'12px 18px',fontSize:13,fontWeight:500,zIndex:9999,
          display:'flex',alignItems:'center',gap:8,boxShadow:'0 6px 24px rgba(0,0,0,.3)'}}>
          <Icon name={toast.ok?'check':'x'} size={13} color={toast.ok?'#66bb6a':'#ef5350'}/>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
