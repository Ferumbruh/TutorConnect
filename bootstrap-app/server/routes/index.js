const express = require("express");
const apiRoutes = require("./api");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;