const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { Students, Tutors } = require('../models/index');

const router = express.Router();

// **Signup Route**
router.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: "User created successfully", user: newUser.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// **Login Route**
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
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
      : await bcrypt.compare(password, user.studentsPassword); 

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: 'Server misconfiguration: Missing JWT secret' });
    }

        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, user: user.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
