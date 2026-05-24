'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { PRODUCTS } from '../../lib/products';

const AdminCtx = createContext(null);

// Mock orders
const MOCK_ORDERS = Array.from({ length: 24 }, (_, i) => ({
  id: `#${10045 + i}`,
  customer: ['Maria Ionescu','Andrei Pop','Elena Stan','Ion Popa','Ana Marin'][i%5],
  email: ['maria@gmail.com','andrei@yahoo.ro','elena@gmail.com','ion@gmail.com','ana@yahoo.ro'][i%5],
  phone: '07' + String(20000000 + i).slice(-8),
  total: 89 + (i * 37) % 400,
  items: 1 + (i % 4),
  status: ['nou','procesare','expediat','livrat','livrat','livrat'][i%6],
  date: `${(i%28)+1 < 10 ? '0' : ''}${(i%28)+1}.05.2025`,
  city: ['București','Cluj-Napoca','Iași','Timișoara','Constanța'][i%5],
  products: [PRODUCTS[i]?.name || 'Produs YUPO'].slice(0,1),
}));

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(
    PRODUCTS.map(p => ({ ...p, active: p.active ?? true }))
  );
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [settings, setSettings] = useState({
    siteName: 'YUPO Beauty',
    email: 'contact@yupo.ro',
    phone: '0787 301 034',
    address: 'Str. Leordeni 161i bis, Popești-Leordeni, Ilfov',
    shippingFree: 250,
    shippingCost: 10,
    promoCodes: [
      { code:'YUPO15', type:'percent', value:15, minOrder:100, active:true },
      { code:'WELCOME30', type:'fixed', value:30, minOrder:150, active:true },
    ],
  });

  const addProduct = useCallback((p) => {
    setProducts(prev => [{ ...p, id: Date.now() }, ...prev]);
  }, []);

  const updateProduct = useCallback((id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleProduct = useCallback((id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }, []);

  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  const importProducts = useCallback((newProducts) => {
    setProducts(prev => {
      const existingSkus = new Set(prev.map(p => p.sku).filter(Boolean));
      const toAdd = newProducts.filter(p => !existingSkus.has(p.sku));
      return [...prev, ...toAdd.map(p => ({ ...p, id: Date.now() + Math.random() }))];
    });
  }, []);

  const stats = {
    revenue: orders.reduce((s,o) => s + o.total, 0),
    ordersTotal: orders.length,
    ordersNoi: orders.filter(o => o.status === 'nou').length,
    productsActive: products.filter(p => p.active).length,
    productsTotal: products.length,
    avgOrder: Math.round(orders.reduce((s,o) => s+o.total,0) / orders.length),
  };

  return (
    <AdminCtx.Provider value={{
      products, orders, settings, stats,
      addProduct, updateProduct, deleteProduct, toggleProduct,
      updateOrderStatus, importProducts, setSettings,
    }}>
      {children}
    </AdminCtx.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminCtx);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
};
