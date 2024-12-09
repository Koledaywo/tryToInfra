document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movieForm');
    const movieList = document.getElementById('movieList');

    fetchMovies();

    movieForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('movieTitle').value.trim();
        const description = document.getElementById('movieDescription').value.trim();
        const rating = document.getElementById('movieRating').value.trim();

        if (title && description) {
            addMovie({ title, description, rating: rating || null });
            movieForm.reset();
        }
    });
});

function fetchMovies() {
    fetch('/api/movies')
        .then((response) => response.json())
        .then((movies) => displayMovies(movies))
        .catch((error) => console.error('Ошибка при получении списка фильмов:', error));
}

function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    if (!movieList) {
        console.error('Элемент movieList не найден в DOM.');
        return;
    }

    movieList.innerHTML = '';

    if (movies.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Нет фильмов. Добавьте новый фильм!';
        movieList.appendChild(li);
    } else {
        movies.forEach((movie, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${movie.title}</strong>: ${movie.description}
                <br>
                Оценка: <span id="rating-${index}">${movie.rating ? movie.rating : 'Не оценено'}</span>
                <br>
                <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    id="input-${index}" 
                    placeholder="Оцените фильм" 
                    aria-label="Поле для оценки фильма ${movie.title}">
                <button 
                    onclick="rateMovie(${index})" 
                    aria-label="Оценить фильм ${movie.title}">Оценить</button>
                <button 
                    onclick="deleteMovie(${index})" 
                    class="delete-btn" 
                    aria-label="Удалить фильм ${movie.title}">Удалить</button>
            `;
            movieList.appendChild(li);
        });
    }
}

function addMovie(movie) {
    fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при добавлении фильма');
            }
            return response.json();
        })
        .then(() => fetchMovies())
        .catch((error) => console.error('Ошибка при добавлении фильма:', error));
}

function deleteMovie(index) {
    fetch(`/api/movies/${index}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при удалении фильма');
            }
            fetchMovies();
        })
        .catch((error) => console.error('Ошибка при удалении фильма:', error));
}

function rateMovie(index) {
    const input = document.getElementById(`input-${index}`);
    const rating = input.value;

    if (!rating || rating < 1 || rating > 10) {
        alert('Введите корректную оценку (от 1 до 10).');
        return;
    }

    fetch(`/api/movies/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при обновлении оценки фильма');
            }
            return response.json();
        })
        .then(() => {
            const ratingSpan = document.getElementById(`rating-${index}`);
            if (ratingSpan) {
                ratingSpan.textContent = rating;
            }
            input.value = '';
        })
        .catch((error) => console.error('Ошибка при обновлении оценки фильма:', error));
}
