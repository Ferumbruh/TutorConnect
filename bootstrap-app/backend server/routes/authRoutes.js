const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { Students, Tutors } = require('../../models');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Students.findOne({ where: { studentsEmail: email } });
    if (!user) {
      user = await Tutors.findOne({ where: { email } });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordIsValid = user.checkPassword
      ? await user.checkPassword(password) 
      : await bcrypt.compare(password, user.studentsPassword); 

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: 'Server misconfiguration: Missing JWT secret' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email || user.studentsEmail },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, email: user.email || user.studentsEmail } });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;