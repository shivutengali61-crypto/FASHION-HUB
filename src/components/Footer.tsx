import React from 'react';
import {
  Instagram,
  Facebook,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { StoreSettings } from '../types';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
  settings: StoreSettings;
  onOpenSizeGuide: () => void;
  onToggleAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  settings,
  onOpenSizeGuide,
  onToggleAdmin,
}) => {
  return (
    <footer className="bg-[#111111] text-[#E0E0DE] pt-16 pb-10 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2A2A2A]">
          {/* Column 1: Brand & Store Contacts */}
          <div className="space-y-4">
            <span className="font-brand text-2xl font-bold tracking-tight text-white block">
              {settings.businessName || 'FASHION HUB'}
            </span>
            <p className="text-xs text-gray-400 leading-relaxed font-editorial italic text-base text-gray-300">
              "{settings.tagline || 'Style for every occasion.'}"
            </p>
            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-gray-300 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <span>{settings.openingHours}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-3">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#333333] flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#333333] flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Fashion%20Hub,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              SHOP
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'men')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men's Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'women')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women's Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'new-arrivals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'offers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Special Offers & Discounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 't-shirts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  T-Shirts & Tops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'shirts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pure Cotton Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'jeans')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Denim & Trousers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER SERVICE */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              CUSTOMER SERVICE
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track-order')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Doorstep Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Easy 7-Day Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: COMPANY & ADMIN */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About FASHION HUB
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Flagship Store Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Quality & Fabric Promise
                </button>
              </li>
              <li>
                <span className="text-gray-500">Privacy Policy · Terms of Service</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onToggleAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-amber-300 rounded text-xs transition-colors cursor-pointer border border-[#333333]"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 {settings.businessName || 'FASHION HUB'}. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Verified Indian Fashion Brand</span>
            <span>·</span>
            <span>100% Authentic Apparel</span>
            <span>·</span>
            <span>Secure 256-Bit Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
