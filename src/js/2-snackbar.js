import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOutUp',
  close: true,
  closeOnEscape: true,
});

function showSuccess(message) {
  iziToast.show({
    title: 'OK',
    message,
    color: 'green',
    icon: 'ico-success',
    iconColor: '#fff',
  });
}

function showError(message) {
  iziToast.show({
    title: 'Error',
    message,
    color: 'red',
    icon: 'ico-error',
    iconColor: '#fff',
  });
}

function showWarning(message) {
  iziToast.show({
    title: 'Caution',
    message,
    color: 'orange',
    icon: 'ico-warning',
    iconColor: '#fff',
  });
}

function showInfo(message) {
  iziToast.show({
    title: 'Hello',
    message,
    color: 'blue',
    icon: 'ico-info',
    iconColor: '#fff',
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // 🔴 ВАЛІДАЦІЯ
  if (delay < 0) {
    showError('Delay cannot be negative');
    return;
  }

  if (delay === 0) {
    showWarning('Delay = 0 (instant execution)');
  }

  if (delay > 0 && delay < 1000) {
    showInfo('Small delay detected');
  }

  // ✅ ПРОМІС
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      console.log(`Fulfilled promise in ${delay}ms`);
      showSuccess(`Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      console.log(`Rejected promise in ${delay}ms`);
      showError(`Rejected promise in ${delay}ms`);
    });

  form.reset();
});
