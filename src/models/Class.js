import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, default: 0 },
  capacity: { type: Number, default: 10 },
  startDate: { type: Date },
  durationMinutes: { type: Number, default: 90 },
  image: { type: String }
}, { timestamps: true });

export const ClassModel = mongoose.model('Class', classSchema);
