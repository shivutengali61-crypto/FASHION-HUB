import React, { useState } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { StoreSettings } from '../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  settings: StoreSettings;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  settings,
  isAdmin,
  onToggleAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const navLinks = [
    { label: 'Home', tab: 'home' },
    { label: 'Shop', tab: 'shop' },
    { label: 'Men', tab: 'shop', param: 'men' },
    { label: 'Women', tab: 'shop', param: 'women' },
    { label: 'New Arrivals', tab: 'shop', param: 'new-arrivals' },
    { label: 'Offers', tab: 'shop', param: 'offers' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' },
  ];

  const handleNavClick = (tab: string, param?: string) => {
    onNavigate(tab, param);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAEAE8] transition-all">
      {/* Top Promotional Announcement Bar */}
      {!bannerDismissed && settings.promoBannerText && (
        <div className="bg-[#111111] text-white text-xs py-2 px-4 flex items-center justify-between">
          <div className="mx-auto flex items-center gap-2 text-center font-medium tracking-wide truncate">
            <span>{settings.promoBannerText}</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-gray-400 hover:text-white p-1 text-xs shrink-0 cursor-pointer"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Hamburger & Search */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-gray-800 hover:text-black focus:outline-none"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-700 hover:text-black focus:outline-none"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Wordmark Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <button
              onClick={() => handleNavClick('home')}
              className="group inline-flex flex-col items-center md:items-start text-left focus:outline-none cursor-pointer"
            >
              <span className="font-brand text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] transition-transform duration-200 group-hover:opacity-90">
                {settings.businessName || 'FASHION HUB'}
              </span>
              <span className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-[#777777] font-semibold -mt-1">
                Contemporary Fashion
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive =
                currentTab === link.tab &&
                (!link.param || (link.param === 'new-arrivals' && currentTab === 'shop'));
              return (
                <button
                  key={`${link.label}-${link.param || ''}`}
                  onClick={() => handleNavClick(link.tab, link.param)}
                  className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-150 py-1 cursor-pointer relative ${
                    isActive
                      ? 'text-[#111111] font-bold'
                      : 'text-[#555555] hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search */}
            <button
              onClick={onOpenSearch}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 bg-[#F7F7F5] hover:bg-[#EFEFEA] rounded-full border border-gray-200 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 text-gray-700" />
              <span>Search styles...</span>
              <kbd className="hidden lg:inline-block text-[10px] bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-400">
                ⌘K
              </kbd>
            </button>

            {/* Admin Toggle indicator button */}
            <button
              onClick={onToggleAdmin}
              title={isAdmin ? 'Viewing as Admin (Click to switch to Customer)' : 'Open Store Admin Dashboard'}
              className={`p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                isAdmin
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              onClick={() => handleNavClick('account')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                currentTab === 'account'
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Icon with Dynamic Badge */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#111111] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon with Dynamic Count Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.tab, link.param)}
                className="text-left px-3 py-2 text-sm font-medium text-gray-800 hover:bg-[#F7F7F5] rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick Support & WhatsApp in Mobile Drawer */}
          <div className="pt-1 flex flex-col gap-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Fashion%20Hub,%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-semibold py-2.5 px-4 rounded-lg shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({settings.phone})</span>
            </a>

            <button
              onClick={() => {
                onToggleAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-xs font-semibold py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAdmin ? 'Exit Admin Mode' : 'Switch to Admin Portal'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
