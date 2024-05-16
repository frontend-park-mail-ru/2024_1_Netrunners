import template from "./subscription.hbs";

/**
 * Отображает страницу подписок.
 * @return {void}
 */
export function renderSubscriptionPage() {
  document.querySelector("main").innerHTML = template();

  const monthlyButton = document.querySelector("#monthly");
  const yearlyButton = document.querySelector("#yearly");

  monthlyButton.addEventListener("click", () => {
    console.log("месяц");
    // TODO оплата ежемесячной подписки
  });

  yearlyButton.addEventListener("click", () => {
    console.log("год");
    // TODO оплата ежегодной подписки
  });
}
