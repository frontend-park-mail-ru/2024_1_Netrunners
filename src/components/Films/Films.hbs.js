export const filmsTemplate = `<div class="films-section">
    <div class="films-text">Фильмы</div>
    <div class="films-container">
        <div class="popular-now-title">Популярно сейчас</div>
        {{#each filmsWithHours}}
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
