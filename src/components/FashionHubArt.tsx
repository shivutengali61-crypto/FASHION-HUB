import React from 'react';

interface ArtProps {
  type: string;
  className?: string;
  title?: string;
  colorScheme?: string;
}

export const FashionHubArt: React.FC<ArtProps> = ({
  type,
  className = 'w-full h-full object-cover',
  title = 'Fashion Item',
  colorScheme = '#1a1a1a',
}) => {
  // Generates dedicated visual SVG vector artworks for apparel categories and store ambiance
  const renderVisual = () => {
    switch (type) {
      case 'store_interior':
      case 'store':
      case 'hero_store':
        return (
          <svg viewBox="0 0 1200 700" className="w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1E22" />
                <stop offset="60%" stopColor="#141416" />
                <stop offset="100%" stopColor="#0B0B0C" />
              </linearGradient>
              <linearGradient id="warmLight" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFF3E0" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFF3E0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#252528" />
                <stop offset="100%" stopColor="#111113" />
              </linearGradient>
              <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B38F56" />
                <stop offset="50%" stopColor="#DFC69A" />
                <stop offset="100%" stopColor="#9E783D" />
              </linearGradient>
            </defs>
            {/* Background Wall */}
            <rect width="1200" height="700" fill="url(#wallGrad)" />
            {/* Floor Perspective */}
            <polygon points="0,480 1200,480 1200,700 0,700" fill="url(#floorGrad)" />
            <line x1="0" y1="480" x2="1200" y2="480" stroke="#333339" strokeWidth="2" />
            {/* Architectural Ceiling Lighting spots */}
            <circle cx="300" cy="80" r="14" fill="#FFE5B4" opacity="0.9" />
            <polygon points="260,80 340,80 440,480 160,480" fill="url(#warmLight)" />
            <circle cx="600" cy="80" r="14" fill="#FFE5B4" opacity="0.9" />
            <polygon points="560,80 640,80 740,480 460,480" fill="url(#warmLight)" />
            <circle cx="900" cy="80" r="14" fill="#FFE5B4" opacity="0.9" />
            <polygon points="860,80 940,80 1040,480 760,480" fill="url(#warmLight)" />

            {/* Brass Fashion Racks Left */}
            <g transform="translate(140, 220)">
              {/* Rack Bars */}
              <rect x="0" y="0" width="320" height="8" rx="4" fill="url(#brassGrad)" />
              <rect x="10" y="8" width="6" height="300" fill="url(#brassGrad)" />
              <rect x="304" y="8" width="6" height="300" fill="url(#brassGrad)" />
              {/* Garments hanging on hangers */}
              <g transform="translate(25, 8)">
                {/* Hanger 1 - Black Tee */}
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -24,40 L -18,120 L 18,120 L 24,40 L 16,15 Z" fill="#18181A" />
              </g>
              <g transform="translate(70, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -26,45 L -20,135 L 20,135 L 26,45 L 16,15 Z" fill="#EAE5D9" />
              </g>
              <g transform="translate(115, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -24,40 L -18,140 L 18,140 L 24,40 L 16,15 Z" fill="#2E4057" />
              </g>
              <g transform="translate(160, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -24,40 L -18,150 L 18,150 L 24,40 L 16,15 Z" fill="#8B4513" />
              </g>
              <g transform="translate(205, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -26,45 L -20,130 L 20,130 L 26,45 L 16,15 Z" fill="#3B5336" />
              </g>
              <g transform="translate(250, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -24,40 L -18,135 L 18,135 L 24,40 L 16,15 Z" fill="#4A4E69" />
              </g>
            </g>

            {/* Central Display Table & Folded Apparel */}
            <g transform="translate(480, 360)">
              {/* Marble/Wood Table Top */}
              <polygon points="0,60 240,60 270,100 -30,100" fill="#2B2B2D" stroke="#3F3F44" strokeWidth="2" />
              <rect x="-30" y="100" width="300" height="14" fill="#1C1C1E" />
              {/* Table Legs */}
              <rect x="-15" y="114" width="8" height="120" fill="url(#brassGrad)" />
              <rect x="247" y="114" width="8" height="120" fill="url(#brassGrad)" />
              {/* Folded Shirts stack */}
              <rect x="10" y="70" width="60" height="12" rx="3" fill="#F0EDE6" />
              <rect x="10" y="58" width="60" height="12" rx="3" fill="#D4AF37" opacity="0.8" />
              <rect x="10" y="46" width="60" height="12" rx="3" fill="#1E293B" />
              {/* Stack 2 */}
              <rect x="90" y="72" width="60" height="12" rx="3" fill="#334155" />
              <rect x="90" y="60" width="60" height="12" rx="3" fill="#475569" />
              <rect x="90" y="48" width="60" height="12" rx="3" fill="#94A3B8" />
              {/* Plant Pot */}
              <polygon points="190,40 215,40 210,80 195,80" fill="#E2E8F0" />
              <circle cx="202" cy="30" r="16" fill="#15803D" opacity="0.85" />
            </g>

            {/* Brass Fashion Racks Right */}
            <g transform="translate(740, 220)">
              <rect x="0" y="0" width="320" height="8" rx="4" fill="url(#brassGrad)" />
              <rect x="10" y="8" width="6" height="300" fill="url(#brassGrad)" />
              <rect x="304" y="8" width="6" height="300" fill="url(#brassGrad)" />
              <g transform="translate(30, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -26,45 L -28,180 L 28,180 L 26,45 L 16,15 Z" fill="#A83232" />
              </g>
              <g transform="translate(80, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -24,40 L -22,190 L 22,190 L 24,40 L 16,15 Z" fill="#D97706" />
              </g>
              <g transform="translate(130, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -24,40 L -18,170 L 18,170 L 24,40 L 16,15 Z" fill="#1E293B" />
              </g>
              <g transform="translate(180, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -26,45 L -20,160 L 20,160 L 26,45 L 16,15 Z" fill="#F8FAFC" />
              </g>
              <g transform="translate(230, 8)">
                <path d="M 0,0 L 15,15 L -15,15 Z" fill="none" stroke="#C5A059" strokeWidth="2" />
                <path d="M -16,15 L -24,40 L -18,165 L 18,165 L 24,40 L 16,15 Z" fill="#0284C7" />
              </g>
            </g>

            {/* Glowing FASHION HUB Sign on Store Wall */}
            <g transform="translate(490, 140)">
              <rect x="-30" y="-10" width="280" height="60" rx="4" fill="#141416" stroke="#2E2E34" strokeWidth="1.5" />
              <text x="110" y="30" textAnchor="middle" fill="#FFFFFF" fontFamily="Syne, sans-serif" fontSize="22" fontWeight="700" letterSpacing="4">
                FASHION HUB
              </text>
            </g>
          </svg>
        );

      case 'tshirt_black':
        return (
          <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="560" fill="#F6F6F4" />
            {/* Subtle texture circle */}
            <circle cx="250" cy="270" r="180" fill="#ECECE8" />
            {/* T-Shirt Silhouette */}
            <g transform="translate(250, 260) scale(1.1)">
              {/* Sleeves & Body */}
              <path
                d="M -60,-130 C -30,-115 30,-115 60,-130 L 150,-70 L 115, -10 L 80,-30 L 80,140 C 80,145 -80,145 -80,140 L -80,-30 L -115,-10 L -150,-70 Z"
                fill="#151517"
              />
              {/* Collar Ribbing */}
              <path
                d="M -45,-123 C -20,-95 20,-95 45,-123 C 30,-115 -30,-115 -45,-123 Z"
                fill="#242428"
              />
              {/* Fold & Fabric Shading Lines */}
              <path d="M -70, 0 C -40, 20 -40, 60 -70, 80" stroke="#222226" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 60, -10 C 30, 20 40, 70 65, 90" stroke="#222226" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M -20, 30 C 0, 45 10, 45 25, 30" stroke="#242428" strokeWidth="2.5" fill="none" />
              {/* Premium Hem Stitching */}
              <line x1="-75" y1="134" x2="75" y2="134" stroke="#2B2B30" strokeWidth="2" strokeDasharray="3,3" />
            </g>
          </svg>
        );

      case 'shirt_cotton':
        return (
          <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="560" fill="#F5F5F3" />
            <circle cx="250" cy="270" r="180" fill="#EAEAE5" />
            <g transform="translate(250, 260) scale(1.1)">
              {/* Shirt Body */}
              <path
                d="M -50,-135 L 50,-135 L 140,-75 L 110, -20 L 75,-35 L 75,145 L -75,145 L -75,-35 L -110,-20 L -140,-75 Z"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="1.5"
              />
              {/* Spread Collar */}
              <polygon points="0,-105 45,-135 15,-80" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <polygon points="0,-105 -45,-135 -15,-80" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              {/* Placket */}
              <rect x="-12" y="-105" width="24" height="250" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
              {/* Mother of Pearl Buttons */}
              <circle cx="0" cy="-60" r="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="0" cy="-15" r="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="0" cy="30" r="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="0" cy="75" r="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="0" cy="120" r="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              {/* Chest Pocket */}
              <path d="M 22,-20 L 58,-20 L 58,25 L 40,35 L 22,25 Z" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>
          </svg>
        );

      case 'jeans_denim':
        return (
          <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="560" fill="#F4F4F2" />
            <circle cx="250" cy="270" r="180" fill="#E5E5E0" />
            <g transform="translate(250, 270) scale(1.05)">
              {/* Waistband */}
              <path d="M -70,-150 L 70,-150 L 75,-120 L -75,-120 Z" fill="#203A58" stroke="#172A40" strokeWidth="1.5" />
              {/* Belt Loops */}
              <rect x="-55" y="-150" width="6" height="30" fill="#1B314B" />
              <rect x="-15" y="-150" width="6" height="30" fill="#1B314B" />
              <rect x="25" y="-150" width="6" height="30" fill="#1B314B" />
              <rect x="55" y="-150" width="6" height="30" fill="#1B314B" />
              {/* Legs */}
              <path
                d="M -75,-120 L 75,-120 L 80, -20 L 58, 160 L 14, 160 L 5, -30 L -5, -30 L -14, 160 L -58, 160 L -80, -20 Z"
                fill="#274668"
              />
              {/* Whiskering / Fading Details */}
              <path d="M -40,-70 Q -15,-60 0,-70" stroke="#3A6394" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M -50,-40 Q -25,-30 -5,-40" stroke="#3A6394" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 40,-70 Q 15,-60 0,-70" stroke="#3A6394" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 50,-40 Q 25,-30 5,-40" stroke="#3A6394" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Copper Stitching Highlights */}
              <path d="M -65,-120 C -40,-115 -25,-90 -25,-75" stroke="#C97A3E" strokeWidth="1.5" fill="none" />
              <path d="M 65,-120 C 40,-115 25,-90 25,-75" stroke="#C97A3E" strokeWidth="1.5" fill="none" />
              {/* Button */}
              <circle cx="0" cy="-135" r="5" fill="#CD7F32" stroke="#8C4F1A" strokeWidth="1" />
            </g>
          </svg>
        );

      case 'dress_casual':
        return (
          <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="560" fill="#F8F6F4" />
            <circle cx="250" cy="270" r="180" fill="#EFECE8" />
            <g transform="translate(250, 260) scale(1.05)">
              {/* Bodice */}
              <path d="M -35,-140 L -15,-140 L 0,-100 L 15,-140 L 35,-140 L 45,-80 L 30,-20 L -30,-20 L -45,-80 Z" fill="#9C4436" />
              {/* Waist Tie / Belt */}
              <rect x="-35" y="-22" width="70" height="8" rx="2" fill="#7B3226" />
              {/* Flowing Skirt / Flare */}
              <path
                d="M -30,-14 C -60,40 -90,120 -105,170 C -50,178 50,178 105,170 C 90,120 60,40 30,-14 Z"
                fill="#B35041"
              />
              {/* Skirt pleats / folds */}
              <path d="M -20,-14 C -35,50 -55,120 -60,172" stroke="#8F392C" strokeWidth="2.5" fill="none" />
              <path d="M 0,-14 C 0,50 0,120 0,173" stroke="#8F392C" strokeWidth="2.5" fill="none" />
              <path d="M 20,-14 C 35,50 55,120 60,172" stroke="#8F392C" strokeWidth="2.5" fill="none" />
            </g>
          </svg>
        );

      case 'trousers_chinos':
        return (
          <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="560" fill="#F6F6F4" />
            <circle cx="250" cy="270" r="180" fill="#EAEAE5" />
            <g transform="translate(250, 270) scale(1.05)">
              {/* Waistband */}
              <path d="M -65,-150 L 65,-150 L 68,-125 L -68,-125 Z" fill="#2E2E33" />
              {/* Legs */}
              <path
                d="M -68,-125 L 68,-125 L 72, -20 L 52, 160 L 12, 160 L 3, -30 L -3, -30 L -12, 160 L -52, 160 L -72, -20 Z"
                fill="#3A3A40"
              />
              {/* Center Crease / Tailoring Line */}
              <line x1="-32" y1="-90" x2="-32" y2="155" stroke="#2B2B30" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="32" y1="-90" x2="32" y2="155" stroke="#2B2B30" strokeWidth="2" strokeDasharray="6,4" />
              {/* Slanted Side Pockets */}
              <line x1="-60" y1="-120" x2="-45" y2="-80" stroke="#1F1F24" strokeWidth="2.5" />
              <line x1="60" y1="-120" x2="45" y2="-80" stroke="#1F1F24" strokeWidth="2.5" />
            </g>
          </svg>
        );

      case 'jacket_denim':
        return (
          <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="560" fill="#F4F5F7" />
            <circle cx="250" cy="270" r="180" fill="#E3E6EB" />
            <g transform="translate(250, 260) scale(1.1)">
              {/* Jacket Torso & Sleeves */}
              <path
                d="M -55,-130 L 55,-130 L 155,-65 L 125, 45 L 85, 30 L 85,120 L -85,120 L -85, 30 L -125, 45 L -155,-65 Z"
                fill="#36557B"
              />
              {/* Collar */}
              <polygon points="0,-115 50,-135 25,-85" fill="#2C4564" stroke="#1F3249" strokeWidth="1.5" />
              <polygon points="0,-115 -50,-135 -25,-85" fill="#2C4564" stroke="#1F3249" strokeWidth="1.5" />
              {/* Chest Flap Pockets */}
              <rect x="-65" y="-55" width="40" height="35" rx="2" fill="#2E4869" stroke="#E2924A" strokeWidth="1.5" />
              <polygon points="-65,-55 -25,-55 -45,-42" fill="#243852" />
              <circle cx="-45" cy="-45" r="3" fill="#D49B4B" />

              <rect x="25" y="-55" width="40" height="35" rx="2" fill="#2E4869" stroke="#E2924A" strokeWidth="1.5" />
              <polygon points="25,-55 65,-55 45,-42" fill="#243852" />
              <circle cx="45" cy="-45" r="3" fill="#D49B4B" />

              {/* Center Placket */}
              <rect x="-14" y="-95" width="28" height="215" fill="#2F4A6D" />
              <circle cx="0" cy="-60" r="4" fill="#D49B4B" />
              <circle cx="0" cy="-20" r="4" fill="#D49B4B" />
              <circle cx="0" cy="20" r="4" fill="#D49B4B" />
              <circle cx="0" cy="60" r="4" fill="#D49B4B" />
              <circle cx="0" cy="100" r="4" fill="#D49B4B" />
            </g>
          </svg>
        );

      case 'ethnic_kurta':
        return (
          <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="560" fill="#F7F5F0" />
            <circle cx="250" cy="270" r="180" fill="#EDE9DF" />
            <g transform="translate(250, 260) scale(1.05)">
              {/* Kurta Body with side slits */}
              <path
                d="M -45,-140 L 45,-140 L 130,-75 L 105, 5 L 75,-15 L 75,170 L -75,170 L -75,-15 L -105, 5 L -130,-75 Z"
                fill="#2C4C3B"
              />
              {/* Mandarin Collar */}
              <rect x="-30" y="-146" width="60" height="16" rx="4" fill="#213B2E" stroke="#D4AF37" strokeWidth="1" />
              {/* Golden Embroidery / Placket */}
              <rect x="-12" y="-130" width="24" height="110" fill="#223E30" stroke="#C5A059" strokeWidth="1.5" />
              <circle cx="0" cy="-110" r="3" fill="#DFC69A" />
              <circle cx="0" cy="-85" r="3" fill="#DFC69A" />
              <circle cx="0" cy="-60" r="3" fill="#DFC69A" />
              <circle cx="0" cy="-35" r="3" fill="#DFC69A" />
              {/* Subtle ethnic motif geometric patterns */}
              <path d="M -50,-50 L -45,-40 L -40,-50 L -45,-60 Z" fill="#C5A059" opacity="0.6" />
              <path d="M 50,-50 L 55,-40 L 60,-50 L 55,-60 Z" fill="#C5A059" opacity="0.6" />
              <path d="M -50,60 L -45,70 L -40,60 L -45,50 Z" fill="#C5A059" opacity="0.6" />
              <path d="M 50,60 L 55,70 L 60,60 L 55,50 Z" fill="#C5A059" opacity="0.6" />
            </g>
          </svg>
        );

      case 'printed_shirt':
        return (
          <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="560" fill="#F5F5F3" />
            <circle cx="250" cy="270" r="180" fill="#ECECE8" />
            <g transform="translate(250, 260) scale(1.1)">
              <path
                d="M -50,-135 L 50,-135 L 140,-75 L 110, -20 L 75,-35 L 75,145 L -75,145 L -75,-35 L -110,-20 L -140,-75 Z"
                fill="#242834"
              />
              {/* Printed floral / abstract shapes */}
              <circle cx="-35" cy="-60" r="10" fill="#D97706" opacity="0.7" />
              <circle cx="40" cy="-50" r="12" fill="#D97706" opacity="0.7" />
              <circle cx="-45" cy="40" r="14" fill="#0284C7" opacity="0.6" />
              <circle cx="35" cy="60" r="12" fill="#0284C7" opacity="0.6" />
              <circle cx="0" cy="10" r="8" fill="#F43F5E" opacity="0.6" />
              {/* Collar */}
              <polygon points="0,-105 45,-135 15,-80" fill="#1E222D" stroke="#33394A" strokeWidth="1.5" />
              <polygon points="0,-105 -45,-135 -15,-80" fill="#1E222D" stroke="#33394A" strokeWidth="1.5" />
              {/* Placket */}
              <rect x="-10" y="-105" width="20" height="250" fill="#1B1E28" />
              <circle cx="0" cy="-60" r="3" fill="#FFFFFF" />
              <circle cx="0" cy="-15" r="3" fill="#FFFFFF" />
              <circle cx="0" cy="30" r="3" fill="#FFFFFF" />
              <circle cx="0" cy="75" r="3" fill="#FFFFFF" />
            </g>
          </svg>
        );

      // Category Artworks
      case 'cat_men':
        return (
          <svg viewBox="0 0 600 700" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="menGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#252930" />
                <stop offset="100%" stopColor="#14161B" />
              </linearGradient>
            </defs>
            <rect width="600" height="700" fill="url(#menGrad)" />
            <circle cx="300" cy="300" r="220" fill="#2E333D" opacity="0.4" />
            {/* Minimalist modern silhouette */}
            <g transform="translate(300, 360)">
              {/* Torso */}
              <path d="M -90,-160 L 90,-160 L 80,180 L -80,180 Z" fill="#E2E8F0" opacity="0.9" />
              {/* Overshirt / Blazer */}
              <path d="M -110,-170 L -40,-170 L -10,120 L -90,160 Z" fill="#1E293B" />
              <path d="M 110,-170 L 40,-170 L 10,120 L 90,160 Z" fill="#1E293B" />
              <polygon points="-40,-170 -10,-170 -20,-80" fill="#0F172A" />
              <polygon points="40,-170 10,-170 20,-80" fill="#0F172A" />
            </g>
            <text x="300" y="620" textAnchor="middle" fill="#FFFFFF" fontFamily="Syne, sans-serif" fontSize="32" fontWeight="700" letterSpacing="4">
              MEN
            </text>
          </svg>
        );

      case 'cat_women':
        return (
          <svg viewBox="0 0 600 700" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="womenGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2D2121" />
                <stop offset="100%" stopColor="#181112" />
              </linearGradient>
            </defs>
            <rect width="600" height="700" fill="url(#womenGrad)" />
            <circle cx="300" cy="300" r="220" fill="#3D2E2E" opacity="0.4" />
            <g transform="translate(300, 350)">
              {/* Flowing dress silhouette */}
              <path d="M -50,-160 L 50,-160 L 35,-60 L -35,-60 Z" fill="#D97706" opacity="0.9" />
              <path d="M -35,-60 L 35,-60 L 120,180 L -120,180 Z" fill="#B45309" />
              <path d="M -20,-60 L 0,180 L -60,180 Z" fill="#92400E" opacity="0.7" />
            </g>
            <text x="300" y="620" textAnchor="middle" fill="#FFFFFF" fontFamily="Syne, sans-serif" fontSize="32" fontWeight="700" letterSpacing="4">
              WOMEN
            </text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="500" fill="#F5F5F3" />
            <circle cx="250" cy="250" r="160" fill="#EAEAE6" />
            <g transform="translate(250, 250)">
              <rect x="-60" y="-80" width="120" height="160" rx="8" fill="#1C1C1E" />
              <line x1="-40" y1="-40" x2="40" y2="-40" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
              <line x1="-40" y1="0" x2="20" y2="0" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
            </g>
            <text x="250" y="420" textAnchor="middle" fill="#666666" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="16" fontWeight="600">
              {title}
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      {renderVisual()}
    </div>
  );
};
