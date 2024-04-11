import {renderFilms} from "../components/Films/films.js";
import {renderSignup} from "../components/Signup/signup.js";
import {renderPlayer} from "../components/Player/player.js";
import {renderFilmPage} from "../components/Film/film.js";
import {renderLogin} from "../components/Login/login.js";
import {renderProfile} from "../components/Profile/profile.js";
import {renderActorPage} from "../components/Actor/actor.js";
import {renderLogout} from "../components/Logout/logout.js";
import {validate as uuidValidate} from 'https://jspm.dev/uuid';
import {menu} from "../index.js";
import * as authApi from "../api/auth.js";

export class Router {
  constructor() {
    this.routs = {
      '/': renderFilms,
      '/signup': renderSignup,
      '/login': renderLogin,
      '/profile': renderProfile,
      '/logout': renderLogout,
    };

    window.addEventListener('popstate', async (e) => {
      const isAuthorized = await authApi.check();
      if (e.state === null) {
        await this.go('/', null, e.state, isAuthorized);
      } else {
        const path = e.state.path;
        await this.go(path, e.state.title, e.state, isAuthorized);
      }
    });
  }

  async go(path, title, isAuthed) {
    if (typeof isAuthed !== 'undefined') {
      console.log(isAuthed);
      await menu.renderAuth(isAuthed);
    }

    const state = {};
    state.path = path;
    state.title = title;
    window.history.pushState(
        state,
        state.title,
        path,
    );

    document.title = title;

    const func = this.routs[path];

    if (func === undefined) {
      if (path.includes('/actor/')) {
        const uuid = path.substring('/actor/'.length, path.length);
        if (!uuidValidate(uuid)) {
          window.history.back();
        }
        renderActorPage(uuid);
      } else if (path.includes('/film/')) {
        const uuid = path.substring('/film/'.length, path.length);
        if (!uuidValidate(uuid)) {
          window.history.back();
        }
        await renderFilmPage(uuid);
      } else if (path.includes('/player/')) {
        const src = path.substring('/player/'.length, path.length);
        await renderPlayer(src);
      } else {
        await this.go('/', 'Netrunnerflix', true);
      }
    } else {
      func();
    }
  }
} export default new Router();