'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import InventoryForm from '@/components/admin/InventoryForm';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface Product {
  _id: string;
  name: string;
  category: string;
  imageUrl?: string;
  unit: string;
}

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

export default function InventoryEditPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const isNew = params.id === 'new';

  useEffect(() => {
    if (isNew) {
      fetchProducts();
      setLoading(false);
    } else {
      fetchInventory();
    }
  }, [params.id]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/inventory/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch inventory',
          variant: 'destructive',
        });
        router.push('/admin/inventory');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch inventory',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      // Only fetch active (non-deleted) products for new inventory
      const response = await fetch('/api/admin/products?limit=1000');
      if (response.ok) {
        const data = await response.json();
        // Filter out deleted products on client side as well
        setProducts((data.products || []).filter((p: any) => !p.isDeleted));
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch products',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (isNew) {
    return (
      <div>
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-4">
            ← Back to Inventory
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Create Inventory</h1>
          <p className="mt-2 text-gray-600">Add inventory for a product</p>
        </div>
        <InventoryForm
          products={products}
          selectedProductId={selectedProductId}
          onProductSelect={setSelectedProductId}
          onCancel={() => router.push('/admin/inventory')}
          onSuccess={() => router.push('/admin/inventory')}
        />
      </div>
    );
  }

  if (!inventory) {
    return <div className="text-center py-12">Inventory not found</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          ← Back to Inventory
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Inventory</h1>
        <p className="mt-2 text-gray-600">Update inventory information</p>
      </div>

      <InventoryForm
        inventory={inventory}
        onCancel={() => router.push('/admin/inventory')}
        onSuccess={() => router.push('/admin/inventory')}
      />
    </div>
  );
}

