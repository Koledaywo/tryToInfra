# Каталог фильмов

Веб-приложение для управления коллекцией фильмов с возможностью добавления, оценки и поиска фильмов.

## Функциональность

- Добавление фильмов с названием, описанием, жанром и оценкой
- Поиск фильмов по названию и описанию
- Фильтрация по жанрам
- Пагинация результатов
- Оценка фильмов по шкале от 1 до 10
- Удаление фильмов с корзиной (возможность восстановления)
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

### Получение списка фильмов
`GET /api/movies`

**Успешный ответ (200 OK):**
```json
{
  "movies": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "genre": "string",
      "rating": "number",
      "releaseDate": "string (ISO8601)",
      "createdAt": "string (ISO8601)",
      "updatedAt": "string (ISO8601)",
      "isDeleted": false
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

### Поиск фильмов
`GET /api/movies/search?query=string`

**Успешный ответ (200 OK):**
```json
{
  "movies": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "genre": "string",
      "rating": "number",
      "releaseDate": "string (ISO8601)"
    }
  ],
  "total": "number"
}
```

### Получение удаленных фильмов (корзина)
`GET /api/movies/trash`

**Успешный ответ (200 OK):**
```json
{
  "movies": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "genre": "string",
      "rating": "number",
      "releaseDate": "string (ISO8601)",
      "deletedAt": "string (ISO8601)"
    }
  ]
}
```

### Добавление нового фильма
`POST /api/movies`

**Тело запроса:**
```json
{
  "title": "string (2-100 символов)",
  "description": "string (10-1000 символов)",
  "genre": "string (action|comedy|drama|horror|thriller|sci-fi|documentary)",
  "rating": "number (1-10)",
  "releaseDate": "string (ISO8601)"
}
```

**Успешный ответ (201 Created):**
```json
{
  "movie": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "genre": "string",
    "rating": "number",
    "releaseDate": "string (ISO8601)",
    "createdAt": "string (ISO8601)",
    "updatedAt": "string (ISO8601)"
  }
}
```

**Ошибка валидации (400 Bad Request):**
```json
{
  "errors": [
    {
      "value": "string",
      "msg": "string",
      "param": "string",
      "location": "body"
    }
  ]
}
```

### Обновление рейтинга фильма
`PUT /api/movies/:id/rating`

**Тело запроса:**
```json
{
  "rating": "number (1-10)"
}
```

**Успешный ответ (200 OK):**
```json
{
  "movie": {
    "_id": "string",
    "title": "string",
    "rating": "number",
    "updatedAt": "string (ISO8601)"
  }
}
```

**Ошибка валидации (400 Bad Request):**
```json
{
  "errors": [
    {
      "value": "number",
      "msg": "Оценка должна быть от 1 до 10",
      "param": "rating",
      "location": "body"
    }
  ]
}
```

### Удаление фильма (перемещение в корзину)
`DELETE /api/movies/:id`

**Успешный ответ (200 OK):**
```json
{
  "message": "Фильм успешно удален",
  "movieId": "string"
}
```

### Восстановление фильма из корзины
`PUT /api/movies/:id/restore`

**Успешный ответ (200 OK):**
```json
{
  "message": "Фильм успешно восстановлен",
  "movie": {
    "_id": "string",
    "title": "string",
    "updatedAt": "string (ISO8601)"
  }
}
```

### Окончательное удаление фильма
`DELETE /api/movies/:id/permanent`

**Успешный ответ (200 OK):**
```json
{
  "message": "Фильм окончательно удален",
  "movieId": "string"
}
```

**Общие ошибки для всех endpoints:**

- **404 Not Found:**
```json
{
  "error": "Фильм не найден"
}
```

- **500 Internal Server Error:**
```json
{
  "error": "Внутренняя ошибка сервера"
}
```

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
