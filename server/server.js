const express = require('express');
const bodyParser = require('body-parser');
const moviesRouter = require('./routes/movies');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Подключение маршрутов
app.use('/api/movies', moviesRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
