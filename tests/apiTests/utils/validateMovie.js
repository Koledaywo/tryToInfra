const { expect } = require('@playwright/test');

function validateMovie(movie) {
  expect(movie).toHaveProperty('description');
  expect(movie).toHaveProperty('rating');
  expect(movie).toHaveProperty('title');
}

module.exports = validateMovie;
