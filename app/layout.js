import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://yupo.ro'),
  title: {
    default: 'YUPO – Parfumuri Arabești & Beauty | Livrare Rapidă România',
    template: '%s | YUPO Beauty'
  },
  description: 'Parfumuri arabești autentice, cosmetice și produse de îngrijire premium. Lattafa, Rasasi, Armaf — 1000+ produse originale. Livrare 1-2 zile, gratuit peste 250 lei.',
  keywords: ['parfumuri arabesti','parfumuri orientale','Lattafa Romania','Rasasi Romania','Armaf','oud','mosc','cosmetice','yupo'],
  openGraph: {
    type: 'website', locale: 'ro_RO', url: 'https://yupo.ro',
    siteName: 'YUPO Beauty',
    images: [{ url: '/og-image.jpg', width:1200, height:630, alt:'YUPO Beauty' }],
  },
  twitter: { card:'summary_large_image', images:['/og-image.jpg'] },
  robots: { index:true, follow:true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#2e7d32"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"OnlineStore",
          "name":"YUPO Beauty",
          "url":"https://yupo.ro",
          "telephone":"+40787301034",
          "email":"contact@yupo.ro",
          "address":{"@type":"PostalAddress","streetAddress":"Strada Leordeni Nr. 161i bis",
            "addressLocality":"Popești-Leordeni","addressRegion":"Ilfov",
            "postalCode":"077160","addressCountry":"RO"},
          "openingHoursSpecification":{"@type":"OpeningHoursSpecification",
            "dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens":"09:00","closes":"21:00"},
          "priceRange":"$$","currenciesAccepted":"RON"
        })}}/>
      </head>
      <body>{children}</body>
    </html>
  );
}
