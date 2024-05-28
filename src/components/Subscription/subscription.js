import template from "./subscription.hbs";
import { buySubscription } from "../../api/subscription.js";
import * as authApi from "../../api/auth.js";
import { showNotification } from "../Notification/notification.js";
import { getCookie } from "../../index.js";
import * as subscriptionsApi from "../../api/subscription.js";

/**
 * Отображает страницу подписок.
 * @return {void}
 */
export async function renderSubscriptionPage() {
  const subscriptionsData = await subscriptionsApi.getSubscriptions();
  const monthlySubscription = subscriptionsData[0];
  const yearlySubscription = subscriptionsData[1];

  document.querySelector("main").innerHTML = template({
    monthlySubscription,
    yearlySubscription,
  });

  const monthlyButton = document.querySelector("#monthly");
  const yearlyButton = document.querySelector("#yearly");

  monthlyButton.addEventListener("click", async () => {
    const isAuthorized = await authApi.check();
    if (!isAuthorized) {
      showNotification("Для этого нужно быть авторизованным", "danger");
    } else {
      const monthlyBody = {
        subId: monthlySubscription.uuid,
      };
      window.location.replace(
        await buySubscription(getCookie("user_uuid"), monthlyBody),
      );
    }
  });

  yearlyButton.addEventListener("click", async () => {
    const isAuthorized = await authApi.check();
    if (!isAuthorized) {
      showNotification("Для этого нужно быть авторизованным", "danger");
    } else {
      const yearlyBody = {
        subId: yearlySubscription.uuid,
      };
      window.location.replace(
        await buySubscription(getCookie("user_uuid"), yearlyBody),
      );
    }
  });
}
