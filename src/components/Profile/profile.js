import * as authApi from "../../api/auth.js";
import {goToPage, menu} from "../../index.js";

export function renderProfile() {
    const profileElement = document.createElement('div');

    authApi.check()
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
            }
        })
        .then((response) => {
            if (response.status === 200) {
            } else if (response.status === 401) {
                goToPage(menu.state.menuElements.login);
                throw new Error('Unauthorized');
            }
        })
        .catch(function (error) {
            console.error('Произошла ошибка:', error.message);
        });

    return profileElement;
}