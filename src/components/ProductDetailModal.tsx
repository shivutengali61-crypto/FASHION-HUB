import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  MessageCircle,
  Check,
} from 'lucide-react';
import { CustomerReview, Product, ProductColor, ProductSize } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize, color: ProductColor, quantity: number) => void;
  onBuyNow: (product: Product, size: ProductSize, color: ProductColor, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onOpenSizeGuide: () => void;
  onOpenReviewModal: (product: Product) => void;
  reviews: CustomerReview[];
  whatsappNumber: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
  onOpenReviewModal,
  reviews,
  whatsappNumber,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes[0] || 'M'
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#111111' }
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Filter reviews for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello FASHION HUB! I want to order:\n\n*Product:* ${product.name}\n*Size:* ${selectedSize}\n*Color:* ${selectedColor.name}\n*Quantity:* ${quantity}\n*Price:* ₹${(product.price * quantity).toLocaleString('en-IN')}\n\nPlease share delivery details.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden border border-gray-200 my-auto max-h-[92vh] flex flex-col">
        {/* Top bar with close button */}
        <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between bg-[#FAFAFA] shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
            <span>FASHION HUB</span>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-bold">{product.sku}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visual Column: Large image gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-[#F5F5F3] overflow-hidden border border-gray-200">
                <FashionHubArt
                  type={product.images[0]}
                  title={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Discount Tag */}
                {product.discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 bg-[#111111] text-white text-xs font-bold px-2.5 py-1 tracking-wider uppercase">
                    {product.discountPercentage}% OFF
                  </span>
                )}

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer ${
                    isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white text-gray-700 hover:text-black'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-600' : ''}`} />
                </button>
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-20 border-2 border-black bg-[#F5F5F3] overflow-hidden cursor-pointer"
                  >
                    <FashionHubArt type={img} title={`${product.name} angle`} />
                  </div>
                ))}
              </div>

              {/* Trust highlights */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                <div className="flex items-center gap-1.5 p-2 bg-gray-50 border border-gray-100">
                  <Truck className="w-4 h-4 text-gray-700 shrink-0" />
                  <span>Free shipping above ₹999</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-gray-50 border border-gray-100">
                  <RotateCcw className="w-4 h-4 text-gray-700 shrink-0" />
                  <span>7-Day Hassle-Free Returns</span>
                </div>
              </div>
            </div>

            {/* Product Details & Purchase Column */}
            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#777777]">
                  {product.gender} · {product.category} · {product.fit || 'Regular Fit'}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-[#111111] mt-1 tracking-tight">
                  {product.name}
                </h1>

                {/* Star Rating & Reviews */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 bg-[#111111] text-white px-2 py-0.5 text-xs font-bold">
                    <span>{product.rating.toFixed(1)}</span>
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                  </div>
                  <span className="text-xs text-gray-500">
                    {product.reviewCount} Ratings & {productReviews.length} Verified Reviews
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-3.5 bg-[#F9F9F8] border border-gray-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-[#111111] tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-gray-400 line-through tabular-nums">
                        MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-none">
                        Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercentage}% OFF)
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Inclusive of all taxes. Free shipping applied on orders above ₹999.
                </p>
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Selected Color: <strong className="text-black font-semibold">{selectedColor.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor.name === c.name
                          ? 'border-black scale-110 shadow-sm'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.name === c.name && (
                        <Check
                          className={`w-4 h-4 ${
                            ['#FFFFFF', '#F8FAFC', '#F5F5F0', '#BAE6FD'].includes(c.hex)
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Select Size
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-gray-600 hover:text-black underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#111111] text-white border-black shadow-xs'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Stock */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
                    Quantity
                  </span>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-sm hover:bg-gray-100 font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity || 10, quantity + 1))}
                      className="px-3 py-1.5 text-sm hover:bg-gray-100 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                    In Stock ({product.stockQuantity} pieces left)
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">
                    Ready to dispatch within 24 hours
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-white hover:bg-gray-50 text-[#111111] border-2 border-black text-xs sm:text-sm font-bold py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-bold py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <Zap className="w-4 h-4 fill-current text-amber-300" />
                    <span>BUY NOW</span>
                  </button>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ORDER VIA WHATSAPP (INSTANT CONFIRMATION)</span>
                </button>
              </div>

              {/* Toast confirmation */}
              {addedToast && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Added {quantity}x {product.name} ({selectedSize}, {selectedColor.name}) to cart!</span>
                </div>
              )}

              {/* Product Specifications & Details */}
              <div className="border-t border-gray-200 pt-5 space-y-4">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-gray-800 mb-1">
                    Product Description
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-gray-50 border border-gray-200">
                    <span className="font-bold text-gray-800 block mb-1">Material & Fabric</span>
                    <span className="text-gray-600">{product.material}</span>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200">
                    <span className="font-bold text-gray-800 block mb-1">Care Instructions</span>
                    <span className="text-gray-600">{product.careInstructions}</span>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-gray-800">
                      Customer Reviews ({productReviews.length})
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Verified customer ratings & feedback
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenReviewModal(product)}
                    className="text-xs bg-[#111111] hover:bg-black text-white px-3 py-1.5 font-semibold cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>

                {productReviews.length === 0 ? (
                  <p className="text-xs text-gray-400 italic py-2">
                    No reviews yet. Be the first verified customer to share feedback!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {productReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3 bg-[#FBFBFA] border border-gray-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{rev.customerName}</span>
                            {rev.isVerifiedPurchase && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 border border-emerald-200 font-semibold flex items-center gap-0.5">
                                <ShieldCheck className="w-3 h-3" /> Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rev.rating ? 'fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
