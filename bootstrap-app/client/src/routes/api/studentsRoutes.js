const express = require('express');
const { StudentsInfo } = require('../../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await StudentsInfo.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;