import { v4 as uuidv4 } from "uuid";
import { fetchRequest } from "./fetch";

const AUTH =
  "Basic MzkzMDYzOnRlc3RfcWFHOGJfZm1KTURIUC1IdGRxN2Ffa0N3aG5BS1RFTTlaV0FPQTBPZ0RKMA==";
const RETURN_URL = "https://netrunnerflix.ru/profile";
// const RETURN_URL = "http://127.0.0.1:8080/profile";

/**
 * Запрос на покупку ежемесячной подписки
 * @function
 * @return {Object} - Объект запроса
 */
export async function buyMonthlySubscription() {
  try {
    const url = "https://api.yookassa.ru/v3/payments";

    const requestBody = {
      amount: {
        value: "299.00",
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: RETURN_URL,
      },
      description: "Ежемесячная подписка на фильмы и сериалы",
    };

    const requestHeaders = {
      Authorization: AUTH,
      "Idempotence-Key": uuidv4().toString(),
      "Content-Type": "application/json",
    };
    const response = await fetchRequest(
      url,
      "POST",
      requestBody,
      requestHeaders,
      "application/json",
      "no-cors",
    );

    return await response.json();
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
