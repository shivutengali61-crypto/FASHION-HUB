import React from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const badges = [
    {
      icon: Sparkles,
      title: 'Quality Fashion',
      desc: 'Combed bio-washed cotton, long-staple threads & rigorous stitching standards.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      desc: '100% verified checkout with instant UPI, NetBanking, Cards & Cash on Delivery.',
    },
    {
      icon: RefreshCw,
      title: 'Easy Shopping',
      desc: 'Hassle-free 7-day doorstep size replacement and convenient return options.',
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      desc: 'Fast, trackable express courier delivery to all serviceable Indian pincodes.',
    },
  ];

  return (
    <section className="py-12 bg-[#FBFBFA] border-y border-[#EFEFEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
