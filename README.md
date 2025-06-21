# Каталог фильмов

Веб-приложение для управления коллекцией фильмов с возможностью добавления, оценки и поиска фильмов.

## Функциональность

- Добавление фильмов с названием, описанием, жанром и оценкой
- Поиск фильмов по названию и описанию
- Фильтрация по жанрам
- Пагинация результатов
- Оценка фильмов по шкале от 1 до 10
- Удаление фильмов
- Адаптивный дизайн

## Технологии

- Node.js
- Express.js
- MongoDB
- Vanilla JavaScript (Frontend)
- HTML5
- CSS3

## Требования

- Node.js (версия 14 или выше)
- MongoDB

## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone <repository-url>
   cd movie-catalog
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Убедитесь, что MongoDB запущена:
   ```bash
   brew services start mongodb-community
   ```

4. Создайте файл .env в корневой директории:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/moviedb
   NODE_ENV=development
   ```

## Запуск

1. Запустите сервер:
   ```bash
   npm start
   ```

2. Для разработки используйте:
   ```bash
   npm run dev
   ```

3. Откройте браузер и перейдите по адресу:
   ```
   http://localhost:3000
   ```

## API Endpoints

- `GET /api/movies` - получить список фильмов
- `GET /api/movies/search` - поиск фильмов
- `POST /api/movies` - добавить новый фильм
- `PUT /api/movies/:id/rating` - обновить оценку фильма
- `DELETE /api/movies/:id` - удалить фильм

## Структура проекта

```
movie-catalog/
├── data/
│   └── movies.json
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   └── moviesController.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── models/
│   │   └── movie.js
│   ├── routes/
│   │   └── movies.js
│   └── server.js
└── package.json
```

## Разработка

1. Код следует стандартам ES6+
2. Используется модульная структура
3. Реализована валидация данных
4. Обработка ошибок на клиенте и сервере

## Лицензия

MIT
