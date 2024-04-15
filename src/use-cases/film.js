import store from "../index.js";
import {fetchRequest, IP} from "../api/fetch.js";
import {FilmError, FilmRequest, FilmSuccess} from "../flux/actions/film.js";

export async function getFilmData(uuid) {
    try {
        store.dispatch(FilmRequest());
        console.log(uuid);
        const response = await fetchRequest(`${IP}/films/${uuid}/data`, 'GET');
        const data = await response.json();

        if (!data || typeof data !== 'object') {
            throw new Error('Ошибка: полученные данные не являются объектом');
        }
        //return fixUserData(data.user);
        store.dispatch(FilmSuccess(data));
    } catch (error) {
        console.error('Произошла ошибка: ', error.message);
        store.dispatch(FilmError());
    }
}