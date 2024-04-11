export const profileTemplate = `<div class="profile-info">
    <div class="profile-photo">
        <img src="{{ avatar }}" alt="{{ username }}">
    </div>
    <div class="profile-details">
        <div class="profile-top">
            <h1>{{ username }}</h1>
            <a class="profile-page-buttons" id="edit-button" href="/edit"> Редактировать </a>
        </div>
        <div class="profile-description">
            <h1>О пользователе</h1>
            <ul>
                <li>Почта: {{ login }}</li>
                <li>Дата регистрации: {{ registeredAt }}</li>
            </ul>
        </div>
    </div>
</div>

<div class="films-section">
    <div class="films-container">
        <div class="popular-now-title">Любимые фильмы</div>
        {{#each filmsData}}
            <div class="film-card" data-film-id="{{this.uuid}}">
                <img class="film-image" src="{{ this.preview_data }}">
                <div class="film-content">
                    <div class="film-title">
                        {{ this.title }}
                    </div>
                    <div class="film-time">
                        {{ this.duration }}
                    </div>
                </div>
            </div>
        {{/each}}
    </div>
</div>`;
