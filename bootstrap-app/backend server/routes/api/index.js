const express = require('express');
const studentsRoutes = require('./studentsRoutes.js');
const tutorsRoutes = require('./tutorsRoutes.js');

const router = express.Router();

router.use('/students', studentsRoutes);
router.use('/tutors', tutorsRoutes);

module.exports = router;