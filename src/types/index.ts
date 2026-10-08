export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  gender: 'Men' | 'Women' | 'Unisex';
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  inStock: boolean;
  stockQuantity: number;
  description: string;
  material: string;
  careInstructions: string;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isSpecialOffer?: boolean;
  sku: string;
  fit?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  description: string;
  image: string;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
  price: number;
}

export interface Address {
  fullName: string;
  mobile: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Order Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface TrackingStep {
  status: OrderStatus;
  date: string;
  completed: boolean;
  note: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: ProductSize;
  colorName: string;
  colorHex: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  deliveryMethod: 'standard' | 'express';
  deliveryFee: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number;
  total: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: OrderStatus;
  trackingHistory: TrackingStep[];
  estimatedDeliveryDate: string;
  courierName?: string;
  trackingNumber?: string;
}

export interface CustomerReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
  location?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  maxDiscount: number;
  validUntil: string;
  isActive: boolean;
  description: string;
}

export interface StoreSettings {
  businessName: string;
  category: string;
  tagline: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  openingHours: string;
  googleMapsLocation: string;
  instagram: string;
  facebook: string;
  freeShippingAbove: number;
  standardShippingFee: number;
  expressShippingFee: number;
  heroHeadline: string;
  heroSubheadline: string;
  promoBannerText: string;
  promoCouponCode: string;
  promoDiscountPercent: number;
  aboutStory: string;
  aboutMission: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses: Address[];
}
