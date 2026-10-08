import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface WishlistViewProps {
  wishlistIds: string[];
  products: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: string, param?: string) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
  onNavigate,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
          Your Saved Wardrobe
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
          MY WISHLIST ({wishlistedProducts.length})
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Keep track of your favorite styles and move them to bag whenever you're ready.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#FBFBFA] border border-gray-200 max-w-md mx-auto p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Your wishlist is empty</h3>
            <p className="text-xs text-gray-500 mt-1">
              Explore our curated collections and click the heart icon on any product to save it here.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            DISCOVER STYLES
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-gray-200 flex flex-col justify-between group overflow-hidden"
            >
              {/* Product Visual */}
              <div
                onClick={() => onSelectProduct(prod)}
                className="relative aspect-[3/4] bg-gray-100 cursor-pointer overflow-hidden"
              >
                <FashionHubArt
                  type={prod.images[0]}
                  title={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(prod.id);
                  }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 rounded-full flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {prod.discountPercentage > 0 && (
                  <span className="absolute top-2.5 left-2.5 bg-[#111111] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    {prod.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Info & Move to Cart */}
              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    {prod.category}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(prod)}
                    className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1 cursor-pointer hover:text-gray-600 mt-0.5"
                  >
                    {prod.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 tabular-nums">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    {prod.originalPrice > prod.price && (
                      <span className="text-[11px] text-gray-400 line-through tabular-nums">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100">
                  <button
                    onClick={() => onMoveToCart(prod)}
                    className="w-full bg-[#111111] hover:bg-black text-white text-xs font-bold py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
