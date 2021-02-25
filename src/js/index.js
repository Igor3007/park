import "./import/modules";
import "./import/components";
import svgPolyfill from "../../node_modules/svg4everybody/dist/svg4everybody.js";
import Swiper, {
    Pagination,
    Navigation,
    Thumbs,
    Autoplay,
} from 'swiper';
svgPolyfill();

import $ from 'jquery';
import './import/jquery.fancybox.min';
import './import/list.js'; 

$(document).ready(function() {
    $(document).on('click','.header__phones-btn', function(event){
        $('.header__phones').toggleClass('open')
    })

    $(document).on('click', function (e){  
        var div = $(".header__phones ul, .header__phones-btn");   
        if (!div.is(e.target) && div.has(e.target).length === 0) {  
                $(".header__phones").removeClass('open');  
        }
      });

    //   $(document).on('scroll', function (e){  
    //     $(".header__phones").removeClass('open');
    //   });

    /* tabs in basket */

  if(document.querySelector('[data-tabs=catalog]')){
    var tabsDelivery = tabs({
        el: '[data-tabs=catalog]',
        tabNavigationLinks: '.tab-link',
        tabContentContainers: '.tab-content'
    }).init();

    $('.hamburger').on('click', function(){
      $(this).toggleClass('open')
      $('.mobile-menu').toggleClass('open')
      $('html').toggleClass('hidden')
    });

    $('.mobile-menu__close svg').on('click', function(){
      $('.hamburger').toggleClass('open')
      $('.mobile-menu').toggleClass('open')
      $('html').toggleClass('hidden')
    });

  


  //закрыть при клике вне

  $(document).on('click', function (e) {
      var div = $(".hamburger, .mobile-menu");  //класс элемента вне которого клик
      if (!div.is(e.target) && div.has(e.target).length === 0) {
          //закрыть popup
          if($('.hamburger').hasClass('open')){
              $('.hamburger').trigger('click')
          }
          
      }
  });
}

});

Swiper.use([Pagination, Navigation, Thumbs, Autoplay]);
/* design banner */


var swiper = new Swiper('.section-gallery__swiper .swiper-container', {

  slidesPerView: 1.9,
  spaceBetween: 30,
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1.2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 1.9,
    },
  }

});

var swiper2 = new Swiper('.infr-slider-main .swiper-container', {

  slidesPerView: 1,
  spaceBetween: 40,
  navigation: {
    nextEl: '.infr-slider-next',
    prevEl: '.infr-slider-prev',
  },

});

var swiper3 = new Swiper('.team-slider-main .swiper-container', {

  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.team-slider-next',
    prevEl: '.team-slider-prev',
  },

});

ymaps.ready(function () {
  var myMap = new ymaps.Map('map-container', {
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: []
      }, {
        suppressMapOpenBlock: true
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: '/img/svg/ic_pen.svg',
          // Размеры метки.
          iconImageSize: [60, 60],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-30, -30]
      }),

      myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
          hintContent: 'Собственный значок метки с контентом',
          balloonContent: 'А эта — новогодняя',
          iconContent: '12'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: 'images/ball.png',
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -24],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [15, 15],
          // Макет содержимого.
          iconContentLayout: MyIconContentLayout
      });

  myMap.geoObjects
      .add(myPlacemark)
      .add(myPlacemarkWithContent);
});