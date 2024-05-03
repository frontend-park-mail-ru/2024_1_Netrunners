const icon = {
  success: '<img src="/icons/checkbox-circle.svg">',
  danger: '<img src="/icons/danger-zone.svg">',
};

export const showNotification = (message = "Sample Message", toastType) => {
  if (!Object.keys(icon).includes(toastType)) {
    toastType = "info";
  }

  const box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`);
  box.innerHTML += ` <div class="toast-content-wrapper"> 
                      <div class="toast-icon"> 
                      ${icon[toastType]} 
                      </div> 
                      <div class="toast-message">${message}</div> 
                      <div class="toast-progress"></div> 
                      </div>`;
  box.querySelector(".toast-progress").style.animationDuration = `${5}s`;
  const toastAlready = document.body.querySelector(".toast");

  if (toastAlready) {
    toastAlready.remove();
  }

  document.body.appendChild(box);

  setTimeout(() => {
    const toastAlready = document.body.querySelector(".toast");
    toastAlready.remove();
  }, 4000);
};
