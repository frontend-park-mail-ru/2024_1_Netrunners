import addCommentTemplate from "./commentsBlockTemplates/addCommentForm.hbs";
import commentsListTemplate from "./commentsBlockTemplates/commentsList.hbs";
import { renderCommentElement } from "../commentElement/commentElement";
import { showNotification } from "../../Notification/notification.js";
import {
  sendComment,
  getCommentData,
  deleteComment,
} from "../../../api/comment.js";
import { getCookie } from "../../../index.js";

/**
 * рендерит блок коммента
 * @param {Node} parent
 * @param {string} filmId
 * @return {html}
 */
export async function renderCommentsBlock(parent, filmId) {
  const uuid =
    getCookie("user_uuid") != undefined ? getCookie("user_uuid") : null;
  const [comments] = await Promise.all([getCommentData(filmId)]);
  parent.innerHTML = commentsListTemplate();
  const addCommentButton = parent.querySelector("#add-comment");
  addCommentButton.addEventListener("click", (e) => {
    e.preventDefault();
    renderCommentForm(parent, uuid, filmId);
  });
  const mainSection = parent.querySelector(".comments-block__main");

  if (!comments) {
    mainSection.insertAdjacentHTML("beforeend", "Отзывов еще нет");
  }
  comments.forEach((comment) => {
    mainSection.insertAdjacentHTML("beforeend", renderCommentElement(comment));
    if (comment.authorUuid == uuid) {
      const deleteButton = document.createElement("span");
      deleteButton.innerText = "Удалить";
      const htmlComments = parent.querySelectorAll(".comment-element");
      htmlComments[htmlComments.length - 1].appendChild(deleteButton);
      addCommentButton.classList.add("accent-button__inactive");
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        deleteComment({ authorUuid: uuid, filmUuid: filmId });
        htmlComments[htmlComments.length - 1].style.opacity = "0.5";
        showNotification("Отзыв успешно удален", "success");
        setTimeout(async () => {
          renderCommentsBlock(parent, filmId);
        }, 50);
      });
    }
  });
}

/**
 * Меняет стили для вытавления оценки
 * @param {Number} starCount
 */
function rate(starCount) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    if (index < starCount) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

/**
 * рендерит форму добавления коммента
 * @param {Node} parent
 * @param {string} userUuid
 * @param {string} filmId
 * @return {html}
 */
export async function renderCommentForm(parent, userUuid, filmId) {
  parent.innerHTML = addCommentTemplate();
  const stars = parent.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      rate(index + 1);
    });
  });

  const exitButton = parent.querySelector("#return-button");
  exitButton.addEventListener("click", (e) => {
    e.preventDefault();
    renderCommentsBlock(parent, filmId);
  });

  const submitButton = parent.querySelector(".accent-button");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const rateData = parent.querySelectorAll(".star.active").length;
    const commentData = parent
      .querySelector(".add-comment-form__textarea")
      .value.replace(/[\r\n\s]+/g, " ");
    if (rateData === 0) {
      showNotification("Оценка не может быть пустой", "danger");
      return;
    }

    if (userUuid === undefined) {
      showNotification("Для этого нужно быть авторизованным", "danger");
      return;
    }

    if (commentData.length > 100) {
      showNotification("Отзыв не должен превышать 100 символов", "danger");
      return;
    }
    console.log(commentData);
    sendComment({
      authorUuid: userUuid,
      filmUuid: filmId,
      score: rateData,
      text: commentData,
    });
    showNotification("Отзыв успешно добавлен", "success");
    setTimeout(async () => {
      renderCommentsBlock(parent, filmId);
    }, 50);
  });
}
