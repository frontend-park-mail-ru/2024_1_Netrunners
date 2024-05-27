import { fetchRequest, IP } from "./fetch";

/**
 * Запрос на покупку ежемесячной подписки
 * @function
 * @return {Object} - Объект запроса
 * @param {string} uuid - uuid профиля
 */
export async function buyMonthlySubscription(uuid) {
  try {
    const response = await fetchRequest(
      `${IP}/profile/${uuid}/monthlySubscription`,
      "GET",
    );
    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    return data.confirmation.confirmation_url;
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
  }
}
