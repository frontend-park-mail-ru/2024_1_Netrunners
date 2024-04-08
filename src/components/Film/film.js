import * as filmApi from '../../api/film.js';
import {filmPageTemplate} from "./Film.hbs";


export async function renderFilmPage(filmId) {
    const [filmData, filmActors] = await Promise.all([
        filmApi.getFilmData(filmId),
        filmApi.getActors(filmId)
    ]);

    const template = Handlebars.compile(filmPageTemplate);
    document.querySelector('main').innerHTML = template({ ...filmData, filmActors });
}