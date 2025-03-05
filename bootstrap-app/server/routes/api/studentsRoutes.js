const express = require('express');
const Students = require('../../models/students');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await Students.findAll();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newStudent = await Students.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;