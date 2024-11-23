const express = require('express');
const moviesRoutes = require('./movies');

const router = express.Router();

// Подключение маршрутов
router.use('/movies', moviesRoutes);

module.exports = router;
