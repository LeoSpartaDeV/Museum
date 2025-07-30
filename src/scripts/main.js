'use strict';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

let swiperInstance = null;

const menu = document.querySelector('.menu');
const menuLink = document.querySelector('.header__menu');
const closeBtn = document.querySelector('.menu__close');
const backdrop = document.querySelector('.menu__bg');

// Відкриття меню
menuLink.addEventListener('click', (e) => {
  e.preventDefault(); // Запобігаємо переходу за посиланням, якщо <a>
  menu.classList.add('menu--open');
  document.body.classList.add('no-scroll');
});

// Закриття меню по кнопці
closeBtn.addEventListener('click', () => {
  menu.classList.remove('menu--open');
  document.body.classList.remove('no-scroll');
});

// Закриття меню при кліку на затемнення
if (backdrop) {
  backdrop.addEventListener('click', () => {
    menu.classList.remove('menu--open');
    document.body.classList.remove('no-scroll');
  });
}

// Обробка форми (залишив як було)
document
  .querySelector('.contact__form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    this.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

// Ініціалізація слайдера
function initSwiper() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1280) {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    return;
  }

  if (!swiperInstance) {
    swiperInstance = new Swiper('.gallery__slider', {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    });
  }
}

// Функція throttle для оптимізації resize
function throttle(func, delay) {
  let lastCall = 0;

  return function(...args) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

const throttledSwiper = throttle(initSwiper, 200);

window.addEventListener('load', initSwiper);
window.addEventListener('resize', throttledSwiper);
