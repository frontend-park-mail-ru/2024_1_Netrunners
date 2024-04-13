import {timeConvert} from '../timeConvert.js';

export const toFilmDataWithDuration = (filmData) => {
  return filmData.map((film) => ({
    ...film,
    duration: timeConvert.timeIntoText(film.duration),
  }));
};

export const fixUserData = (data) => {
  const userData = {...data};
  userData.registeredAt = timeConvert.dateIntoYear(userData.registeredAt);

  return userData;
};
