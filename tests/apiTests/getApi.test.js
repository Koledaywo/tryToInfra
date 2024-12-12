import { test, expect } from '@playwright/test';
import getMovies from './utils/apiUtils.js';
import validateMovie from './utils/validateMovie.js';


test('Проверка гет запроса api/movies', async ({ request }) => {
  let response;
  let movies;

  await test.step('Отправить запрос к апи и получение переменных', async () => {
    const result = await getMovies(request);
    response = result.response;
    movies = result.movies;
  });

  await test.step('Проверка статус-кода', () => {
    expect(response.status()).toBe(200);
  });

  await test.step('Проверка структуры каждого фильма', () => {
    movies.forEach(movie => {
      expect(movie).toHaveProperty('title');
      expect(movie).toHaveProperty('description');
      expect(movie).toHaveProperty('rating');
    });
  });
});
