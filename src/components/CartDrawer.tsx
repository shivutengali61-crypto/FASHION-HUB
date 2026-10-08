import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
} from 'lucide-react';
import { CartItem, Coupon, StoreSettings } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  settings: StoreSettings;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  settings,
}) => {
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    const rawDiscount = (subtotal * appliedCoupon.discountPercent) / 100;
    discountAmount = Math.min(rawDiscount, appliedCoupon.maxDiscount || rawDiscount);
  }

  const freeShippingThreshold = settings.freeShippingAbove || 999;
  const isFreeDelivery = subtotal >= freeShippingThreshold || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : settings.standardShippingFee || 99;
  const tax = Math.round((subtotal - discountAmount) * 0.05); // 5% GST on apparel
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = onApplyCoupon(couponCodeInput.trim());
    if (res.success) {
      setCouponFeedback({ type: 'success', message: res.message });
      setCouponCodeInput('');
    } else {
      setCouponFeedback({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-[#FBFBFA]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              <h2 className="text-base font-bold text-[#111111] tracking-tight">
                Shopping Bag ({cart.reduce((cnt, it) => cnt + it.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-black rounded hover:bg-gray-100 cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F8F8F6] p-3 px-4 border-b border-gray-200 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-gray-700 flex items-center gap-1.5 font-medium">
                  <Truck className="w-4 h-4 text-gray-900 shrink-0" />
                  <span>
                    Add <strong>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>FREE Delivery</strong>!
                  </span>
                </p>
                <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#111111] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You've unlocked FREE Doorstep Delivery!</span>
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Your bag is empty</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    Explore our modern Indian clothing collections and add your favorite essentials.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs font-bold hover:bg-black uppercase tracking-wider cursor-pointer"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-3.5 flex gap-3.5 group">
                  {/* Item Image */}
                  <div className="w-20 h-24 bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                    <FashionHubArt
                      type={item.product.images[0]}
                      title={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                        <span>Size: <strong className="text-gray-800">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <span>Color:</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <strong className="text-gray-800">{item.selectedColor.name}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-gray-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-gray-900 tabular-nums">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Calculations & Checkout Bar (only if cart has items) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-[#FAFAFA] space-y-3 shrink-0">
              {/* Coupon input */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                        placeholder="Promo Code (e.g. FASHION20)"
                        className="w-full text-xs pl-8 pr-2 py-2 bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black uppercase font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold cursor-pointer"
                    >
                      APPLY
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bold">{appliedCoupon.code}</span>
                      <span>({appliedCoupon.discountPercent}% OFF applied)</span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-emerald-900 font-bold hover:underline cursor-pointer text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponFeedback.message && (
                  <p
                    className={`text-[11px] mt-1 ${
                      couponFeedback.type === 'success' ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Coupon ({appliedCoupon?.code})</span>
                    <span className="font-semibold tabular-nums">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery Fee</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400 text-[11px]">
                  <span>GST (Included 5%)</span>
                  <span className="tabular-nums">₹{tax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Final Total</span>
                  <span className="tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-bold py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md uppercase tracking-wider"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-semibold py-2 px-4 transition-colors cursor-pointer text-center"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
