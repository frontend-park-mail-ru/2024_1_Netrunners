import addCommentTemplate from './commentsBlockTemplates/addCommentForm.hbs'
import commentsListTemplate from './commentsBlockTemplates/commentsList.hbs'
import {renderCommentElement} from "../commentElement/commentElement";
import {showNotification} from "../../Notification/notification.js";
import {sendComment} from "../../../api/comment.js";
import * as authApi from "../../../api/auth";
import {getCookie} from "../../../index.js";

export async function renderCommentsBlock(parent, filmId){
    // const [comments] = await Promise.all([getCommentDat(filmId)]);
    parent.innerHTML = commentsListTemplate();
    const comments = [{login: 'Nikitos1', data: 'some text1'}, {login: 'Nikitos2', data: 'some text2'}, {login: 'Nikitos3', data: 'some text3'}]
    const mainSection = parent.querySelector('.comments-block__main');
    comments.forEach((comment) => {
        mainSection.insertAdjacentHTML("beforeend", renderCommentElement(comment));
    });

    const addCommentButton = parent.querySelector('#add-comment');

    const isAuthorized = await authApi.check();
    let uuid;
    if (isAuthorized) {
        uuid = getCookie("user_uuid");
    }

    // TODO ожидает реализации на беке
    // if (GetUserComment(uuid)){
    //      addCommentButton.classList.add("inactive");
    // }

    addCommentButton.addEventListener("click", (e) => {
        e.preventDefault();
        renderCommentForm(parent, uuid);
    })

}

function rate(starCount) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < starCount) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

export async function renderCommentForm(parent, uuid){
    parent.innerHTML = addCommentTemplate();
    const stars = parent.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            rate(index+1)
        })
    })

    const submitButton = parent.querySelector('.accent-button');
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const rateData = parent.querySelectorAll('.star.active').length;
        const commentData = parent.querySelector('.add-comment-form__textarea').value;
        if (rateData === 0){
            showNotification("Оценка не может быть пустой", "danger")
            return
        }

        if (uuid === undefined) {
            showNotification("Для этого нужно быть авторизованным", "danger");
            return
        }

        sendComment(uuid, {rating: rateData, text: commentData});
        showNotification("Отзыв успешно добавлен", "success")
        renderCommentsBlock(parent);
    })


}

