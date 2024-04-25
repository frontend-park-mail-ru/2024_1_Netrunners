import store from "../src/index.js";
import { fetchRequest, IP } from "../src/api/fetch.js";
import { FilmError, FilmRequest, FilmSuccess } from "../flux/actions/film.js";
import { fixFilmData } from "../src/utils/transformers/filmDataWithDuration.js";

const data = {
  status: 200,
  film: {
    isSeries: true,
    uuid: "47ec70ab-2599-46fd-8124-35da92909939",
    preview: "https://shorturl.at/akMR2",
    title: "joik",
    link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/rammstein-feuer-frei_783972.mp4",
    director: "iuhiu",
    averageScore: 3,
    scoresCount: 1,
    duration: 1403,
    date: "2024-04-22T16:53:35.577104+03:00",
    data: "some description",
    ageLimit: 18,
    series: [
      {
        title: "Some series",
        link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/rammstein-feuer-frei_783972.mp4",
        duration: 143,
      },
      {
        title: "Some series",
        link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/rammstein-feuer-frei_783972.mp4",
        duration: 143,
      },
      {
        title: "Some series",
        link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/rammstein-feuer-frei_783972.mp4",
        duration: 143,
      },
      {
        title: "Some series",
        link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/rammstein-feuer-frei_783972.mp4",
        duration: 143,
      },
      {
        title: "Some series",
        link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/rammstein-feuer-frei_783972.mp4",
        duration: 143,
      },
      {
        title: "Some series",
        link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/rammstein-feuer-frei_783972.mp4",
        duration: 143,
      },
    ],
  },
};

/**
 * Выполняет запрос на получение данных конкретного фильма по его UUID.
 * @param {string} uuid UUID фильма.
 * @throws {Error} Если полученные данные не являются объектом или произошла ошибка при выполнении запроса.
 */
export async function getFilmData(uuid) {
  try {
    store.dispatch(FilmRequest());
    //const response = await fetchRequest(`${IP}/films/${uuid}/data`, "GET");
    //const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    store.dispatch(FilmSuccess(fixFilmData(data)));
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
    store.dispatch(FilmError());
  }
}
