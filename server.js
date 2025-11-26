require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const registerRouter = require('./routes/register');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/registrar_db';

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/register', registerRouter);

app.get('/health', (req, res) => {
  return res.json({ status: 'ok', timestamp: new Date() });
});

async function start() {
  try {
    console.log('Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB', err.message);
    process.exit(1);
  }
}

start();
