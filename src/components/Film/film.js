import * as filmApi from '../../api/film.js';
import {timeConvert} from "../../utils/timeConvert.js   ";


export async function renderFilmPage(filmId) {
    const [filmData, filmActors] = await Promise.all([
        filmApi.getFilmData(filmId),
        filmApi.getActors(filmId)
    ]);
    let filmPageData;

    const template = Handlebars.templates['Film.hbs'];
    filmData.duration = timeConvert.timeIntoText(filmData.duration);
    filmPageData = { ...filmData, filmActors };

    document.querySelector('main').innerHTML = template(filmPageData);
}