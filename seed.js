require('dotenv').config();
const mongoose = require('mongoose');
const Register = require('./models/Register');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/registrar_db';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected:', MONGODB_URI);

    const sample = new Register({ name: 'Seed User', email: 'seed@example.com', meta: { source: 'seed' } });
    const saved = await sample.save();
    console.log('Seed saved:', saved);
    process.exit(0);
  } catch (err) {
    console.error('Seed err:', err.message);
    process.exit(1);
  }
}

seed();
