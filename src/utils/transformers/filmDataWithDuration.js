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

export const fixFilmData = (data) => {
  const filmData = { ...data };
  if (typeof filmData.film.duration === "number") {
    filmData.film.duration = timeConvert.timeIntoText(filmData.film.duration);
  }

  filmData.film.date = timeConvert.dateIntoYear(filmData.film.date);
  if (
    filmData.film.isSeries &&
    typeof filmData.film.series.at(-1).at(-1).duration === "number"
  ) {
    filmData.film.series.forEach((elem) => {
      elem.forEach((episode) => {
        episode.duration = timeConvert.timeIntoText(episode.duration);
      });
    });
  }
  return filmData;
};
