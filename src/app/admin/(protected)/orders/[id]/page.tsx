'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { OrderStatus, IOrderItem } from '@/lib/db/models/Order';
import { Printer, Save } from 'lucide-react';

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName?: string;
  orderType: string;
  status: OrderStatus;
  items: IOrderItem[];
  totalAmount: number;
  deliveryAddress?: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  ready: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingPrices, setEditingPrices] = useState(false);
  const [itemPrices, setItemPrices] = useState<{ unitPrice: number; subtotal: number }[]>([]);
  const [isSavingPrices, setIsSavingPrices] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
        setStatus(data.status);
        // Initialize item prices
        setItemPrices(
          data.items.map((item: IOrderItem) => ({
            unitPrice: item.unitPrice,
            subtotal: item.subtotal,
          }))
        );
        // Check if order needs price editing (has items with 0 price)
        const needsPricing = data.items.some((item: IOrderItem) => item.unitPrice === 0);
        setEditingPrices(needsPricing);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch order',
          variant: 'destructive',
        });
        router.push('/admin/orders');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch order',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (status === order?.status) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`/api/admin/orders/${params.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Order status updated successfully',
        });
        fetchOrder();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePriceChange = (index: number, field: 'unitPrice' | 'subtotal', value: string) => {
    const numValue = parseFloat(value) || 0;
    const updated = [...itemPrices];
    updated[index] = { ...updated[index], [field]: numValue };
    
    // Auto-calculate subtotal if unit price changes
    if (field === 'unitPrice' && order) {
      updated[index].subtotal = numValue * order.items[index].quantity;
    }
    
    setItemPrices(updated);
  };

  const handleSavePrices = async () => {
    if (!order) return;

    try {
      setIsSavingPrices(true);
      const response = await fetch(`/api/admin/orders/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: itemPrices,
          totalAmount: itemPrices.reduce((sum, item) => sum + item.subtotal, 0),
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Order prices updated successfully',
        });
        setEditingPrices(false);
        fetchOrder();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update prices');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update order prices',
        variant: 'destructive',
      });
    } finally {
      setIsSavingPrices(false);
    }
  };

  const calculateTotal = () => {
    return itemPrices.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const hasUnpricedItems = order?.items.some((item) => item.unitPrice === 0) || false;

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center py-12">Order not found</div>;
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <Button variant="outline" onClick={() => router.back()}>
          ← Back to Orders
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open(`/admin/orders/${params.id}/print`, '_blank')}
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print Order
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order {order.orderNumber}</h1>
            <p className="text-gray-600 mt-1">
              Created on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={status} onValueChange={(value: OrderStatus) => setStatus(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending" className="text-black hover:bg-green-600 hover:text-white">Pending</SelectItem>
                <SelectItem value="confirmed" className="text-black hover:bg-green-600 hover:text-white">Confirmed</SelectItem>
                <SelectItem value="preparing" className="text-black hover:bg-green-600 hover:text-white">Preparing</SelectItem>
                <SelectItem value="ready" className="text-black hover:bg-green-600 hover:text-white">Ready</SelectItem>
                <SelectItem value="delivered" className="text-black hover:bg-green-600 hover:text-white">Delivered</SelectItem>
                <SelectItem value="cancelled" className="text-black hover:bg-green-600 hover:text-white">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            {status !== order.status && (
              <Button className="text-gray-900 border-1 hover:bg-gray-900 hover:text-white" onClick={handleStatusUpdate} disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update Status'}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-900">
                <span className="font-medium">Type:</span> {order.orderType.replace('-', ' ')}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </p>
              {order.deliveryAddress && (
                <p className="text-gray-900">
                  <span className="font-medium">Delivery Address:</span> {order.deliveryAddress}
                </p>
              )}
              {order.deliveryDate && (
                <p className="text-gray-900">
                  <span className="font-medium">Delivery Date:</span>{' '}
                  {new Date(order.deliveryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
            {hasUnpricedItems && !editingPrices && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingPrices(true)}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Set Prices
              </Button>
            )}
            {editingPrices && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingPrices(false);
                    // Reset prices to original
                    if (order) {
                      setItemPrices(
                        order.items.map((item: IOrderItem) => ({
                          unitPrice: item.unitPrice,
                          subtotal: item.subtotal,
                        }))
                      );
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSavePrices}
                  disabled={isSavingPrices}
                  className="flex items-center gap-2 text-gray-900 border-1"
                >
                  <Save className="h-4 w-4" />
                  {isSavingPrices ? 'Saving...' : 'Save Prices'}
                </Button>
              </div>
            )}
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingPrices ? (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={itemPrices[index]?.unitPrice || 0}
                            onChange={(e) => handlePriceChange(index, 'unitPrice', e.target.value)}
                            className="w-24 h-8"
                            placeholder="0.00"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500">
                          {item.unitPrice > 0 ? `$${item.unitPrice.toFixed(2)}` : 'TBD'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {editingPrices ? (
                        <span className="font-medium">
                          ${(itemPrices[index]?.subtotal || 0).toFixed(2)}
                        </span>
                      ) : (
                        <span>
                          {item.subtotal > 0 ? `$${item.subtotal.toFixed(2)}` : 'TBD'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    Total:
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                    {editingPrices
                      ? `$${calculateTotal().toFixed(2)}`
                      : order.totalAmount > 0
                      ? `$${order.totalAmount.toFixed(2)}`
                      : 'To be confirmed'}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {order.notes && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Notes</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

