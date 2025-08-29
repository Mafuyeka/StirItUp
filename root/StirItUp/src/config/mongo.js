import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('Missing MONGO_URI');
  process.exit(1);
}

mongoose.connect(uri, { dbName: uri.split('/').pop() })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('Mongo error', err); process.exit(1); });
