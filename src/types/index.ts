import { IOrder, IOrderItem, OrderStatus } from '@/lib/db/models/Order';
import { IProduct } from '@/lib/db/models/Product';
import { IInventory } from '@/lib/db/models/Inventory';
import { IUser } from '@/lib/db/models/User';

export type { IOrder, IOrderItem, OrderStatus, IProduct, IInventory, IUser };

export interface CreateProductInput {
  name: string;
  description?: string;
  category: string;
  imageUrl?: string;
  pricePerUnit: number;
  unit: 'kg' | 'lbs' | 'piece';
  isAvailable?: boolean;
  season?: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName?: string;
  orderType: 'bulk-wholesale' | 'restaurant' | 'grocery' | 'individual' | 'catering' | 'csa';
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  deliveryAddress?: string;
  deliveryDate?: string;
  notes?: string;
}

export interface UpdateOrderInput {
  status?: OrderStatus;
  deliveryAddress?: string;
  deliveryDate?: string;
  notes?: string;
}

export interface UpdateInventoryInput {
  quantity?: number;
  reservedQuantity?: number;
  lowStockThreshold?: number;
}

export interface InventoryWithProduct extends IInventory {
  product: IProduct;
}

export interface OrderWithProducts extends IOrder {
  items: Array<IOrderItem & { product?: IProduct }>;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  topProducts: Array<{
    productId: string;
    productName: string;
    totalQuantity: number;
    totalRevenue: number;
  }>;
  ordersByStatus: Record<OrderStatus, number>;
}

