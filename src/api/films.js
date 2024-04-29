import { fetchRequest, IP } from "./fetch.js";
import { toFilmDataWithDuration } from "../utils/transformers/filmDataWithDuration.js";

const topFourFilms = [
  {
    preview_data:
      "https://media.kg-portal.ru/movies/a/avengers4/posters/avengers4_80.jpg",
    title: "Мстители: Финал",
    duration: 143,
    film_data:
      "С помощью оставшихся союзников Мстители должны вновь собраться, чтобы отменить действия Таноса и устранить хаос во Вселенной, какие бы последствия их ни ждали и с кем бы они ни столкнулись... Отомстите за павших.",
  },
  {
    preview_data: "https://www.kino-teatr.ru/movie/poster/143085/119148.jpg",
    title: "Универ 15 лет спустя",
    duration: 143,
    film_data:
      "Прошло десять лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях.",
  },
  {
    preview_data: "https://www.kino-teatr.ru/movie/poster/143085/119148.jpg",
    title: "Универ 20 лет спустя",
    duration: 143,
    film_data:
      "Прошло двадцать лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях.",
  },
  {
    preview_data: "https://www.kino-teatr.ru/movie/poster/143085/119148.jpg",
    title: "Универ 25 лет спустя",
    duration: 144,
    film_data:
      "Прошло двадцать пять лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях.",
  },
];

/**
 * Запрос на получение массива с фильмами
 * @function
 * @return {Promise} promise - Объект запроса
 */
export async function getAll() {
  try {
    const url = IP + "/films/all";
    const response = await fetchRequest(url, "GET");

    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error("Ошибка: ответ не содержит массив фильмов");
    }

    return toFilmDataWithDuration(filmsData.films);
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Получает информацию о четырех лучших фильмах.
 * @async
 * @return {Promise<Array<Object>>} Промис, который разрешается массивом объектов с данными о фильмах.
 * @throws {Error} Если происходит ошибка при получении данных.
 */
export async function getTopFour() {
  try {
    return new Promise(function (resolve) {
      resolve(toFilmDataWithDuration(topFourFilms));
    });
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Получает список жанров фильмов.
 * @async
 * @return {Promise<Array<string>>} Промис, который разрешается массивом строк - названий жанров.
 * @throws {Error} Если произошла ошибка при получении данных.
 */
export async function getGenres() {
  try {
    const url = IP + "/films/genres/preview";
    const response = await fetchRequest(url, "GET");

    const genresData = await response.json();

    if (!genresData || !genresData.genres) {
      throw new Error("Ошибка: ответ не содержит массива жанров");
    }

    return genresData.genres;
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Получает список фильмов определенного жанра.
 * @param {string} genreUuid - Идентификатор жанра.
 * @return {Promise<object[]>} - Возвращает массив объектов с данными о фильмах.
 */
export async function getFilmsOfGenre(genreUuid) {
  try {
    const url = IP + `/films/genres/${genreUuid}/all`;
    const response = await fetchRequest(url, "GET");

    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error("Ошибка: ответ не содержит массива фильмов");
    }

    return toFilmDataWithDuration(filmsData.films);
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
