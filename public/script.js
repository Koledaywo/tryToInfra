// Загружаем фильмы с сервера
function loadMovies() {
    fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            if (document.getElementById('movieList')) {
                displayMovies(movies); // На странице добавления
            }
            if (document.getElementById('movieRatingList')) {
                displayMoviesForRating(movies); // На странице оценки
            }
        })
        .catch(error => console.error('Ошибка загрузки фильмов:', error));
}

// Отображаем фильмы на странице добавления
function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';  // Очистка текущего списка

    if (movies.length > 0) {
        movies.slice(0, 5).forEach(movie => {
            const li = document.createElement('li');
            li.textContent = `${movie.title}: ${movie.description}`;
            movieList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = "Нет фильмов. Добавьте новый фильм!";
        movieList.appendChild(li);
    }
}

// Отображаем фильмы на странице оценки
function displayMoviesForRating(movies) {
    const movieRatingList = document.getElementById('movieRatingList');
    movieRatingList.innerHTML = ''; // Очистка текущего списка

    if (movies.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Нет фильмов для оценки. Добавьте фильм на странице ввода!';
        movieRatingList.appendChild(li);
    } else {
        movies.forEach((movie, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${movie.title}</strong>: ${movie.description}
                <br>
                Оценка: <span id="rating-${index}">${movie.rating ? movie.rating : 'Не оценено'}</span>
                <br>
                <input type="number" min="1" max="10" id="input-${index}" placeholder="Оцените фильм">
                <button onclick="rateMovie(${index}, '${movie.title}')">Отправить оценку</button>
            `;
            movieRatingList.appendChild(li);
        });
    }
}

// Функция для добавления фильма
document.addEventListener("DOMContentLoaded", function () {
    const movieForm = document.getElementById('movieForm');
    console.log(movieForm); // Проверка, что форма существует

    if (movieForm) {
        movieForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('movieTitle').value;
            const description = document.getElementById('movieDescription').value;

            // Отправляем запрос на сервер для добавления фильма
            fetch('/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            })
            .then(response => response.json())
            .then(movie => {
                alert('Фильм добавлен!');
                loadMovies(); // Перезагружаем список фильмов
            })
            .catch(error => console.error('Ошибка добавления фильма:', error));
        });
    }

    // Загружаем фильмы при старте
    loadMovies(); // Загружаем фильмы при загрузке страницы
});

// Функция для оценки фильма
function rateMovie(index, title) {
    const ratingInput = document.getElementById(`input-${index}`);
    const rating = ratingInput.value;

    if (rating >= 1 && rating <= 10) {
        fetch(`/api/movies/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating })
        })
        .then(response => response.json())
        .then(updatedMovie => {
            document.getElementById(`rating-${index}`).textContent = updatedMovie.rating;
        })
        .catch(error => console.error('Ошибка обновления рейтинга:', error));
    } else {
        alert('Введите корректную оценку (от 1 до 10)');
    }
}
