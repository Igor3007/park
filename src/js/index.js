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
import './import/dragscroll.js';


$(document).ready(function () {
  $(document).on('click', '.header__phones-btn', function (event) {
    $('.header__phones').toggleClass('open')
  })

  
  if($(window).width() < 580){
    $('.about-park__desc').append('<div class="more-desc" ><span>Весь текст</span></div>')
  }

  $(document).on('click', '.more-desc',  function(){
    $('.about-park__desc').toggleClass('open')
  })

  /* zoom image */

function zoomImage (){
  this.scale = 1,
  this.scaleMax = 5000,
  this.scaleMin = $('.general-plan__image .bgimage').width(),
  this.axisX = 0,
  this.axisY = 0,
  this.ch = 0.56, //отношение ширины r dscjnt
  this.mapWidth = $('.general-plan__image .bgimage').width(),
  this.mapHeight = this.mapWidth*this.ch

  this.init = function() {
    this.zoomRender();
  }

  this.zoomInc = function() {
    if ( this.mapWidth < this.scaleMax) this.mapWidth = this.mapWidth + (this.mapWidth*0.2)
    if ( this.mapWidth < this.scaleMax) this.mapHeight = this.mapHeight + (this.mapHeight*0.2)
    this.zoomRender()
  }

  this.zoomDec = function() {
    if ( this.mapWidth > this.scaleMin) this.mapWidth = this.mapWidth - (this.mapWidth*0.2)
    if ( this.mapWidth > this.scaleMin) this.mapHeight = this.mapHeight - (this.mapHeight*0.2)
    
    if(this.mapWidth < this.scaleMin){
      this.mapWidth = $('.general-plan__image').width()
      this.mapHeight = $('.general-plan__image').height()
    }
    this.zoomRender()

  }

  this.zoomRender = function(direction, distance, phase) {

    if(!x) x = 0;
    if(!y) y = 0;

    if(direction == 'up')  this.axisX =  distance
    if(direction == 'down')  this.axisX = distance
    if(direction == 'left')  this.axisY =  distance
    if(direction == 'right')  this.axisY = distance

    var x = this.axisX;
    var y = this.axisY;

    $('.general-plan__image .bgimage').css({
      width: this.mapWidth + 'px',
      height: this.mapHeight + 'px',
    })

  }
}

const zoom = new zoomImage();
zoom.init();

$(document).on('click', '.general-plan__zoom-inc', function(event){
  zoom.zoomInc()
})
$(document).on('click', '.general-plan__zoom-dec', function(event){
  zoom.zoomDec()
})

/* zoom image */

  $(document).on('click', function (e) {
    var div = $(".header__phones ul, .header__phones-btn");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      $(".header__phones").removeClass('open');
    }
  });

  //   $(document).on('scroll', function (e){  
  //     $(".header__phones").removeClass('open');
  //   });

  /* tabs in basket */

  if (document.querySelector('[data-tabs=catalog]')) {
    var tabsDelivery = tabs({
      el: '[data-tabs=catalog]',
      tabNavigationLinks: '.tab-link',
      tabContentContainers: '.tab-content'
    }).init();

    $('.hamburger').on('click', function () {
      $(this).toggleClass('open')
      $('.mobile-menu').toggleClass('open')
      $('html').toggleClass('hidden')
    });

    $('.mobile-menu__close svg').on('click', function () {
      $('.hamburger').toggleClass('open')
      $('.mobile-menu').toggleClass('open')
      $('html').toggleClass('hidden')
    });

    //закрыть при клике вне
    $(document).on('click', function (e) {
      var div = $(".hamburger, .mobile-menu"); //класс элемента вне которого клик
      if (!div.is(e.target) && div.has(e.target).length === 0) {
        //закрыть popup
        if ($('.hamburger').hasClass('open')) {
          $('.hamburger').trigger('click')
        }

      }
    });
  }

  $('[data-fancybox="catalog"]').fancybox({
    afterShow : function( instance, current ) {
      var galleryThumbs = new Swiper('.image-thumb', {
        spaceBetween: 15,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
      
      var galleryTop = new Swiper('.image-main', {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-dots',
          clickable: true,
        },
        thumbs: {
          swiper: galleryThumbs
        }
      });
    }
  });

  /* ууууууууууууу */
  
});

Swiper.use([Pagination, Navigation, Thumbs, Autoplay]);
/* design banner */

function updateFraction(slider) {
  const { params, activeIndex } = slider;

  slider.$el
    .find(`.${params.pagination.currentClass}`)
    .text(`${activeIndex + 1} - ${activeIndex + params.slidesPerView}`);

  slider.$el
    .find(`.${params.pagination.totalClass}`)
    .text(slider.slides.length);
}



var swiper = new Swiper('.section-gallery__swiper .swiper-container', {

  slidesPerView: 1.9,
  spaceBetween: 30,
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  navigation: {
    nextEl: '.gallery-nav__next',
    prevEl: '.gallery-nav__prev',
  },
  pagination: {
    el: '.gallery-nav__counter',
    type: 'fraction',
    clickable: true,
    renderFraction: (currentClass, totalClass) => `
      <span class="${currentClass}"></span> из
      <span class="${totalClass}"></span>`,
  },
  breakpoints: {
    0: {
      slidesPerView: 1.1,
      spaceBetween: 15,
    },
    580: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    940: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    1025: {
      slidesPerView: 1.9,
    },
  },
  on: {
    init() {
      setTimeout(updateFraction, 0, this);
    },
    slideChange() {
      updateFraction(this);
    },
    resize() {
      updateFraction(this);
    },
  },

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

  try {

    var point = mapSetting.mapPointCoordinats.split(',');

    var myMap = new ymaps.Map('map-container', {
        center: point,
        zoom: 10,
        controls: []
      }, {
        suppressMapOpenBlock: true
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(point, {
        hintContent: mapSetting.mapHintContent,
        balloonContent: mapSetting.mapBaloonContent
      }, {
        iconLayout: 'default#image',
        iconImageHref: '/img/svg/ic_pen.svg',
        iconImageSize: [60, 60],
        iconImageOffset: [-60, -30]
      });

    myMap.geoObjects.add(myPlacemark);
  } catch {

    console.error('Нет координат для карты');

  }


});