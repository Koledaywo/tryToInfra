const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

let movies = [
    { title: 'Фильм 1', description: 'Описание фильма 1', rating: null },
    { title: 'Фильм 2', description: 'Описание фильма 2', rating: null },
    { title: 'Фильм 3', description: 'Описание фильма 3', rating: null },
    { title: 'Фильм 4', description: 'Описание фильма 4', rating: null },
    { title: 'Фильм 5', description: 'Описание фильма 5', rating: null },
];

// Получение списка фильмов
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// Добавление нового фильма
app.post('/api/movies', (req, res) => {
    const { title, description } = req.body;
    const newMovie = { title, description, rating: null };
    movies.push(newMovie);
    res.status(201).json(newMovie); // Возвращаем добавленный фильм
});

// Обновление рейтинга фильма
app.put('/api/movies/:index', (req, res) => {
    const index = req.params.index;
    const { rating } = req.body;

    if (movies[index]) {
        movies[index].rating = rating;
        res.json(movies[index]);
    } else {
        res.status(404).json({ message: 'Фильм не найден' });
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
