export const validators = {
    login: (login= '') => validateEmail(login),
    username: (username) => validateUsername(username),
    password: (password, password_conf) => validatePassword(password, password_conf),
};

const   MIN_USERNAME_LENGTH = 4;
const   MIN_PASSW_LENGTH = 6;

const loginRegular = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateEmail = (email = '') => {
    return loginRegular.test(email);
};

const validateUsername = (username) => {
    return username.length >= MIN_USERNAME_LENGTH;
};

const validatePassword = (password, passw_conf) => {
    return password === passw_conf && password >= MIN_PASSW_LENGTH;
};