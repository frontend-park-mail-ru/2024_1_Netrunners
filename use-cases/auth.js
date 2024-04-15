import store from "../src/index.js";
import {fetchRequest, IP} from "../src/api/fetch.js";
import {LoginError, LoginRequest, LoginSuccess} from "../flux/actions/auth.js";

export async function sentLoginRequest(uuid) {
  try {
    store.dispatch(LoginRequest());
    const response = await fetchRequest(`${IP}/auth/login`, 'GET');
    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Ошибка: полученные данные не являются объектом');
    }
    store.dispatch(LoginSuccess());
  } catch (error) {
    console.error('Произошла ошибка: ', error.message);
    store.dispatch(LoginError());
  }
}
