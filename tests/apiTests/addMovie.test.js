import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

test.describe('Добавление фильма', () => {
  let newMovie;

  test.beforeEach(() => {
    // рандомы данных
    newMovie = {
      title: faker.lorem.words(2), 
      description: faker.lorem.sentence(), 
      rating: Math.floor(Math.random() * 10) + 1 
    };
  });

  test('Успешное добавление фильма с валидными данными', async ({ request }) => {
    const response = await request.post('/api/movies', {
      data: newMovie,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    await test.step('Проверка свойств добавленного фильма', () => {
      expect(responseBody.movie.title).toBe(newMovie.title);
      expect(responseBody.movie.description).toBe(newMovie.description);
      expect(Number(responseBody.movie.rating)).toBe(newMovie.rating); 
    });
  });
});
