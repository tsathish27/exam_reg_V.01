// routes/hodRoutes.js
const express = require('express');
const HOD = require('../models/HOD');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/hod-login', async (req, res) => {
  const { username, password } = req.body;
  const hod = await HOD.findOne({ username });

  if (hod && await bcrypt.compare(password, hod.password)) {
    const token = jwt.sign({ id: hod._id, branch: hod.branch }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

router.get('/students', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    const students = await Student.find({ branch: verified.branch });
    res.json(students);
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
});

module.exports = router;
