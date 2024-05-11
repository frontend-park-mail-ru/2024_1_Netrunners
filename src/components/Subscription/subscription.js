import template from "./subscription.hbs";

/**
 * Отображает страницу подписок.
 * @return {void}
 */
export function renderSubscriptionPage() {
  document.querySelector("main").innerHTML = template();
}
