export const actorTemplate = `<div class="actor-info">
    <div class="actor-photo">
        <img src="{{ avatar }}" alt="{{ name }}">
    </div>
    <div class="actor-details">
        <div class="actor-name">
            <h1>{{ name }}</h1>
        </div>
        <div class="actor-description">
            <h1>Об актере</h1>
            <ul>
                <li>Карьера: {{ career }}</li>
                <li>Рост: {{ height }}</li>
                <li>Дата рождения: {{ birthday }}</li>
                <li>Место рождения: {{ birthPlace }}</li>
                <li>Жанры: {{ genres }}</li>
                <li>Супруга: {{ spouse }}</li>
            </ul>
        </div>
    </div>
</div>

<div class="films-section">
    <div class="upper-block">
        <div class="popular-now-title">Фильмы с этим актером</div>
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
        {{#each filmsData}}
            <div class="film-card" data-film-id="{{this.uuid}}">
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