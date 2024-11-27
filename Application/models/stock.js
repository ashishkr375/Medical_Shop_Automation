import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['OTC', 'Prescription', 'Controlled'],
        required: true,
    },
    stockLevel: {
        type: Number,
        required: true,
        default: 0,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Medicine', MedicineSchema);
