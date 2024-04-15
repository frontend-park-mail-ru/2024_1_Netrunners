const Handlebars = require("handlebars/runtime");

const MAX_STARS = 5;
const FULL_STAR_IMG = '<img class="films-section__star" src="/icons/star-full.svg" alt="">';
const HALF_STAR_IMG = '<img class="films-section__star" src="/icons/star-half.svg" alt="">';
const NONE_STAR_IMG = '<img class="films-section__star" src="/icons/star-none.svg" alt="">';

Handlebars.registerHelper("stars", function (averageScore) {
  averageScore = 4.4;
  const roundedScore = Math.floor(averageScore);
  const remainder = averageScore - roundedScore;
  const starsHTML = renderStarsRating(roundedScore, remainder);
  return new Handlebars.SafeString(starsHTML);
});

function renderStarsRating(roundedScore, remainder) {
  let starsHTML = "";
  for (let i = 0; i < MAX_STARS; i++) {
    if (i < roundedScore) {
      starsHTML += FULL_STAR_IMG;
    } else if (i === roundedScore && remainder >= 0.5) {
      starsHTML += HALF_STAR_IMG;
    } else {
      starsHTML += NONE_STAR_IMG;
    }
  }
  return starsHTML;
}

module.exports = Handlebars;
