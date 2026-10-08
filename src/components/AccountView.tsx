import React, { useState } from 'react';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Heart,
  LogOut,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Plus,
  Clock,
} from 'lucide-react';
import { Order, Product, UserAccount } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface AccountViewProps {
  user: UserAccount;
  orders: Order[];
  wishlistIds: string[];
  products: Product[];
  onNavigate: (tab: string, param?: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onUpdateUser: (user: UserAccount) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  user,
  orders,
  wishlistIds,
  products,
  onNavigate,
  isAdmin,
  onToggleAdmin,
  onUpdateUser,
}) => {
  const [activeSection, setActiveSection] = useState<
    'profile' | 'orders' | 'addresses' | 'payments'
  >('orders');

  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      phone,
    });
    setEditProfile(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 bg-[#FBFBFA] border border-gray-200 p-5 space-y-6">
          {/* User Bio Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-gray-900 truncate">{user.name}</h2>
              <p className="text-xs text-gray-500 truncate">{user.phone}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            {[
              { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: user.savedAddresses.length },
              { id: 'payments', label: 'Payment Methods', icon: CreditCard },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 font-semibold transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#111111] text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white text-black font-bold' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Link to Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="w-full flex items-center justify-between px-3 py-2.5 font-semibold text-gray-700 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>My Wishlist</span>
              </div>
              <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded-full">
                {wishlistIds.length}
              </span>
            </button>
          </nav>

          {/* Admin Portal Switcher */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onToggleAdmin}
              className="w-full flex items-center justify-center gap-2 p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>{isAdmin ? 'Exit Admin Mode' : 'Switch to Admin Portal'}</span>
            </button>
          </div>
        </div>

        {/* Right Section Content */}
        <div className="md:col-span-8 lg:col-span-9 bg-white border border-gray-200 p-5 sm:p-7 shadow-xs">
          {/* SECTION: My Orders */}
          {activeSection === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    Order History ({orders.length})
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    View real-time delivery status, invoices and previous purchases.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-xs font-bold text-[#111111] hover:underline cursor-pointer"
                >
                  Shop More Styles
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-gray-500 space-y-2">
                  <Package className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="text-xs font-semibold">You have not placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="border border-gray-200 divide-y divide-gray-100 bg-[#FBFBFA]"
                    >
                      {/* Order top bar */}
                      <div className="p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase">Order Placed</span>
                            <span className="font-semibold text-gray-900">{ord.date}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase">Total Amount</span>
                            <span className="font-bold text-gray-900 tabular-nums">
                              ₹{ord.total.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-500 block uppercase">Order ID</span>
                            <span className="font-mono font-bold text-gray-900">{ord.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 uppercase">
                            {ord.orderStatus}
                          </span>
                          <button
                            onClick={() => onNavigate('track-order', ord.id)}
                            className="bg-[#111111] hover:bg-black text-white px-3 py-1.5 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <span>Track Order</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="p-4 bg-white space-y-3">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex gap-3 text-xs items-center">
                            <div className="w-12 h-14 bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                              <FashionHubArt type={it.image} title={it.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">{it.name}</h4>
                              <p className="text-[11px] text-gray-500">
                                Qty: {it.quantity} · Size: {it.size} · Color: {it.colorName}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-gray-900 tabular-nums">
                                ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer note with estimated delivery */}
                      <div className="p-3 px-4 bg-gray-50 text-[11px] text-gray-600 flex justify-between items-center">
                        <span>
                          Shipped to: <strong>{ord.shippingAddress.fullName}</strong>, {ord.shippingAddress.city}
                        </span>
                        <span className="text-emerald-700 font-semibold">
                          Expected Delivery: {ord.estimatedDeliveryDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: My Profile */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900">Personal Information</h3>
                {!editProfile && (
                  <button
                    onClick={() => setEditProfile(true)}
                    className="text-xs font-bold text-[#111111] hover:underline cursor-pointer"
                  >
                    Edit Details
                  </button>
                )}
              </div>

              {editProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md text-xs">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditProfile(false)}
                      className="px-4 py-2 border border-gray-300 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#111111] text-white font-bold cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 text-xs max-w-md">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Name</span>
                    <strong className="text-gray-900">{user.name}</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Email</span>
                    <strong className="text-gray-900">{user.email}</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Phone</span>
                    <strong className="text-gray-900">{user.phone}</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Account Type</span>
                    <strong className="text-gray-900 uppercase">{user.role}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION: Saved Addresses */}
          {activeSection === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900">Saved Delivery Addresses</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.savedAddresses.map((addr, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 bg-[#FBFBFA] text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <strong className="text-gray-900">{addr.fullName}</strong>
                      <span className="text-[10px] bg-gray-200 px-1.5 py-0.2 font-semibold">
                        Default
                      </span>
                    </div>
                    <p className="text-gray-600">{addr.addressLine}</p>
                    <p className="text-gray-600">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-gray-500 text-[11px]">Mobile: {addr.mobile}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: Payment Methods */}
          {activeSection === 'payments' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900">Saved Payment Methods</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Secure checkout with UPI autopay or tokenized card credentials.
                </p>
              </div>

              <div className="space-y-3 max-w-md text-xs">
                <div className="p-3.5 border border-gray-200 bg-[#FBFBFA] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                      UPI
                    </div>
                    <div>
                      <strong className="text-gray-900">vikram@okaxis</strong>
                      <p className="text-[11px] text-gray-500">Primary UPI VPA</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Verified
                  </span>
                </div>

                <div className="p-3.5 border border-gray-200 bg-[#FBFBFA] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                      VISA
                    </div>
                    <div>
                      <strong className="text-gray-900">•••• •••• •••• 1024</strong>
                      <p className="text-[11px] text-gray-500">Expires 12/28</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500">HDFC Regalia</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
