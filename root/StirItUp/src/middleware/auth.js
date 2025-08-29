import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const chefOnly = (req, res, next) => {
  if (!req.user || !req.user.isChef) return res.status(403).json({ error: 'Chef only' });
  next();
};
