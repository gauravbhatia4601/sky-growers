import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  category: string;
  imageUrl?: string;
  pricePerUnit: number;
  unit: 'kg' | 'lbs' | 'piece';
  isAvailable: boolean;
  season?: string;
  isNew: boolean;
  isPopular: boolean;
  isDeleted?: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs', 'piece'],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
    season: {
      type: String,
      trim: true,
    },
    isNew: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

