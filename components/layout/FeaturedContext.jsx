'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../../lib/products';

const FeaturedContext = createContext(null);

const DEFAULT_FEATURED_SLUG = 'lattafa-give-me-gourmand-vanilla-freak-eau-de-parfum-75-ml';
const DEFAULT_NEWSLETTER_TITLE = 'Abonează-te la newsletter';
const DEFAULT_NEWSLETTER_DESC = 'Primești 10% reducere la prima comandă + oferte exclusive în fiecare săptămână!';

export function FeaturedProvider({ children }) {
  const [featuredSlug, setFeaturedSlug] = useState(DEFAULT_FEATURED_SLUG);
  const [newsletterTitle, setNewsletterTitle] = useState(DEFAULT_NEWSLETTER_TITLE);
  const [newsletterDesc, setNewsletterDesc] = useState(DEFAULT_NEWSLETTER_DESC);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('yupo_featured_slug');
    if (saved) setFeaturedSlug(saved);
    const savedNt = localStorage.getItem('yupo_newsletter_title');
    if (savedNt) setNewsletterTitle(savedNt);
    const savedNd = localStorage.getItem('yupo_newsletter_desc');
    if (savedNd) setNewsletterDesc(savedNd);
    const savedSubs = localStorage.getItem('yupo_subscribers');
    if (savedSubs) setSubscribers(JSON.parse(savedSubs));
  }, []);

  const setFeatured = (slug) => {
    setFeaturedSlug(slug);
    localStorage.setItem('yupo_featured_slug', slug);
  };

  const updateNewsletter = (title, desc) => {
    setNewsletterTitle(title);
    setNewsletterDesc(desc);
    localStorage.setItem('yupo_newsletter_title', title);
    localStorage.setItem('yupo_newsletter_desc', desc);
  };

  const addSubscriber = (email, name = '') => {
    const newSub = { email, name, date: new Date().toLocaleDateString('ro-RO'), id: Date.now() };
    setSubscribers(prev => {
      if (prev.find(s => s.email === email)) return prev;
      const updated = [newSub, ...prev];
      localStorage.setItem('yupo_subscribers', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const removeSubscriber = (id) => {
    setSubscribers(prev => {
      const updated = prev.filter(s => s.id !== id);
      localStorage.setItem('yupo_subscribers', JSON.stringify(updated));
      return updated;
    });
  };

  const featuredProduct = PRODUCTS.find(p => p.slug === featuredSlug) || PRODUCTS[0];

  return (
    <FeaturedContext.Provider value={{
      featuredProduct, featuredSlug, setFeatured,
      newsletterTitle, newsletterDesc, updateNewsletter,
      subscribers, addSubscriber, removeSubscriber,
    }}>
      {children}
    </FeaturedContext.Provider>
  );
}

export const useFeatured = () => {
  const ctx = useContext(FeaturedContext);
  if (!ctx) throw new Error('useFeatured must be inside FeaturedProvider');
  return ctx;
};
