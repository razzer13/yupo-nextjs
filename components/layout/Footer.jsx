import Link from 'next/link';
import Icon from '../ui/Icon';
import { CATEGORIES } from '../../lib/utils';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <div style={{ width:32,height:32,background:'var(--g)',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center' }}>
              <Icon name="shield" size={18} color="white"/>
            </div>
            YUPO
          </div>
          <div className="footer-desc">
            Parfumuri arabești autentice și produse de îngrijire premium, livrate rapid în toată România. Calitate garantată, prețuri competitive.
          </div>
          {[
            { ic:'phone', val:'+40 787 301 034', href:'tel:+40787301034' },
            { ic:'mail', val:'contact@yupo.ro', href:'mailto:contact@yupo.ro' },
            { ic:'mapPin', val:'Popești-Leordeni, Ilfov' },
            { ic:'clock', val:'Luni–Duminică 9:00–21:00' },
          ].map(({ ic, val, href }) => (
            <div key={val} className="footer-contact-row">
              <Icon name={ic} size={13} color="currentColor"/>
              {href ? <a href={href} style={{ color:'inherit' }}>{val}</a> : val}
            </div>
          ))}
        </div>

        <div>
          <div className="footer-col-title">Categorii</div>
          {CATEGORIES.slice(0, 7).map(c => (
            <Link key={c.slug} href={`/${c.slug}`} className="footer-link">{c.name}</Link>
          ))}
        </div>

        <div>
          <div className="footer-col-title">Informații</div>
          {[
            { label:'Despre noi', href:'/despre' },
            { label:'Contact', href:'/contact' },
            { label:'Blog', href:'/blog' },
            { label:'Dropshipping', href:'/dropshipping' },
            { label:'Parteneriate B2B', href:'/b2b' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} className="footer-link">{label}</Link>
          ))}
        </div>

        <div>
          <div className="footer-col-title">Legal & Suport</div>
          {[
            { label:'Termeni și Condiții', href:'/termeni' },
            { label:'Politica GDPR', href:'/gdpr' },
            { label:'Politica de Retur', href:'/retur' },
            { label:'Politica de Livrare', href:'/livrare' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} className="footer-link">{label}</Link>
          ))}
          <div style={{ marginTop:16 }}>
            <div className="footer-col-title">Plată securizată</div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:8 }}>
              {['VISA','MC','Netopia','PayU'].map(b => (
                <div key={b} style={{ background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)',
                  borderRadius:5, padding:'4px 10px', fontSize:11, fontWeight:700, color:'rgba(255,255,255,.6)' }}>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Magirus Record Concept S.R.L. · CUI: RO40993329</span>
        <span>Construit cu ❤️ în România</span>
      </div>
    </footer>
  );
}
