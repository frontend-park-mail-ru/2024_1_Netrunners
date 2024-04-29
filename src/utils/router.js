import { renderFilms } from "../components/Films/films.js";
import { renderSignup } from "../components/Signup/signup.js";
import { renderPlayer } from "../components/Player/player.js";
import { renderFilmPage } from "../components/Film/film.js";
import { renderLogin } from "../components/Login/login.js";
import { renderProfile } from "../components/Profile/profile.js";
import { renderActorPage } from "../components/Actor/actor.js";
import { renderLogout } from "../components/Logout/logout.js";
import { renderGenrePage } from "../components/Genre/genre.js";

/**
 * Класс для управления навигацией и отображением различных страниц.
 */
export class Router {
  /**
   * Создает новый экземпляр класса Router.
   */
  constructor() {
    this.routs = {
      "/": renderFilms,
      "/signup": renderSignup,
      "/login": renderLogin,
      "/logout": renderLogout,
    };
  }

  /**
   * Переход на главную страницу.
   */
  goToHomePage() {
    const state = {};
    state.path = "/";
    state.title = "Netrunnerflix";
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);
    changeActiveButton(state.path);
    renderFilms();
  }

  /**
   * Переход на страницу регистрации.
   */
  goToSignupPage() {
    const state = {};
    state.path = "/signup";
    state.title = "Регистрация";
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);
    changeActiveButton(state.path);
    renderSignup();
  }

  /**
   * Переход на страницу входа.
   */
  goToLoginPage() {
    const state = {};
    state.path = "/login";
    state.title = "Вход";
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);
    changeActiveButton(state.path);
    renderLogin();
  }

  /**
   * Переход на страницу выхода.
   */
  goToLogout() {
    const state = {};
    state.path = "/logout";
    state.title = "Netrunnerflix";
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderLogout();
  }

  /**
   * Переход на страницу актера по его идентификатору.
   * @param {string} uuid Идентификатор актера.
   * @param {string} title Заголовок страницы.
   */
  goToActorPage(uuid, title) {
    const state = {};
    state.path = `/actor/${uuid}`;
    state.title = title;
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderActorPage(uuid);
  }

  /**
   * Переход на страницу фильма по его идентификатору.
   * @param {string} uuid Идентификатор фильма.
   * @param {string} title Заголовок страницы.
   */
  goToFilmPage(uuid, title) {
    const state = {};
    state.path = `/film/${uuid}`;
    state.title = title;
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);

    renderFilmPage(uuid);
    window.scrollTo(0, 0);
  }

  /**
   * Переход на страницу фильмов по жанру.
   * @param {string} genreName название жанра.
   * @param {string} genreNameRu название жанра на русском.
   */
  goToGenrePage(genreName, genreNameRu) {
    const state = {};
    state.path = `/genre/${genreName}`;
    state.title = genreNameRu;
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);
    renderGenrePage(genreNameRu);
    window.scrollTo(0, 0);
  }

  /**
   * Переход на страницу профиля пользователя.
   */
  goToProfilePage() {
    const state = {};
    state.path = "/profile";
    state.title = "Профиль";
    document.title = state.title;
    const uuid = getCookie("user_uuid");

    window.history.pushState(state, state.title, state.path);
    changeActiveButton(state.path);
    renderProfile(uuid);
  }

  /**
   * Переход на страницу плеера для просмотра фильма.
   * @param {string} uuid Идентификатор фильма.
   * @param {string} title Заголовок страницы.
   * @param {string} link Ссылка на видеофайл фильма.
   */
  goToPlayerPage(uuid, title, link) {
    const state = {};
    state.path = `/player/${uuid}`;
    state.title = title;
    document.title = state.title;

    window.history.pushState(state, state.title, state.path);
    renderPlayer(uuid, title, link);
  }

  /**
   * Метод для перехода по заданному пути.
   * @param {string} path Путь для перехода.
   * @param {string} title Заголовок страницы.
   * @param {any} data Дополнительные данные, передаваемые в функцию отображения страницы.
   * @param {boolean} needPush Флаг для определения необходимости добавления новой записи в историю браузера.
   * @return {Promise<void>}
   */
  async go(path, title, data = null, needPush = true) {
    const isAuthorized = getCookie("user_uuid") !== undefined;
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
      } else if (path.includes("/genre/")) {
        const genreName = path.substring("/genre/".length, path.length);
        await renderGenrePage(genreName);
      } else if (path.includes("/player/")) {
        const uuid = path.substring("/player/".length, path.length);
        await renderPlayer(uuid, title, data);
      } else if (path.includes("/profile")) {
        if (!isAuthorized) {
          this.goToHomePage();
        } else {
          const uuid = getCookie("user_uuid");
          changeActiveButton("/profile");
          await renderProfile(uuid);
        }
      } else {
        await this.go("/", "Netrunnerflix", true);
      }
    } else {
      func();
    }
  }
}

export default new Router();
