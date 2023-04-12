// Menu burger

const menu = document.querySelector('.navigation');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', openMenu);

function openMenu() {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
}