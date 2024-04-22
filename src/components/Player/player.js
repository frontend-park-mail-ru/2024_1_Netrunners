import { formatTime } from "../../utils/timeConvert.js";
import template from "./Player.hbs";
import * as images from "../../img/imgConstants.js";
import Router from "../../utils/router.js";

/**
 * Отображает интерфейс проигрывателя для указанного фильма.
 * @param {string} filmId - Идентификатор фильма, который проигрывается.
 * @param {string} filmTitle - Заголовок фильма, который проигрывается.
 * @param {string} source - URL источника видео.
 * @return {void}
 */
export async function renderPlayer(filmId, filmTitle, source) {
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
    if (mainVideo.paused) return;
    timer = setTimeout(() => {
      container.classList.add("no-cursor");
      container.classList.remove("show-controls");
    }, 1000);
  };
  hideControls();

  container.addEventListener("mousemove", () => {
    container.classList.remove("no-cursor");
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

  const draggableProgressBar = (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVideoTime.innerText = formatTime(mainVideo.currentTime);
  };

  videoTimeline.addEventListener("mousedown", () => {
    videoTimeline.addEventListener("mousemove", draggableProgressBar);
  });

  container.addEventListener("mouseup", () => {
    videoTimeline.removeEventListener("mousemove", draggableProgressBar);
  });

  videoTimeline.addEventListener("mousemove", (e) => {
    const progressTime = videoTimeline.querySelector("span");
    const offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    const timelineWidth = videoTimeline.clientWidth;
    const percent = (e.offsetX / timelineWidth) * mainVideo.duration;
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
    // TODO переход на предыдущую серию, если это сериал
  });

  nextSeries.addEventListener("click", () => {
    // TODO переход на следующую серию, если это сериал
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
