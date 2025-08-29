import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const uri = process.env.MONGO_URI;
console.log('Loaded MONGO_URI:', uri); // Optional: for debugging
if (!uri) {
  console.error('Missing MONGO_URI');
  process.exit(1);
}

mongoose.connect(uri, { dbName: 'StirItUp' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('Mongo error', err); process.exit(1); });
