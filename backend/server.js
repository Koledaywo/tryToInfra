const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Используем middleware
app.use(cors());
app.use(bodyParser.json());

// Данные о голосах (в памяти)
let options = [
    { id: 1, name: "Option 1", votes: 0 },
    { id: 2, name: "Option 2", votes: 0 },
    { id: 3, name: "Option 3", votes: 0 },
];

// Получить текущие результаты голосования
app.get('/api/results', (req, res) => {
    res.json(options);
});

// Проголосовать за опцию
app.post('/api/vote', (req, res) => {
    const { id } = req.body;
    const option = options.find(opt => opt.id === id);
    if (option) {
        option.votes += 1;
        res.status(200).json({ message: 'Vote counted', option });
    } else {
        res.status(404).json({ message: 'Option not found' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
