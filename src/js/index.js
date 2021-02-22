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

const bannerDesign = new Swiper('.banner-swiper', { 
    autoplay: {
        delay: 5000,
      },
    pagination: {
        el: '.swiper-dots-progress',
        clickable: true,
        type: 'bullets',
        
        renderBullet: function (index, className) {

            console.log(this.params.autoplay.delay)

            return '<div class="' + className + '"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\
            <circle class="progress-bg" cx="9" cy="9" r="8" stroke="black" stroke-opacity="0.3" stroke-width="2"/>\
            <circle class="progress-bar" style="animation-duration: '+(this.params.autoplay.delay+500)+'ms;"  cx="9" cy="9" r="8" stroke="#fe3e77" stroke-width="2"/>\
            <circle class="progress-dot" cx="9" cy="9" r="5" /></circle></svg></div>';
        },
    },
     
});

const homeGallery = new Swiper('.gallery__list', { 
     
    pagination: {
        el: '.swiper-dots',
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: '.swiper-nav__next',
        prevEl: '.swiper-nav__prev',
      },

    slidesPerView: 1,
    spaceBetween: 14,
      
      breakpoints: {
        '@0.00': {
          slidesPerView: 1,
        },
        '@0.75': {
          slidesPerView: 2,
        },
        '@1.00': {
          slidesPerView: 3,
        },
        '@1.50': {
          slidesPerView: 4,
        },
      }
     
});