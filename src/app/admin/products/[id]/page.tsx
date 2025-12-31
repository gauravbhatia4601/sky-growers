'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { useToast } from '@/hooks/use-toast';

export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id && params.id !== 'new') {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch product',
          variant: 'destructive',
        });
        router.push('/admin/products');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {product ? 'Edit Product' : 'Create Product'}
        </h1>
        <p className="mt-2 text-gray-600">
          {product ? 'Update product information' : 'Add a new product to your catalog'}
        </p>
      </div>

      <ProductForm product={product} />
    </div>
  );
}

