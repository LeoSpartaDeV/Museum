'use strict';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

let swiperInstance = null;
const menuLink = document.querySelector('.header__menu');
const closeBtn = document.querySelector('.menu__close');

menuLink.addEventListener('click', () => {
  document.body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', () => {
  document.body.classList.remove('no-scroll');
});

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
