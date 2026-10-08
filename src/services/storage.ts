import { CartItem, Coupon, CustomerReview, Order, Product, StoreSettings, UserAccount } from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_STORE_SETTINGS,
  INITIAL_USER,
} from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'fashion_hub_products_v1',
  ORDERS: 'fashion_hub_orders_v1',
  WISHLIST: 'fashion_hub_wishlist_v1',
  CART: 'fashion_hub_cart_v1',
  SETTINGS: 'fashion_hub_settings_v1',
  COUPONS: 'fashion_hub_coupons_v1',
  REVIEWS: 'fashion_hub_reviews_v1',
  USER: 'fashion_hub_user_v1',
};

// Safe JSON parse with fallback
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error loading ${key} from localStorage`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

// Initial Sample Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'FH-9042',
    date: '2026-10-05',
    customerName: 'Vikram Joshi',
    customerEmail: 'vikram.joshi@example.com',
    customerPhone: '+91 98450 12345',
    shippingAddress: INITIAL_USER.savedAddresses[0],
    deliveryMethod: 'standard',
    deliveryFee: 0,
    items: [
      {
        productId: 'fh-prod-1',
        name: 'Classic Black T-Shirt',
        price: 599,
        quantity: 1,
        size: 'L',
        colorName: 'Pitch Black',
        colorHex: '#151517',
        image: 'tshirt_black',
      },
      {
        productId: 'fh-prod-2',
        name: 'Premium Cotton Shirt',
        price: 999,
        quantity: 1,
        size: 'L',
        colorName: 'Crisp White',
        colorHex: '#FFFFFF',
        image: 'shirt_cotton',
      },
    ],
    subtotal: 1598,
    discount: 319,
    couponCode: 'FASHION20',
    tax: 64,
    total: 1343,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    trackingHistory: [
      {
        status: 'Order Placed',
        date: '2026-10-05 10:15 AM',
        completed: true,
        note: 'Order confirmed and payment verified via UPI (Ref #UPI849204)',
      },
      {
        status: 'Order Confirmed',
        date: '2026-10-05 11:30 AM',
        completed: true,
        note: 'Order sent to Indiranagar fulfillment hub',
      },
      {
        status: 'Packed',
        date: '2026-10-06 09:00 AM',
        completed: true,
        note: 'Quality checked and securely packed with eco-friendly garments bag',
      },
      {
        status: 'Shipped',
        date: '2026-10-06 04:20 PM',
        completed: true,
        note: 'Handed over to BlueDart Express. Waybill #BLD9381029',
      },
      {
        status: 'Out for Delivery',
        date: 'Expected Today',
        completed: false,
        note: 'Consignment arriving at destination city hub',
      },
      {
        status: 'Delivered',
        date: 'Expected Tomorrow',
        completed: false,
        note: 'Package will be delivered to customer address',
      },
    ],
    estimatedDeliveryDate: '08 Oct 2026',
    courierName: 'BlueDart Express',
    trackingNumber: 'BLD9381029',
  },
];

export const StorageService = {
  getProducts(): Product[] {
    return loadFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },
  saveProducts(products: Product[]): void {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  },

  getCategories() {
    return INITIAL_CATEGORIES;
  },

  getOrders(): Order[] {
    return loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },
  saveOrders(orders: Order[]): void {
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
  },
  addOrder(order: Order): void {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);
  },

  getWishlist(): string[] {
    return loadFromStorage<string[]>(STORAGE_KEYS.WISHLIST, ['fh-prod-1', 'fh-prod-3']);
  },
  saveWishlist(ids: string[]): void {
    saveToStorage(STORAGE_KEYS.WISHLIST, ids);
  },

  getCart(): CartItem[] {
    return loadFromStorage<CartItem[]>(STORAGE_KEYS.CART, []);
  },
  saveCart(cart: CartItem[]): void {
    saveToStorage(STORAGE_KEYS.CART, cart);
  },

  getSettings(): StoreSettings {
    return loadFromStorage<StoreSettings>(STORAGE_KEYS.SETTINGS, INITIAL_STORE_SETTINGS);
  },
  saveSettings(settings: StoreSettings): void {
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  },

  getCoupons(): Coupon[] {
    return loadFromStorage<Coupon[]>(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
  },
  saveCoupons(coupons: Coupon[]): void {
    saveToStorage(STORAGE_KEYS.COUPONS, coupons);
  },

  getReviews(): CustomerReview[] {
    return loadFromStorage<CustomerReview[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },
  saveReviews(reviews: CustomerReview[]): void {
    saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
  },
  addReview(review: CustomerReview): void {
    const reviews = this.getReviews();
    reviews.unshift(review);
    this.saveReviews(reviews);
  },

  getUser(): UserAccount {
    return loadFromStorage<UserAccount>(STORAGE_KEYS.USER, INITIAL_USER);
  },
  saveUser(user: UserAccount): void {
    saveToStorage(STORAGE_KEYS.USER, user);
  },

  // Reset to demo defaults
  resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.WISHLIST);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.COUPONS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
