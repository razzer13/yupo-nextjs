import { PRODUCTS } from './products.js';

// ── Categorii config ──────────────────────────────────────────────
export const CATEGORIES = [
  { name:'Parfumuri Arabe',   slug:'parfumuri-arabe',    icon:'🌹', color:'#7b2fbe', bg:'#f3e5f5',
    desc:'Parfumuri arabești autentice — oud, mosc, ambră, trandafir. Direct de la branduri premium ca Lattafa, Rasasi, Armaf.' },
  { name:'Curățenie & Menaj', slug:'curatenie-menaj',    icon:'✨', color:'#1565c0', bg:'#e3f2fd',
    desc:'Produse premium de curățenie pentru casă — detergenți, soluții, lavete, hârtie igienică și accesorii menaj.' },
  { name:'Cadouri & Ambient', slug:'cadouri-ambient',    icon:'🎁', color:'#e65100', bg:'#fff8e1',
    desc:'Lumânări parfumate, odorizante cameră, odorizante auto și seturi cadou pentru orice ocazie.' },
  { name:'Îngrijire Față',    slug:'ingrijire-fata',     icon:'💆', color:'#c2185b', bg:'#fce4ec',
    desc:'Creme, seruri, toner, demachiante și produse SPF pentru o piele sănătoasă și luminoasă.' },
  { name:'Geluri de Duș',     slug:'geluri-dus',         icon:'🚿', color:'#2e7d32', bg:'#e8f5e9',
    desc:'Geluri de duș cu arome orientale și occidentale pentru o experiență premium la fiecare duș.' },
  { name:'Igienă Personală',  slug:'igiena-personala',   icon:'🧴', color:'#0277bd', bg:'#e1f5fe',
    desc:'Deodorante, produse de igienă intimă și accesorii pentru îngrijirea zilnică.' },
  { name:'Creme & Loțiuni',   slug:'creme-lotiuni',      icon:'🧴', color:'#c2185b', bg:'#fce4ec',
    desc:'Creme de corp, loțiuni hidratante, uleiuri și scrub-uri pentru piele moale și catifelată.' },
  { name:'Spray-uri Corp',    slug:'spray-uri-corp',     icon:'💨', color:'#7b2fbe', bg:'#f3e5f5',
    desc:'Spray-uri parfumate pentru corp cu arome orientale și florale de lungă durată.' },
  { name:'Machiaj',           slug:'machiaj',            icon:'💄', color:'#c2185b', bg:'#fce4ec',
    desc:'Produse de machiaj premium — fond de ten, gloss, ruj și accesorii beauty.' },
  { name:'Îngrijire Păr',     slug:'ingrijire-par',      icon:'💇', color:'#1565c0', bg:'#e3f2fd',
    desc:'Șampoane, balsamuri, măști și tratamente pentru un păr sănătos și strălucitor.' },
  { name:'Îngrijire Corp',    slug:'ingrijire-corp',     icon:'🛁', color:'#2e7d32', bg:'#e8f5e9',
    desc:'Săpunuri, scrub-uri și produse de îngrijire pentru corp moale și catifelat.' },
  { name:'Șampoane',          slug:'sampoane',           icon:'🧴', color:'#1565c0', bg:'#e3f2fd',
    desc:'Șampoane pentru toate tipurile de păr — hidratare, keratină, anti-mătreață.' },
];

export const getCategoryBySlug = (slug) =>
  CATEGORIES.find(c => c.slug === slug);

export const getCategoryByName = (name) =>
  CATEGORIES.find(c => c.name === name);

// ── Product helpers ───────────────────────────────────────────────
export const getProductBySlug = (slug) =>
  PRODUCTS.find(p => p.slug === slug);

export const getProductsByCategory = (categorySlug, limit) => {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return [];
  const filtered = PRODUCTS.filter(p => p.active && p.category === cat.name);
  return limit ? filtered.slice(0, limit) : filtered;
};

export const getRelatedProducts = (product, limit = 6) =>
  PRODUCTS.filter(p => p.active && p.id !== product.id && p.category === product.category)
    .slice(0, limit);

export const getFeaturedProducts = (limit = 10) =>
  PRODUCTS.filter(p => p.active).slice(0, limit);

export const getSaleProducts = (limit) => {
  const filtered = PRODUCTS.filter(p => p.active && p.salePrice);
  return limit ? filtered.slice(0, limit) : filtered;
};

export const searchProducts = (query) => {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return PRODUCTS.filter(p => p.active && (
    p.name.toLowerCase().includes(q) ||
    p.brand?.toLowerCase().includes(q) ||
    p.category?.toLowerCase().includes(q) ||
    p.desc?.toLowerCase().includes(q)
  ));
};

// ── Formatting ────────────────────────────────────────────────────
export const formatPrice = (n) => {
  if (!n) return '0 lei';
  return `${Number(n).toFixed(0)} lei`;
};

export const getDiscountPct = (price, salePrice) => {
  if (!price || !salePrice) return 0;
  return Math.round((1 - salePrice / price) * 100);
};

export const toSlug = (text) => {
  const roMap = {'ă':'a','â':'a','î':'i','ș':'s','ț':'t','ş':'s','ţ':'t'};
  let s = text.toLowerCase();
  for (const [k,v] of Object.entries(roMap)) s = s.replaceAll(k, v);
  return s.replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim();
};

// ── SEO helpers ───────────────────────────────────────────────────
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yupo.ro';
export const SITE_NAME = 'YUPO Beauty';

export const generateProductMeta = (product) => ({
  title: `${product.name} | ${product.brand} | YUPO`,
  description: product.shortDesc || product.desc?.slice(0,155) ||
    `Cumpără ${product.name} de la ${product.brand}. Produs original, livrare 1-2 zile în România.`,
  openGraph: {
    title: `${product.name} — ${formatPrice(product.salePrice || product.price)}`,
    description: product.shortDesc || product.desc?.slice(0,155),
    images: product.image ? [{ url: product.image, alt: product.name }] : [],
    type: 'website',
  },
});

export const generateCategoryMeta = (category) => ({
  title: `${category.name} | Produse originale | YUPO`,
  description: category.desc ||
    `Descoperă colecția de ${category.name} la YUPO. Produse originale, prețuri competitive, livrare rapidă în România.`,
  openGraph: {
    title: `${category.name} — YUPO Beauty`,
    description: category.desc,
    type: 'website',
  },
});
