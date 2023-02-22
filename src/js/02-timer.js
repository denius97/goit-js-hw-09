import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtn = document.querySelector('button[data-start]');
const timerRef = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedValue;
let interval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() < 1000) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    selectedValue = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startTimer);

let dateNow;

function startTimer(evt) {
  dateNow = Date.now();
  if (selectedValue - dateNow < 1000) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  evt.target.disabled = true;
  document.getElementById('datetime-picker').disabled = true;
  setValues();
  interval = setInterval(setValues, 1000);
}

function setValues() {
  dateNow += 1000;
  const { days, hours, minutes, seconds } = convertMs(selectedValue - dateNow);
  timerRef.days.textContent = addLeadingZero(days);
  timerRef.hours.textContent = addLeadingZero(hours);
  timerRef.minutes.textContent = addLeadingZero(minutes);
  timerRef.seconds.textContent = addLeadingZero(seconds);

  if (selectedValue - dateNow < 1000) {
    clearInterval(interval);
    Notify.success('Bingo');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
