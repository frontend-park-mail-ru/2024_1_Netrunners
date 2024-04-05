import {formatTime} from '../../utils/timeConvert.js';

export async function renderPlayer(src) {
  const source = src || `https://storage.yandexcloud.net/netrunnerflixfilms/Rick%20Roll.ia.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEx_dBaNxFz-NnBFUiED4e/20240402/ru-central1/s3/aws4_request&X-Amz-Date=20240402T114642Z&X-Amz-Expires=2592000&X-Amz-Signature=042A5262889F5AAB6B5CEBEC1B6D6408809DEBA8B5C7A4E6A972D3C8BE078D35&X-Amz-SignedHeaders=host`;
  const video = { src: source };
  const template = Handlebars.templates['Player.hbs'];

  document.getElementById('root').innerHTML = template(video);
  const container = document.querySelector('.player-container');
  const mainVideo = container.querySelector('video');
  const progressBar = container.querySelector('.progress-bar');
  const videoTimeline = container.querySelector('.video-timeline');
  const volumeBtn = container.querySelector('.volume img');
  const volumeSlider = container.querySelector('.left input');
  const currentVideoTime = container.querySelector('.current-time');
  const videoDuration = container.querySelector('.video-duration');
  const nextSeries = container.querySelector('.skip-forward img');
  const previousSeries = container.querySelector('.skip-backward img');
  const playPauseBtn = container.querySelector('.play-pause img');
  const speedBtn = container.querySelector('.playback-speed span');
  const speedOptions = container.querySelector('.speed-options');
  const pinInPicBtn = container.querySelector('.pic-in-pic span');
  const fullscreenBtn = container.querySelector('.fullscreen img');

  let timer;
  const hideControls = () => {
    if (mainVideo.paused) return;
    timer = setTimeout(() => {
      container.classList.add('no-cursor');
      container.classList.remove('show-controls');
    }, 1000);
  };
  hideControls();

  container.addEventListener('mousemove', () => {
    container.classList.remove('no-cursor');
    container.classList.add('show-controls');
    clearTimeout(timer);
    hideControls();
  });

  mainVideo.addEventListener('timeupdate', (e) => {
    const {currentTime, duration} = e.target;
    const percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVideoTime.innerText = formatTime(currentTime);
  });

  mainVideo.addEventListener('loadeddata', (e) => {
    videoDuration.innerText = formatTime(e.target.duration);
  });

  videoTimeline.addEventListener('click', (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  });

  const draggableProgressBar = (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVideoTime.innerText = formatTime(mainVideo.currentTime);
  };

  videoTimeline.addEventListener('mousedown', () => {
    videoTimeline.addEventListener('mousemove', draggableProgressBar);
  });

  container.addEventListener('mouseup', () => {
    videoTimeline.removeEventListener('mousemove', draggableProgressBar);
  });

  videoTimeline.addEventListener('mousemove', (e) => {
    const progressTime = videoTimeline.querySelector('span');
    const offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    const timelineWidth = videoTimeline.clientWidth;
    const percent = (e.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(percent);
  });

  volumeBtn.addEventListener('click', () => {
    if (volumeBtn.src.includes('sound-max.svg')) {
      mainVideo.volume = 0;
      volumeBtn.src = '../../img/icons/no-sound.svg';
    } else {
      mainVideo.volume = 0.5;
      volumeBtn.src = '../../img/icons/sound-max.svg';
    }
    volumeSlider.value = mainVideo.volume;
  });

  volumeSlider.addEventListener('input', (e) => {
    const volumeValue = parseFloat(e.target.value);
    mainVideo.volume = volumeValue;

    volumeBtn.src = volumeValue === 0 ? '../../img/icons/no-sound.svg' : '../../img/icons/sound-max.svg';
  });


  speedOptions.querySelectorAll('li').forEach((option) => {
    option.addEventListener('click', () => {
      mainVideo.playbackRate = parseFloat(option.dataset.speed);
      speedOptions.querySelector('.active').classList.remove('active');
      option.classList.add('active');
    });
  });

  speedBtn.addEventListener('click', () => {
    speedOptions.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'VIDEO') {
      mainVideo.paused ? mainVideo.play() : mainVideo.pause();
    }
    if (e.target.tagName !== 'IMG' || e.target.className !== 'speed-img') {
      speedOptions.classList.remove('show');
    }
  });

  pinInPicBtn.addEventListener('click', () => {
    mainVideo.requestPictureInPicture();
  });

  fullscreenBtn.addEventListener('click', () => {
    container.classList.toggle('fullscreen');
    if (document.fullscreenElement) {
      fullscreenBtn.src = '../../img/icons/fullscreen.svg';
      return document.exitFullscreen();
    }
    fullscreenBtn.src = '../../img/icons/fullscreen-exit.svg';
    container.requestFullscreen();
  });

  previousSeries.addEventListener('click', () => {
    //TODO переход на предыдущую серию, если это сериал
  });

  nextSeries.addEventListener('click', () => {
    //TODO переход на следующую серию, если это сериал
  });

  playPauseBtn.addEventListener('click', () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
  });

  mainVideo.addEventListener('play', () => {
    playPauseBtn.src = '../../img/icons/pause.svg';
  });

  mainVideo.addEventListener('pause', () => {
    playPauseBtn.src = '../../img/icons/play.svg';
  });
}
