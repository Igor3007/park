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
import './import/touchswipe.js';


$(document).ready(function () {
  $(document).on('click', '.header__phones-btn', function (event) {
    $('.header__phones').toggleClass('open')
  })

  /* zoom image */

function zoomImage (){
  this.scale = 1,
  this.scaleMax = 2.5,
  this.scaleMin = 1,
  this.axisX = 0,
  this.axisY = 0,

  this.zoomInc = function() {
    if ( this.scale < this.scaleMax) this.scale = this.scale + 0.25
    this.zoomRender()
  }

  this.zoomDec = function() {
    if ( this.scale > this.scaleMin) this.scale = this.scale - 0.25
    this.zoomRender()
  }

  this.zoomRender = function(direction, distance) {

    if(!x) x = 0;
    if(!y) y = 0;

    if(direction == 'up')  this.axisX = this.axisX - distance
    if(direction == 'down')  this.axisX = this.axisX + distance
    if(direction == 'left')  this.axisY = this.axisY - distance
    if(direction == 'right')  this.axisY = this.axisY + distance

    var x = this.axisX;
    var y = this.axisY;

    $('.general-plan__image .bgimage').css({
      'transform': 'scale('+this.scale+') translateX('+y+'px) translateY('+x+'px)'
    })
  }
}

const zoom = new zoomImage();

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

  /* swipe left menu */
  $(".general-plan__image").swipe({
    //Generic swipe handler for all directions
    swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {

        // $elemMenu = $('.left-menu');
        // $elemMenuButton = $('.left-menu-buttons');

        // $widthMenu = $elemMenu.width();
        // $widthButton = $elemMenuButton.innerWidth();

        // $dist = Math.floor((distance / $widthMenu) * 100);
        // $dist = (100 - $dist);

        // if (fingerData[0].start.x < 60) {

        //     if (direction === 'right') {

        //         if ($dist !== 100 && !$elemMenu.hasClass('open')) {
        //             $elemMenu.css({
        //                 'transform': 'translateX(-' + $dist + '%) translateX(' + $widthButton + 'px)',
        //                 'z-index': '1000'
        //             })
        //         }

        //         if ($dist <= 60) {
        //             $elemMenu.removeAttr('style');
        //             mobileMenu.onOpen();
        //             return false;
        //         }

        //         if (phase === 'end') {
        //             if (!$dist <= 60) {
        //                 $elemMenu.removeAttr('style');
        //             }
        //         }
        //     }
        // }


        // if (direction === 'left') {
        //     mobileMenu.onClose();
        // }

      console.log(distance)
      console.log(direction)

      zoom.zoomRender(direction, distance)

    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold: 25,
    fingers: 'all',
    excludedElements: "label, button, input, select, textarea"
});



  
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