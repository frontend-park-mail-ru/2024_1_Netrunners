import store from "../index.js";
import {fetchRequest, IP} from "../api/fetch.js";
import {profileError, profileRequest, profileSuccess} from "../flux/actions/profile.js";

export async function getProfileData(uuid) {
    try {
        store.dispatch(profileRequest());
        const response = await fetchRequest(`${IP}/profile/${uuid}/data`, 'GET');
        const data = await response.json();
        console.log(data);
        if (!data || typeof data !== 'object') {
            throw new Error('Ошибка: полученные данные не являются объектом');
        }
        store.dispatch(profileSuccess(data));
    } catch (error) {
        console.error('Произошла ошибка: ', error.message);
        store.dispatch(profileError());
    }
}