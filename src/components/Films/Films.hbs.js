export const filmsTemplate = `
<div class="carousel poster-carousel" data-carousel>
    <button class="poster-carousel-button prev" data-carousel-button="prev"><img src="../../img/icons/arrow.svg" alt="">
    </button>
    <button class="poster-carousel-button next" data-carousel-button="next"><img src="../../img/icons/arrow.svg" alt="">
    </button>
    <ul data-slides>
        {{#each topFourFilms}}
            <li class="slide" {{ this.active }}>
                <div class="poster-block">
                    <div class="image-div">
                        <img class="poster-image" src="{{ this.preview_data }}">
                        <div class="film-overlay"></div>
                    </div>
                    <div class="poster-data">
                        <div class="text-data">
                            <h1>{{ this.title }}</h1>
                            <a> {{ this.film_data }} </a>
                        </div>
                        <div class="poster-actions">
                            <div class="accent-button" id="data-player-button">
                                <link>
                                Смотреть! </link>
                            </div>
                            <div class="poster-buttons">
                                <link>
                                Лайкнуть </link>
                            </div>
                            <div class="poster-buttons">
                                <link>
                                Смотреть позже </link>
                            </div>
                            <a class="poster-duration"> {{ this.duration }} </a>
                        </div>
                    </div>
                </div>
            </li>
        {{/each}}
    </ul>
</div>

<div class="films-section">
    <div class="films-text">Фильмы</div>
    <div class="first-upper-block">
        <div class="popular-now-title">Жанры</div>
        <div class="slider-buttons">
            <button class="carousel-button prev" data-carousel-button="prev"><img src="../../img/icons/arrow.svg"
                                                                                  alt="">
            </button>
            <div class="carousel-shapes">
                <img src="../../img/icons/shape.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
            </div>
            <button class="carousel-button next" data-carousel-button="next"><img src="../../img/icons/arrow.svg"
                                                                                  alt="">
            </button>
        </div>
    </div>
    <div class="genres-container">
        {{#each filmsGenres}}
            <div class="genre-card">
                <div class="genre-images">
                    {{#each posters}}
                        <img class="genre-image" src="{{this}}">
                    {{/each}}
                </div>
                <div class="genre-images-overlay"></div>
                <div class="genre-content">
                    <div class="genre-name">
                        {{this.name}}
                    </div>
                </div>
            </div>
        {{/each}}
    </div>
    <div class="upper-block">
        <div class="popular-now-title">Популярно сейчас</div>
        <div class="slider-buttons">
            <button class="carousel-button prev" data-carousel-button="prev"><img src="../../img/icons/arrow.svg"
                                                                                  alt="">
            </button>
            <div class="carousel-shapes">
                <img src="../../img/icons/shape.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
            </div>
            <button class="carousel-button next" data-carousel-button="next"><img src="../../img/icons/arrow.svg"
                                                                                  alt="">
            </button>
        </div>
    </div>
    <div class="films-container">
        {{#each filmData}}
            <div class="film-card" data-film-id="{{this.uuid}}" data-film-title="{{this.title}}">
                <img class="film-image" src="{{this.preview_data}}">
                <div class="film-content">
                    <div class="film-time">
                        <img class="time-icon" src="../../img/icons/time.svg">
                        {{this.duration}}
                    </div>
                    <div class="film-rating">
                        {{#stars this.average_score}}
                            <div class="star-container">
                                <div class="star"></div>
                            </div>
                        {{/stars}}
                        <span class="rating-count">{{this.scores_count}}</span>
                    </div>
                </div>
            </div>
        {{/each}}
    </div>
    <div class="upper-block">
        <div class="popular-now-title">Новые релизы</div>
        <div class="slider-buttons">
            <button class="carousel-button prev" data-carousel-button="prev"><img src="../../img/icons/arrow.svg"
                                                                                  alt="">
            </button>
            <div class="carousel-shapes">
                <img src="../../img/icons/shape.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
            </div>
            <button class="carousel-button next" data-carousel-button="next"><img src="../../img/icons/arrow.svg"
                                                                                  alt="">
            </button>
        </div>
    </div>
    <div class="films-container">
        {{#each filmData}}
            <div class="film-card" data-film-id="{{this.uuid}}" data-film-title="{{this.title}}">
                <img class="film-image" src="{{this.preview_data}}">
                <div class="film-content">
                    <div class="film-time">
                        <img class="time-icon" src="../../img/icons/time.svg">
                        {{this.duration}}
                    </div>
                    <div class="film-rating">
                        {{#stars this.average_score}}
                            <div class="star-container">
                                <div class="star"></div>
                            </div>
                        {{/stars}}
                        <span class="rating-count">{{this.scores_count}}</span>
                    </div>
                </div>
            </div>
        {{/each}}
    </div>
    <div class="upper-block">
        <div class="popular-now-title">Советуем посмотреть</div>
        <div class="slider-buttons">
            <button class="carousel-button prev" data-carousel-button="prev"><img src="../../img/icons/arrow.svg"
                                                                                  alt="">
            </button>
            <div class="carousel-shapes">
                <img src="../../img/icons/shape.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
                <img src="../../img/icons/shape-none.svg" alt="">
            </div>
            <button class="carousel-button next" data-carousel-button="next"><img src="../../img/icons/arrow.svg"
                                                                                  alt="">
            </button>
        </div>
    </div>
    <div class="films-container">
        {{#each filmData}}
            <div class="film-card" data-film-id="{{this.uuid}}" data-film-title="{{this.title}}">
                <img class="film-image" src="{{this.preview_data}}">
                <div class="film-content">
                    <div class="film-time">
                        <img class="time-icon" src="../../img/icons/time.svg">
                        {{this.duration}}
                    </div>
                    <div class="film-rating">
                        {{#stars this.average_score}}
                            <div class="star-container">
                                <div class="star"></div>
                            </div>
                        {{/stars}}
                        <span class="rating-count">{{this.scores_count}}</span>
                    </div>
                </div>
            </div>
        {{/each}}
    </div>
</div>`;
