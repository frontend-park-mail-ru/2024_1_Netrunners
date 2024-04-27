import template from "./statistics.hbs";
import {getStatistics} from "../../api/statistics.js";

/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {void}
 */
export async function renderStatistics() {

  const statisticsData = await getStatistics();

  document.querySelector("main").innerHTML = template(statisticsData);

//   let progressBars = document.querySelectorAll(".progress-bar");
//   let progressElements = document.querySelectorAll(".film-content-block__data-element");
//   let progressBarsDone = document.querySelectorAll('.statistics-container__progress-bar-done');
//
//   const progressValues = Array.from(progressElements);
//
//   const progressSumm = progressValues.reduce((acc, element) => {
//
//     return acc + parseFloat(element.innerText);
//   }, 0);
//
//   const liElements = document.querySelectorAll('.liElement');
//   console.log(liElements);
//   const sumArray = Array.from(liElements).map(li => {
//     const progressBarElements = li.querySelectorAll('.film-content-block__data-element');
//     console.log(progressBarElements);
//     const sum = Array.from(progressBarElements).reduce((acc, progressBar) => {
//       return acc + parseInt(progressBar.innerText);
//     }, 0);
//     return sum;
//   });
//
//   console.log(sumArray)
//
//   progressBarsDone.forEach((progressBar, index) => {
//     progressBar.style.width = progressValues[index].textContent / progressSumm;
//   })
 }
