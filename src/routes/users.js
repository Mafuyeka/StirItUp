import express from 'express';
import { auth } from '../middleware/auth.js';
import { User } from '../models/User.js';
const router = express.Router();

router.get('/users/me', auth, async (req, res) => {
  res.json(req.user);
});

router.put('/users/me', auth, async (req, res) => {
  const { name, email } = req.body;
  if (email && email !== req.user.email) {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already in use' });
  }
  const u = await User.findById(req.user._id);
  if (name) u.name = name;
  if (email) u.email = email;
  await u.save();
  res.json({ id: u._id, name: u.name, email: u.email, isChef: u.isChef });
});

export default router;
