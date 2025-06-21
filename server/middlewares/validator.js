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
        .optional({ nullable: true })
        .customSanitizer(value => {
            return value === null || value === '' ? 1 : value;
        })
        .isInt({ min: 1, max: 10 })
        .withMessage('Оценка должна быть числом от 1 до 10'),
    body('releaseDate')
        .notEmpty()
        .withMessage('Дата релиза обязательна')
        .isISO8601()
        .withMessage('Дата релиза должна быть в формате ISO8601 (например, 2024-03-21)')
];

export const validateRating = [
    body('rating')
        .notEmpty()
        .withMessage('Оценка обязательна')
        .isInt({ min: 1, max: 10 })
        .withMessage('Оценка должна быть числом от 1 до 10')
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}; 