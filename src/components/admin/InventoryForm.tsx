'use client';

import { useState, useEffect } from 'react';
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

interface InventoryItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    category: string;
    imageUrl?: string;
    unit: string;
  };
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
}

interface Product {
  _id: string;
  name: string;
  category: string;
  imageUrl?: string;
  unit: string;
}

interface InventoryFormProps {
  inventory?: InventoryItem;
  products?: Product[];
  selectedProductId?: string;
  onProductSelect?: (productId: string) => void;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function InventoryForm({
  inventory,
  products = [],
  selectedProductId = '',
  onProductSelect,
  onCancel,
  onSuccess,
}: InventoryFormProps) {
  const { toast } = useToast();
  const isNew = !inventory;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productId: selectedProductId || inventory?.productId._id || '',
    quantity: inventory?.quantity || 0,
    reservedQuantity: inventory?.reservedQuantity || 0,
    lowStockThreshold: inventory?.lowStockThreshold || 10,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const selectedProduct = products.find((p) => p._id === formData.productId);
  const unit = inventory?.productId.unit || selectedProduct?.unit || '';

  useEffect(() => {
    if (onProductSelect) {
      onProductSelect(formData.productId);
    }
  }, [formData.productId, onProductSelect]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (isNew && !formData.productId) {
      newErrors.productId = 'Product selection is required';
    }

    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    if (formData.reservedQuantity < 0) {
      newErrors.reservedQuantity = 'Reserved quantity cannot be negative';
    }

    if (formData.reservedQuantity > formData.quantity) {
      newErrors.reservedQuantity = 'Reserved quantity cannot exceed total quantity';
    }

    if (formData.lowStockThreshold < 0) {
      newErrors.lowStockThreshold = 'Low stock threshold cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let url = '/api/admin/inventory';
      let method = 'POST';

      if (!isNew && inventory) {
        url = `/api/admin/inventory/${inventory._id}`;
        method = 'PUT';
      }

      const body = isNew
        ? {
            productId: formData.productId,
            quantity: formData.quantity,
            reservedQuantity: formData.reservedQuantity,
            lowStockThreshold: formData.lowStockThreshold,
          }
        : {
            quantity: formData.quantity,
            reservedQuantity: formData.reservedQuantity,
            lowStockThreshold: formData.lowStockThreshold,
          };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to ${isNew ? 'create' : 'update'} inventory`);
      }

      toast({
        title: 'Success',
        description: `Inventory ${isNew ? 'created' : 'updated'} successfully`,
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || `Failed to ${isNew ? 'create' : 'update'} inventory`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      {isNew ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product *
          </label>
          <Select
            value={formData.productId}
            onValueChange={(value) => setFormData({ ...formData, productId: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product._id} value={product._id}>
                  {product.name} ({product.category})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.productId && (
            <p className="text-xs text-red-600 mt-1">{errors.productId}</p>
          )}
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product
          </label>
          <p className="text-sm text-gray-900 font-medium">{inventory?.productId.name}</p>
          <p className="text-xs text-gray-500">{inventory?.productId.category}</p>
        </div>
      )}

      {unit && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Quantity ({unit}) *
            </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })
            }
            required
          />
          {errors.quantity && (
            <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>
          )}
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reserved Quantity ({unit}) *
            </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={formData.reservedQuantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                reservedQuantity: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
          {errors.reservedQuantity && (
            <p className="text-xs text-red-600 mt-1">{errors.reservedQuantity}</p>
          )}
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Low Stock Threshold ({unit}) *
            </label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={formData.lowStockThreshold}
            onChange={(e) =>
              setFormData({
                ...formData,
                lowStockThreshold: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
          {errors.lowStockThreshold && (
            <p className="text-xs text-red-600 mt-1">{errors.lowStockThreshold}</p>
          )}
          </div>
        </div>
      )}

      {unit && (
        <div className="bg-gray-50 p-3 rounded text-sm">
          <p className="text-gray-600">
            Available: {Math.max(0, formData.quantity - formData.reservedQuantity).toFixed(2)}{' '}
            {unit}
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting || (isNew && !formData.productId)} className="text-gray-900 border-1 hover:bg-gray-900 hover:text-white">
          {isSubmitting
            ? isNew
              ? 'Creating...'
              : 'Updating...'
            : isNew
              ? 'Create Inventory'
              : 'Update Inventory'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

