const express = require('express');
const { TutorsInfo } = require('../../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tutors = await TutorsInfo.findAll();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;