'use client';

import { useEffect } from 'react';

interface OrderItem {
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName?: string;
  orderType: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress?: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function PrintOrder({ order }: { order: Order }) {
  useEffect(() => {
    // Auto-open print dialog when component mounts
    window.print();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-NZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-white p-8 print:p-4">
      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
          }
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }
          /* Hide navigation and header elements */
          nav,
          header,
          [role="navigation"],
          nav *,
          header * {
            display: none !important;
            visibility: hidden !important;
          }
          /* Hide admin layout wrapper styling */
          .bg-gray-50 {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /* Remove layout padding/margins */
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          /* Ensure print content container has no padding */
          body > div:first-child,
          body > div:first-child > div:first-child {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 border-b-2 border-gray-300 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SKY GROWERS</h1>
              <p className="text-gray-600 mt-1">Farm-Fresh Vegetables</p>
              <p className="text-gray-600">Christchurch, Canterbury, New Zealand</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-xl font-bold text-gray-900">{order.orderNumber}</p>
              <p className="text-sm text-gray-600 mt-2">Date: {formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-8 grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Customer Information
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-900">
                <span className="font-medium">Name:</span> {order.customerName}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Email:</span> {order.customerEmail}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Phone:</span> {order.customerPhone}
              </p>
              {order.businessName && (
                <p className="text-gray-900">
                  <span className="font-medium">Business:</span> {order.businessName}
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Order Details
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-900">
                <span className="font-medium">Type:</span>{' '}
                {order.orderType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Status:</span>{' '}
                <span className="capitalize">{order.status}</span>
              </p>
              {order.deliveryAddress && (
                <p className="text-gray-900">
                  <span className="font-medium">Delivery Address:</span>
                  <br />
                  <span className="ml-0">{order.deliveryAddress}</span>
                </p>
              )}
              {order.deliveryDate && (
                <p className="text-gray-900">
                  <span className="font-medium">Delivery Date:</span>{' '}
                  {formatDate(order.deliveryDate)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Order Items
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                  Product
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold text-gray-900">
                  Unit Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold text-gray-900">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                    {item.productName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 text-center">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 text-right">
                    {item.unitPrice > 0 ? `$${item.unitPrice.toFixed(2)}` : 'TBD'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 text-right font-medium">
                    {item.subtotal > 0 ? `$${item.subtotal.toFixed(2)}` : 'TBD'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td
                  colSpan={3}
                  className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold text-gray-900"
                >
                  Total:
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right text-sm font-bold text-gray-900">
                  {order.totalAmount > 0 ? `$${order.totalAmount.toFixed(2)}` : 'To be confirmed'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2">
              Notes
            </h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{order.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-4 border-t border-gray-300 text-xs text-gray-500 text-center">
          <p>Generated on {formatDateTime(new Date().toISOString())}</p>
          <p className="mt-1">SKY GROWERS - Farm-Fresh Vegetables | Christchurch, New Zealand</p>
        </div>
      </div>
    </div>
  );
}

