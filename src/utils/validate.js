export const validators = {
  login: (login= '') => validateEmail(login),
  username: (username) => validateUsername(username),
  password: (password, passConf) => validatePassword(password, passConf),
};

const MIN_USERNAME_LENGTH = 4;
const MIN_PASSW_LENGTH = 6;

const loginRegular = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateEmail = (email = '') => {
  return loginRegular.test(email);
};

const validateUsername = (username) => {
  return username.length >= MIN_USERNAME_LENGTH;
};

const validatePassword = (password, passConf) => {
  return password === passConf && password.length >= MIN_PASSW_LENGTH;
};
