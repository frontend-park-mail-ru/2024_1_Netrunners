import { formatTime } from "../../utils/timeConvert.js";
import template from "./Player.hbs";
import * as images from "../../img/imgConstants.js";
import Router from "../../utils/router.js";

/**
 * Отображает интерфейс проигрывателя для указанного фильма.
 * @param {string} filmId - Идентификатор фильма, который проигрывается.
 * @param {string} filmTitle - Заголовок фильма, который проигрывается.
 * @param {string} source - URL источника видео.
 * @param {Array} series - все серии
 * @param {int} index - индекс серии
 * @return {void}
 */
export async function renderPlayer(
  filmId,
  filmTitle,
  source,
  series = null,
  index = 0,
) {
  series = [
    "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%281%20%D0%A1%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%282019%29.mp4",
    "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%282%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%232%20%282020%29.mp4",
    "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%283%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%282022%29.mp4",
    "https://daimnefilm.hb.ru-msk.vkcs.cloud/%D0%9F%D0%B0%D1%86%D0%B0%D0%BD%D1%8B%20%284%20%D1%81%D0%B5%D0%B7%D0%BE%D0%BD%29%20%E2%80%94%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D1%83%D0%B1%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9%20%D1%82%D1%80%D0%B5%D0%B9%D0%BB%D0%B5%D1%80%20%282024%29.mp4",
  ];
  const video = { src: source };

  document.querySelector("main").innerHTML = template(video);
  const exitButton = document.querySelector("#exit-player");
  const container = document.querySelector(".player-container");
  const mainVideo = container.querySelector("video");
  const progressBar = container.querySelector(
    ".player-container__progress-bar",
  );
  const videoTimeline = container.querySelector(
    ".player-container__video-timeline",
  );
  const volumeBtn = container.querySelector(".player-container__volume img");
  const volumeSlider = container.querySelector(".left input");
  const currentVideoTime = container.querySelector(
    ".player-container__current-time",
  );
  const videoDuration = container.querySelector(
    ".player-container__video-duration",
  );
  const nextSeries = container.querySelector(
    ".player-container__skip-forward img",
  );
  const previousSeries = container.querySelector(
    ".player-container__skip-backward img",
  );
  const playPauseBtn = container.querySelector(
    ".player-container__play-pause img",
  );
  const speedBtn = container.querySelector(
    ".player-container__playback-speed span",
  );
  const speedOptions = container.querySelector(
    ".player-container__speed-options",
  );
  const pinInPicBtn = container.querySelector(
    ".player-container__pic-in-pic span",
  );
  const fullscreenBtn = container.querySelector(
    ".player-container__fullscreen img",
  );

  mainVideo.play();
  let timer;
  const hideControls = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      );

    if ((isMobile && !mainVideo.paused) || (!isMobile && mainVideo.paused)) {
      return;
    }

    timer = setTimeout(() => {
      container.classList.add("no-cursor");
      exitButton.classList.remove("show-exit");
      container.classList.remove("show-controls");
    }, 1000);
  };

  hideControls();

  container.addEventListener("mousemove", () => {
    container.classList.remove("no-cursor");
    exitButton.classList.add("show-exit");
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();
  });

  mainVideo.addEventListener("timeupdate", (e) => {
    const { currentTime, duration } = e.target;
    const percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVideoTime.innerText = formatTime(currentTime);
  });

  mainVideo.addEventListener("loadeddata", (e) => {
    videoDuration.innerText = formatTime(e.target.duration);
  });

  videoTimeline.addEventListener("click", (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  });

  videoTimeline.addEventListener("touchstart", (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime =
      ((e.touches[0].pageX - e.touches[0].target.offsetLeft) / timelineWidth) *
      mainVideo.duration;
  });

  const draggableProgressBarMobile = (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.touches[0].pageX - e.touches[0].target.offsetLeft}px`;
    mainVideo.currentTime =
      ((e.touches[0].pageX - e.touches[0].target.offsetLeft) / timelineWidth) *
      mainVideo.duration;
    currentVideoTime.innerText = formatTime(mainVideo.currentTime);
  };

  const draggableProgressBar = (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVideoTime.innerText = formatTime(mainVideo.currentTime);
  };

  videoTimeline.addEventListener("mousedown", () => {
    videoTimeline.addEventListener("mousemove", draggableProgressBar);
  });

  videoTimeline.addEventListener("touchstart", () => {
    videoTimeline.addEventListener("touchmove", draggableProgressBarMobile);
  });

  container.addEventListener("mouseup", () => {
    videoTimeline.removeEventListener("mousemove", draggableProgressBar);
  });

  videoTimeline.addEventListener("touchend", () => {
    videoTimeline.addEventListener("touchmove", draggableProgressBarMobile);
  });

  videoTimeline.addEventListener("mousemove", (e) => {
    const progressTime = videoTimeline.querySelector("span");
    const offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
    progressTime.style.left = `${offsetX}px`;
    const timelineWidth = videoTimeline.clientWidth;
    const percent =
      ((e.touches[0].pageX - e.touches[0].target.offsetLeft) / timelineWidth) *
      mainVideo.duration;
    progressTime.innerText = formatTime(percent);
  });

  volumeBtn.addEventListener("click", () => {
    if (mainVideo.volume) {
      mainVideo.volume = 0;
      volumeBtn.src = images.NO_SOUND_IMG;
    } else {
      mainVideo.volume = 0.5;
      volumeBtn.src = images.SOUND_IMG;
    }
    volumeSlider.value = mainVideo.volume;
  });

  volumeSlider.addEventListener("input", (e) => {
    const volumeValue = parseFloat(e.target.value);
    mainVideo.volume = volumeValue;

    volumeBtn.src = volumeValue === 0 ? images.NO_SOUND_IMG : images.SOUND_IMG;
  });

  speedOptions.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      mainVideo.playbackRate = parseFloat(option.dataset.speed);
      speedOptions.querySelector(".active").classList.remove("active");
      option.classList.add("active");
    });
  });

  speedBtn.addEventListener("click", () => {
    speedOptions.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (e.target.tagName === "VIDEO") {
      mainVideo.paused ? mainVideo.play() : mainVideo.pause();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG" || e.target.className !== "speed-img") {
      speedOptions.classList.remove("show");
    }
  });

  pinInPicBtn.addEventListener("click", () => {
    mainVideo.requestPictureInPicture();
  });

  fullscreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
      fullscreenBtn.src = images.FULLSCREEN_IMG;
      return document.exitFullscreen();
    }
    fullscreenBtn.src = images.EXIT_FULLSCREEN_IMG;
    container.requestFullscreen();
  });

  previousSeries.addEventListener("click", () => {
    if (series && index !== 0) {
      index -= 1;
      renderPlayer(filmId, filmTitle, series[index], series, index--);
    }
  });

  nextSeries.addEventListener("click", () => {
    if (series && index !== series.length - 1) {
      index += 1;
      renderPlayer(filmId, filmTitle, series[index], series, index);
    }
  });

  playPauseBtn.addEventListener("click", () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
  });

  mainVideo.addEventListener("play", () => {
    playPauseBtn.src = images.PAUSE_IMG;
  });

  mainVideo.addEventListener("pause", () => {
    playPauseBtn.src = images.PLAY_IMG;
  });

  exitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    Router.goToFilmPage(filmId, filmTitle);
  });
}
