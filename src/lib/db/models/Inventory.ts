import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInventory extends Document {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
  lastUpdated: Date;
}

const InventorySchema: Schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    reservedQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    availableQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      required: true,
      default: 10,
      min: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to check if stock is low
InventorySchema.virtual('isLowStock').get(function (this: IInventory) {
  return this.availableQuantity <= this.lowStockThreshold;
});

// Pre-save hook to calculate available quantity
InventorySchema.pre('save', function (this: IInventory) {
  this.availableQuantity = Math.max(0, this.quantity - this.reservedQuantity);
  this.lastUpdated = new Date();
});

const Inventory: Model<IInventory> = mongoose.models.Inventory || mongoose.model<IInventory>('Inventory', InventorySchema);

export default Inventory;

