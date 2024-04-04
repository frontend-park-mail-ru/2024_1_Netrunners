import * as filmApi from '../../api/film.js';


export async function renderFilmPage(filmId) {
    const [filmData, filmActors] = await Promise.all([
        filmApi.getFilmData(filmId),
        filmApi.getActors(filmId)
    ]);

    const template = Handlebars.templates['Film.hbs'];
    document.querySelector('main').innerHTML = template({ ...filmData, filmActors });
}