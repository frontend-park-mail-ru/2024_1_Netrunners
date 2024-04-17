import store from "../src/index.js";
import { fetchRequest, IP } from "../src/api/fetch.js";
import { FilmError, FilmRequest, FilmSuccess } from "../flux/actions/film.js";
import { timeConvert } from "../src/utils/timeConvert";

/**
 * Выполняет запрос на получение данных конкретного фильма по его UUID.
 * @param {string} uuid UUID фильма.
 * @throws {Error} Если полученные данные не являются объектом или произошла ошибка при выполнении запроса.
 */
export async function getFilmData(uuid) {
  try {
    store.dispatch(FilmRequest());
    const response = await fetchRequest(`${IP}/films/${uuid}/data`, "GET");
    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    data.film.duration = timeConvert.timeIntoText(data.film.duration);
    data.film.date = timeConvert.dateIntoYear(data.film.date);

    store.dispatch(FilmSuccess(data));
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
    store.dispatch(FilmError());
  }
}
