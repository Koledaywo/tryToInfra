let movies = [
    { title: 'Фильм 1', description: 'Описание фильма 1', rating: null },
    { title: 'Фильм 2', description: 'Описание фильма 2', rating: null },
    { title: 'Фильм 3', description: 'Описание фильма 3', rating: null },
    { title: 'Фильм 4', description: 'Описание фильма 4', rating: null },
    { title: 'Фильм 5', description: 'Описание фильма 5', rating: null },
];

exports.getMovies = (req, res) => {
    res.json(movies);
};

exports.addMovie = (req, res) => {
    const { title, description } = req.body;
    const newMovie = { title, description, rating: null };
    movies.push(newMovie);
    res.status(201).json(newMovie);
};

exports.updateMovie = (req, res) => {
    const index = req.params.index;
    const { rating } = req.body;

    if (movies[index]) {
        movies[index].rating = rating;
        res.json(movies[index]);
    } else {
        res.status(404).json({ message: 'Фильм не найден' });
    }
};

exports.deleteMovie = (req, res) => {
    const index = req.params.index;

    if (movies[index]) {
        movies.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Фильм не найден' });
    }
};
