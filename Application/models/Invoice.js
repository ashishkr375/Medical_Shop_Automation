
import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  billerName: { type: String, required: true },
  

  customer: {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: false },
    city: { type: String, required: false },
    postalCode: { type: String, required: false},
    country: { type: String, required: false },
  },


  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      pricePerUnit: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],

  discountPercentage: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid', 'Partially Paid'], default: 'Unpaid' },
  dueDate: { type: Date, required: true }, 
});

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
