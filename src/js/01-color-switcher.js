const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', startSwicher);
stopBtn.addEventListener('click', stopSwicher);

let changeInterval;

function startSwicher(evt) {
  document.body.style.backgroundColor = getRandomHexColor();
  changeInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  evt.target.disabled = true;
  stopBtn.disabled = false;
}

function stopSwicher(evt) {
  clearInterval(changeInterval);
  evt.target.disabled = true;
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
