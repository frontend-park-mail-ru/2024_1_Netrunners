import templateSeriesBlock from "./seriesBlock.hbs";
import templateEpisodesList from "./episodesList.hbs";
import Router from "../../../utils/router.js";

/**
 * Рендерит блок серий в родительский элемент.
 * @param {HTMLElement} parent - Родительский элемент, в который будет добавлен блок серий.
 * @param {Array} series - Массив объектов с информацией о сериях.
 * @param {string} filmId - Идентификатор фильма.
 * @return {void}
 */
export function renderSeriesBlock(parent, series, filmId) {
  const seasonsCount = series.length;
  const firstSeason = series[0];
  const buttonsData = Array.from(
    { length: seasonsCount },
    (_, index) => index + 1,
  );

  const firstChild = parent.firstChild;
  const newDiv = document.createElement("div");
  parent.insertBefore(newDiv, firstChild);
  newDiv.innerHTML = templateSeriesBlock({ buttons: buttonsData });

  const episodesList = document.querySelector(".series-block__series-list");
  renderEpisodesBlock(episodesList, firstSeason, filmId);

  const allButtons = document.querySelectorAll(".series-block__simple-button");
  allButtons[0].classList.add("active");

  allButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      renderEpisodesBlock(episodesList, series[index], filmId);
      if (!button.classList.contains("active")) {
        Array.from(allButtons).forEach((allButton) => {
          allButton.classList.remove("active");
        });
        button.classList.add("active");
      }
    });
  });
}

/**
 * Рендерит блок эпизодов в родительский элемент.
 * @param {HTMLElement} parent - Родительский элемент, в который будет добавлен блок эпизодов.
 * @param {Object} season - Объект с информацией о сезоне и эпизодах.
 * @param {string} filmId - Идентификатор фильма.
 * @return {void}
 */
export function renderEpisodesBlock(parent, season, filmId) {
  parent.innerHTML = templateEpisodesList({ episodes: season });

  const allEpisodes = document.querySelectorAll(".series-block__element");

  allEpisodes.forEach((episode) => {
    episode.addEventListener("click", (e) => {
      e.preventDefault();
      Router.goToPlayerPage(
        filmId,
        episode.dataset.episodeTitle,
        episode.dataset.episodeLink,
      );
    });
  });
}
