import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
