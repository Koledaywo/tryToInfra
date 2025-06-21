import { body, validationResult } from 'express-validator';

export const validateMovie = [
    body('title')
        .isString()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Название должно содержать от 2 до 100 символов'),
    body('description')
        .isString()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Описание должно содержать от 10 до 1000 символов'),
    body('genre')
        .isString()
        .trim()
        .isIn(['action', 'comedy', 'drama', 'horror', 'thriller', 'sci-fi', 'documentary'])
        .withMessage('Некорректный жанр'),
    body('rating')
        .isInt({ min: 1, max: 10 })
        .withMessage('Оценка должна быть от 1 до 10'),
    body('releaseDate')
        .isISO8601()
        .withMessage('Некорректный формат даты')
];

export const validateRating = [
    body('rating')
        .isInt({ min: 1, max: 10 })
        .withMessage('Оценка должна быть от 1 до 10')
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}; 