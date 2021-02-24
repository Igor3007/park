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
});

Swiper.use([Pagination, Navigation, Thumbs, Autoplay]);
/* design banner */


var swiper = new Swiper('.section-gallery__swiper .swiper-container', {

  slidesPerView: 2.2,
  spaceBetween: 30,
  centeredSlides: true,
  slidesPerGroupSkip: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

});

var swiper2 = new Swiper('.infr-slider-main .swiper-container', {

  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: '.infr-slider-next',
    prevEl: '.infr-slider-prev',
  },

});