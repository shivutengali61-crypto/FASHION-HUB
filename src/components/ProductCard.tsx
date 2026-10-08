import React from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView,
  onAddToCartDirect,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div className="group relative flex flex-col bg-white border border-[#ECECE9] rounded-sm overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full bg-[#F6F6F4] overflow-hidden cursor-pointer">
        <div
          onClick={() => onSelectProduct(product)}
          className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        >
          {product.images && product.images[0] ? (
            <FashionHubArt
              type={product.images[0]}
              title={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F2F2EE] text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Discount Tag */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-[#111111] text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-none uppercase">
            {product.discountPercentage}% OFF
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
            isWishlisted
              ? 'bg-red-50 text-red-600'
              : 'bg-white/90 text-gray-700 hover:text-black hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-600' : ''}`} />
        </button>

        {/* Quick View overlay button (visible on desktop hover) */}
        <div className="absolute inset-x-2 bottom-2 hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#111111] text-xs font-semibold py-2 px-3 shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#777777] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-gray-500">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-medium">
              <Star className="w-3 h-3 fill-current text-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-xs md:text-sm font-semibold text-[#111111] line-clamp-1 hover:text-gray-600 cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price lockup */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm md:text-base font-bold text-[#111111] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Mobile / Direct Add to Cart Action */}
        <div className="mt-3 pt-2.5 border-t border-[#F0F0EE]">
          <button
            onClick={() => onAddToCartDirect(product)}
            className="w-full bg-[#111111] hover:bg-[#2A2A2A] text-white text-xs font-semibold py-2 px-3 rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
