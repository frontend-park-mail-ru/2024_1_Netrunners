import { fetchRequest, IP } from "./fetch.js";

export async function sendComment(uuid, data) {
  try {
    const url = IP + "/comments/add";
    const response = await fetchRequest(url, "POST", data);
    const responseData = await response.json();

    return responseData.status < 300;
  } catch (error) {
    console.error("Произошла ошибка", error.message);
  }
}