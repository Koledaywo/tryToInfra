const { test, expect } = require('@playwright/test');
const getMovies = require('./utils/apiUtils');
const validateMovie = require('./utils/validateMovie');

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


  await test.step('Проверка что массив не пустой и он есть', () => {
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeGreaterThan(0);
  });


  await test.step('Проверка ключей у каждого фильма', () => {
    movies.forEach(movie => validateMovie(movie));
  });

});
