// Пока модель простая, но можно подключить MongoDB или Sequelize
class Movie {
    constructor(title, description, rating = null) {
        this.title = title;
        this.description = description;
        this.rating = rating;
    }
}

module.exports = Movie;
