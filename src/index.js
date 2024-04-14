import {Menu} from './components/Menu/Menu.js';
import {renderFilms} from './components/Films/films.js';
import {renderLogin} from './components/Login/login.js';
import {renderSignup} from './components/Signup/signup.js';
import {renderProfile} from './components/Profile/profile.js';
import {renderLogout} from './components/Logout/logout.js';
import {Router} from './utils/router.js';
import Rout from './utils/router.js';
import {renderStarsRating} from './components/renderStarsRating.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', {scope: '/'})
      .then((reg) => {
        console.log('SW register', reg);
      })
      .catch((e) => {
        console.log('SW Error', e);
      });
}

const rootElement = document.getElementById('root');
const menuElement = document.createElement('nav');
const pageElement = document.createElement('main');

rootElement.appendChild(menuElement);
rootElement.appendChild(pageElement);

const config = {
  menu: {
    films: {
      href: '/',
      text: 'Фильмы и сериалы',
      render: renderFilms,
    },
    support: {
      href: '/support',
      text: 'Поддержка',
      render: renderFilms,
    },
    subscription: {
      href: '/subscription',
      text: 'Подписки',
      render: renderFilms,
    },
  },
  authElements: {
    profile: {
      href: '/profile',
      text: 'Профиль',
      render: renderProfile,
    },
    logout: {
      href: '/logout',
      text: 'Выйти',
      render: renderLogout,
    },
  },
  noAuthElements: {
    login: {
      href: '/login',
      text: 'Авторизоваться',
      render: renderLogin,
    },
    signup: {
      href: '/signup',
      text: 'Регистрация',
      render: renderSignup,
    },
  },
};

export const menu = new Menu(menuElement, config);

/**
 * Рендерит меню, добавляет обработчик событий для навигации,
 * проверяет статус аутентификации пользователя и
 * соответственно обновляет отображение меню.
 * @function
 * @return {void}
 */
export async function renderMenu() {
  menu.render();
  menuElement.addEventListener('click', (e) => {
    const {target} = e;

    if (target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      changeActiveButton(target.href.replace('http://127.0.0.1:8080', ''));
    }
  });
}

/**
 * Переходит на указанную страницу, очищает содержимое элемента страницы,
 * обновляет стили активного пункта меню,
 * и отображает соответствующую секцию страницы.
 * @function
 * @param {string} link
 * @return {void}
 */
export function changeActiveButton(link) {
  pageElement.innerHTML = '';
  const menuLinkElement = document.querySelector(`a[href="${link}"]`);
  menu.state.activeMenuLink?.classList.remove('active');
  if (menuLinkElement) {
    menuLinkElement.classList.add('active');
  }
  menu.state.activeMenuLink = menuLinkElement;
}

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)',
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

new Router();
renderMenu();
await menu.renderAuth();

window.addEventListener('popstate', async (e) => {
  if (e.state === null) {
    await Rout.go('/', 'Netrunnerflix', null, false);
  } else {
    if (e.state.path === '/logout') {
      changeActiveButton('/login');
      await Rout.go('/login', e.state.title, null, false);
      return;
    }
    if (e.state.path.includes('/player/') || e.state.path.includes('/film/') || e.state.path.includes('/actor/')) {
      await Rout.go(e.state.path, e.state.title, null, false);
      return;
    }
    changeActiveButton(e.state.path);
    await Rout.go(e.state.path, e.state.title, null, false);
  }
});

const handleLocation = async () => {
  const path = window.location.pathname;
  await Rout.go(decodeURIComponent(path), document.title);
};

handleLocation();

Handlebars.registerHelper('stars', function(averageScore) {
  averageScore = 4.4;
  const roundedScore = Math.floor(averageScore);
  const remainder = averageScore - roundedScore;
  const starsHTML = renderStarsRating(roundedScore, remainder);
  return new Handlebars.SafeString(starsHTML);
});
