const express = require('express');
const router = express.Router();
const Register = require('../models/Register');

// GET all registrations
router.get('/', async (req, res) => {
  try {
    const list = await Register.find().sort({ createdAt: -1 }).lean();
    res.json(list || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching registrations' });
  }
});

// POST register (create new)
router.post('/', async (req, res) => {
  try {
    const data = req.body || {};
    if (!data.name || !data.email) {
      return res.status(400).json({ success: false, message: 'name and email required' });
    }

    // Simple uniqueness check on email
    const exists = await Register.findOne({ email: String(data.email).toLowerCase() });
    if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });

    const reg = new Register({ name: data.name.trim(), email: String(data.email).toLowerCase(), meta: data.meta || {} });
    const saved = await reg.save();
    return res.status(201).json({ success: true, registration: saved });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error saving registration' });
  }
});

// delete by id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await Register.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error deleting' });
  }
});

module.exports = router;
