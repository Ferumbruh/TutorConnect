const express = require('express');
const { Profile } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Profile.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Authentication failed' });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: 'Authentication failed' });

    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;