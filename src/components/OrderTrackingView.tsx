import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { FashionHubArt } from './FashionHubArt';

interface OrderTrackingViewProps {
  orders: Order[];
  initialOrderId?: string;
  onNavigate: (tab: string, param?: string) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  initialOrderId,
  onNavigate,
}) => {
  const [searchId, setSearchId] = useState(initialOrderId || '');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    initialOrderId || (orders.length > 0 ? orders[0].id : '')
  );

  const selectedOrder = orders.find(
    (o) => o.id.toLowerCase() === selectedOrderId.toLowerCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = orders.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrderId(found.id);
    } else {
      alert(`Order ${searchId.trim()} not found. Check your order confirmation email or number.`);
    }
  };

  const steps: OrderStatus[] = [
    'Order Placed',
    'Order Confirmed',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
  ];

  const getStepIndex = (status: OrderStatus) => {
    return steps.indexOf(status);
  };

  const currentStatusIndex = selectedOrder
    ? getStepIndex(selectedOrder.orderStatus)
    : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
          Live Consignment Tracking
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
          TRACK YOUR ORDER
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Check real-time status, dispatch hub updates and estimated doorstep delivery.
        </p>

        {/* Search by Order ID */}
        <form onSubmit={handleSearch} className="mt-6 flex max-w-md mx-auto gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              placeholder="Enter Order ID (e.g. FH-9042)"
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-gray-300 focus:border-black focus:outline-none font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            TRACK
          </button>
        </form>
      </div>

      {/* If No Order Found */}
      {!selectedOrder ? (
        <div className="p-12 text-center bg-[#FBFBFA] border border-gray-200">
          <Package className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-800">No Order Selected</h3>
          <p className="text-xs text-gray-500 mt-1">
            Please search with a valid Order ID or view your recent orders below.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 shadow-xs divide-y divide-gray-200">
          {/* Header Summary */}
          <div className="p-5 sm:p-6 bg-[#FBFBFA] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Order ID:
                </span>
                <span className="font-mono text-base font-black text-gray-900">
                  {selectedOrder.id}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-none uppercase">
                  {selectedOrder.orderStatus}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Placed on {selectedOrder.date} · Courier: <strong>{selectedOrder.courierName || 'BlueDart'}</strong> (Waybill #{selectedOrder.trackingNumber || 'BLD89312'})
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-500 block">Expected Doorstep Delivery:</span>
              <span className="text-sm sm:text-base font-black text-gray-900 flex items-center gap-1.5 justify-start sm:justify-end">
                <Calendar className="w-4 h-4 text-emerald-600" />
                {selectedOrder.estimatedDeliveryDate}
              </span>
            </div>
          </div>

          {/* Interactive Status Timeline */}
          <div className="p-5 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-6">
              Delivery Progress
            </h3>

            {/* Desktop Stepper */}
            <div className="relative">
              <div className="hidden md:flex items-center justify-between relative z-10">
                {steps.map((st, idx) => {
                  const isCompleted = idx <= currentStatusIndex;
                  const isCurrent = idx === currentStatusIndex;
                  return (
                    <div key={st} className="flex flex-col items-center flex-1 text-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                          isCompleted
                            ? 'bg-[#111111] border-[#111111] text-white shadow-xs'
                            : 'bg-white border-gray-300 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-gray-200' : ''}`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span
                        className={`text-xs mt-2 font-semibold ${
                          isCompleted ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {st}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar line */}
              <div className="hidden md:block absolute top-4 left-10 right-10 h-0.5 bg-gray-200 -z-0">
                <div
                  className="h-full bg-[#111111] transition-all duration-500"
                  style={{
                    width: `${Math.max(0, (currentStatusIndex / (steps.length - 1)) * 100)}%`,
                  }}
                />
              </div>

              {/* Mobile Stepper (Vertical) */}
              <div className="md:hidden space-y-4">
                {steps.map((st, idx) => {
                  const isCompleted = idx <= currentStatusIndex;
                  const isCurrent = idx === currentStatusIndex;
                  return (
                    <div key={st} className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 mt-0.5 ${
                          isCompleted
                            ? 'bg-[#111111] border-[#111111] text-white'
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            isCompleted ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {st}
                        </p>
                        {isCurrent && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 border border-emerald-200 font-semibold inline-block mt-0.5">
                            Current Stage
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Tracking Logs History */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Hub Activity History
              </h4>
              <div className="space-y-2">
                {selectedOrder.trackingHistory.map((h, i) => (
                  <div
                    key={i}
                    className={`p-3 text-xs border ${
                      h.completed
                        ? 'bg-[#FBFBFA] border-gray-200 text-gray-800'
                        : 'bg-white border-dashed border-gray-200 text-gray-400'
                    }`}
                  >
                    <div className="flex justify-between font-semibold">
                      <span>{h.status}</span>
                      <span className="text-[11px]">{h.date}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-600">{h.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Consignment Items & Delivery Address */}
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFAFA]">
            {/* Items */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                Items In This Package
              </h4>
              <div className="space-y-2">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex gap-3 bg-white p-2.5 border border-gray-200 text-xs">
                    <div className="w-12 h-14 bg-gray-100 shrink-0 overflow-hidden">
                      <FashionHubArt type={it.image} title={it.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{it.name}</p>
                      <p className="text-[11px] text-gray-500">
                        Qty: {it.quantity} · Size: {it.size} · {it.colorName}
                      </p>
                      <p className="font-bold text-gray-900 tabular-nums">
                        ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Payment Details */}
            <div className="space-y-3 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Delivery Address & Payment
              </h4>
              <div className="bg-white p-3 border border-gray-200 space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-gray-900 shrink-0" />
                  <div>
                    <strong className="text-gray-900">{selectedOrder.shippingAddress.fullName}</strong>
                    <p>{selectedOrder.shippingAddress.addressLine}</p>
                    <p>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{' '}
                      {selectedOrder.shippingAddress.pincode}
                    </p>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      Phone: {selectedOrder.shippingAddress.mobile}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-between">
                  <span>Payment Method:</span>
                  <strong className="text-gray-900">
                    {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <strong className="text-gray-900 font-bold tabular-nums">
                    ₹{selectedOrder.total.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Orders quick selector */}
      {orders.length > 1 && (
        <div className="pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
            Select Other Recent Orders
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => setSelectedOrderId(ord.id)}
                className={`p-3 text-left border text-xs transition-all cursor-pointer ${
                  selectedOrderId === ord.id
                    ? 'border-black bg-white shadow-xs font-semibold'
                    : 'border-gray-200 bg-gray-50 hover:bg-white text-gray-700'
                }`}
              >
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{ord.id}</span>
                  <span>₹{ord.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-500 mt-1 text-[11px]">
                  <span>{ord.date}</span>
                  <span className="text-emerald-700 font-medium">{ord.orderStatus}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
