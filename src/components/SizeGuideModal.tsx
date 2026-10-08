import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const menSizes = [
    { size: 'S', chestIn: '38', chestCm: '96', waistIn: '30-31', waistCm: '76-79', lengthIn: '27.5', lengthCm: '70' },
    { size: 'M', chestIn: '40', chestCm: '101', waistIn: '32-33', waistCm: '81-84', lengthIn: '28.5', lengthCm: '72' },
    { size: 'L', chestIn: '42', chestCm: '107', waistIn: '34-35', waistCm: '86-89', lengthIn: '29.5', lengthCm: '75' },
    { size: 'XL', chestIn: '44', chestCm: '112', waistIn: '36-37', waistCm: '91-94', lengthIn: '30.5', lengthCm: '77' },
    { size: 'XXL', chestIn: '46', chestCm: '117', waistIn: '38-40', waistCm: '96-102', lengthIn: '31.5', lengthCm: '80' },
  ];

  const womenSizes = [
    { size: 'XS', bustIn: '32', bustCm: '81', waistIn: '25-26', waistCm: '64-66', hipIn: '35-36', hipCm: '89-91' },
    { size: 'S', bustIn: '34', bustCm: '86', waistIn: '27-28', waistCm: '69-71', hipIn: '37-38', hipCm: '94-97' },
    { size: 'M', bustIn: '36', bustCm: '91', waistIn: '29-30', waistCm: '74-76', hipIn: '39-40', hipCm: '99-102' },
    { size: 'L', bustIn: '38', bustCm: '97', waistIn: '31-32', waistCm: '79-81', hipIn: '41-42', hipCm: '104-107' },
    { size: 'XL', bustIn: '40', bustCm: '102', waistIn: '33-34', waistCm: '84-86', hipIn: '43-44', hipCm: '109-112' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white max-w-xl w-full rounded-sm shadow-2xl overflow-hidden border border-gray-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-[#FBFBFA]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-gray-800" />
            <h2 className="text-base sm:text-lg font-bold text-[#111111] tracking-tight">
              FASHION HUB Size Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Unit Toggle */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('men')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-none cursor-pointer transition-colors ${
                  activeTab === 'men'
                    ? 'bg-[#111111] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Men's Sizing
              </button>
              <button
                onClick={() => setActiveTab('women')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-none cursor-pointer transition-colors ${
                  activeTab === 'women'
                    ? 'bg-[#111111] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Women's Sizing
              </button>
            </div>

            <div className="flex items-center gap-1 bg-gray-100 p-1 text-xs font-medium">
              <button
                onClick={() => setUnit('in')}
                className={`px-2 py-0.5 rounded-none cursor-pointer ${
                  unit === 'in' ? 'bg-white text-black shadow-xs font-bold' : 'text-gray-500'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2 py-0.5 rounded-none cursor-pointer ${
                  unit === 'cm' ? 'bg-white text-black shadow-xs font-bold' : 'text-gray-500'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase font-semibold">
                  <th className="py-2.5 px-3">Size</th>
                  {activeTab === 'men' ? (
                    <>
                      <th className="py-2.5 px-3">Chest ({unit})</th>
                      <th className="py-2.5 px-3">Waist ({unit})</th>
                      <th className="py-2.5 px-3">Length ({unit})</th>
                    </>
                  ) : (
                    <>
                      <th className="py-2.5 px-3">Bust ({unit})</th>
                      <th className="py-2.5 px-3">Waist ({unit})</th>
                      <th className="py-2.5 px-3">Hips ({unit})</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeTab === 'men'
                  ? menSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-gray-900">{row.size}</td>
                        <td className="py-2.5 px-3 text-gray-700 tabular-nums">
                          {unit === 'in' ? row.chestIn : row.chestCm}
                        </td>
                        <td className="py-2.5 px-3 text-gray-700 tabular-nums">
                          {unit === 'in' ? row.waistIn : row.waistCm}
                        </td>
                        <td className="py-2.5 px-3 text-gray-700 tabular-nums">
                          {unit === 'in' ? row.lengthIn : row.lengthCm}
                        </td>
                      </tr>
                    ))
                  : womenSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-gray-900">{row.size}</td>
                        <td className="py-2.5 px-3 text-gray-700 tabular-nums">
                          {unit === 'in' ? row.bustIn : row.bustCm}
                        </td>
                        <td className="py-2.5 px-3 text-gray-700 tabular-nums">
                          {unit === 'in' ? row.waistIn : row.waistCm}
                        </td>
                        <td className="py-2.5 px-3 text-gray-700 tabular-nums">
                          {unit === 'in' ? row.hipIn : row.hipCm}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Instructions Note */}
          <div className="mt-5 p-3.5 bg-[#F9F9F8] border border-gray-200 rounded-sm text-xs text-gray-600 space-y-1">
            <p className="font-semibold text-gray-900">How to measure yourself:</p>
            <p>• <strong>Chest / Bust:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
            <p>• <strong>Waist:</strong> Measure around your natural waistline, where your trousers comfortably sit.</p>
            <p>• <strong>Hips:</strong> Measure around the fullest part of your hips with feet together.</p>
            <p className="text-[11px] text-gray-500 pt-1">
              Need assistance? All FASHION HUB garments offer a free 7-day doorstep size exchange.
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#111111] text-white text-xs font-semibold hover:bg-black cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
