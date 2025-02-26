const express = require('express');
const bcrypt = require('bcrypt');
const { Profile } = require('../../models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newProfile = req.body;
    newProfile.password = await bcrypt.hash(req.body.password, 10);
    const userData = await Profile.create(newProfile);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;