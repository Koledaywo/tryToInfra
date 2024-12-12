export default function validateMovie(movie) {
  if (!movie.title || !movie.description || !movie.rating) {
    console.error('Invalid movie:', movie);
    throw new Error('Некорректный формат фильма');
  }
}
