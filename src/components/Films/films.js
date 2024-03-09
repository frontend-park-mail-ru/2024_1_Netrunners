import * as filmsApi from '../../api/films.js';

export function renderFilms() {
  const filmsSection = document.createElement('div');
  filmsSection.classList.add('films-section');

  const filmsContainer = document.createElement('div');
  filmsContainer.classList.add('films-container');

  const popularNowTitle = document.createElement('div');
  popularNowTitle.classList.add('popular-now-title');
  popularNowTitle.textContent = 'Популярно сейчас';

  filmsSection.appendChild(popularNowTitle);
  filmsSection.appendChild(filmsContainer);

  filmsApi.getAll()
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
        }
      })
      .then((data) => {
        if (data && data.films && Array.isArray(data.films)) {
          data.films.forEach((film) => {
            const filmCard = document.createElement('div');
            filmCard.classList.add('film-card');

            const filmImage = document.createElement('img');
            filmImage.classList.add('film-image');
            filmImage.setAttribute('src', film.preview_data);
            const filmContent = document.createElement('div');
            filmContent.classList.add('film-content');

            const filmTitle = document.createElement('div');
            filmTitle.classList.add('film-title');

            filmTitle.textContent = film.name;

            const filmTime = document.createElement('div');
            filmTime.classList.add('film-time');
            const durationInSeconds = film.duration;
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);
            filmTime.textContent = `${hours}ч ${minutes}м`;

            filmContent.appendChild(filmTitle);
            filmContent.appendChild(filmTime);
            filmCard.appendChild(filmImage);
            filmCard.appendChild(filmContent);

            filmsContainer.appendChild(filmCard);
          });
        } else {
          console.error('Ошибка: ответ не содержит массив фильмов', data);
        }
      })
      .catch(function(error) {
        console.error('Произошла ошибка:', error.message);
      });

  return filmsSection;
}
