const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Временное хранилище фильмов
let movies = [];

// API маршруты
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.post('/movies', (req, res) => {
    const newMovie = { id: Date.now(), title: req.body.title };
    movies.push(newMovie);
    res.json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
    movies = movies.filter((movie) => movie.id !== parseInt(req.params.id, 10));
    res.status(204).end();
});

// Отдача статических файлов React
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
