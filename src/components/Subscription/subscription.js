import template from "./subscription.hbs";
import { buyMonthlySubscription } from "../../api/subscription.js";
import * as authApi from "../../api/auth.js";
import { showNotification } from "../Notification/notification.js";

/**
 * Отображает страницу подписок.
 * @return {void}
 */
export function renderSubscriptionPage() {
  document.querySelector("main").innerHTML = template();

  const monthlyButton = document.querySelector("#monthly");
  const yearlyButton = document.querySelector("#yearly");

  monthlyButton.addEventListener("click", async () => {
    console.log("месяц");
    const isAuthorized = await authApi.check();
    if (isAuthorized) {
      await buyMonthlySubscription();
    } else {
      showNotification("Для этого нужно быть авторизованным", "danger");
    }
  });

  yearlyButton.addEventListener("click", async () => {
    console.log("год");
    const isAuthorized = await authApi.check();
    if (isAuthorized) {
      // TODO оплата ежегодной подписки
    } else {
      showNotification("Для этого нужно быть авторизованным", "danger");
    }
  });
}
