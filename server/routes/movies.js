const express = require('express');
const router = express.Router();

let movies = [];

// Получить список фильмов
router.get('/', (req, res) => {
    res.json(movies);
});

// Добавить новый фильм
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Название и описание обязательны' });
    }
    movies.push({ title, description });
    res.status(201).json({ message: 'Фильм добавлен' });
});

// Удалить фильм
router.delete('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index < 0 || index >= movies.length) {
        return res.status(404).json({ error: 'Фильм не найден' });
    }
    movies.splice(index, 1);
    res.json({ message: 'Фильм удален' });
});

// Обновить рейтинг фильма
router.put('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { rating } = req.body;

    if (index < 0 || index >= movies.length || !rating || rating < 1 || rating > 10) {
        return res.status(400).json({ error: 'Некорректные данные' });
    }

    movies[index].rating = rating;
    res.json({ message: 'Оценка обновлена' });
});

module.exports = router;
