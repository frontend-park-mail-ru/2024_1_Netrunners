import {validators} from '../../utils/validate.js';
import * as authApi from '../../api/auth.js';
import {createInput, updateMenuDisplay} from '../../utils/displayHelper.js';
import {goToPage, menu, renderMenu} from '../../index.js';

export function renderSignup() {
  const template = Handlebars.templates['Signup.hbs'];
  document.querySelector('main').innerHTML = template();
  const form = document.getElementsByClassName('form-section')[0];
  const emailInput = document.getElementsByName('email')[0];
  const usernameInput = document.getElementsByName('username')[0];
  const passConfInput = document.getElementsByName('passConf')[0];
  const passwordInput = document.getElementsByName('password')[0];

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const login = emailInput.value.trim();
    const password = passwordInput.value;
    const passConf = passConfInput.value;
    const username = usernameInput.value;
    const user = {password, login, username};

    if (!validators.username(username)) {
      alert('Имя пользователя слишком короткое');
      throw new Error('Имя пользователя слишком короткое');
    }
    if (!validators.login(login)) {
      alert('Поле почта введено некорректно');
      throw new Error('Почта введена некорректно');
    }
    if (!validators.password(password, passConf)) {
      alert('Пароли не совпадают');
      throw new Error('Пароли не совпадают');
    }

    authApi.signup(user)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
          }
        })
        .then((response) => {
          renderMenu();
          if (response.status === 200) {
            goToPage(menu.state.menuElements.films);
          } else if (response.status === 400) {
            throw new Error('Неверная почта или пароль при регистрации');
          }
        })
        .catch(function(error) {
          console.error('Произошла ошибка:', error.message);
        });
  });

  return form;
}
