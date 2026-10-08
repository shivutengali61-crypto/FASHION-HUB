import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Tag,
  Star,
  CheckCircle2,
  Mail,
  Heart,
  ChevronRight,
  Package,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import {
  CartItem,
  Category,
  Coupon,
  CustomerReview,
  Order,
  Product,
  ProductColor,
  ProductSize,
  StoreSettings,
  UserAccount,
} from './types';
import { StorageService } from './services/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { WishlistView } from './components/WishlistView';
import { AccountView } from './components/AccountView';
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AdminDashboard } from './components/AdminDashboard';
import { TrustSection } from './components/TrustSection';
import { StoreVisitSection } from './components/StoreVisitSection';
import { ReviewModal } from './components/ReviewModal';
import { FashionHubArt } from './components/FashionHubArt';

export default function App() {
  // App state backed by persistent StorageService
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(StorageService.getSettings());
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [user, setUser] = useState<UserAccount>(StorageService.getUser());

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [tabParam, setTabParam] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Coupon state for Cart & Checkout
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    setProducts(StorageService.getProducts());
    setCategories(StorageService.getCategories());
    setOrders(StorageService.getOrders());
    setWishlist(StorageService.getWishlist());
    setCart(StorageService.getCart());
    setSettings(StorageService.getSettings());
    setCoupons(StorageService.getCoupons());
    setReviews(StorageService.getReviews());
    setUser(StorageService.getUser());
  }, []);

  // Save changes to storage
  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    StorageService.saveProducts(newProducts);
  };

  const handleSaveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    StorageService.saveOrders(newOrders);
  };

  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  const handleSaveCoupons = (newCoupons: Coupon[]) => {
    setCoupons(newCoupons);
    StorageService.saveCoupons(newCoupons);
  };

  const handleSaveUser = (newUser: UserAccount) => {
    setUser(newUser);
    StorageService.saveUser(newUser);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size?: ProductSize,
    color?: ProductColor,
    quantity: number = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || product.colors[0] || { name: 'Standard', hex: '#111111' };
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    const existingIndex = cart.findIndex((item) => item.id === cartItemId);
    let updatedCart: CartItem[];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [
        ...cart,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity,
          price: product.price,
        },
      ];
    }

    setCart(updatedCart);
    StorageService.saveCart(updatedCart);
    setIsCartOpen(true);
  };

  const handleBuyNow = (
    product: Product,
    size?: ProductSize,
    color?: ProductColor,
    quantity: number = 1
  ) => {
    handleAddToCart(product, size, color, quantity);
    setIsCartOpen(false);
    setCurrentTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    const updated = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updated);
    StorageService.saveCart(updated);
  };

  const handleRemoveCartItem = (itemId: string) => {
    const updated = cart.filter((item) => item.id !== itemId);
    setCart(updated);
    StorageService.saveCart(updated);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    let updated: string[];
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    StorageService.saveWishlist(updated);
  };

  // Coupon handling
  const handleApplyCoupon = (code: string) => {
    const match = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
    );
    if (!match) {
      return { success: false, message: 'Invalid or expired promo code.' };
    }
    setAppliedCoupon(match);
    return {
      success: true,
      message: `Coupon ${match.code} applied! Enjoy ${match.discountPercent}% OFF.`,
    };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Navigation router
  const handleNavigate = (tab: string, param?: string) => {
    setCurrentTab(tab);
    setTabParam(param);
    setIsAdmin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  // Add Review
  const handleSubmitReview = (newReview: CustomerReview) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    StorageService.saveReviews(updated);

    // Update product rating and review count
    const targetProduct = products.find((p) => p.id === newReview.productId);
    if (targetProduct) {
      const allProductReviews = updated.filter((r) => r.productId === targetProduct.id);
      const avg =
        allProductReviews.reduce((sum, r) => sum + r.rating, 0) /
        allProductReviews.length;
      const updatedProducts = products.map((p) =>
        p.id === targetProduct.id
          ? {
              ...p,
              rating: Math.round(avg * 10) / 10,
              reviewCount: allProductReviews.length,
            }
          : p
      );
      handleSaveProducts(updatedProducts);
    }
  };

  // Newsletter subscribe
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSubscribed(false);
    }, 4000);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // If in Admin Dashboard view
  if (isAdmin) {
    return (
      <AdminDashboard
        products={products}
        orders={orders}
        coupons={coupons}
        settings={settings}
        categories={categories}
        onSaveProducts={handleSaveProducts}
        onSaveOrders={handleSaveOrders}
        onSaveCoupons={handleSaveCoupons}
        onSaveSettings={handleSaveSettings}
        onCloseAdmin={() => setIsAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#222222]">
      {/* Sticky Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        settings={settings}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
      />

      {/* Main Content Area based on currentTab */}
      <main className="flex-1">
        {/* VIEW: SHOP */}
        {currentTab === 'shop' && (
          <ShopView
            products={products}
            categories={categories}
            initialCategory={tabParam}
            onSelectProduct={handleSelectProduct}
            onQuickView={handleSelectProduct}
            onAddToCartDirect={(p) => handleAddToCart(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* VIEW: CHECKOUT */}
        {currentTab === 'checkout' && (
          <CheckoutView
            cart={cart}
            appliedCoupon={appliedCoupon}
            settings={settings}
            onOrderCompleted={(newOrder) => {
              handleSaveOrders([newOrder, ...orders]);
              setCart([]);
              StorageService.saveCart([]);
            }}
            onNavigate={handleNavigate}
            defaultAddress={user.savedAddresses[0]}
          />
        )}

        {/* VIEW: ORDER TRACKING */}
        {currentTab === 'track-order' && (
          <OrderTrackingView
            orders={orders}
            initialOrderId={tabParam}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: WISHLIST */}
        {currentTab === 'wishlist' && (
          <WishlistView
            wishlistIds={wishlist}
            products={products}
            onRemoveFromWishlist={handleToggleWishlist}
            onMoveToCart={(p) => {
              handleAddToCart(p);
              handleToggleWishlist(p.id);
            }}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW: ACCOUNT */}
        {currentTab === 'account' && (
          <AccountView
            user={user}
            orders={orders}
            wishlistIds={wishlist}
            products={products}
            onNavigate={handleNavigate}
            isAdmin={isAdmin}
            onToggleAdmin={() => setIsAdmin(!isAdmin)}
            onUpdateUser={handleSaveUser}
          />
        )}

        {/* VIEW: ABOUT */}
        {currentTab === 'about' && (
          <AboutView settings={settings} onNavigate={handleNavigate} />
        )}

        {/* VIEW: CONTACT */}
        {currentTab === 'contact' && <ContactView settings={settings} />}

        {/* VIEW: HOME (Default Landing Page) */}
        {currentTab === 'home' && (
          <div className="space-y-16 sm:space-y-24">
            {/* HERO SECTION */}
            <section className="relative bg-[#121214] text-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative z-10">
                <div className="max-w-2xl space-y-6">
                  {/* Subtle Kicker */}
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Contemporary Everyday Fashion</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="font-brand text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white text-balance">
                    {settings.heroHeadline || 'STYLE THAT DEFINES YOU'}
                  </h1>

                  {/* Supporting Text */}
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-xl">
                    {settings.heroSubheadline ||
                      'Discover the latest fashion, everyday essentials and stylish looks at FASHION HUB.'}
                  </p>

                  {/* CTA Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={() => handleNavigate('shop')}
                      className="bg-white hover:bg-gray-100 text-[#111111] font-bold text-xs uppercase tracking-wider py-4 px-8 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-lg"
                    >
                      <span>SHOP NOW</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleNavigate('shop', 'new-arrivals')}
                      className="border border-white/40 hover:border-white text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider py-4 px-8 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>EXPLORE COLLECTION</span>
                    </button>
                  </div>

                  {/* Indian Brand Highlights */}
                  <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-gray-400">
                    <span>✓ 100% Breathable Fabrics</span>
                    <span>✓ Free Shipping over ₹999</span>
                    <span>✓ Cash on Delivery Available</span>
                  </div>
                </div>
              </div>

              {/* Hero Atmospheric Backdrop Artwork */}
              <div className="absolute inset-0 opacity-40 z-0 pointer-events-none">
                <FashionHubArt type="hero_store" title="Fashion Hub Interior" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#121214] via-[#121214]/80 to-transparent z-0" />
            </section>

            {/* SHOPPING CATEGORIES SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-8 border-b border-gray-200 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
                    Curated Wardrobes
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                    SHOP BY CATEGORY
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigate('shop')}
                  className="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Categories</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Attractive Category Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleNavigate('shop', cat.slug)}
                    className="group relative bg-[#F7F7F5] border border-gray-200 overflow-hidden cursor-pointer flex flex-col justify-between"
                  >
                    {/* Visual Slot */}
                    <div className="aspect-[3/4] w-full overflow-hidden relative">
                      <FashionHubArt
                        type={cat.image}
                        title={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors" />

                      {/* Floating Shop Now on desktop hover */}
                      <div className="absolute inset-x-3 bottom-3 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="bg-white text-black text-[11px] font-bold py-2 px-4 shadow-md uppercase tracking-wider">
                          SHOP NOW
                        </span>
                      </div>
                    </div>

                    {/* Card Title & Item Count */}
                    <div className="p-3 bg-white text-center border-t border-gray-100">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 tracking-wider uppercase">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-0.5 sm:hidden font-semibold">
                        Shop Now →
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FEATURED PRODUCTS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-8 border-b border-gray-200 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
                    Handpicked Essentials
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                    FEATURED PRODUCTS
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigate('shop')}
                  className="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Full Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Modern 8-12 Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.slice(0, 8).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelectProduct={handleSelectProduct}
                    onQuickView={handleSelectProduct}
                    onAddToCartDirect={(p) => handleAddToCart(p)}
                    isWishlisted={wishlist.includes(prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            </section>

            {/* SPECIAL OFFER PROMOTIONAL BANNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative bg-[#111111] text-white p-8 sm:p-12 lg:p-16 border border-gray-800 overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-xl space-y-4">
                  <span className="text-xs uppercase tracking-widest font-bold text-amber-400 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Limited Time Seasonal Promotion</span>
                  </span>

                  <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                    UPGRADE YOUR STYLE
                  </h2>

                  <p className="text-sm sm:text-base text-gray-300 font-editorial italic">
                    Flat 20% OFF on selected styles & seasonal essentials.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleNavigate('shop', 'offers')}
                      className="bg-white hover:bg-gray-100 text-[#111111] font-bold text-xs uppercase tracking-wider py-3 px-6 cursor-pointer"
                    >
                      SHOP OFFERS
                    </button>

                    <div className="flex items-center border border-dashed border-gray-500 bg-white/10 px-3 py-2 text-xs gap-2">
                      <span className="text-gray-400">Coupon:</span>
                      <strong className="font-mono text-amber-300 font-bold">
                        {settings.promoCouponCode || 'FASHION20'}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
                  <FashionHubArt type="jacket_denim" title="Offer promo" />
                </div>
              </div>
            </section>

            {/* NEW ARRIVALS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-8 border-b border-gray-200 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
                    Just Dropped
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                    Fresh Styles. New Arrivals.
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigate('shop', 'new-arrivals')}
                  className="bg-[#111111] hover:bg-black text-white text-xs font-bold py-2 px-5 cursor-pointer uppercase tracking-wider"
                >
                  VIEW ALL
                </button>
              </div>

              {/* Grid / Horizontal preview */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {products
                  .filter((p) => p.isNewArrival)
                  .slice(0, 4)
                  .map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelectProduct={handleSelectProduct}
                      onQuickView={handleSelectProduct}
                      onAddToCartDirect={(p) => handleAddToCart(p)}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
              </div>
            </section>

            {/* 4 TRUST BADGES */}
            <TrustSection />

            {/* VISIT OUR STORE SECTION (Google Maps + Store Details) */}
            <StoreVisitSection settings={settings} />

            {/* CUSTOMER REVIEWS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-8 border-b border-gray-200 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
                    Verified Customer Feedback
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                    WHAT OUR SHOPPERS SAY
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setReviewProduct(products[0]);
                    setIsReviewModalOpen(true);
                  }}
                  className="text-xs bg-[#111111] hover:bg-black text-white py-2 px-4 font-bold cursor-pointer uppercase tracking-wider"
                >
                  WRITE A REVIEW
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reviews.slice(0, 4).map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 bg-[#FBFBFA] border border-gray-200 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 mb-2">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-700 italic leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-gray-900">{rev.customerName}</strong>
                        {rev.isVerifiedPurchase && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 font-semibold">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {rev.productName} · {rev.location || 'India'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* NEWSLETTER SECTION */}
            <section className="bg-[#111111] text-white py-16 border-t border-gray-800">
              <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                  Join The Fashion Hub Circle
                </span>
                <h2 className="font-brand text-3xl sm:text-4xl font-black tracking-tight text-white">
                  STAY IN STYLE
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                  Get updates about new arrivals, special offers and exclusive deals delivered directly to your inbox.
                </p>

                {newsletterSubscribed ? (
                  <div className="p-3 bg-emerald-900/60 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Welcome! You're subscribed to FASHION HUB updates.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs p-3 focus:outline-none focus:border-white"
                    />
                    <button
                      type="submit"
                      className="bg-white hover:bg-gray-100 text-[#111111] font-bold text-xs uppercase tracking-wider py-3 px-6 cursor-pointer transition-colors"
                    >
                      SUBSCRIBE
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        settings={settings}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
      />

      {/* MODALS & DRAWERS */}
      {/* 1. Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setCurrentTab('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        settings={settings}
      />

      {/* 2. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={handleSelectProduct}
        onFilterByCategory={(cat) => handleNavigate('shop', cat)}
      />

      {/* 3. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenReviewModal={(p) => {
          setReviewProduct(p);
          setIsReviewModalOpen(true);
        }}
        reviews={reviews}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* 4. Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* 5. Write Review Modal */}
      {reviewProduct && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          product={reviewProduct}
          onSubmitReview={handleSubmitReview}
          defaultCustomerName={user.name}
        />
      )}
    </div>
  );
}
