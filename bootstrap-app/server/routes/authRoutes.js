const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { Students, Tutors } = require('../models/index'); 

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
  
    let user = await Students.findOne({ where: { email } });
    
    
    if (!user) {
      user = await Tutors.findOne({ where: { email } });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordIsValid = user.checkPassword
      ? await user.checkPassword(password)
      : await bcrypt.compare(password, user.password); 

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: 'Server misconfiguration: Missing JWT secret' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;