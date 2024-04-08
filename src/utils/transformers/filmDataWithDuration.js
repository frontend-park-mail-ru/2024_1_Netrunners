import {timeConvert} from "../timeConvert.js";

export const toFilmDataWithDuration = (filmData) => {
  return filmData.map((film) => ({
    ...film,
    duration: timeConvert.timeIntoText(film.duration),
  }));
}