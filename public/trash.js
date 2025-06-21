document.addEventListener('DOMContentLoaded', () => {
    fetchDeletedMovies();
});

async function fetchDeletedMovies() {
    try {
        const response = await fetch('/api/movies/trash');
        const data = await response.json();
        
        const movieList = document.getElementById('deletedMovieList');
        movieList.innerHTML = '';
        
        if (data.movies.length === 0) {
            movieList.innerHTML = '<div class="empty-message">Корзина пуста</div>';
            return;
        }

        data.movies.forEach(movie => {
            displayDeletedMovie(movie);
        });
    } catch (error) {
        console.error('Ошибка при получении удаленных фильмов:', error);
        showNotification('Ошибка при загрузке удаленных фильмов', 'error');
    }
}

function displayDeletedMovie(movie) {
    const movieList = document.getElementById('deletedMovieList');
    const movieElement = document.createElement('div');
    movieElement.className = 'movie-card deleted';
    
    const deletedDate = new Date(movie.deletedAt).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

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
            <span class="rating">Оценка: ${movie.rating || 'Не оценено'}</span>
        </div>
        <div class="movie-dates">
            <div>Дата выхода: ${releaseDate}</div>
            <div>Удален: ${deletedDate}</div>
        </div>
        <div class="movie-actions">
            <button onclick="restoreMovie('${movie._id}')" class="restore-btn">Восстановить</button>
            <button onclick="permanentlyDeleteMovie('${movie._id}')" class="delete-btn">Удалить навсегда</button>
        </div>
    `;
    movieList.appendChild(movieElement);
}

async function restoreMovie(id) {
    try {
        const response = await fetch(`/api/movies/${id}/restore`, {
            method: 'PUT'
        });

        if (!response.ok) {
            throw new Error('Ошибка при восстановлении фильма');
        }

        showNotification('Фильм успешно восстановлен', 'success');
        fetchDeletedMovies();
    } catch (error) {
        console.error('Ошибка при восстановлении фильма:', error);
        showNotification(error.message, 'error');
    }
}

async function permanentlyDeleteMovie(id) {
    if (!confirm('Вы уверены? Это действие нельзя отменить!')) {
        return;
    }

    try {
        const response = await fetch(`/api/movies/${id}/permanent`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении фильма');
        }

        showNotification('Фильм удален навсегда', 'success');
        fetchDeletedMovies();
    } catch (error) {
        console.error('Ошибка при удалении фильма:', error);
        showNotification(error.message, 'error');
    }
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