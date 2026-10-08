import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Users,
  Percent,
  Settings,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  ExternalLink,
  RotateCcw,
  TrendingUp,
  Truck,
  IndianRupee,
  CheckCircle2,
} from 'lucide-react';
import { Category, Coupon, Order, OrderStatus, Product, ProductSize, StoreSettings, UserAccount } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  settings: StoreSettings;
  categories: Category[];
  onSaveProducts: (products: Product[]) => void;
  onSaveOrders: (orders: Order[]) => void;
  onSaveCoupons: (coupons: Coupon[]) => void;
  onSaveSettings: (settings: StoreSettings) => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  coupons,
  settings,
  categories,
  onSaveProducts,
  onSaveOrders,
  onSaveCoupons,
  onSaveSettings,
  onCloseAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'inventory' | 'promotions' | 'settings'
  >('overview');

  // Product Form State (Add / Edit)
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'SHIRTS',
    gender: 'Men',
    price: 999,
    originalPrice: 1499,
    discountPercentage: 33,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    inStock: true,
    stockQuantity: 30,
    description: '',
    material: '100% Cotton',
    careInstructions: 'Machine wash cold',
    images: ['shirt_cotton'],
    sku: `FH-SKU-${Math.floor(100 + Math.random() * 900)}`,
  });

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(20);
  const [newCouponMin, setNewCouponMin] = useState(999);
  const [newCouponMax, setNewCouponMax] = useState(500);

  // Orders Search
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Overview metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((is, it) => is + it.quantity, 0), 0);
  const lowStockCount = products.filter((p) => p.stockQuantity < 25).length;

  // PRODUCT HANDLERS
  const handleOpenAddProduct = () => {
    setProductForm({
      id: `fh-prod-${Date.now()}`,
      name: '',
      slug: '',
      category: 'SHIRTS',
      gender: 'Men',
      price: 899,
      originalPrice: 1299,
      discountPercentage: 30,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Pitch Black', hex: '#111111' },
        { name: 'Pure White', hex: '#FFFFFF' },
      ],
      inStock: true,
      stockQuantity: 35,
      description: 'Crafted from premium Indian cotton for daily comfort.',
      material: '100% Pure Cotton',
      careInstructions: 'Machine wash cold with like colors',
      images: ['shirt_cotton'],
      rating: 4.8,
      reviewCount: 1,
      sku: `FH-${Math.floor(1000 + Math.random() * 9000)}`,
      fit: 'Regular Fit',
    });
    setIsEditingProduct(true);
  };

  const handleEditProduct = (p: Product) => {
    setProductForm({ ...p });
    setIsEditingProduct(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter((p) => p.id !== id);
      onSaveProducts(updated);
    }
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    const discount =
      productForm.originalPrice && productForm.originalPrice > productForm.price
        ? Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100)
        : 0;

    const completedProduct: Product = {
      id: productForm.id || `fh-prod-${Date.now()}`,
      name: productForm.name,
      slug: productForm.name.toLowerCase().replace(/\s+/g, '-'),
      category: productForm.category || 'SHIRTS',
      gender: (productForm.gender as any) || 'Men',
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice || productForm.price),
      discountPercentage: discount,
      sizes: productForm.sizes || ['S', 'M', 'L', 'XL'],
      colors: productForm.colors || [{ name: 'Black', hex: '#111111' }],
      inStock: (productForm.stockQuantity || 0) > 0,
      stockQuantity: Number(productForm.stockQuantity || 0),
      description: productForm.description || '',
      material: productForm.material || '100% Cotton',
      careInstructions: productForm.careInstructions || 'Machine wash cold',
      images: productForm.images && productForm.images.length > 0 ? productForm.images : ['shirt_cotton'],
      rating: productForm.rating || 4.8,
      reviewCount: productForm.reviewCount || 1,
      sku: productForm.sku || `FH-${Date.now().toString().slice(-4)}`,
      fit: productForm.fit || 'Regular Fit',
    };

    const exists = products.find((p) => p.id === completedProduct.id);
    let updated: Product[];
    if (exists) {
      updated = products.map((p) => (p.id === completedProduct.id ? completedProduct : p));
    } else {
      updated = [completedProduct, ...products];
    }
    onSaveProducts(updated);
    setIsEditingProduct(false);
  };

  // ORDER HANDLERS
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        const history = [...o.trackingHistory];
        const now = new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });
        history.push({
          status: newStatus,
          date: now,
          completed: true,
          note: `Status updated by Store Admin to ${newStatus}`,
        });

        return {
          ...o,
          orderStatus: newStatus,
          trackingHistory: history,
        };
      }
      return o;
    });
    onSaveOrders(updated);
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Cancel this order?')) {
      handleUpdateOrderStatus(orderId, 'Cancelled');
    }
  };

  const handleProcessRefund = (orderId: string) => {
    if (confirm('Process full refund for this order?')) {
      const updated = orders.map((o) =>
        o.id === orderId ? { ...o, paymentStatus: 'Refunded' as const } : o
      );
      onSaveOrders(updated);
    }
  };

  // INVENTORY RESTOCK HANDLER
  const handleRestockProduct = (id: string, amount: number) => {
    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            stockQuantity: p.stockQuantity + amount,
            inStock: true,
          }
        : p
    );
    onSaveProducts(updated);
  };

  // PROMOTIONS HANDLER
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newCoup: Coupon = {
      id: `coup-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minOrderAmount: Number(newCouponMin),
      maxDiscount: Number(newCouponMax),
      validUntil: '2026-12-31',
      isActive: true,
      description: `Flat ${newCouponDiscount}% OFF on orders above ₹${newCouponMin}`,
    };

    onSaveCoupons([...coupons, newCoup]);
    setNewCouponCode('');
  };

  const handleDeleteCoupon = (id: string) => {
    onSaveCoupons(coupons.filter((c) => c.id !== id));
  };

  const handleToggleCouponActive = (id: string) => {
    onSaveCoupons(
      coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // STORE SETTINGS HANDLER
  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (!orderSearchQuery.trim()) return true;
    const q = orderSearchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#F7F7F5] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Bar Top */}
        <div className="bg-[#111111] text-white p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-amber-400 text-black font-extrabold uppercase px-2 py-0.5 tracking-wider">
                ADMIN CONSOLE
              </span>
              <span className="text-gray-400 text-xs">· FASHION HUB Control Center</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
              Store & Inventory Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddProduct}
              className="bg-white text-black hover:bg-gray-100 text-xs font-bold py-2.5 px-4 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ADD PRODUCT</span>
            </button>
            <button
              onClick={onCloseAdmin}
              className="border border-gray-600 hover:border-white text-white text-xs font-semibold py-2.5 px-4 transition-colors cursor-pointer"
            >
              Exit to Customer Store
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
          {[
            { id: 'overview', label: 'Store Overview', icon: TrendingUp },
            { id: 'products', label: `Products (${products.length})`, icon: ShoppingBag },
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'inventory', label: `Inventory & Alerts (${lowStockCount})`, icon: AlertTriangle },
            { id: 'promotions', label: `Coupons & Offers (${coupons.length})`, icon: Percent },
            { id: 'settings', label: 'Store Settings & Content', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-white border-black shadow-xs'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 border border-gray-200 space-y-1">
                <span className="text-[11px] uppercase font-bold text-gray-500">Total Revenue</span>
                <p className="text-2xl font-black text-gray-900 tabular-nums">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  From {orders.length} online orders
                </span>
              </div>

              <div className="bg-white p-5 border border-gray-200 space-y-1">
                <span className="text-[11px] uppercase font-bold text-gray-500">Items Sold</span>
                <p className="text-2xl font-black text-gray-900 tabular-nums">
                  {totalItemsSold}
                </p>
                <span className="text-[10px] text-gray-500 font-medium">Garments dispatched</span>
              </div>

              <div className="bg-white p-5 border border-gray-200 space-y-1">
                <span className="text-[11px] uppercase font-bold text-gray-500">Active Catalog</span>
                <p className="text-2xl font-black text-gray-900 tabular-nums">
                  {products.length}
                </p>
                <span className="text-[10px] text-gray-500 font-medium">Styles across 10 categories</span>
              </div>

              <div className="bg-white p-5 border border-gray-200 space-y-1">
                <span className="text-[11px] uppercase font-bold text-gray-500">Low-Stock Alert</span>
                <p className="text-2xl font-black text-amber-600 tabular-nums">
                  {lowStockCount}
                </p>
                <span className="text-[10px] text-amber-700 font-medium">Garments need restock</span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders Card */}
              <div className="bg-white p-5 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Recent Customer Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#111111] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-2">
                  {orders.slice(0, 4).map((ord) => (
                    <div
                      key={ord.id}
                      className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-100 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="font-mono">{ord.id}</strong>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 font-bold">
                            {ord.orderStatus}
                          </span>
                        </div>
                        <p className="text-gray-500 text-[11px] mt-0.5">
                          {ord.customerName} · {ord.items.length} items
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold tabular-nums">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </span>
                        <p className="text-[10px] text-gray-400">{ord.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Quick Restock */}
              <div className="bg-white p-5 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Low Stock Attention</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="text-xs font-bold text-[#111111] hover:underline"
                  >
                    Open Inventory
                  </button>
                </div>

                <div className="space-y-2">
                  {products
                    .filter((p) => p.stockQuantity < 25)
                    .slice(0, 4)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2.5 bg-amber-50/50 border border-amber-200 text-xs"
                      >
                        <div>
                          <strong className="text-gray-900">{p.name}</strong>
                          <p className="text-amber-800 text-[11px]">
                            Only {p.stockQuantity} units left in warehouse
                          </p>
                        </div>
                        <button
                          onClick={() => handleRestockProduct(p.id, 25)}
                          className="bg-black hover:bg-gray-800 text-white text-[11px] font-bold px-3 py-1 cursor-pointer"
                        >
                          +25 Restock
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white p-5 sm:p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Product Catalog Management</h2>
                <p className="text-xs text-gray-500">
                  Add new fashion items, modify pricing, upload artworks, and adjust sizing options.
                </p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="bg-[#111111] hover:bg-black text-white text-xs font-bold py-2.5 px-4 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW PRODUCT</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase font-semibold">
                    <th className="py-3 px-3">Item</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">MRP (Original)</th>
                    <th className="py-3 px-3">Discount</th>
                    <th className="py-3 px-3">Stock</th>
                    <th className="py-3 px-3">Sizes</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3 flex items-center gap-3">
                        <div className="w-10 h-12 bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                          <FashionHubArt type={p.images[0]} title={p.name} />
                        </div>
                        <div>
                          <strong className="text-gray-900 block font-semibold">{p.name}</strong>
                          <span className="text-[10px] text-gray-400 font-mono">{p.sku}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2 py-0.5">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-gray-900 tabular-nums">
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-gray-500 tabular-nums">
                        ₹{p.originalPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        {p.discountPercentage > 0 ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                            {p.discountPercentage}% OFF
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`font-bold tabular-nums ${
                            p.stockQuantity < 20 ? 'text-amber-600' : 'text-gray-900'
                          }`}
                        >
                          {p.stockQuantity} units
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-500">{p.sizes.join(', ')}</td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="p-1 text-gray-600 hover:text-black hover:bg-gray-200 rounded cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCT EDIT/ADD MODAL */}
        {isEditingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900">
                  {productForm.name ? 'Edit Fashion Item' : 'Add New Fashion Item'}
                </h3>
                <button
                  onClick={() => setIsEditingProduct(false)}
                  className="p-1 hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProductSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name || ''}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. Classic Linen Shirt"
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Category *</label>
                    <select
                      value={productForm.category || 'SHIRTS'}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name.toUpperCase()}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={productForm.price || ''}
                      onChange={(e) =>
                        setProductForm({ ...productForm, price: Number(e.target.value) })
                      }
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Original MRP (₹)</label>
                    <input
                      type="number"
                      value={productForm.originalPrice || ''}
                      onChange={(e) =>
                        setProductForm({ ...productForm, originalPrice: Number(e.target.value) })
                      }
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      value={productForm.stockQuantity || ''}
                      onChange={(e) =>
                        setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })
                      }
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Gender</label>
                    <select
                      value={productForm.gender || 'Men'}
                      onChange={(e) => setProductForm({ ...productForm, gender: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Artwork Preset Template</label>
                    <select
                      value={productForm.images?.[0] || 'shirt_cotton'}
                      onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    >
                      <option value="tshirt_black">Black T-Shirt</option>
                      <option value="shirt_cotton">White Cotton Shirt</option>
                      <option value="jeans_denim">Denim Jeans</option>
                      <option value="dress_casual">Casual Dress</option>
                      <option value="trousers_chinos">Chino Trousers</option>
                      <option value="jacket_denim">Denim Jacket</option>
                      <option value="ethnic_kurta">Festive Kurta</option>
                      <option value="printed_shirt">Printed Fashion Shirt</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Material & Fabric</label>
                    <input
                      type="text"
                      value={productForm.material || ''}
                      onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                      placeholder="e.g. 100% Combed Cotton"
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Care Instructions</label>
                    <input
                      type="text"
                      value={productForm.careInstructions || ''}
                      onChange={(e) =>
                        setProductForm({ ...productForm, careInstructions: e.target.value })
                      }
                      placeholder="e.g. Machine wash cold"
                      className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="px-4 py-2 border border-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#111111] text-white font-bold cursor-pointer"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white p-5 sm:p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Customer Orders Fulfillment</h2>
                <p className="text-xs text-gray-500">
                  Update live delivery stages, cancel orders, process refunds, and view shipping addresses.
                </p>
              </div>

              {/* Order Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="Search Order ID / Customer..."
                  className="w-full text-xs pl-8 pr-3 py-2 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((ord) => (
                <div key={ord.id} className="border border-gray-200 bg-[#FBFBFA] divide-y divide-gray-100 text-xs">
                  {/* Order Head */}
                  <div className="p-4 flex flex-wrap items-center justify-between gap-3 bg-white">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-sm">{ord.id}</strong>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 uppercase">
                          {ord.orderStatus}
                        </span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5">
                          {ord.paymentMethod} ({ord.paymentStatus})
                        </span>
                      </div>
                      <p className="text-gray-500 mt-1">
                        Customer: <strong>{ord.customerName}</strong> ({ord.customerEmail} · {ord.customerPhone})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base tabular-nums">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Address & Items */}
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-bold text-gray-700 block mb-1">Delivery Address:</span>
                      <p className="text-gray-600">
                        {ord.shippingAddress.fullName}, {ord.shippingAddress.addressLine},{' '}
                        {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-gray-700 block mb-1">Ordered Items ({ord.items.length}):</span>
                      <div className="space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-gray-600">
                            <span>
                              {it.quantity}x {it.name} ({it.size}, {it.colorName})
                            </span>
                            <span className="font-medium tabular-nums">₹{it.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Status Stepper Update */}
                  <div className="p-3 px-4 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-700">Update Status:</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="p-1.5 bg-white border border-gray-300 font-medium focus:border-black cursor-pointer"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      {ord.paymentStatus !== 'Refunded' && (
                        <button
                          onClick={() => handleProcessRefund(ord.id)}
                          className="px-3 py-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold cursor-pointer"
                        >
                          Process Refund
                        </button>
                      )}
                      {ord.orderStatus !== 'Cancelled' && (
                        <button
                          onClick={() => handleCancelOrder(ord.id)}
                          className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold cursor-pointer"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INVENTORY ALERTS */}
        {activeTab === 'inventory' && (
          <div className="bg-white p-5 sm:p-6 border border-gray-200 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Inventory Stock & Low-Stock Alerts</h2>
              <p className="text-xs text-gray-500">
                Monitor available units across all clothing racks and warehouses with instant restock.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase font-semibold">
                    <th className="py-3 px-3">Item</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Available Quantity</th>
                    <th className="py-3 px-3 text-right">Quick Restock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => {
                    const isLow = p.stockQuantity < 25;
                    const isOut = p.stockQuantity <= 0;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-semibold text-gray-900">{p.name}</td>
                        <td className="py-3 px-3 text-gray-600">{p.category}</td>
                        <td className="py-3 px-3">
                          {isOut ? (
                            <span className="text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 font-bold">
                              OUT OF STOCK
                            </span>
                          ) : isLow ? (
                            <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 font-bold">
                              LOW STOCK
                            </span>
                          ) : (
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-bold">
                              HEALTHY
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-bold tabular-nums">{p.stockQuantity} units</td>
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            onClick={() => handleRestockProduct(p.id, 10)}
                            className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold cursor-pointer"
                          >
                            +10
                          </button>
                          <button
                            onClick={() => handleRestockProduct(p.id, 25)}
                            className="px-2.5 py-1 bg-black hover:bg-gray-800 text-white font-semibold cursor-pointer"
                          >
                            +25
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PROMOTIONS & COUPONS */}
        {activeTab === 'promotions' && (
          <div className="bg-white p-5 sm:p-6 border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Promotions & Discount Coupons</h2>
                <p className="text-xs text-gray-500">
                  Configure promotional coupons, active discounts, and promotional banners.
                </p>
              </div>
            </div>

            {/* Create Coupon Form */}
            <form onSubmit={handleCreateCoupon} className="p-4 bg-[#FBFBFA] border border-gray-200 text-xs space-y-3">
              <h3 className="font-bold text-gray-900 uppercase">Create New Promo Coupon</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. DIWALI25"
                    className="w-full p-2 bg-white border border-gray-300 focus:border-black uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Discount %</label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-gray-300 focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Min Order Amount (₹)</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-gray-300 focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={newCouponMax}
                    onChange={(e) => setNewCouponMax(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-gray-300 focus:border-black"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#111111] hover:bg-black text-white font-bold py-2 px-5 cursor-pointer uppercase tracking-wider"
              >
                CREATE COUPON
              </button>
            </form>

            {/* Coupons List */}
            <div className="space-y-2">
              {coupons.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3.5 bg-white border border-gray-200 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-black bg-gray-100 px-2 py-1">
                      {c.code}
                    </span>
                    <div>
                      <strong className="text-gray-900 block">{c.description}</strong>
                      <span className="text-gray-400 text-[11px]">
                        Min ₹{c.minOrderAmount} · Max Cap ₹{c.maxDiscount}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleCouponActive(c.id)}
                      className={`px-3 py-1 font-bold cursor-pointer ${
                        c.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Disabled'}
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(c.id)}
                      className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STORE SETTINGS & WEBSITE CONTENT */}
        {activeTab === 'settings' && (
          <div className="bg-white p-5 sm:p-6 border border-gray-200 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Store Settings & Dynamic Website Content
              </h2>
              <p className="text-xs text-gray-500">
                Update store name, contact numbers, WhatsApp, physical address, Google Maps URL, and homepage copy.
              </p>
            </div>

            {settingsSavedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Store settings updated successfully! Live website refreshed.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettingsSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.businessName}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, businessName: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Business Category *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.category}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, category: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Store Physical Address *</label>
                <input
                  type="text"
                  required
                  value={settingsForm.address}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, address: e.target.value })
                  }
                  className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.phone}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">WhatsApp Number (e.g. 919876543210) *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Customer Support Email *</label>
                  <input
                    type="email"
                    required
                    value={settingsForm.email}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, email: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Opening Hours *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.openingHours}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, openingHours: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Google Maps Link *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.googleMapsLocation}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, googleMapsLocation: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Homepage Content Fields */}
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <h3 className="font-bold text-gray-900 uppercase">Website Copy & Hero Content</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Hero Main Headline</label>
                    <input
                      type="text"
                      value={settingsForm.heroHeadline}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })
                      }
                      className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Hero Subheadline</label>
                    <input
                      type="text"
                      value={settingsForm.heroSubheadline}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, heroSubheadline: e.target.value })
                      }
                      className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Top Announcement Banner Text</label>
                  <input
                    type="text"
                    value={settingsForm.promoBannerText}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, promoBannerText: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">About Story Text</label>
                  <textarea
                    rows={3}
                    value={settingsForm.aboutStory}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, aboutStory: e.target.value })
                    }
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#111111] hover:bg-black text-white font-bold py-3 px-8 cursor-pointer uppercase tracking-wider shadow-md"
                >
                  SAVE STORE SETTINGS
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
