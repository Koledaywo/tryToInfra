import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const moviesFilePath = path.join(__dirname, '../../data/movies.json');

const readMoviesFromFile = () => {
    try {
        const data = fs.readFileSync(moviesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка чтения файла с фильмами:', error);
        return [];
    }
};

const writeMoviesToFile = (movies) => {
    try {
        fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка записи файла с фильмами:', error);
    }
};

let movies = readMoviesFromFile();

router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {
    const { title, description, rating } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Название и описание обязательны' });
    }

    const newMovie = {
        title,
        description,
        rating: rating !== undefined ? rating : null
    };

    movies.push(newMovie);
    writeMoviesToFile(movies);

    res.status(201).json({ message: 'Фильм добавлен', movie: newMovie });
});

router.delete('/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (index < 0 || index >= movies.length) {
        return res.status(404).json({ error: 'Фильм не найден' });
    }

    movies.splice(index, 1);
    writeMoviesToFile(movies);
    res.json({ message: 'Фильм удален' });
});

router.put('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { rating } = req.body;

    if (index < 0 || index >= movies.length || !rating || rating < 1 || rating > 10) {
        return res.status(400).json({ error: 'Некорректные данные' });
    }

    movies[index].rating = rating;
    writeMoviesToFile(movies);
    res.json({ message: 'Оценка обновлена' });
});

export default router;
