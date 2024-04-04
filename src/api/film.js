import {fetchRequest, IP} from "./fetch.js";
import {timeConvert} from "../utils/timeConvert.js";

const filmData = {
        "banner": 'https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/0c3af6ba-0d22-441a-b249-6afb327fea15/1920x',
        "title": "Универ 10 лет спустя",
        "director": "Влад Володин",
        "average_score": 4,
        "duration": 7560,
        "published_at": "2011-04-11T10:20:30",
        "data": "string example of any sort of information",
        "age_limit": 12
    };

const filmActors = [{
        "name": 'Стас Ярушин',
        "avatar": 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg'
    },
    {
        "name": 'Стас Ярушин',
        "avatar": 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg'
    },
    {
        "name": 'Стас Ярушин',
        "avatar": 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg'
    },
    {
        "name": 'Стас Ярушин',
        "avatar": 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg'
    },
    {
        "name": 'Стас Ярушин',
        "avatar": 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg'
    }
    ]
;

export async function getFilmData(filmId) {
    try {
        /*
        const response = await fetchRequest(`${IP}/films/${filmId}/data`, 'GET');
        const filmData = await response.json();
        if (!filmData || typeof filmData !== 'object') {
            throw new Error('Ошибка: полученные данные не являются объектом');
        }
        return filmData;
        */
        return new Promise(function(resolve) {
            filmData.published_at = timeConvert.dateIntoYear(filmData.published_at);
            filmData.duration = timeConvert.timeIntoText(filmData.duration);
            resolve(filmData);
        });
    } catch (error) {
    console.error('Произошла ошибка:', error.message);
}
}

export async function getActors(filmId) {
    try {
        /*
        const response = await fetchRequest(`${IP}/films/${filmId}/actors`, 'GET');
        const filmActors = await response.json();
        if (!filmActors || typeof filmActors !== 'object') {
            throw new Error('Ошибка: полученные данные не являются объектом');
        }
        return filmActors;
        */
        return new Promise(function(resolve) {
            resolve(filmActors);
        });
    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }
}