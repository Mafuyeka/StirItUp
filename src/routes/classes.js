import express from 'express';
import { ClassModel } from '../models/Class.js';
import { auth, chefOnly } from '../middleware/auth.js';
const router = express.Router();

// List all classes
router.get('/classes', async (req, res) => {
  const classes = await ClassModel.find().populate('chef', 'name email');
  res.json(classes);
});

// Get class details
router.get('/classes/:id', async (req, res) => {
  const c = await ClassModel.findById(req.params.id).populate('chef', 'name email');
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

// Create class (chef only)
router.post('/classes', auth, chefOnly, async (req, res) => {
  const { title, description, price, capacity, startDate, durationMinutes } = req.body;
  const c = await ClassModel.create({
    title, description, price, capacity, startDate, durationMinutes, chef: req.user._id
  });
  res.json(c);
});

// Update class (chef must own it)
router.put('/classes/:id', auth, chefOnly, async (req, res) => {
  const c = await ClassModel.findById(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  if (String(c.chef) !== String(req.user._id)) return res.status(403).json({ error: 'Not allowed' });
  Object.assign(c, req.body);
  await c.save();
  res.json(c);
});

// Delete class
router.delete('/classes/:id', auth, chefOnly, async (req, res) => {
  const c = await ClassModel.findById(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  if (String(c.chef) !== String(req.user._id)) return res.status(403).json({ error: 'Not allowed' });
  await c.deleteOne();
  res.json({ ok: true });
});

export default router;
