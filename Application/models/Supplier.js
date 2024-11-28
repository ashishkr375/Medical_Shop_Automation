import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema(
  {
    supplierName: { type: String, required: true },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
);

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);

export default Supplier;
