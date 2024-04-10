export const actorTemplate = `<div class="actor-info">
    <div class="actor-photo">
        <img src="{{ actorPhoto }}" alt="{{ actorName }}">
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
    <div class="films-container">
        <div class="popular-now-title">Фильмы с этим актером</div>
        {{#each filmsData}}
            <div class="film-card" data-film-id="{{this.uuid}}">
                <img class="film-image" src="{{this.preview_data}}">
                <div class="film-content">
                    <div class="film-title">
                        {{this.title}}
                    </div>
                    <div class="film-time">
                        {{this.duration}}
                    </div>
                </div>
            </div>
        {{/each}}
    </div>
</div>`;
