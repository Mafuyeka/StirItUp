import express from 'express';
import { auth } from '../middleware/auth.js';
import { Booking } from '../models/Booking.js';
import { ClassModel } from '../models/Class.js';
const router = express.Router();

// Book a class
router.post('/bookings', auth, async (req, res) => {
  const { classId, seats } = req.body;
  const cls = await ClassModel.findById(classId);
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  const booking = await Booking.create({ user: req.user._id, class: cls._id, seats: seats || 1 });
  res.json(booking);
});

// List my bookings
router.get('/bookings', auth, async (req, res) => {
  const b = await Booking.find({ user: req.user._id }).populate('class');
  res.json(b);
});

// Get booking details
router.get('/bookings/:id', auth, async (req, res) => {
  const b = await Booking.findById(req.params.id).populate('class');
  if (!b) return res.status(404).json({ error: 'Not found' });
  if (String(b.user) !== String(req.user._id)) return res.status(403).json({ error: 'Not allowed' });
  res.json(b);
});

// Cancel booking
router.delete('/bookings/:id', auth, async (req, res) => {
  const b = await Booking.findById(req.params.id);
  if (!b) return res.status(404).json({ error: 'Not found' });
  if (String(b.user) !== String(req.user._id)) return res.status(403).json({ error: 'Not allowed' });
  b.status = 'cancelled';
  await b.save();
  res.json({ ok: true });
});

export default router;
