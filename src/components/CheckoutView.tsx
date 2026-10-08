import React, { useState } from 'react';
import {
  Check,
  Truck,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Building2,
  Banknote,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { Address, CartItem, Coupon, Order, StoreSettings } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface CheckoutViewProps {
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  settings: StoreSettings;
  onOrderCompleted: (newOrder: Order) => void;
  onNavigate: (tab: string, param?: string) => void;
  defaultAddress?: Address;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  appliedCoupon,
  settings,
  onOrderCompleted,
  onNavigate,
  defaultAddress,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Address
  const [customerInfo, setCustomerInfo] = useState<Address>({
    fullName: defaultAddress?.fullName || 'Vikram Joshi',
    mobile: defaultAddress?.mobile || '+91 98450 12345',
    email: defaultAddress?.email || 'vikram.joshi@example.com',
    addressLine: defaultAddress?.addressLine || 'Apt 4B, Silver Oak Heights, 12th Main Road, HAL 2nd Stage',
    city: defaultAddress?.city || 'Bengaluru',
    state: defaultAddress?.state || 'Karnataka',
    pincode: defaultAddress?.pincode || '560008',
    landmark: defaultAddress?.landmark || 'Near Kodihalli Signal',
  });

  // Step 2: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<
    'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery'
  >('UPI');
  const [upiId, setUpiId] = useState('vikram@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 1024');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Placed order reference
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Pricing math
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    const rawDiscount = (subtotal * appliedCoupon.discountPercent) / 100;
    discountAmount = Math.min(rawDiscount, appliedCoupon.maxDiscount || rawDiscount);
  }

  const freeThreshold = settings.freeShippingAbove || 999;
  const isFreeStandard = subtotal >= freeThreshold;
  const standardFee = isFreeStandard ? 0 : settings.standardShippingFee || 99;
  const expressFee = settings.expressShippingFee || 149;
  const deliveryFee = deliveryMethod === 'standard' ? standardFee : expressFee;
  const tax = Math.round((subtotal - discountAmount) * 0.05);
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePlaceOrder = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const orderId = `FH-${Math.floor(10000 + Math.random() * 90000)}`;
      const today = new Date();
      const estDate = new Date();
      estDate.setDate(today.getDate() + (deliveryMethod === 'express' ? 2 : 4));

      const newOrder: Order = {
        id: orderId,
        date: today.toISOString().split('T')[0],
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.mobile,
        shippingAddress: customerInfo,
        deliveryMethod,
        deliveryFee,
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.product.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
          colorName: item.selectedColor.name,
          colorHex: item.selectedColor.hex,
          image: item.product.images[0] || 'tshirt_black',
        })),
        subtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        tax,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        orderStatus: 'Order Placed',
        trackingHistory: [
          {
            status: 'Order Placed',
            date: `${today.toISOString().split('T')[0]} Just now`,
            completed: true,
            note: `Order received and verified via ${paymentMethod}`,
          },
          {
            status: 'Order Confirmed',
            date: 'Estimated within 2 hrs',
            completed: false,
            note: 'Order routing to fulfillment warehouse',
          },
          {
            status: 'Packed',
            date: 'Estimated tomorrow',
            completed: false,
            note: 'Garments quality check and protective packaging',
          },
          {
            status: 'Shipped',
            date: 'Pending',
            completed: false,
            note: 'Courier tracking consignment number assignment',
          },
          {
            status: 'Out for Delivery',
            date: 'Pending',
            completed: false,
            note: 'Local delivery hub to customer address',
          },
          {
            status: 'Delivered',
            date: estDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            completed: false,
            note: 'Delivered securely to customer',
          },
        ],
        estimatedDeliveryDate: estDate.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        courierName: 'BlueDart Express',
        trackingNumber: `BLD${Math.floor(1000000 + Math.random() * 9000000)}`,
      };

      setPlacedOrder(newOrder);
      onOrderCompleted(newOrder);
      setIsProcessingPayment(false);
      setCurrentStep(4);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Steps Indicator */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          {[
            { step: 1, label: 'Customer Info' },
            { step: 2, label: 'Delivery' },
            { step: 3, label: 'Payment' },
            { step: 4, label: 'Confirmation' },
          ].map((s) => (
            <div key={s.step} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep >= s.step
                    ? 'bg-[#111111] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > s.step ? <Check className="w-4 h-4" /> : s.step}
              </div>
              <span className="text-[11px] font-semibold text-gray-700 mt-1.5 text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Steps content Left + Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Content */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-7 border border-gray-200 shadow-xs">
          {/* STEP 1: Customer Information */}
          {currentStep === 1 && (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                  Step 1: Shipping & Customer Information
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enter delivery address details for prompt dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.fullName}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                    }
                    className="w-full text-xs p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.mobile}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, mobile: e.target.value })
                    }
                    className="w-full text-xs p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Street Address / House No / Apartment *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.addressLine}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, addressLine: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.city}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, city: e.target.value })
                    }
                    className="w-full text-xs p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.state}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, state: e.target.value })
                    }
                    className="w-full text-xs p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.pincode}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, pincode: e.target.value })
                    }
                    className="w-full text-xs p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={customerInfo.landmark}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, landmark: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#111111] hover:bg-black text-white text-xs font-bold py-3 px-6 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>CONTINUE TO DELIVERY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Delivery Method */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                  Step 2: Choose Delivery Method
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select your preferred shipping speed across India.
                </p>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-black bg-[#FBFBFA]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="mt-0.5 accent-black"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        Standard Doorstep Delivery
                      </span>
                      <span className="text-xs text-gray-500">
                        Estimated arrival: 3 – 5 business days via BlueDart
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900 tabular-nums">
                    {standardFee === 0 ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      `₹${standardFee}`
                    )}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-black bg-[#FBFBFA]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="mt-0.5 accent-black"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block flex items-center gap-1.5">
                        <span>Express Air Shipping</span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 font-semibold">
                          Fastest
                        </span>
                      </span>
                      <span className="text-xs text-gray-500">
                        Estimated arrival: 1 – 2 business days priority dispatch
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900 tabular-nums">
                    ₹{expressFee}
                  </span>
                </label>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 text-xs text-gray-600">
                <p>
                  <strong>Delivering to:</strong> {customerInfo.fullName}, {customerInfo.addressLine},{' '}
                  {customerInfo.city}, {customerInfo.state} - {customerInfo.pincode}
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Customer Info</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#111111] hover:bg-black text-white text-xs font-bold py-3 px-6 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Options */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                  Step 3: Secure Payment
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Choose your preferred payment method. 256-Bit SSL Encrypted.
                </p>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                  { id: 'Credit/Debit Card', label: 'Cards', icon: CreditCard },
                  { id: 'Net Banking', label: 'NetBanking', icon: Building2 },
                  { id: 'Cash on Delivery', label: 'COD', icon: Banknote },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() =>
                        setPaymentMethod(
                          m.id as 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery'
                        )
                      }
                      className={`p-3 border text-center flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-black bg-[#111111] text-white shadow-xs'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Option */}
              {paymentMethod === 'UPI' && (
                <div className="p-4 bg-gray-50 border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">
                      Scan QR or Enter UPI ID (Google Pay, PhonePe, Paytm, BHIM)
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5">
                      Instant Approval
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Simulated QR Code */}
                    <div className="w-28 h-28 bg-white border border-gray-300 p-2 flex flex-col items-center justify-center shrink-0">
                      <QrCode className="w-16 h-16 text-gray-900" />
                      <span className="text-[9px] text-gray-500 font-mono mt-1">fashionhub@upi</span>
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <label className="block text-xs font-semibold text-gray-700">
                        Enter UPI VPA ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full text-xs p-2.5 bg-white border border-gray-300 focus:border-black focus:outline-none"
                      />
                      <p className="text-[11px] text-gray-500">
                        A payment request of <strong>₹{total.toLocaleString('en-IN')}</strong> will be approved automatically upon clicking Place Order.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Credit/Debit Card Option */}
              {paymentMethod === 'Credit/Debit Card' && (
                <div className="p-4 bg-gray-50 border border-gray-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full text-xs p-2.5 bg-white border border-gray-300 focus:border-black focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full text-xs p-2.5 bg-white border border-gray-300 focus:border-black focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full text-xs p-2.5 bg-white border border-gray-300 focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking Option */}
              {paymentMethod === 'Net Banking' && (
                <div className="p-4 bg-gray-50 border border-gray-200 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Select Your Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-gray-300 focus:border-black focus:outline-none"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                  </select>
                </div>
              )}

              {/* COD Option */}
              {paymentMethod === 'Cash on Delivery' && (
                <div className="p-4 bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-amber-800" />
                    <span>Pay with Cash or UPI upon physical delivery</span>
                  </p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Please keep exact change of <strong>₹{total.toLocaleString('en-IN')}</strong> ready at the time of delivery. Delivery agent will present a valid digital invoice.
                  </p>
                </div>
              )}

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Delivery</span>
                </button>
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handlePlaceOrder}
                  className="bg-[#111111] hover:bg-black text-white text-xs font-bold py-3.5 px-8 flex items-center gap-2 cursor-pointer uppercase tracking-wider shadow-lg disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <span>PROCESSING PAYMENT...</span>
                  ) : (
                    <>
                      <span>PAY ₹{total.toLocaleString('en-IN')} & PLACE ORDER</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation */}
          {currentStep === 4 && placedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-700 bg-emerald-50 px-3 py-1 border border-emerald-200 inline-block mb-2">
                  Payment Verified · Order Confirmed
                </span>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  ORDER PLACED SUCCESSFULLY
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Thank you for shopping at FASHION HUB! Your order is being prepared.
                </p>
              </div>

              {/* Order ID & Details Card */}
              <div className="p-4 bg-[#FBFBFA] border border-gray-200 text-left text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-bold text-gray-900 font-mono text-sm">
                    {placedOrder.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Mode</span>
                  <span className="font-semibold text-gray-900">
                    {placedOrder.paymentMethod} ({placedOrder.paymentStatus})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Delivery</span>
                  <span className="font-bold text-gray-900">
                    {placedOrder.estimatedDeliveryDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Address</span>
                  <span className="font-medium text-gray-900 text-right max-w-xs">
                    {placedOrder.shippingAddress.fullName}, {placedOrder.shippingAddress.city} -{' '}
                    {placedOrder.shippingAddress.pincode}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-bold">
                  <span>Total Amount Paid</span>
                  <span>₹{placedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => onNavigate('track-order', placedOrder.id)}
                  className="bg-[#111111] hover:bg-black text-white text-xs font-bold py-3 px-6 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <Package className="w-4 h-4" />
                  <span>TRACK ORDER NOW</span>
                </button>
                <button
                  onClick={() => onNavigate('shop')}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold py-3 px-6 cursor-pointer uppercase tracking-wider"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-[#FBFBFA] p-5 sm:p-6 border border-gray-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200">
            Order Summary ({cart.reduce((c, i) => c + i.quantity, 0)} Items)
          </h3>

          {/* Cart preview list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <div className="w-12 h-16 bg-gray-200 shrink-0 overflow-hidden border border-gray-300">
                  <FashionHubArt type={item.product.images[0]} title={item.product.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{item.product.name}</p>
                  <p className="text-[11px] text-gray-500">
                    Qty: {item.quantity} · Size: {item.selectedSize} · {item.selectedColor.name}
                  </p>
                  <p className="font-bold text-gray-900 mt-1 tabular-nums">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="mt-5 pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900 tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span className="font-semibold tabular-nums">
                  -₹{discountAmount.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping Fee ({deliveryMethod})</span>
              <span className="tabular-nums">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-[11px] text-gray-400">
              <span>GST Included (5%)</span>
              <span className="tabular-nums">₹{tax.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
              <span>Total Payable</span>
              <span className="tabular-nums">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="mt-6 p-3 bg-white border border-gray-200 text-[11px] text-gray-500 space-y-1">
            <p className="font-semibold text-gray-800">FASHION HUB Assurance:</p>
            <p>✓ 100% Genuine Branded Fabric</p>
            <p>✓ 7-Day Doorstep Size Replacement</p>
            <p>✓ Dedicated WhatsApp Care: {settings.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
