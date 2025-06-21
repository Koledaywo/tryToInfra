import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Название фильма обязательно'],
        trim: true,
        minlength: [2, 'Название должно содержать минимум 2 символа'],
        maxlength: [100, 'Название не должно превышать 100 символов']
    },
    description: {
        type: String,
        required: [true, 'Описание фильма обязательно'],
        trim: true,
        minlength: [10, 'Описание должно содержать минимум 10 символов'],
        maxlength: [1000, 'Описание не должно превышать 1000 символов']
    },
    rating: {
        type: Number,
        min: [1, 'Минимальная оценка - 1'],
        max: [10, 'Максимальная оценка - 10'],
        default: 1
    },
    genre: {
        type: String,
        enum: ['action', 'comedy', 'drama', 'horror', 'thriller', 'sci-fi', 'documentary'],
        required: [true, 'Жанр фильма обязателен']
    },
    releaseDate: {
        type: Date,
        required: [true, 'Дата выхода обязательна']
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Добавляем виртуальное поле для форматированной даты
movieSchema.virtual('formattedReleaseDate').get(function() {
    return this.releaseDate.toISOString().split('T')[0];
});

// Настраиваем опции схемы
movieSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        ret.releaseDate = ret.formattedReleaseDate;
        delete ret.formattedReleaseDate;
        return ret;
    }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
