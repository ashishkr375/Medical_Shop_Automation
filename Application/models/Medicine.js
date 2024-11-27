// models/Medicine.js

import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Optionally include timestamps
  }
);

const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);

export default Medicine;
