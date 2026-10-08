import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink } from 'lucide-react';
import { StoreSettings } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface StoreVisitSectionProps {
  settings: StoreSettings;
}

export const StoreVisitSection: React.FC<StoreVisitSectionProps> = ({ settings }) => {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Store Visual Ambiance / Illustration */}
          <div className="lg:col-span-6 relative aspect-[16/10] bg-[#18181A] rounded-none overflow-hidden shadow-lg border border-gray-200">
            <FashionHubArt type="store_interior" title="Fashion Hub Flagship Store" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-[11px] uppercase tracking-widest font-bold text-amber-300">
                Flagship Experience Store
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Experience FASHION HUB In Person
              </h3>
              <p className="text-xs text-gray-300 mt-1 max-w-md">
                Walk in to touch premium textures, try custom tailored fits, and explore our newest seasonal drops.
              </p>
            </div>
          </div>

          {/* Right: Store Information & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
                Retail Outlets
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                VISIT OUR STORE
              </h2>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Step into our retail haven featuring curated clothing racks, organized denim walls, and personalized styling assistance.
              </p>
            </div>

            {/* Address & Hours Cards */}
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#FBFBFA] border border-gray-200 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-900 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-bold text-sm">Store Address</strong>
                  <p className="text-gray-600 mt-0.5 leading-relaxed">{settings.address}</p>
                </div>
              </div>

              <div className="p-4 bg-[#FBFBFA] border border-gray-200 flex items-start gap-3">
                <Clock className="w-4 h-4 text-gray-900 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-bold text-sm">Operating Hours</strong>
                  <p className="text-gray-600 mt-0.5">{settings.openingHours}</p>
                  <p className="text-gray-400 text-[11px] mt-0.5">Open all 7 days including public holidays</p>
                </div>
              </div>
            </div>

            {/* Three Working Action Buttons: Get Directions, Call, WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <a
                href={settings.googleMapsLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111111] hover:bg-black text-white text-xs font-bold py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer uppercase tracking-wider"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>DIRECTIONS</span>
              </a>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 text-xs font-bold py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL STORE</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Fashion%20Hub,%20I%20am%20planning%20to%20visit%20your%20store.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer uppercase tracking-wider shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
