
export default async function getMovies(request) {
    const response = await request.get('/api/movies');
    return { response, movies: await response.json() };
  }
  