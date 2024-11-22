import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Главная страница
function Home() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState('');

    useEffect(() => {
        fetch('/movies')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Ошибка загрузки фильмов:', error));
    }, []);

    const handleAddMovie = (e) => {
        e.preventDefault();
        fetch('/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newMovie }),
        })
            .then((response) => response.json())
            .then((movie) => {
                setMovies((prevMovies) => [...prevMovies, movie]);
                setNewMovie('');
            })
            .catch((error) => console.error('Ошибка добавления фильма:', error));
    };

    const handleDeleteMovie = (id) => {
        fetch(`/movies/${id}`, { method: 'DELETE' })
            .then(() => {
                setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
            })
            .catch((error) => console.error('Ошибка удаления фильма:', error));
    };

    return (
        <div>
            <h1>Список фильмов</h1>
            <form onSubmit={handleAddMovie}>
                <input
                    type="text"
                    value={newMovie}
                    onChange={(e) => setNewMovie(e.target.value)}
                    placeholder="Введите название фильма"
                />
                <button type="submit">Добавить фильм</button>
            </form>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title}
                        <button onClick={() => handleDeleteMovie(movie.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
            <Link to="/vote">
                <button>Перейти к голосованию</button>
            </Link>
        </div>
    );
}

// Страница голосования
function Vote() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/movies')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Ошибка загрузки фильмов:', error));
    }, []);

    const handleVote = (id) => {
        fetch(`/movies/${id}/vote`, { method: 'POST' })
            .then((response) => response.json())
            .then((updatedMovie) => {
                setMovies((prevMovies) =>
                    prevMovies.map((movie) =>
                        movie.id === updatedMovie.id ? updatedMovie : movie
                    )
                );
            })
            .catch((error) => console.error('Ошибка голосования:', error));
    };

    return (
        <div>
            <h1>Голосование за фильм</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} - Голосов: {movie.votes}
                        <button onClick={() => handleVote(movie.id)}>Голосовать</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/')}>Назад</button>
        </div>
    );
}

// Главный компонент
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vote" element={<Vote />} />
            </Routes>
        </Router>
    );
}

export default App;
