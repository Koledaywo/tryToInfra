import { test, expect } from '@playwright/test';
import { API_CONFIG } from './config.js';

test('GET /api/movies - получение списка фильмов', async ({ request }) => {

    const response = await request.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MOVIES}`);
    

    const responseBody = await response.json();
    

    console.log('Код ответа:', response.status());
    console.log('Время выполнения запроса измерено');
    console.log('Ответ:', JSON.stringify(responseBody, null, 2));
    

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('movies');
    expect(responseBody).toHaveProperty('total');
    expect(Array.isArray(responseBody.movies)).toBeTruthy();
    

    if (responseBody.movies.length > 0) {
        expect(responseBody.movies[0]).toHaveProperty('title');
        expect(responseBody.movies[0]).toHaveProperty('rating');
    }
});
