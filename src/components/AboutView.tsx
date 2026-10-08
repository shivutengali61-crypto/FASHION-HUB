import React from 'react';
import { StoreSettings } from '../types';
import { FashionHubArt } from './FashionHubArt';
import { Sparkles, Shield, HeartHandshake, Scissors } from 'lucide-react';

interface AboutViewProps {
  settings: StoreSettings;
  onNavigate: (tab: string, param?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ settings, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Editorial Hero */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
          Our Brand Philosophy
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          ABOUT FASHION HUB
        </h1>
        <p className="font-editorial text-lg sm:text-xl text-gray-700 italic leading-relaxed pt-2">
          "{settings.aboutStory}"
        </p>
      </div>

      {/* Store Ambiance Showcase Banner */}
      <div className="relative aspect-[16/8] max-w-5xl mx-auto bg-black border border-gray-200 shadow-xl overflow-hidden">
        <FashionHubArt type="store_interior" title="Fashion Hub Atmosphere" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
            Craftsmanship & Everyday Luxury
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Built For Indian Sensibilities & Global Trends
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
            From bio-washed supima cotton tees that withstand tropical monsoons to structured linens and denim that age gracefully — we eliminate middleman markups so you experience authentic premium fashion.
          </p>
        </div>
      </div>

      {/* Mission & Core Pillars */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Our Purpose & Promise
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed max-w-2xl mx-auto">
            {settings.aboutMission}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="p-6 bg-[#FBFBFA] border border-gray-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 mx-auto flex items-center justify-center text-gray-900">
              <Scissors className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Precision Tailoring</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every seam, collar fold, and hem is calibrated for contemporary Indian body silhouettes.
            </p>
          </div>

          <div className="p-6 bg-[#FBFBFA] border border-gray-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 mx-auto flex items-center justify-center text-gray-900">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Direct Value</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              We design, source, and deliver directly to you, keeping luxury everyday fashion accessible.
            </p>
          </div>

          <div className="p-6 bg-[#FBFBFA] border border-gray-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 mx-auto flex items-center justify-center text-gray-900">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Trust & Transparency</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Real store locations, instant WhatsApp assistance, and genuine verified reviews.
            </p>
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
          >
            EXPLORE OUR COLLECTIONS
          </button>
        </div>
      </div>
    </div>
  );
};
