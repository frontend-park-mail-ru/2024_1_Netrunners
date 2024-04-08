import * as profileApi from '../../api/profile.js';
import * as filmsApi from '../../api/films.js';
import {validators} from "../../utils/validate.js";
import {goToPage, menu} from "../../index.js";

/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {void}
 */
export async function renderProfile(profileId) {
  const [profileData, filmsData] = await Promise.all([
    profileApi.getProfileData(profileId),
    filmsApi.getAll(),
  ]);

  const actorSection = document.createElement('section');
  actorSection.classList.add('actor-section');
  let isEditing = false;
  const template = Handlebars.templates['Profile.hbs'];
  const actorPageData = {...profileData, filmsData, isEditing};
  document.querySelector('main').innerHTML = template(actorPageData);

   document.querySelector('.profile-page-buttons').addEventListener('click', (e) => {
     e.preventDefault();
     renderEditForm(profileId);

   });

}
export async function renderEditForm(profileId) {
  let formTemplate = Handlebars.templates['editForm.hbs'];
  let profileDetails = document.querySelector('.profile-details');
  document.querySelector('.profile-details').innerHTML = formTemplate();

  const form = document.querySelector('.form-section');
  const emailInput = document.querySelector('input[name="email"]');
  const usernameInput = document.querySelector('input[name="username"]');
  const passConfInput = document.querySelector('input[name="passConf"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const errorField = document.getElementById('signup-errors');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const passConf = passConfInput.value;
    const user = {username, password};

    if (!validators.username(username)) {
      errorField.innerText = 'Имя пользователя слишком короткое';
    }

    if (!validators.password(password)) {
      errorField.innerText = 'Пароль слишком короткий';
    }

    if (!validators.passwordConf(password, passConf)) {
      errorField.innerText = 'Пароли не совпадают';
    }

    // const isAuthorized = await authApi.signup(user);
    // if (isAuthorized) {
    //   menu.renderAuth(isAuthorized);
    //   goToPage(menu.state.menuElements.films);
    // } else {
    //   errorField.innerText = 'Такой пользователь уже существует';
    // }
  });

}

