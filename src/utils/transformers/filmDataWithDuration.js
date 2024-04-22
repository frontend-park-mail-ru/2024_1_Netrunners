import { timeConvert } from "../timeConvert.js";

export const toFilmDataWithDuration = (filmData) => {
  return filmData.map((film) => ({
    ...film,
    duration: timeConvert.timeIntoText(film.duration),
  }));
};

export const fixUserData = (data) => {
  const userData = { ...data };
  userData.registeredAt = timeConvert.dateIntoDayMonthYear(
    userData.registeredAt,
  );

  return userData;
};

export const fixActorData = (data) => {
  const actorData = { ...data };
  actorData.birthday = timeConvert.dateIntoDayMonthYear(actorData.birthday);

  return actorData;
};
