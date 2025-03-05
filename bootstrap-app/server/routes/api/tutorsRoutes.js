const express = require('express');
const Tutors = require('../../models/tutors');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tutors = await Tutors.findAll();
    res.status(200).json(tutors);
  } catch (error) {
    console.error('Error fetching tutors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTutor = await Tutors.create(req.body);
    res.status(201).json(newTutor);
  } catch (error) {
    console.error('Error creating tutor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;