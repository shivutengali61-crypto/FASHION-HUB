import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, Tag } from 'lucide-react';
import { Product } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onFilterByCategory: (category: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onFilterByCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = [
    'Classic Black T-Shirt',
    'Cotton Shirt',
    'Denim Jeans',
    'Dress',
    'Kurta',
    'Trousers',
  ];

  // Search logic across name, category, gender, description, and color names
  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesGender = p.gender.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesColors = p.colors.some((c) => c.name.toLowerCase().includes(query));
        return matchesName || matchesCat || matchesGender || matchesDesc || matchesColors;
      })
    : [];

  const handleProductClick = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  const handleCategoryClick = (cat: string) => {
    onFilterByCategory(cat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border border-gray-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center gap-3 bg-[#FBFBFA]">
          <Search className="w-5 h-5 text-gray-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shirts, t-shirts, jeans, dresses, kurtas..."
            className="flex-1 bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-gray-400 hover:text-black text-xs font-semibold px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black rounded hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6 divide-y divide-gray-100">
          {/* Quick Popular Searches if no query entered */}
          {!searchTerm.trim() && (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="px-3 py-1.5 bg-[#F6F6F4] hover:bg-[#ECECE8] text-gray-800 text-xs font-medium rounded-none border border-gray-200 transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
                  Browse by Category
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['T-SHIRTS', 'SHIRTS', 'JEANS', 'DRESSES', 'ETHNIC WEAR', 'TROUSERS'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className="flex items-center justify-between p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                      >
                        <span>{cat}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchTerm.trim() && (
            <div>
              <p className="text-xs text-gray-500 mb-3">
                Found {filteredProducts.length} results for "{searchTerm}"
              </p>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <p className="text-sm font-semibold">No matching fashion items found</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try searching for "black shirt", "denim", "oversized", or "kurta".
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod)}
                      className="flex items-center gap-4 p-2.5 hover:bg-[#F9F9F8] border border-transparent hover:border-gray-200 transition-all cursor-pointer rounded-none"
                    >
                      <div className="w-14 h-16 bg-gray-100 shrink-0 overflow-hidden">
                        <FashionHubArt type={prod.images[0]} title={prod.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          {prod.category}
                        </span>
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {prod.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-gray-900 tabular-nums">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          {prod.originalPrice > prod.price && (
                            <span className="text-[11px] text-gray-400 line-through tabular-nums">
                              ₹{prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          <div className="flex items-center text-amber-500 text-[11px] font-medium ml-2">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="ml-0.5">{prod.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
