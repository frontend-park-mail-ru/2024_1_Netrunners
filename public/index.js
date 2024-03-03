import {Menu} from "./components/Menu/Menu.js";
import {safe} from "./utils/safe.js";

const rootElement = document.getElementById('root');
const logoElement = document.createElement('div');
const menuElement = document.createElement('aside');
const pageElement = document.createElement('main');

rootElement.appendChild(logoElement);
rootElement.appendChild(menuElement);
rootElement.appendChild(pageElement);

const config = {
    menu: {
        films: {
            href: '/films',
            text: 'Фильмы',
            render: renderFilms,
        },
        login: {
            href: '/login',
            text: 'Авторизоваться',
            render: renderLogin,
        },
        signup: {
            href: '/signup',
            text: 'Регистрация',
            render: renderSignup
        },
        profile: {
            href: '/profile',
            text: safe('Профиль'),
            render: renderProfile,
        },
    }
};

const menu = new Menu(menuElement, config);

function renderMenu() {
    menu.render();
    menuElement.addEventListener('click', (e) => {
        const {target} = e;

        if (target.tagName.toLowerCase() === 'a' || target instanceof HTMLAnchorElement) {
            e.preventDefault();

            goToPage(target);
        }
    });
}

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

function renderLogin() {
    const form = document.createElement('form');

    const emailInput = createInput('email', 'Емайл', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Войти!';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        Ajax.post({
            url: '/login',
            body: {password, email},
            callback: (status) => {
                if (status === 200) {
                    goToPage(menu.state.menuElements.profile);
                    return;
                }

                alert('НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            }
        });
    })

    return form;
}

function renderSignup() {
    const form = document.createElement('form');

    const emailInput = createInput('email', 'Емайл', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');
    const ageInput = createInput('number', 'Возраст', 'age');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегистрироваться!';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(ageInput);
    form.appendChild(submitBtn);

    return form;
}

function renderFilms() {
    const filmsSection = document.createElement('div');
    filmsSection.classList.add('films-section');

    const filmsContainer = document.createElement('div');
    filmsContainer.classList.add('films-container');

    const popularNowTitle = document.createElement('div');
    popularNowTitle.classList.add('popular-now-title');
    popularNowTitle.textContent = 'Популярно сейчас';

    filmsSection.appendChild(popularNowTitle);
    filmsSection.appendChild(filmsContainer);

    Ajax.get({
        url: '/films',
        callback: (status, responseString) => {
            const films = JSON.parse(responseString);

            films.forEach((film) => {
                const filmCard = document.createElement('div');
                filmCard.classList.add('film-card');

                const filmImage = document.createElement('div');
                filmImage.classList.add('film-image');
                filmImage.style.backgroundImage = `url('${film.poster}')`;

                const filmContent = document.createElement('div');
                filmContent.classList.add('film-content');

                const filmTime = document.createElement('div');
                filmTime.classList.add('film-time');
                filmTime.textContent = film.duration;

                filmContent.appendChild(filmTime);
                filmCard.appendChild(filmImage);
                filmCard.appendChild(filmContent);

                filmsContainer.appendChild(filmCard);
            });
        }
    });

    return filmsSection;
}

function goToPage(menuLinkElement) {
    pageElement.innerHTML = '';

    menu.state.activeMenuLink?.classList.remove('active');
    menuLinkElement.classList.add('active');
    menu.state.activeMenuLink = menuLinkElement;

    const element = config.menu[menuLinkElement.dataset.section].render();

    pageElement.appendChild(element);
}

function renderProfile() {
    const profileElement = document.createElement('div');

    Ajax.get({
        url: '/me',
        callback: (status, responseString) => {
            const isAuthorized = status === 200;

            if (!isAuthorized) {
                alert('АХТУНГ! нет авторизации');
                goToPage(menu.state.menuElements.login);
                return;
            }

            const {email, age, images} = JSON.parse(responseString);

            const span = document.createElement('span');
            span.textContent = `${email} ${age} лет`;
            profileElement.appendChild(span);

            if (images && Array.isArray(images)) {
                const div = document.createElement('div');
                profileElement.appendChild(div);

                images.forEach(({src, likes}) => {
                    div.innerHTML += `<img src="${src}" width="500" alt=""/><div>${likes} лайков</div>`
                });
            }
        }
    });

    return profileElement;
}

renderMenu();
goToPage(menu.state.menuElements.films);
