export const timeConvert = {
    intoHours: (durationInSec) => intoHours(durationInSec),
    intoMinutes: (durationInSec) => intoMinutes(durationInSec),
    timeIntoText: (durationInSec) => timeIntoText(durationInSec),
};

const intoHours = (durationInSec) => {
    return Math.floor(durationInSec / 3600);
};

const intoMinutes = (durationInSec) => {
    return Math.floor((durationInSec % 3600) / 60);
};

const timeIntoText = (durationInSec) => {
    let hours = Math.floor(durationInSec / 3600);
    let minutes = Math.floor((durationInSec % 3600) / 60);
    return `${hours}ч ${minutes}м`;
};