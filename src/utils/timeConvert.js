export const timeConvert = {
  /**
   * Конвертирует время из секунд в часы.
   * @function
   * @private
   * @param {number} durationInSec - Длительность времени в секундах.
   * @return {number} - Длительность времени в часах.
   */
  intoHours: (durationInSec) => intoHours(durationInSec),
  /**
   * Конвертирует время из секунд в минуты.
   * @function
   * @private
   * @param {number} durationInSec - Длительность времени в секундах.
   * @return {number} - Длительность времени в минутах.
   */
  intoMinutes: (durationInSec) => intoMinutes(durationInSec),
  /**
   * Форматирует время в текстовый формат (часы и минуты).
   * @function
   * @private
   * @param {number} durationInSec - Длительность времени в секундах.
   * @return {string} - Текстовое представление времени в формате "часы минуты".
   */
  timeIntoText: (durationInSec) => timeIntoText(durationInSec),
};

const intoHours = (durationInSec) => {
  return Math.floor(durationInSec / 3600);
};

const intoMinutes = (durationInSec) => {
  return Math.floor((durationInSec % 3600) / 60);
};

const timeIntoText = (durationInSec) => {
  const hours = Math.floor(durationInSec / 3600);
  const minutes = Math.floor((durationInSec % 3600) / 60);

  return `${hours}ч ${minutes}мин`;
};
