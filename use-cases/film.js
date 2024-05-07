import store from "../src/index.js";
import { fetchRequest, IP } from "../src/api/fetch.js";
import { FilmError, FilmRequest, FilmSuccess } from "../flux/actions/film.js";
import { fixFilmData } from "../src/utils/transformers/filmDataWithDuration.js";

// const data = {
//   status: 200,
//   film: {
//     uuid: "a9ff11a4-a9bf-4e7f-be4b-cdaeb87fd1f0",
//     isSerial: true,
//     preview:
//       "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/21324634-7afd-4443-8ac4-5c4097ac5b6c/600x900",
//     title: "Пацаны",
//     seasons: [
//       {
//         series: [
//           {
//             link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%281%20%D0%A1%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%282019%29.mp4",
//           },
//           {
//             link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%283%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%282022%29.mp4",
//           },
//           {
//             link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%282%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%232%20%282020%29.mp4",
//           },
//           {
//             link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%284%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D1%83%D0%B1%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%282024%29.mp4",
//           },
//         ],
//       },
//       {
//         series: [
//           {
//             link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%281%20%D0%A1%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%282019%29.mp4",
//           },
//           {
//             link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%283%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%282022%29.mp4",
//           },
//           {
//             link: "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%282%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%232%20%282020%29.mp4",
//           },
//         ],
//       },
//     ],
//     director: "Джеймс Кэмерон",
//     averageScore: 0,
//     scoresCount: 0,
//     duration: 0,
//     date: "2024-05-06T10:50:56.40192Z",
//     data: "Действие сериала разворачивается в мире, где существуют супергерои. Именно они являются настоящими звездами. Их все знают и обожают. Но за идеальным фасадом скрывается гораздо более мрачный мир наркотиков и секса, а большинств героев — в жизни не самые приятные люди. Противостоит им отряд, неофициально известный как «Пацаны».",
//     ageLimit: 18,
//   },
// };

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

    store.dispatch(FilmSuccess(fixFilmData(data)));
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
    store.dispatch(FilmError());
  }
}
