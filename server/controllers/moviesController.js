import Movie from '../models/movie.js';

export const getMovies = async (req, res) => {
    try {
        const { page = 1, limit = 10, genre, sort = '-createdAt' } = req.query;
        const query = genre ? { genre, isDeleted: false } : { isDeleted: false };
        
        const movies = await Movie.find(query)
            .sort(sort)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();

        const count = await Movie.countDocuments(query);
        
        res.json({
            movies,
            total: count,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Error in getMovies:', error);
        res.status(500).json({ 
            error: 'Ошибка при получении фильмов',
            details: error.message 
        });
    }
};

export const getDeletedMovies = async (req, res) => {
    try {
        const movies = await Movie.find({ isDeleted: true })
            .sort('-deletedAt')
            .exec();
        
        res.json({ movies });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении удаленных фильмов' });
    }
};

export const addMovie = async (req, res) => {
    try {
        // Устанавливаем значения по умолчанию
        const movieData = {
            ...req.body,
            rating: req.body.rating || 1,
            releaseDate: req.body.releaseDate || new Date().toISOString().split('T')[0]
        };

        const movie = new Movie(movieData);
        await movie.save();
        res.status(201).json({ 
            message: 'Фильм успешно добавлен', 
            movie: {
                _id: movie._id,
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                rating: movie.rating,
                releaseDate: movie.releaseDate,
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Ошибка валидации', 
                details: Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }
        res.status(500).json({ 
            error: 'Ошибка при добавлении фильма',
            details: error.message 
        });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            { 
                isDeleted: true,
                deletedAt: new Date()
            },
            { new: true }
        );

        if (!movie) {
            return res.status(404).json({ error: 'Фильм не найден' });
        }
        res.json({ message: 'Фильм перемещен в корзину' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении фильма' });
    }
};

export const restoreMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            { 
                isDeleted: false,
                deletedAt: null
            },
            { new: true }
        );

        if (!movie) {
            return res.status(404).json({ error: 'Фильм не найден' });
        }
        res.json({ message: 'Фильм восстановлен', movie });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при восстановлении фильма' });
    }
};

export const permanentlyDeleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Фильм не найден' });
        }
        res.json({ message: 'Фильм удален навсегда' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении фильма' });
    }
};

export const updateMovieRating = async (req, res) => {
    try {
        const { rating } = req.body;
        const movie = await Movie.findById(req.params.id);
        
        if (!movie) {
            return res.status(404).json({ error: 'Фильм не найден' });
        }

        if (movie.isDeleted) {
            return res.status(400).json({ error: 'Нельзя обновить рейтинг удаленного фильма' });
        }

        movie.rating = rating;
        await movie.save();
        
        res.json({ message: 'Рейтинг обновлен', movie });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                errors: Object.values(error.errors).map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }
        res.status(500).json({ error: 'Ошибка при обновлении рейтинга' });
    }
};

export const searchMovies = async (req, res) => {
    try {
        const { query } = req.query;
        const movies = await Movie.find({
            $and: [
                {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } }
                    ]
                },
                { isDeleted: false }
            ]
        }).limit(10);
        
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при поиске фильмов' });
    }
};
