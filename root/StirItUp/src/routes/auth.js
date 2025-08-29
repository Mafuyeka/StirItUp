import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, isChef } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email in use' });
    const user = await User.create({ name, email, password, isChef: !!isChef });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isChef: user.isChef } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isChef: user.isChef } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
