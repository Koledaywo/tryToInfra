const { test, expect } = require('@playwright/test');
const getMovies = require('./utils/apiUtils');
const validateMovie = require('./utils/validateMovie');

test('Простой тест на ручку ГЕТ', async ({ request }) => {
  const { response, movies } = await getMovies(request);


  expect(response.status()).toBe(200);


  expect(Array.isArray(movies)).toBeTruthy();
  expect(movies.length).toBeGreaterThan(0);


  movies.forEach(movie => validateMovie(movie));
});
