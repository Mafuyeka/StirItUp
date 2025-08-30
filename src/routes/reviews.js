import express from 'express';
import { auth } from '../middleware/auth.js';
import { Review } from '../models/Review.js';
const router = express.Router();

// Submit review
router.post('/reviews', auth, async (req, res) => {
  const { classId, rating, comment } = req.body;
  if (!classId || !rating) return res.status(400).json({ error: 'Missing fields' });
  const r = await Review.create({ user: req.user._id, class: classId, rating, comment });
  res.json(r);
});

// List all reviews
router.get('/reviews', async (req, res) => {
  const r = await Review.find().populate('user', 'name').populate('class', 'title');
  res.json(r);
});

// Get reviews for class
router.get('/reviews/class/:id', async (req, res) => {
  const r = await Review.find({ class: req.params.id }).populate('user', 'name');
  res.json(r);
});

export default router;
