import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  seats: { type: Number, default: 1 },
  status: { type: String, enum: ['booked','cancelled'], default: 'booked' }
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);
