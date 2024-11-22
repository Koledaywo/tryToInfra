const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Предустановленные фильмы
let movies = [
    { id: 1, title: 'Интерстеллар', votes: 0 },
    { id: 2, title: 'Начало', votes: 0 },
    { id: 3, title: 'Матрица', votes: 0 },
    { id: 4, title: 'Аватар', votes: 0 },
    { id: 5, title: 'Темный рыцарь', votes: 0 },
];

// Получить список фильмов
app.get('/movies', (req, res) => {
    res.json(movies);
});

// Добавить новый фильм
app.post('/movies', (req, res) => {
    const newMovie = { id: Date.now(), title: req.body.title, votes: 0 };
    movies.push(newMovie);
    res.json(newMovie);
});

// Удалить фильм
app.delete('/movies/:id', (req, res) => {
    movies = movies.filter((movie) => movie.id !== parseInt(req.params.id, 10));
    res.status(204).end();
});

// Голосование за фильм
app.post('/movies/:id/vote', (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const movie = movies.find((movie) => movie.id === movieId);
    if (movie) {
        movie.votes += 1; // Увеличиваем число голосов
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Фильм не найден' });
    }
});

// Обслуживание статических файлов React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Обработка всех остальных маршрутов и возврат index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
