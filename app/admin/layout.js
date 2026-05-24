import { AdminProvider } from '../../components/admin/AdminProductsContext';
import AdminLayout from '../../components/admin/AdminLayout';

export const metadata = {
  title: 'Admin Panel | YUPO Beauty',
  robots: { index: false, follow: false },
};

export default function Layout({ children }) {
  return (
    <AdminProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminProvider>
  );
}
