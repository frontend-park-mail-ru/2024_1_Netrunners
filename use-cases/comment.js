import store from "../src/index.js";
import { fetchRequest, IP } from "../src/api/fetch.js";
import { CommentError, CommentRequest, CommentSuccess } from "../flux/actions/comment.js";

/**
 * Выполняет запрос на получение данных конкретного фильма по его UUID.
 * @param {string} uuid UUID фильма.
 * @throws {Error} Если полученные данные не являются объектом или произошла ошибка при выполнении запроса.
 */
export async function getCommentData(uuid) {
  try {
    store.dispatch(CommentRequest());
    const response = await fetchRequest(`${IP}/${uuid}/comments`, "GET");
    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    store.dispatch(CommentSuccess(data));
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
    store.dispatch(CommentError());
  }
}
