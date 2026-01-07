import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStats extends Document {
  totalOrders: number;
  totalRevenue: number; // Total revenue from all orders
  deliveredRevenue: number; // Revenue from delivered orders only
  pendingOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
  addOrder(amount: number): Promise<IStats>;
  updateOrderStatus(oldStatus: string, newStatus: string, amount: number): Promise<IStats>;
  updateRevenue(oldAmount: number, newAmount: number): Promise<IStats>;
}

const StatsSchema: Schema = new Schema(
  {
    totalOrders: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalRevenue: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    deliveredRevenue: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    pendingOrders: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    confirmedOrders: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    deliveredOrders: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    cancelledOrders: {
      type: Number,
      required: true,
      default: 0,
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

// Static method to get or create stats document
// Note: _id is already unique by default in MongoDB, no need for explicit index
StatsSchema.statics.getStats = async function () {
  let stats = await this.findOne();
  if (!stats) {
    stats = await this.create({
      totalOrders: 0,
      totalRevenue: 0,
      deliveredRevenue: 0,
      pendingOrders: 0,
      confirmedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
    });
  }
  return stats;
};

// Method to update stats when order is created
StatsSchema.methods.addOrder = function (amount: number) {
  this.totalOrders += 1;
  this.totalRevenue += amount;
  this.pendingOrders += 1;
  this.lastUpdated = new Date();
  return this.save();
};

// Method to update stats when order status changes
StatsSchema.methods.updateOrderStatus = function (
  oldStatus: string,
  newStatus: string,
  amount: number
) {
  // Decrement old status count
  if (oldStatus === 'pending') this.pendingOrders = Math.max(0, this.pendingOrders - 1);
  if (oldStatus === 'confirmed') this.confirmedOrders = Math.max(0, this.confirmedOrders - 1);
  if (oldStatus === 'delivered') {
    this.deliveredOrders = Math.max(0, this.deliveredOrders - 1);
    this.deliveredRevenue = Math.max(0, this.deliveredRevenue - amount);
  }
  if (oldStatus === 'cancelled') this.cancelledOrders = Math.max(0, this.cancelledOrders - 1);

  // Increment new status count
  if (newStatus === 'pending') this.pendingOrders += 1;
  if (newStatus === 'confirmed') this.confirmedOrders += 1;
  if (newStatus === 'delivered') {
    this.deliveredOrders += 1;
    this.deliveredRevenue += amount;
  }
  if (newStatus === 'cancelled') this.cancelledOrders += 1;

  this.lastUpdated = new Date();
  return this.save();
};

// Method to update revenue when order price is updated
StatsSchema.methods.updateRevenue = function (oldAmount: number, newAmount: number) {
  const difference = newAmount - oldAmount;
  this.totalRevenue += difference;
  
  // If order is delivered, also update delivered revenue
  // Note: This would need to be called with context of order status
  this.lastUpdated = new Date();
  return this.save();
};

interface IStatsModel extends Model<IStats> {
  getStats(): Promise<IStats>;
}

const Stats = (mongoose.models.Stats as IStatsModel) || mongoose.model<IStats, IStatsModel>('Stats', StatsSchema);

export default Stats;

