import {fetchRequest, IP} from './fetch.js';

const profileData = {
  name: "Мэттью Макконахи",
  email: "ahmed@yandex.ru",
  signUpAt: "2011-04-11T10:20:30",
  isAdmin: false,
  avatar: 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg'
};

/**
 * Запрос на получение данных о пользователе
 * @function
 * @param {string} profileId - Идентификатор пользователя.
 * @return {Promise} promise - Объект запроса
 */
export async function getProfileData(actorId) {
  //   const response = await fetchRequest(`${IP}/profile/${profileId}/data`, 'GET');
  //   const data = await response.json();
  //   if (!data || typeof data !== 'object') {
  //     throw new Error('Ошибка: полученные данные не являются объектом');
  //   }
  //   return data;
  return new Promise(function(resolve) {
    resolve(profileData);
  });
}

export async function editProfile(uuid, editData){
  try {
    // const newData = {new_username, new_password, new_avatar};
    // const url = IP + 'profile/${uuid}/edit';
    // const response = await fetchRequest(url, 'POST', editData);
    // const responseData = await response.json();
    //
    // return responseData.status === 200;
    return new Promise(function(resolve) {
      alert(editData.action);
      resolve();
    });
  } catch (error) {
    console.error('Произошла ошибка: ', error.message);
  }
}

