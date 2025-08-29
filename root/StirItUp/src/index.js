import dotenv from 'dotenv';
dotenv.config();

console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import './config/mongo.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import classRoutes from './routes/classes.js';
import bookingRoutes from './routes/bookings.js';
import reviewRoutes from './routes/reviews.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', classRoutes);
app.use('/api', bookingRoutes);
app.use('/api', reviewRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`StirItUp running on http://localhost:${port}`));
