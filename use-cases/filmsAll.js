import store from "../src/index.js";
import {fetchRequest, IP} from "../src/api/fetch.js";
import {filmsAllError, filmsAllRequest, filmsAllSuccess} from "../flux/actions/filmsAll.js";

export async function FilmsAllRequest() {
  try {
    store.dispatch(filmsAllRequest());
    const response = await fetchRequest(`${IP}/films/all`);
    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error('Ошибка: ответ не содержит массив фильмов');
    }
    store.dispatch(filmsAllSuccess(filmsData.films));

  } catch (error) {
    store.dispatch(filmsAllError(error));
    console.error('Произошла ошибка:', error.message);
  }

};
