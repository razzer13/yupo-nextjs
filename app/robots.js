export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/checkout'] },
    sitemap: 'https://yupo.ro/sitemap.xml',
  };
}
