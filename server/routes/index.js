import express from 'express';
import moviesRoutes from './movies';

const router = express.Router();

// Подключение маршрутов
router.use('/movies', moviesRoutes);

export default router;
