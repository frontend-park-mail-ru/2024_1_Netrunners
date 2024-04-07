import {fetchRequest, IP} from './fetch.js';
import {timeConvert} from '../utils/timeConvert.js';

const topFourFilms = [
  {
    "preview_data": 'https://media.kg-portal.ru/movies/a/avengers4/posters/avengers4_80.jpg',
    "title": "Мстители: Финал",
    "duration": 7560,
    "film_data": "С помощью оставшихся союзников Мстители должны вновь собраться, чтобы отменить действия Таноса и устранить хаос во Вселенной, какие бы последствия их ни ждали и с кем бы они ни столкнулись... Отомстите за павших."
  },
  {
    "preview_data": 'https://www.kino-teatr.ru/movie/poster/143085/119148.jpg',
    "title": "Универ 15 лет спустя",
    "duration": 7560,
    "film_data": "Прошло десять лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях."
  },
  {
    "preview_data": 'https://www.kino-teatr.ru/movie/poster/143085/119148.jpg',
    "title": "Универ 20 лет спустя",
    "duration": 7560,
    "film_data": "Прошло двадцать лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях."
  },
  {
    "preview_data": 'https://www.kino-teatr.ru/movie/poster/143085/119148.jpg',
    "title": "Универ 25 лет спустя",
    "duration": 7560,
    "film_data": "Прошло двадцать пять лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях."
  },
];

const genresData = [
  {
    "name": "Боевик",
    "posters": [
      "https://yobte.ru/uploads/posts/2019-07/podborka-plakatov-s-gerojami-boevikov-80-h-90-h-godov-12.jpg",
      "https://i.pinimg.com/originals/dd/bc/5c/ddbc5c9c728a04c57b7e7ba05fdb93ba.jpg",
      "https://lightbox-prod.imgix.net/images/assets/100141671-p9000544_v_v10_ac.jpg",
      "https://media.kg-portal.ru/movies/s/security/posters/security_2.jpg"
    ]
  },
  {
    "name": "Комедия",
    "posters": [
      "https://images.justwatch.com/poster/301028172/s718/gentlemen-of-fortune.%7Bformat%7D",
      "https://fs.kinomania.ru/file/film_poster/c/5a/c5ac4788fb9f7d49b78128ce3c2637e3.jpeg",
      "https://4tololo.ru/sites/default/files/images/20140907132433.jpg?itok=WNvojXhV",
      "https://pic.rutubelist.ru/video/a0/77/a077b5f93cb7474e527b15f154a97341.jpg"
    ]
  },
  {
    "name": "Драма",
    "posters": [
      "https://sun9-67.userapi.com/impg/E8pgKo9kqiHUxPQd-AamV2YsTnb_zOTFO0H6KQ/5lKdkFFLG2Q.jpg?size=646x807&quality=95&sign=c784fde94499b2c6bb4ead461fc3ab92&c_uniq_tag=5tZv8sO0MhCbilTXrMxtwP7iztmm_mV47D74XQdZVbs&type=album",
      "https://u2.9111s.ru/uploads/202302/06/fad90e48a7a82f234725d11aeddd042d.jpg",
      "https://dominioncinema.ru/upload/iblock/2aa/ap70cucz9oc1ivrjz17z9iohhac7nem4.jpg",
      "https://i.pinimg.com/originals/19/b8/c5/19b8c5b123a4b5301cf44785452cd20e.jpg"
    ]
  },
  {
    "name": "Фэнтези",
    "posters": [
      "https://i2.wp.com/www.weidmangallery.com/wp-content/uploads/2019/05/WG00911.jpg?fit=4224%2C2816&ssl=1",
      "https://media.filmz.ru/photos/full/filmz.ru_f_72760.jpg",
      "https://i.artfile.ru/3840x2160_1566401_[www.ArtFile.ru].jpg",
      "https://i.pinimg.com/originals/6d/44/82/6d4482ab03ca7de7405144221256edcd.jpg"
    ]
  },
  {
    "name": "Фэнтези",
    "posters": [
      "https://i2.wp.com/www.weidmangallery.com/wp-content/uploads/2019/05/WG00911.jpg?fit=4224%2C2816&ssl=1",
      "https://media.filmz.ru/photos/full/filmz.ru_f_72760.jpg",
      "https://i.artfile.ru/3840x2160_1566401_[www.ArtFile.ru].jpg",
      "https://i.pinimg.com/originals/6d/44/82/6d4482ab03ca7de7405144221256edcd.jpg"
    ]
  }
]

/**
 * Запрос на получение массива с фильмами
 * @function
 * @return {Promise} promise - Объект запроса
 */
export async function getAll() {
  try {
    const url = IP + 'films';
    const response = await fetchRequest(url, 'GET');

    let filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error('Ошибка: ответ не содержит массив фильмов');
    }

    return filmsData.films.map((film) => ({
      ...film,
      duration: timeConvert.timeIntoText(film.duration),
    }));
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

export async function getTopFour() {
  try {
    return new Promise(function (resolve) {
      let data = topFourFilms.map((film) => ({
        ...film,
        duration: timeConvert.timeIntoText(film.duration),
      }));
      resolve(data);
    });
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

export async function getGenres() {
  try {
    return new Promise(function (resolve) {
      resolve(genresData);
    });
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
