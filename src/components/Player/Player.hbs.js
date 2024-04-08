export const playerTemplate = `<div class="player-container show-controls">
    <div class="wrapper">
        <div class="video-timeline">
            <div class="progress-area">
                <span>00:00</span>
                <div class="progress-bar"></div>
            </div>
        </div>
        <ul class="video-controls">
            <li class="options left">
                <button class="volume">
                    <img src="../../img/icons/sound-max.svg" alt="Громкость">
                </button>
                <input class="volume-range" type="range" min="0" max="1" step="any">
                <div class="video-timer">
                    <p class="current-time">00:00</p>
                    <p class="separator"> / </p>
                    <p class="video-duration">00:00</p>
                </div>
            </li>
            <li class="options center">
                <button class="skip-backward">
                    <img src="../../img/icons/next.svg" class="backward" alt="Вперед">
                </button>
                <button class="play-pause">
                    <img src="../../img/icons/play.svg" alt="Пауза">
                </button>
                <button class="skip-forward">
                    <img src="../../img/icons/next.svg" alt="Назад">
                </button>
            </li>
            <li class="options right">
                <div class="playback-content">
                    <button class="playback-speed">
                        <span class="material-symbols-rounded">
                            <img src="../../img/icons/speed.svg" class="speed-img" alt="Скорость воспроизведения">
                        </span>
                    </button>
                    <ul class="speed-options">
                        <li data-speed="2">2x</li>
                        <li data-speed="1.5">1.5x</li>
                        <li data-speed="1" class="active">Обычная</li>
                        <li data-speed="0.75">0.75x</li>
                        <li data-speed="0.5">0.5x</li>
                    </ul>
                </div>
                <button class="pic-in-pic">
                    <span class="material-icons">
                        <img src="../../img/icons/pict-in-alt.svg" alt="Окно в окне">
                    </span>
                </button>
                <button class="fullscreen">
                    <img src="../../img/icons/fullscreen.svg" alt="Полный экран">
                </button>
            </li>
        </ul>
    </div>
    <video>
        <source src="{{this.src}}">
    </video>
</div>`;