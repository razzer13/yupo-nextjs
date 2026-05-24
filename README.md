# YUPO Beauty — Next.js

## 🚀 Deploy pe Vercel (RECOMANDAT)

### Pasul 1: GitHub
1. Creează cont gratuit pe [github.com](https://github.com)
2. Creează un repository nou: "yupo-nextjs"
3. Urcă toate fișierele din acest folder

### Pasul 2: Vercel
1. Mergi pe [vercel.com](https://vercel.com) → Sign up cu GitHub
2. Click "New Project" → Import repository "yupo-nextjs"
3. Vercel detectează automat Next.js → Click "Deploy"
4. În ~2 minute site-ul e live pe `yupo-nextjs.vercel.app`

### Pasul 3: Domeniu propriu
1. În Vercel → Settings → Domains
2. Adaugă `yupo.ro`
3. La registrar (unde ai cumpărat domeniul), adaugă:
   - `A record: @ → 76.76.21.21`
   - `CNAME record: www → cname.vercel-dns.com`

---

## 💻 Development local

```bash
npm install
npm run dev
# Deschide http://localhost:3000
```

## 🏗️ Build producție
```bash
npm run build
npm start
```

## 📁 Structura proiect
```
app/
├── (shop)/              → Layout cu Header/Footer/Sidebar
│   ├── layout.js        → Shop layout
│   ├── page.js          → Home page
│   └── [slug]/page.js   → Pagini categorii (auto-generate)
├── produs/[slug]/       → Pagini produse (1261 pagini generate)
├── cautare/             → Căutare cu rezultate
├── reduceri/            → Produse cu reduceri
├── despre/              → Despre noi
├── contact/             → Contact
├── b2b/                 → Parteneriate B2B
├── dropshipping/        → Dropshipping
├── termeni/             → Termeni și Condiții
├── gdpr/                → Politica GDPR
├── retur/               → Politica de Retur
├── livrare/             → Politica de Livrare
├── layout.js            → Root layout cu metadata
├── sitemap.js           → Sitemap dinamic (1261+ URL-uri)
└── robots.js            → robots.txt

components/
├── layout/
│   ├── Header.jsx       → Header cu search autocomplete
│   ├── Footer.jsx       → Footer complet
│   ├── LeftSidebar.jsx  → Sidebar stânga cu categorii
│   ├── CartDrawer.jsx   → Coș lateral
│   ├── CartContext.jsx  → State management coș
│   ├── ToastContext.jsx → Notificări toast
│   └── Providers.jsx    → Wrapper cu toate contextele
├── shop/
│   └── ProductCard.jsx  → Card produs
└── ui/
    └── Icon.jsx         → Iconițe SVG

lib/
├── products.js          → 1261 produse din CSV
└── utils.js             → Helpers, categorii, SEO

styles/
└── globals.css          → CSS global
```

## 🔍 SEO
- Fiecare produs are URL unic: `/produs/lattafa-oud-100ml`
- Meta tags dinamice per pagină (title, description, OG)
- Schema.org Product markup pentru Google Shopping
- Sitemap.xml dinamic cu toate produsele și categoriile
- robots.txt configurat corect
- Open Graph pentru Facebook/WhatsApp preview

## ➕ Cum adaugi produse noi
1. Exportă din WooCommerce ca CSV
2. Rulează scriptul Python: `python3 scripts/update-products.py`
3. Sau adaugă manual în `lib/products.js`
4. Deploy automat pe Vercel la push pe GitHub

## 📞 Contact
- Email: contact@yupo.ro
- Telefon: 0787 301 034
- Program: L-D 9:00-21:00
