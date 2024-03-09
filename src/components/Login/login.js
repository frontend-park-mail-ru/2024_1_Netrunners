import {validators} from '../../utils/validate.js';
import * as authApi from '../../api/auth.js';
import {createInput, updateMenuDisplay} from '../../utils/displayHelper.js';
import {goToPage} from '../../index.js';

export function renderLogin() {
  const form = document.createElement('form');
  form.classList.add('form-section');

  const emailInput = createInput('email', 'Почта', 'email');
  const passwordInput = createInput('password', 'Пароль', 'password');

  const submitBtn = document.createElement('input');
  submitBtn.classList.add('submit-button');
  submitBtn.type = 'submit';
  submitBtn.value = 'Войти!';

  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitBtn);

  form.addEventListener('submit', (e) => {
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
            throw new Error('Неверная почта и пароль');
          }
        })
        .then((response) => {
          updateMenuDisplay(response.status);
          if (response.status === 200) goToPage(menu.state.menuElements.films);
        })
        .catch(function(error) {
          console.error('Произошла ошибка:', error.message);
        });
  });

  return form;
}
