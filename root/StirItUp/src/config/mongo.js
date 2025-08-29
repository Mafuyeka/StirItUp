import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// First define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Then load .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Now use process.env.MONGO_URI
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('Missing MONGO_URI');
  process.exit(1);
}

mongoose.connect(uri, { dbName: 'StirItUp' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('Mongo error', err); process.exit(1); });
