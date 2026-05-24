'use client';
import { CartProvider } from './CartContext';
import { ToastProvider } from './ToastContext';
import { FeaturedProvider } from './FeaturedContext';
import CartDrawer from './CartDrawer';

export default function Providers({ children }) {
  return (
    <CartProvider>
      <ToastProvider>
        <FeaturedProvider>
          {children}
          <CartDrawer/>
        </FeaturedProvider>
      </ToastProvider>
    </CartProvider>
  );
}
