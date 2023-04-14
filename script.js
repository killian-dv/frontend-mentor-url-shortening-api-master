// Menu burger
const menu = document.querySelector('.navigation');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', openMenu);

function openMenu() {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
}

// Error message
const input = document.querySelector('.input');
const errorMessage = document.querySelector('.error-message');
const button = document.querySelector('.send');

button.addEventListener('click', () => {
  if (input.value.trim() === '') {
    input.style.border = 'hsl(0, 87%, 67%) solid 2px';
    input.classList.add('error');
    errorMessage.style.display = 'block';
    console.log('error');
  } else {
    input.style.border = '';
    errorMessage.style.display = '';
    input.classList.remove('error');
  }
});
