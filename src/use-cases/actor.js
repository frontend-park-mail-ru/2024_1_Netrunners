import store from "../index.js";
import {fetchRequest, IP} from "../api/fetch.js";
import {actorError, actorRequest, actorSuccess} from "../flux/actions/actor.js";

export async function getActorData(uuid) {
    try {
        store.dispatch(actorRequest());
        const response = await fetchRequest(`${IP}/actors/${uuid}/data`, 'GET');
        const data = await response.json();

        if (!data || typeof data !== 'object') {
            throw new Error('Ошибка: полученные данные не являются объектом');
        }

        store.dispatch(actorSuccess(data));
    } catch (error) {

        store.dispatch(actorError());
    }
}
