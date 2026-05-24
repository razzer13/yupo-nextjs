import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, getCategoryBySlug, generateProductMeta, formatPrice, getDiscountPct, SITE_URL } from '../../../lib/utils';
import { PRODUCTS } from '../../../lib/products';
import ProductPageClient from './ProductPageClient';
import Icon, { StarRating } from '../../../components/ui/Icon';

export async function generateStaticParams() {
  return PRODUCTS.filter(p => p.active).map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Produs negăsit' };

  const meta = generateProductMeta(product);
  return {
    ...meta,
    alternates: { canonical: `${SITE_URL}/produs/${product.slug}` },
    other: {
      'product:price:amount': product.salePrice || product.price,
      'product:price:currency': 'RON',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
    }
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 5);
  const cat = getCategoryBySlug(product.categorySlug);
  const price = product.salePrice || product.price;
  const pct = getDiscountPct(product.price, product.salePrice);

  // Schema.org Product markup
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.desc || product.shortDesc,
    "sku": product.sku,
    "gtin": product.ean || undefined,
    "brand": { "@type": "Brand", "name": product.brand },
    "image": product.images?.length ? product.images : (product.image ? [product.image] : []),
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/produs/${product.slug}`,
      "priceCurrency": "RON",
      "price": price,
      "priceValidUntil": new Date(Date.now() + 30*86400000).toISOString().split('T')[0],
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": { "@type": "Organization", "name": "YUPO Beauty" },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": { "@type": "MonetaryAmount", "value": price >= 250 ? 0 : 10, "currency": "RON" },
        "deliveryTime": { "@type": "ShippingDeliveryTime",
          "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
          "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" }
        }
      }
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "12" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}/>

      <div className="anim">
        {/* Breadcrumb */}
        <nav className="bc" aria-label="Breadcrumb">
          <Link href="/">Acasă</Link>
          <span className="sep">›</span>
          {cat && <><Link href={`/${product.categorySlug}`}>{product.category}</Link><span className="sep">›</span></>}
          <span className="current" style={{ maxWidth:300, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {product.name}
          </span>
        </nav>

        {/* Client component for interactivity */}
        <ProductPageClient product={product}/>

        {/* Related products - Server rendered */}
        {related.length > 0 && (
          <section className="section" style={{ marginTop:24 }}>
            <div className="sec-hdr">
              <span className="sec-title">
                <span className="sec-bar"/>Produse similare
              </span>
              <Link href={`/${product.categorySlug}`} className="see-all">
                Vezi toate <Icon name="chevronRight" size={12} color="currentColor"/>
              </Link>
            </div>
            <div className="products-grid">
              {related.map(p => (
                <Link key={p.id} href={`/produs/${p.slug}`}
                  style={{ textDecoration:'none', display:'contents' }}>
                  <article className="prod-card">
                    <div className="prod-img-wrap">
                      {p.salePrice && (
                        <div className="prod-badges">
                          <span className="badge badge-sale">-{getDiscountPct(p.price, p.salePrice)}%</span>
                        </div>
                      )}
                      {p.image
                        ? <img src={p.image} alt={p.name} loading="lazy"
                            style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                        : <Icon name="tag" size={52} color="#c8e6c9"/>}
                    </div>
                    <div className="prod-info">
                      <div className="prod-brand">{p.brand}</div>
                      <div className="prod-name">{p.name}</div>
                      <StarRating n={4} size={11}/>
                      <div style={{ marginTop:'auto' }}>
                        {p.salePrice && <div><span className="price-old">{p.price} lei</span></div>}
                        <span className="price-main">{p.salePrice || p.price} lei</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
