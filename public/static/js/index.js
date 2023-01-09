const hamburger = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.nav__list');
const difficulties = document.querySelectorAll('.exercise-difficulty');

hamburger.addEventListener('click', function(){
  menu.classList.toggle('show');
});


