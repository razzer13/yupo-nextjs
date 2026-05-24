import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LeftSidebar from '../../components/layout/LeftSidebar';
import Providers from '../../components/layout/Providers';

export default function ShopLayout({ children }) {
  return (
    <Providers>
      <Header/>
      <div className="page-layout">
        <LeftSidebar/>
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer/>
    </Providers>
  );
}
