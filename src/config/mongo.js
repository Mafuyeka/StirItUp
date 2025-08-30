// config/mongo.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load .env explicitly here
dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('Missing MONGO_URI');
  process.exit(1);
}

mongoose.connect(uri, { dbName: uri.split('/').pop() })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { 
    console.error('Mongo error', err); 
    process.exit(1); 
  });
