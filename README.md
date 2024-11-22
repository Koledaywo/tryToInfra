# Проект "Голосование за фильмы"

Это веб-приложение, которое позволяет пользователям добавлять фильмы в список, удалять их и голосовать за фильмы по 5-балльной шкале.

### Требования

Для запуска проекта на локальном сервере, необходимо установить следующие компоненты:

- [Node.js](https://nodejs.org/) (рекомендуемая версия: 16.x или выше)
- npm (входит в комплект с Node.js)

### Шаги по установке и запуску

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/your-username/movie-voting-app.git
   cd movie-voting-app

Установка зависимостей для бэкенда:

Перейдите в папку backend и установите зависимости:


cd backend
npm install
Установка зависимостей для фронтенда:

Перейдите в папку frontend и установите зависимости:

cd ../frontend
npm install
Запуск приложения в режиме разработки:

Для запуска проекта на вашем локальном компьютере выполните следующие команды:

Запустите бэкенд (сервер):

cd ../backend
node server.js
Запустите фронтенд (React):

В отдельном терминале, перейдите в папку frontend и выполните команду:

cd ../frontend
npm start
После выполнения этих команд приложение будет доступно по следующим адресам:

Бэкенд: http://localhost:3001
Фронтенд: http://localhost:5000
Структура проекта
Backend (Node.js + Express):
server.js — Главный файл сервера, который управляет API запросами:
GET /movies — Получить список фильмов.
POST /movies — Добавить новый фильм.
DELETE /movies/:id — Удалить фильм по id.
POST /movies/:id/vote — Голосовать за фильм.
Frontend (React):
App.js — Главный компонент, который управляет маршрутами и отображением компонентов.
Страница "Список фильмов" для добавления/удаления фильмов.
Страница "Голосование" для голосования за фильмы.
index.js — Точка входа для React приложения.
package.json — Зависимости проекта, включая React и React Router.
Как добавить новый фильм
Перейдите на главную страницу.
Введите название фильма в поле "Введите название фильма".
Нажмите кнопку "Добавить фильм".
Фильм будет добавлен в список, и вы сможете голосовать за него на странице голосования.

Технологии
Backend: Node.js, Express
Frontend: React, React Router
Хранение данных: Массив в памяти (для упрощения), может быть заменено на базу данных в будущем.
