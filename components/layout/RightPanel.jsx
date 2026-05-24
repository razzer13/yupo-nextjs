'use client';
import { FeaturedProductPanel, NewsletterPanel } from './RightPanels';

export default function RightPanel() {
  return (
    <div style={{ width:210, flexShrink:0, display:'flex', flexDirection:'column', gap:10 }}>
      <FeaturedProductPanel/>
      <NewsletterPanel/>
    </div>
  );
}
