export const filmPageTemplate = `<div class="film-page-poster-block">
    <div class="film-page-image-div">
        <img class="film-page-image" src="{{ preview }}">
        <div class="film-overlay"></div>
    </div>
    <div class="film-page-poster-data">
        <div class="film-page-text-data">
            <h1>{{ title }}</h1>
            <a> {{ data }} </a>
        </div>
        <div class="film-page-poster-actions">
            <div class="accent-button" id="#data-player-button">
                <link>
                Смотреть! </link>
            </div>
            <div class="film-page-buttons">
                <link>
                Лайкнуть </link>
            </div>
            <div class="film-page-buttons">
                <link>
                Смотреть позже </link>
            </div>
            <a class="film-page-duration"> {{ duration }} </a>
        </div>
    </div>
</div>

<div class="film-content-block">
    <div class="film-page-left">
        <div class="film-page-description">
            <a class="sub_title">Описание</a>
            <p>{{ data }}</p>
        </div>
        <div class="film-page-actors">
            {{#each filmActors}}
                <div class="actor-preview" data-actor-id="{{ this.uuid }}">
                    <img class="actor-avatar" src="{{ this.avatar }}">
                    <div class="dropdown-actor-name"> {{ this.name }} </div>
                </div>
            {{/each}}
        </div>

    </div>

    <div class="film-page-data">
        <div class="film-page-data-section">
            <a class="sub_title">Дата выхода</a>
            <div class="film-page-data-element">{{ date }}</div>
        </div>
        <div class="film-page-data-section">
            <a class="sub_title">Возрастной рейтинг</a>
            <div class="film-page-data-element"> {{ ageLimit }}+</div>
        </div>
        <div class="film-page-data-section">
            <a class="sub_title">Рейтинг</a>
            <div class="film-page-data-element"> {{ averageScore }} </div>
        </div>
        <div class="film-page-data-section">
            <a class="sub_title">Режиссеры</a>
            <div class="film-page-data-element"> {{ director }} </div>
        </div>
    </div>
</div>`;
