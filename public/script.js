let currentPage = 1;
let totalPages = 1;

document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movieForm');
    const movieList = document.getElementById('movieList');
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Initialize datepicker
    flatpickr("#releaseDate", {
        locale: "ru",
        dateFormat: "Y-m-d",
        maxDate: "today",
        disableMobile: "true"
    });

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Event Listeners
    movieForm.addEventListener('submit', handleMovieSubmit);
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    genreFilter.addEventListener('change', () => {
        currentPage = 1;
        fetchMovies();
    });
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        fetchMovies(true);
    });

    // Initial load
    fetchMovies();
});

async function fetchMovies(append = false) {
    try {
        const genreFilter = document.getElementById('genreFilter');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const genre = genreFilter.value !== 'all' ? `&genre=${genreFilter.value}` : '';
        
        const response = await fetch(`/api/movies?page=${currentPage}&limit=10${genre}`);
        if (!response.ok) {
            throw new Error('Ошибка при получении фильмов');
        }
        
        const data = await response.json();
        
        // Проверяем структуру ответа
        if (!data.movies || !Array.isArray(data.movies)) {
            throw new Error('Некорректный формат данных от сервера');
        }
        
        if (!append) {
            document.getElementById('movieList').innerHTML = '';
        }
        
        data.movies.forEach(movie => {
            displayMovie(movie);
        });

        totalPages = data.totalPages || 1;
        loadMoreBtn.style.display = currentPage < totalPages ? 'block' : 'none';
    } catch (error) {
        console.error('Ошибка при получении фильмов:', error);
        showNotification(error.message, 'error');
    }
}

async function handleMovieSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const movieData = {
        title: formData.get('title').trim(),
        description: formData.get('description').trim(),
        genre: formData.get('genre'),
        releaseDate: formData.get('releaseDate'),
        rating: formData.get('rating') ? Number(formData.get('rating')) : 1
    };

    try {
        const response = await fetch('/api/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movieData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            if (data.errors) {
                const errorMessages = data.errors.map(err => `${err.msg}`).join('\n');
                throw new Error(errorMessages);
            }
            throw new Error(data.error || 'Ошибка при добавлении фильма');
        }

        event.target.reset();
        showNotification('Фильм успешно добавлен', 'success');
        
        // Перезагружаем первую страницу
        currentPage = 1;
        await fetchMovies();
    } catch (error) {
        console.error('Ошибка при добавлении фильма:', error);
        showNotification(error.message, 'error');
    }
}

async function handleSearch(event) {
    const query = event.target.value.trim();
    if (!query) {
        currentPage = 1;
        return fetchMovies();
    }

    try {
        const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);
        const movies = await response.json();
        
        document.getElementById('movieList').innerHTML = '';
        movies.forEach(movie => displayMovie(movie));
        
        document.getElementById('loadMoreBtn').style.display = 'none';
    } catch (error) {
        console.error('Ошибка при поиске:', error);
        showNotification('Ошибка при поиске фильмов', 'error');
    }
}

async function deleteMovie(id) {
    if (!confirm('Вы уверены, что хотите переместить фильм в корзину?')) {
        return;
    }

    try {
        const response = await fetch(`/api/movies/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении фильма');
        }

        currentPage = 1;
        fetchMovies();
        showNotification('Фильм перемещен в корзину', 'success');
    } catch (error) {
        console.error('Ошибка при удалении фильма:', error);
        showNotification(error.message, 'error');
    }
}

async function updateRating(id, rating) {
    try {
        const response = await fetch(`/api/movies/${id}/rating`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating: Number(rating) })
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении оценки');
        }

        showNotification('Оценка успешно обновлена', 'success');
    } catch (error) {
        console.error('Ошибка при обновлении оценки:', error);
        showNotification(error.message, 'error');
    }
}

function displayMovie(movie) {
    const movieList = document.getElementById('movieList');
    const movieElement = document.createElement('div');
    movieElement.className = 'movie-card';

    const releaseDate = new Date(movie.releaseDate).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    movieElement.innerHTML = `
        <h3>${movie.title}</h3>
        <p>${movie.description}</p>
        <div class="movie-meta">
            <span class="genre ${movie.genre}">${movie.genre}</span>
            <span class="rating">
                Оценка: <span id="rating-${movie._id}">${movie.rating || 'Не оценено'}</span>
            </span>
        </div>
        <div class="movie-dates">
            <div>Дата выхода: ${releaseDate}</div>
        </div>
        <div class="movie-actions">
            <input type="number" 
                min="1" 
                max="10" 
                class="rating-input"
                placeholder="1-10"
                aria-label="Оценка фильма от 1 до 10">
            <button onclick="updateRating('${movie._id}', this.previousElementSibling.value)"
                class="rate-btn">Оценить</button>
            <button onclick="deleteMovie('${movie._id}')"
                class="delete-btn">В корзину</button>
        </div>
    `;
    movieList.appendChild(movieElement);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}
