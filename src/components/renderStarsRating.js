const MAX_STARS = 5;
const FULL_STAR_IMG = '<img class="star" src="../../img/icons/star-full.svg" alt="">';
const HALF_STAR_IMG = '<img class="star" src="../../img/icons/star-half.svg" alt="">';
const NONE_STAR_IMG = '<img class="star" src="../../img/icons/star-none.svg" alt="">';

export const renderStarsRating = (roundedScore, remainder) => {
  let starsHTML = '';
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