import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', runPromises);

// ==============================================

function runPromises(evt) {
  evt.preventDefault();
  evt.target.button.disabled = true;
  let firstDelay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  if (amount < 1) {
    Notify.failure(`Select more then 0`);
    return;
  }
  setTimeout(getPromise, firstDelay, firstDelay, step, amount);
}
let currentPosition = 0;

function getPromise(firstDelay, step, amount) {
  currentPosition += 1;
  createPromise(currentPosition, firstDelay).then(resolveFn).catch(rejectFn);
  firstDelay += step;
  const timeout = setTimeout(getPromise, step, firstDelay, step, amount);
  if (currentPosition >= amount) {
    clearTimeout(timeout);
    currentPosition = 0;
    form.button.disabled = false;
  }
}

// ================================================

// function runPromises(evt) {
//   evt.preventDefault();
//   let firstDelay = Number(form.delay.value);
//   const step = Number(form.step.value);
//   const amount = Number(form.amount.value);
//   let currentPosition = 0;
//   if (amount < 1) {
//     Notify.failure(`Select more then 0`);
//     return;
//   }
//   setTimeout(() => {
//     currentPosition += 1;
//     createPromise(currentPosition, firstDelay).then(resolveFn).catch(rejectFn);

//     if (currentPosition >= amount) {
//       return;
//     }

//     const interval = setInterval(() => {
//       currentPosition += 1;
//       firstDelay += step;
//       createPromise(currentPosition, firstDelay)
//         .then(resolveFn)
//         .catch(rejectFn);
//       if (currentPosition >= amount) {
//         clearInterval(interval);
//       }
//     }, step);
//   }, firstDelay);
// }

// ================================================

function resolveFn({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function rejectFn({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
