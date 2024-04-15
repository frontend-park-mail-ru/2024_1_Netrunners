import * as profileApi from "../../api/profile.js";
import * as filmsApi from "../../api/films.js";
import { validators } from "../../utils/validate.js";
import profileTemplate from "./Profile.hbs";
import editFormTemplate from "./editForm.hbs";
import Router from "../../utils/router.js";

/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @return {void}
 * @param profileId
 */
export async function renderProfile(profileId) {
  const [profileData, filmsData] = await Promise.all([
    profileApi.getProfileData(profileId),
    filmsApi.getAll(),
  ]);

  const profilePageData = { ...profileData, filmsData };
  document.querySelector("main").innerHTML = profileTemplate(profilePageData);

  document
    .querySelector(".profile-page-buttons")
    .addEventListener("click", (e) => {
      e.preventDefault();
      renderEditForm(profileId);
    });

  const filmCards = document.querySelectorAll("[data-film-id]");

  filmCards.forEach((filmCard) => {
    filmCard.addEventListener("click", () => {
      Router.goToFilmPage(filmCard.dataset.filmId, filmCard.dataset.filmTitle);
    });
  });
}

export async function renderEditForm(profileId) {
  document.querySelector(".profile-info").innerHTML = editFormTemplate();

  const editForm = document.querySelector("#myForm");
  const usernameButton = document.querySelector("#sendLoginBtn");
  const avatarButton = document.querySelector("#sendImageBtn");
  const passwordButton = document.querySelector("#sendPasswordBtn");
  const exitButton = document.querySelector("#exit-editing-button");

  const usernameInput = document.querySelector('input[name="username"]');
  const passConfInput = document.querySelector('input[name="passConf"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const avatarInput = document.querySelector('input[name="avatar"]');

  usernameButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!validators.username(usernameInput.value)) {
      document.getElementById("username-errors").innerText =
        "Имя пользователя слишком короткое";
      return;
    }

    if (
      await profileApi.editProfile(profileId, {
        action: profileApi.CHANGE_USERNAME_ACTION,
        newData: usernameInput.value,
      })
    ) {
      renderProfile(profileId);
    }
  });

  avatarButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const avatar = avatarInput.value;

    if (!avatar) {
      document.getElementById("avatar-errors").innerText = "Файл не выбран";
      return;
    }

    if (
      await profileApi.editProfile(profileId, {
        action: profileApi.CHANGE_AVATAR_ACTION,
        newData: new FormData(editForm),
      })
    ) {
      renderProfile(profileId);
    }
  });

  passwordButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!validators.password(passwordInput.value)) {
      document.getElementById("password-errors").innerText =
        "Пароль слишком короткий";
      return;
    }

    if (!validators.passwordConf(passwordInput.value, passConfInput.value)) {
      document.getElementById("password-errors").innerText =
        "Пароли не совпадают";
      return;
    }

    if (
      await profileApi.editProfile(profileId, {
        action: profileApi.CHANGE_PASSWORD_ACTION,
        newData: passwordInput.value,
      })
    ) {
      renderProfile(profileId);
    }
  });

  exitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await renderProfile(profileId);
  });
}
