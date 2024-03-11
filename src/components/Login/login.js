import {validators} from '../../utils/validate.js';
import * as authApi from '../../api/auth.js';
import {createInput, updateMenuDisplay} from '../../utils/displayHelper.js';
import {goToPage, menu, renderMenu} from '../../index.js';

export function renderLogin() {
    const template = Handlebars.templates['Login.hbs'];
    document.querySelector('main').innerHTML = template();
    const form = document.getElementsByClassName('form-section');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    form[0].addEventListener('submit', (e) => {
    e.preventDefault();

    const login = emailInput.value.trim();
    const password = passwordInput.value;
    const user = {login: login, password: password};

    if (!validators.login(login)) {
      alert('Поле почта введено некорректно');
      throw new Error('Почта введена некорректно');
    }

    authApi.login(user)
        .then((response) => {
          if (response.ok) {
              return response.json();
          } else {
              //var loginError =
              throw new Error('Неверная почта и пароль');

          }
        })
        .then((response) => {
            renderMenu();
            if (response.status === 200) goToPage(menu.state.menuElements.films);
        })
        .catch(function (error) {
            console.error('Произошла ошибка:', error.message);
        });
    });
    console.log(form[0]);
    return form[0]

}
