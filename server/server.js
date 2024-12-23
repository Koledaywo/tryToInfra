import express from 'express';
import bodyParser from 'body-parser';
import moviesRouter from './routes/movies.js'; 

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Подключение маршрутов
app.use('/api/movies', moviesRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
