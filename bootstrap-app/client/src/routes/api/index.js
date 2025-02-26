const express = require('express');
const studentsRoutes = require('./studentsRoutes');
const tutorsRoutes = require('./tutorsRoutes');
const profileRoutes = require('./profileRoutes');

const router = express.Router();

router.use('/students', studentsRoutes);
router.use('/tutors', tutorsRoutes);
router.use('/profiles', profileRoutes);

module.exports = router;