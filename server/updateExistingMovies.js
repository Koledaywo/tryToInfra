import mongoose from 'mongoose';
import Movie from './models/movie.js';
import config from './config/config.js';

async function updateExistingMovies() {
    try {
        await mongoose.connect(config.mongoUri);git 
        console.log('Connected to MongoDB');

        // Найти все фильмы без даты выхода
        const movies = await Movie.find({ releaseDate: { $exists: false } });
        console.log(`Found ${movies.length} movies without release date`);

        // Обновить каждый фильм, установив дату выхода на дату создания
        for (const movie of movies) {
            await Movie.findByIdAndUpdate(movie._id, {
                releaseDate: movie.createdAt || new Date(),
                isDeleted: false
            });
            console.log(`Updated movie: ${movie.title}`);
        }

        console.log('All movies updated successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error updating movies:', error);
        process.exit(1);
    }
}

updateExistingMovies(); 