export const actorTemplate = `<div class="actor-info">
    <div class="actor-photo">
        <img src="{{ actorPhoto }}" alt="{{ actorName }}">
    </div>
    <div class="actor-details">
        <div class="actor-name">
            <h1>{{ actorName }}</h1>
            <h2>{{ actorNameEnglish }}</h2>
        </div>
        <div class="actor-description">
            <h1>Об актере</h1>
            <ul>
                <li>Карьера: {{ actorCareer }}</li>
                <li>Рост: {{ actorHeight }}</li>
                <li>Дата рождения: {{ actorBirthDate }}</li>
                <li>Место рождения: {{ actorBirthPlace }}</li>
                <li>Жанры: {{ actorGenres }}</li>
                <li>Супруга: {{ actorSpouse }}</li>
                <li>Всего фильмов: {{ actorTotalMovies }}</li>
            </ul>
        </div>
    </div>
</div>

<div class="films-section">
    <div class="films-container">
        <div class="popular-now-title">Фильмы с этим актером</div>
        {{#each filmsData}}
            <div class="film-card">
                <img class="film-image" src="{{this.preview_data}}">
                <div class="film-content">
                    <div class="film-title">
                        {{this.name}}
                    </div>
                    <div class="film-time">
                        {{this.duration}}
                    </div>
                </div>
            </div>
        {{/each}}
    </div>
</div>`;
