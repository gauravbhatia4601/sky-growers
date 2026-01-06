'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PRODUCT_CATEGORIES, PRODUCT_SEASONS } from '@/lib/product.config';

interface Product {
  _id?: string;
  name: string;
  description?: string;
  category: string;
  imageUrl?: string;
  pricePerUnit: number;
  unit: 'kg' | 'lbs' | 'piece';
  isAvailable: boolean;
  season?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface ProductFormProps {
  product?: Product | null;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    category: '',
    imageUrl: '',
    pricePerUnit: 0,
    unit: 'kg',
    isAvailable: true,
    season: '',
    isNew: false,
    isPopular: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        imageUrl: product.imageUrl || '',
        pricePerUnit: product.pricePerUnit || 0,
        unit: product.unit || 'kg',
        isAvailable: product.isAvailable ?? true,
        season: product.season || '',
        isNew: product.isNew ?? false,
        isPopular: product.isPopular ?? false,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = product?._id
        ? `/api/admin/products/${product._id}`
        : '/api/admin/products';
      const method = product?._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save product');
      }

      toast({
        title: 'Success',
        description: `Product ${product?._id ? 'updated' : 'created'} successfully`,
      });

      router.push('/admin/products');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price per Unit *
          </label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={formData.pricePerUnit}
            onChange={(e) =>
              setFormData({ ...formData, pricePerUnit: parseFloat(e.target.value) || 0 })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit *
          </label>
          <Select
            value={formData.unit}
            onValueChange={(value: 'kg' | 'lbs' | 'piece') =>
              setFormData({ ...formData, unit: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="lbs">lbs</SelectItem>
              <SelectItem value="piece">piece</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Season
          </label>
          <Select
            value={formData.season || ''}
            onValueChange={(value) => setFormData({ ...formData, season: value || undefined })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select season (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {PRODUCT_SEASONS.map((season) => (
                <SelectItem key={season} value={season}>
                  {season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <Input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAvailable"
            checked={formData.isAvailable}
            onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
            Product is available for sale
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isNew"
            checked={formData.isNew}
            onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="isNew" className="ml-2 block text-sm text-gray-900">
            Mark as New Product
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPopular"
            checked={formData.isPopular}
            onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-900">
            Mark as Most Popular
          </label>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button type="submit" disabled={isSubmitting} className='text-gray-900 border-1 hover:bg-gray-900 hover:text-white'>
          {isSubmitting ? 'Saving...' : product?._id ? 'Update Product' : 'Create Product'}
        </Button>
        
      </div>
    </form>
  );
}

