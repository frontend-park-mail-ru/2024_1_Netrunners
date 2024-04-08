import {fetchRequest, IP} from "./fetch.js";

const filmData = {
        "preview_data": 'https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/0c3af6ba-0d22-441a-b249-6afb327fea15/1920x',
        "title": "Универ 10 лет спустя",
        "director": "Влад Володин",
        "average_score": 4,
        "scores_count": 20324,
        "duration": 7560,
        "release_date": "2011-04-11T10:20:30",
        "film_data": "string example of any sort of information"
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
    return new Promise(function(resolve) {
        resolve(filmData);
    });
}

export async function getActors(filmId) {
    return new Promise(function(resolve) {
        resolve(filmActors);
    });
}