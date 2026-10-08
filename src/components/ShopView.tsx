import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Check,
  Star,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Category, Product, ProductSize } from '../types';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  categories,
  initialCategory,
  onSelectProduct,
  onQuickView,
  onAddToCartDirect,
  wishlist,
  onToggleWishlist,
}) => {
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory ? initialCategory.toUpperCase() : 'ALL'
  );
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedSize, setSelectedSize] = useState<string>('ALL');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('ALL');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    'newest' | 'price-low' | 'price-high' | 'popularity' | 'rating'
  >('newest');

  // Mobile Bottom-Sheet Filter toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with initialCategory prop if changed externally (e.g. from nav clicks)
  React.useEffect(() => {
    if (initialCategory) {
      if (initialCategory.toLowerCase() === 'offers') {
        setMinDiscount(25);
        setSelectedCategory('ALL');
      } else if (initialCategory.toLowerCase() === 'new-arrivals') {
        setSortBy('newest');
        setSelectedCategory('ALL');
      } else {
        setSelectedCategory(initialCategory.toUpperCase());
      }
    }
  }, [initialCategory]);

  const clearAllFilters = () => {
    setSelectedCategory('ALL');
    setSelectedGender('ALL');
    setSelectedSize('ALL');
    setSelectedPriceRange('ALL');
    setMinDiscount(0);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== 'ALL' ||
    selectedGender !== 'ALL' ||
    selectedSize !== 'ALL' ||
    selectedPriceRange !== 'ALL' ||
    minDiscount > 0 ||
    inStockOnly;

  // Filter & Sort Calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'ALL') {
          if (selectedCategory === 'MEN' && p.gender !== 'Men' && p.gender !== 'Unisex') return false;
          if (selectedCategory === 'WOMEN' && p.gender !== 'Women') return false;
          if (
            selectedCategory !== 'MEN' &&
            selectedCategory !== 'WOMEN' &&
            p.category.toUpperCase() !== selectedCategory
          ) {
            return false;
          }
        }

        // Gender
        if (selectedGender !== 'ALL') {
          if (selectedGender === 'Men' && p.gender !== 'Men' && p.gender !== 'Unisex') return false;
          if (selectedGender === 'Women' && p.gender !== 'Women') return false;
          if (selectedGender === 'Unisex' && p.gender !== 'Unisex') return false;
        }

        // Size
        if (selectedSize !== 'ALL') {
          if (!p.sizes.includes(selectedSize as ProductSize)) return false;
        }

        // Price Range
        if (selectedPriceRange !== 'ALL') {
          if (selectedPriceRange === 'under-800' && p.price >= 800) return false;
          if (selectedPriceRange === '800-1200' && (p.price < 800 || p.price > 1200)) return false;
          if (selectedPriceRange === '1200-1600' && (p.price < 1200 || p.price > 1600)) return false;
          if (selectedPriceRange === 'above-1600' && p.price <= 1600) return false;
        }

        // Discount
        if (minDiscount > 0 && p.discountPercentage < minDiscount) return false;

        // In Stock
        if (inStockOnly && (!p.inStock || p.stockQuantity <= 0)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'popularity') return b.reviewCount - a.reviewCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default newest
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    selectedGender,
    selectedSize,
    selectedPriceRange,
    minDiscount,
    inStockOnly,
    sortBy,
  ]);

  // Sidebar Filter Component used in both Desktop & Mobile sheet
  const FilterContent = () => (
    <div className="space-y-6 text-xs text-gray-700">
      {/* Category Filter */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-gray-900 mb-2.5">
          Category
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center gap-2 cursor-pointer hover:text-black">
            <input
              type="radio"
              name="cat"
              checked={selectedCategory === 'ALL'}
              onChange={() => setSelectedCategory('ALL')}
              className="accent-black"
            />
            <span className={selectedCategory === 'ALL' ? 'font-bold text-black' : ''}>
              All Categories ({products.length})
            </span>
          </label>
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer hover:text-black">
              <input
                type="radio"
                name="cat"
                checked={selectedCategory === c.name.toUpperCase()}
                onChange={() => setSelectedCategory(c.name.toUpperCase())}
                className="accent-black"
              />
              <span className={selectedCategory === c.name.toUpperCase() ? 'font-bold text-black' : ''}>
                {c.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-bold uppercase tracking-wider text-gray-900 mb-2.5">
          Gender
        </h4>
        <div className="space-y-1.5">
          {['ALL', 'Men', 'Women', 'Unisex'].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer hover:text-black">
              <input
                type="radio"
                name="gender"
                checked={selectedGender === g}
                onChange={() => setSelectedGender(g)}
                className="accent-black"
              />
              <span className={selectedGender === g ? 'font-bold text-black' : ''}>
                {g === 'ALL' ? 'All Genders' : g}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Selector Filter */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-bold uppercase tracking-wider text-gray-900 mb-2.5">
          Size
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {['ALL', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setSelectedSize(sz)}
              className={`py-1.5 px-2 text-xs font-semibold border cursor-pointer transition-colors ${
                selectedSize === sz
                  ? 'bg-[#111111] text-white border-black'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-bold uppercase tracking-wider text-gray-900 mb-2.5">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {[
            { id: 'ALL', label: 'All Prices' },
            { id: 'under-800', label: 'Under ₹800' },
            { id: '800-1200', label: '₹800 – ₹1,200' },
            { id: '1200-1600', label: '₹1,200 – ₹1,600' },
            { id: 'above-1600', label: 'Above ₹1,600' },
          ].map((pr) => (
            <label key={pr.id} className="flex items-center gap-2 cursor-pointer hover:text-black">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === pr.id}
                onChange={() => setSelectedPriceRange(pr.id)}
                className="accent-black"
              />
              <span className={selectedPriceRange === pr.id ? 'font-bold text-black' : ''}>
                {pr.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-bold uppercase tracking-wider text-gray-900 mb-2.5">
          Minimum Discount
        </h4>
        <div className="space-y-1.5">
          {[
            { val: 0, label: 'All Discounts' },
            { val: 20, label: '20% OFF or more' },
            { val: 30, label: '30% OFF or more' },
          ].map((d) => (
            <label key={d.val} className="flex items-center gap-2 cursor-pointer hover:text-black">
              <input
                type="radio"
                name="discount"
                checked={minDiscount === d.val}
                onChange={() => setMinDiscount(d.val)}
                className="accent-black"
              />
              <span className={minDiscount === d.val ? 'font-bold text-black' : ''}>
                {d.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="pt-4 border-t border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer font-medium hover:text-black">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-black"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category Hero Header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
              FASHION HUB Catalog
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mt-1">
              {selectedCategory === 'ALL' ? 'SHOP ALL COLLECTIONS' : selectedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Discover everyday wardrobe staples, breathable natural fabrics, and tailored contemporary silhouettes.
            </p>
          </div>

          {/* Action bar: Mobile filter trigger + Sort dropdown */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 border border-gray-300 text-xs font-bold text-gray-800 bg-white shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold p-2 bg-white border border-gray-300 focus:border-black focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity (Most Reviewed)</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-semibold">Active:</span>
            {selectedCategory !== 'ALL' && (
              <span className="bg-gray-100 text-gray-800 px-2.5 py-1 border border-gray-200 flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('ALL')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedGender !== 'ALL' && (
              <span className="bg-gray-100 text-gray-800 px-2.5 py-1 border border-gray-200 flex items-center gap-1">
                {selectedGender}
                <button onClick={() => setSelectedGender('ALL')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSize !== 'ALL' && (
              <span className="bg-gray-100 text-gray-800 px-2.5 py-1 border border-gray-200 flex items-center gap-1">
                Size {selectedSize}
                <button onClick={() => setSelectedSize('ALL')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedPriceRange !== 'ALL' && (
              <span className="bg-gray-100 text-gray-800 px-2.5 py-1 border border-gray-200 flex items-center gap-1">
                Price: {selectedPriceRange}
                <button onClick={() => setSelectedPriceRange('ALL')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minDiscount > 0 && (
              <span className="bg-gray-100 text-gray-800 px-2.5 py-1 border border-gray-200 flex items-center gap-1">
                {minDiscount}%+ OFF
                <button onClick={() => setMinDiscount(0)} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="bg-gray-100 text-gray-800 px-2.5 py-1 border border-gray-200 flex items-center gap-1">
                In Stock
                <button onClick={() => setInStockOnly(false)} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:underline font-bold ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Layout Grid: Desktop Sidebar + Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block col-span-1 bg-[#FBFBFA] p-5 border border-gray-200 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-gray-500 hover:text-black underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <FilterContent />
        </div>

        {/* Product Cards Grid */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4">
          <div className="mb-3 text-xs text-gray-500">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> styles
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-gray-50 border border-gray-200 p-8 space-y-4">
              <p className="text-base font-semibold text-gray-900">
                No garments match your selected filters
              </p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try loosening your price, category or discount filters to view available inventory.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-bold cursor-pointer"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={onSelectProduct}
                  onQuickView={onQuickView}
                  onAddToCartDirect={onAddToCartDirect}
                  isWishlisted={wishlist.includes(prod.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom-Sheet Filter Interface */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative bg-white w-full max-h-[85vh] flex flex-col rounded-t-xl shadow-2xl border-t border-gray-200 z-10 animate-in slide-in-from-bottom duration-250">
            {/* Sheet Top Bar */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#FBFBFA]">
              <span className="text-sm font-bold text-gray-900">Filter Products</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="p-5 overflow-y-auto flex-1">
              <FilterContent />
            </div>

            {/* Sticky bottom Apply / Reset bar */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 border border-gray-300 text-xs font-bold text-gray-700 bg-white"
              >
                RESET
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#111111] text-white text-xs font-bold"
              >
                APPLY ({filteredProducts.length} STYLES)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
