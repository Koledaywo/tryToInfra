const translations = {
    en: {
        title: 'Trash',
        returnToCatalog: '← Return to Catalog',
        emptyTrash: 'Trash is empty',
        rating: 'Rating',
        notRated: 'Not rated',
        releaseDate: 'Release date',
        deletedAt: 'Deleted',
        restore: 'Restore',
        deletePermanently: 'Delete permanently',
        confirmDelete: 'Are you sure? This action cannot be undone!',
        movieRestored: 'Movie successfully restored',
        movieDeleted: 'Movie permanently deleted',
        errorLoading: 'Error loading deleted movies',
        errorRestoring: 'Error restoring movie',
        errorDeleting: 'Error deleting movie',
        genre: {
            action: 'Action',
            comedy: 'Comedy',
            drama: 'Drama',
            fantasy: 'Fantasy',
            horror: 'Horror',
            thriller: 'Thriller',
            western: 'Western'
        }
    },
    ru: {
        title: 'Корзина',
        returnToCatalog: '← Вернуться к каталогу',
        emptyTrash: 'Корзина пуста',
        rating: 'Оценка',
        notRated: 'Не оценено',
        releaseDate: 'Дата выхода',
        deletedAt: 'Удален',
        restore: 'Восстановить',
        deletePermanently: 'Удалить навсегда',
        confirmDelete: 'Вы уверены? Это действие нельзя отменить!',
        movieRestored: 'Фильм успешно восстановлен',
        movieDeleted: 'Фильм удален навсегда',
        errorLoading: 'Ошибка при загрузке удаленных фильмов',
        errorRestoring: 'Ошибка при восстановлении фильма',
        errorDeleting: 'Ошибка при удалении фильма',
        genre: {
            action: 'Боевик',
            comedy: 'Комедия',
            drama: 'Драма',
            fantasy: 'Фэнтези',
            horror: 'Ужасы',
            thriller: 'Триллер',
            western: 'Вестерн'
        }
    }
};

let currentLang = localStorage.getItem('language') || 'ru';

function translate(key) {
    const keys = key.split('.');
    let translation = translations[currentLang];
    for (const k of keys) {
        translation = translation[k];
    }
    return translation || key;
}

document.addEventListener('DOMContentLoaded', () => {
    updatePageTranslations();
    fetchDeletedMovies();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
});

function updatePageTranslations() {
    document.title = `${translate('title')} - ${translate('returnToCatalog')}`;
    document.querySelector('h1').textContent = translate('title');
    document.querySelector('.nav-link').textContent = translate('returnToCatalog');
}

async function fetchDeletedMovies() {
    try {
        const response = await fetch('/api/movies/trash');
        const data = await response.json();
        
        const movieList = document.getElementById('deletedMovieList');
        movieList.innerHTML = '';
        
        if (data.movies.length === 0) {
            movieList.innerHTML = `<div class="empty-message">${translate('emptyTrash')}</div>`;
            return;
        }

        data.movies.forEach(movie => {
            displayDeletedMovie(movie);
        });
    } catch (error) {
        console.error(translate('errorLoading'), error);
        showNotification(translate('errorLoading'), 'error');
    }
}

function displayDeletedMovie(movie) {
    const movieList = document.getElementById('deletedMovieList');
    const movieElement = document.createElement('div');
    movieElement.className = 'movie-card deleted';
    
    const deletedDate = new Date(movie.deletedAt).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const releaseDate = new Date(movie.releaseDate).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    movieElement.innerHTML = `
        <h3>${movie.title}</h3>
        <p>${movie.description}</p>
        <div class="movie-meta">
            <span class="genre ${movie.genre}">${translate(`genre.${movie.genre}`)}</span>
            <span class="rating">${translate('rating')}: ${movie.rating || translate('notRated')}</span>
        </div>
        <div class="movie-dates">
            <div>${translate('releaseDate')}: ${releaseDate}</div>
            <div>${translate('deletedAt')}: ${deletedDate}</div>
        </div>
        <div class="movie-actions">
            <button onclick="restoreMovie('${movie._id}')" class="restore-btn">${translate('restore')}</button>
            <button onclick="permanentlyDeleteMovie('${movie._id}')" class="delete-btn">${translate('deletePermanently')}</button>
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
            throw new Error(translate('errorRestoring'));
        }

        showNotification(translate('movieRestored'), 'success');
        fetchDeletedMovies();
    } catch (error) {
        console.error(translate('errorRestoring'), error);
        showNotification(error.message, 'error');
    }
}

async function permanentlyDeleteMovie(id) {
    if (!confirm(translate('confirmDelete'))) {
        return;
    }

    try {
        const response = await fetch(`/api/movies/${id}/permanent`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(translate('errorDeleting'));
        }

        showNotification(translate('movieDeleted'), 'success');
        fetchDeletedMovies();
    } catch (error) {
        console.error(translate('errorDeleting'), error);
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

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updatePageTranslations();
    fetchDeletedMovies(); // Refresh the movie list to update translations
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
} 