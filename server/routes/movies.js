import express from 'express';
import { validateMovie, validateRating, validate } from '../middlewares/validator.js';
import {
    getMovies,
    getDeletedMovies,
    addMovie,
    deleteMovie,
    restoreMovie,
    permanentlyDeleteMovie,
    updateMovieRating,
    searchMovies
} from '../controllers/moviesController.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/search', searchMovies);
router.get('/trash', getDeletedMovies);
router.post('/', validateMovie, validate, addMovie);
router.delete('/:id', deleteMovie);
router.put('/:id/rating', validateRating, validate, updateMovieRating);
router.put('/:id/restore', restoreMovie);
router.delete('/:id/permanent', permanentlyDeleteMovie);

export default router;
