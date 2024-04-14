import { renderFilms } from "../components/Films/films.js";
import { renderSignup } from "../components/Signup/signup.js";
import { renderPlayer } from "../components/Player/player.js";
import { renderFilmPage } from "../components/Film/film.js";
import { renderLogin } from "../components/Login/login.js";
import { renderProfile } from "../components/Profile/profile.js";
import { renderActorPage } from "../components/Actor/actor.js";
import { renderLogout } from "../components/Logout/logout.js";
import { changeActiveButton, getCookie } from "../index.js";

export class Router {
  constructor() {
    this.routs = {
      "/": renderFilms,
      "/signup": renderSignup,
      "/login": renderLogin,
      "/logout": renderLogout,
    };
  }

  goToHomePage() {
    const state = {};
    state.path = "/";
    state.title = "Netrunnerflix";
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderFilms();
  }

  goToSignupPage() {
    const state = {};
    state.path = "/signup";
    state.title = "Регистрация";
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderSignup();
  }

  goToLoginPage() {
    const state = {};
    state.path = "/login";
    state.title = "Вход";
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderLogin();
  }

  goToLogout() {
    const state = {};
    state.path = "/logout";
    state.title = "Netrunnerflix";
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderLogout();
  }

  goToActorPage(uuid, title) {
    const state = {};
    state.path = `/actor/${uuid}`;
    state.title = title;
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderActorPage(uuid);
  }

  goToFilmPage(uuid, title) {
    const state = {};
    state.path = `/film/${uuid}`;
    state.title = title;
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderFilmPage(uuid);
  }

  goToProfilePage() {
    const state = {};
    state.path = "/profile";
    state.title = "Профиль";
    document.title = state.title;
    const uuid = getCookie("user_uuid");

    window.history.pushState(state, state.title, state.path);

    renderProfile(uuid);
  }

  goToPlayerPage(uuid, title, link) {
    const state = {};
    state.path = `/film/${uuid}`;
    state.title = title;
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderPlayer(uuid, title, link);
  }

  async go(path, title, data = null, needPush = true) {
    const state = {};
    state.path = path;
    state.title = title;
    if (needPush) {
      window.history.pushState(state, state.title, path);
    }
    document.title = title;

    const func = this.routs[path];
    if (func === undefined) {
      if (path.includes("/actor/")) {
        const uuid = path.substring("/actor/".length, path.length);
        renderActorPage(uuid);
      } else if (path.includes("/film/")) {
        const uuid = path.substring("/film/".length, path.length);
        await renderFilmPage(uuid);
      } else if (path.includes("/player/")) {
        const uuid = path.substring("/player/".length, path.length);
        await renderPlayer(uuid, title, data);
      } else if (path.includes("/profile")) {
        const uuid = getCookie("user_uuid");
        changeActiveButton("/profile");
        await renderProfile(uuid);
      } else {
        await this.go("/", "Netrunnerflix", true);
      }
    } else {
      func();
    }
  }
}

export default new Router();
