const express = require('express');

const reportRoutes = require('./reports');

const router = express.Router();

router.use('/reports', reportRoutes);

module.exports = router;