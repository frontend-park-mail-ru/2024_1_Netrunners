import {Menu} from "./components/Menu/Menu.js";
import {safe} from "./utils/safe.js";
import {fetchRequest} from "./api/fetch.js";

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
        logout: {
            href: '/logout',
            text: 'Выйти',
            render: renderLogout
        }
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
    let isAuthorized = false
    const url = 'http://94.139.247.246:8000/auth/check';
    fetchRequest(url)
        .then((response) => {
            if (response.ok) {
                isAuthorized = true
                return response.text();
            } else {
                if (isAuthorized) {
                    menu.state.menuElements.logout.style.display = 'block';
                    menu.state.menuElements.login.style.display = 'none';
                    menu.state.menuElements.signup.style.display = 'none';
                } else {
                    menu.state.menuElements.logout.style.display = 'none';
                    menu.state.menuElements.login.style.display = 'block';
                    menu.state.menuElements.signup.style.display = 'block';
                }
                throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
            }
        })
        .catch(function (error) {
            console.error('Произошла ошибка:', error.message);
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
        const url = 'http://94.139.247.246:8000/auth/login';

        fetchRequest(url, 'POST', user)
            .then((response) => {
                if (response.ok) {
                    menu.state.menuElements.logout.style.display = 'block';
                    menu.state.menuElements.login.style.display = 'none';
                    menu.state.menuElements.signup.style.display = 'none';
                    return response.json();
                } else {
                    throw new Error('Неверная почта и пароль');
                }
            })
            .then((result) => {
                document.cookie = `jwt_token=${result.token}`;
                goToPage(menu.state.menuElements.profile);
            })
            .catch(function (error) {
                console.error('Произошла ошибка:', error.message);
            });
    })

    return form;
}

function renderSignup() {
    const form = document.createElement('form');
    form.classList.add('form-section');

    const emailInput = createInput('email', 'Почта', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');
    const passwConfInput = createInput('password', 'Подтвердить пароль', 'passw_conf');

    const submitBtn = document.createElement('input');
    submitBtn.classList.add('submit-button');
    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегистрироваться!';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(passwConfInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const passw_conf = passwConfInput.value;
        const user = { password, passw_conf, email };
        const url = 'http://94.139.247.246:8000/auth/signup';
        fetchRequest(url,'POST', user)
            .then((response) => {
                if (response.status === 200) {
                    menu.state.menuElements.logout.style.display = 'block';
                    menu.state.menuElements.login.style.display = 'none';
                    menu.state.menuElements.signup.style.display = 'none';
                    goToPage(menu.state.menuElements.profile);
                } else if (response.status === 400) {
                    throw new Error('Неверная почта или пароль при регистрации');
                } else {
                    throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
                }
            })
            .catch(function (error) {
                console.error('Произошла ошибка:', error.message);
            });
    })

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
    const url = 'http://94.139.247.246:8000/films/all';
    fetchRequest(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
            }
        })
        .then((films) => {
            films.forEach((film) => {
                const filmCard = document.createElement('div');
                filmCard.classList.add('film-card');

                const filmImage = document.createElement('div');
                filmImage.classList.add('film-image');
                filmImage.style.backgroundImage = `url('${film.preview_data}')`;
                filmImage.setAttribute('src', "data:/image/jpg:base64," + films.preview_data)
                const filmContent = document.createElement('div');
                filmContent.classList.add('film-content');

                const filmTime = document.createElement('div');
                filmTime.classList.add('film-time');
                const durationInSeconds = film.duration;
                const hours = Math.floor(durationInSeconds / 3600);
                const minutes = Math.floor((durationInSeconds % 3600) / 60);
                const formattedTime = `${hours}ч ${minutes}м`;

                filmTime.classList.add('film-time');
                filmTime.textContent = formattedTime;

                filmContent.appendChild(filmTime);
                filmCard.appendChild(filmImage);
                filmCard.appendChild(filmContent);

                filmsContainer.appendChild(filmCard);
            });
        })
        .catch(function (error) {
            console.error('Произошла ошибка:', error.message);
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

    const url = 'http://94.139.247.246:8000/auth/check';
    fetchRequest(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                goToPage(menu.state.menuElements.login);
                throw new Error('Unauthorized');
            } else {
                throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
            }
        })
        .then(({ email, images }) => {
            const span = document.createElement('span');
            span.textContent = `${email}`;
            profileElement.appendChild(span);

            if (images && Array.isArray(images)) {
                const div = document.createElement('div');
                profileElement.appendChild(div);

                images.forEach(({ src }) => {
                    div.innerHTML += `<img src="${src}" width="500" alt=""/>`;
                });
            }
        })
        .catch(function (error) {
            console.error('Произошла ошибка:', error.message);
        });

    return profileElement;
}

function renderLogout() {
    const profileElement = document.createElement('div');

    fetchRequest('/logout', 'POST')
        .then((response) => {
            if (response.ok) {
                menu.state.menuElements.logout.style.display = 'none';
                menu.state.menuElements.login.style.display = 'block';
                menu.state.menuElements.signup.style.display = 'block';
                return response.json();
            } else {
                throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
            }
        })
        .then(() => {
            const span = document.createElement('span');
            goToPage(menu.state.menuElements.login);
            profileElement.appendChild(span);
        })
        .catch(function (error) {
            console.error('Произошла ошибка:', error.message);
        });

    return profileElement;
}

renderMenu();
goToPage(menu.state.menuElements.films);
