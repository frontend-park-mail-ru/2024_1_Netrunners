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

  // const monthlySubscription = {
  //   uuid: 1,
  //   title: "Ежемесячный платеж",
  //   description:
  //     "Наслаждайтесь обширной библиотекой фильмов и сериалов с разнообразным контентом.",
  //   amount: 299,
  //   duration: 0,
  // };
  //
  // const yearlySubscription = {
  //   uuid: 2,
  //   title: "Ежегодный платеж",
  //   description:
  //     "Покупка на 12 месяцев без продления. Выгоднее на 30%: 208₽ в месяц вместо 299₽ в месяц за ежемесячную подписку",
  //   amount: 2490,
  //   duration: 0,
  // };
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
