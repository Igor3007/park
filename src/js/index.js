import "./import/modules";
import "./import/components";

import Swiper, {
  Pagination,
  Navigation,
  Thumbs,
  Autoplay,
} from 'swiper';
import 'jquery.inputmask/dist/jquery.inputmask.bundle';

import $ from 'jquery';
import './import/jquery.fancybox.min';
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

    if($('.about-park__desc').hasClass('open')){
      $('.about-park__desc span').text('Свернуть')
    }else{
      $('.about-park__desc span').text('Весь текст')
    }

  })

  /* zoom image */

function zoomImage (){
  this.scale = 1,
  this.scaleMax = 5000,
  this.scaleMin = $('.general-plan__image .bgimage').width(),
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
      this.mapHeight = this.mapWidth*this.ch
    }
    this.zoomRender()

  }

  this.zoomRender = function(direction, distance, phase) {


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
      $('html').toggleClass('compensate-for-scrollbar')
    });

    $('.mobile-menu__close svg').on('click', function () {
      $('.hamburger').toggleClass('open')
      $('.mobile-menu').toggleClass('open')
      $('html').toggleClass('compensate-for-scrollbar')
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

    $('input[type="tel"]').inputmask({
      mask:"+9(999)-999-99-99",
      clearIncomplete: false
    });

    $('.mobile-menu__nav li a').on('click', function(event){
      if ($('.hamburger').hasClass('open')) {
        $('.hamburger').trigger('click')
      }
    })
  }


  $(document).on('click', '[data-modal=""]', function(){

    const elem = $(this);
     
    $.fancybox.open({
      src  : elem.data('src'),
      type : 'ajax',
      opts : {
        afterShow : function( instance, current ) {

          //init mask
          $('input[type="tel"]').inputmask({
            mask:"+9(999)-999-99-99",
            clearIncomplete: false
          });
    
          //close
          if ($('.hamburger').hasClass('open')) {
            $('.hamburger').trigger('click')
          }
        }
      }
    });
  })

  $('[data-fancybox="catalog"]').fancybox({
    touch: false,
    afterShow : function( instance, current ) {
      var galleryThumbs = new Swiper('.image-thumb', {
        spaceBetween: 15,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
      
      var galleryTop = new Swiper('.image-main', {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-nav-card__next',
          prevEl: '.swiper-nav-card__prev',
        },
        pagination: {
          el: '.swiper-dots',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 2,
        },
        thumbs: {
          swiper: galleryThumbs
        }
      });

      //init mask
      $('input[type="tel"]').inputmask({
        mask:"+9(999)-999-99-99",
        clearIncomplete: false
      });
    }
  });

 

  //скролл плавный
    $('a[href*="#"]').on('click', function() {

      var $page = $('html, body');
      var $heightHeader = $('.header-top').height();

        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top - $heightHeader
        }, 400);
        return false;
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

const imageCache = new function () {
	var me = this;

	var cache = [];
	var root = document.location.href.split("/");

	root.pop();
	root = root.join("/") + "/";

	me.push = function (src, loadEvent) {
		if (!src.match(/^http/)) {
			src = root + src;
		}

		var item = new Image();

		if (cache[src] && loadEvent) {
			loadEvent(src);
		} else {
			if (loadEvent) {
				item.onload = loadEvent;
				item.onerror = loadEvent;
			}
			cache[src] = item;
		}

		item.src = src;
	};

	me.pushArray = function (array, imageLoadEvent, imagesLoadEvent) {
		var numLoaded = 0;
		var arrayLength = array.length;
		for (var i = 0; i < arrayLength; i++) {
			me.push(array[i], function (e) {
				if (imageLoadEvent) {
					imageLoadEvent(e);
				}
				numLoaded++;
				if (numLoaded == arrayLength) {
					/* setTimeout(function() {
					  imagesLoadEvent(e);
					}, 1); */
				}
			});
		}
	};
}();

//imageCache.pushArray(array_img);

function CacheImgSlide() {

	let array = [];

	$('.team-slider-main').find('[data-image]').each(function () {
		array.push($(this).data('image'))
	})

	imageCache.pushArray(array);
}

function changeImage (image){
  
  $('.sales-team__image .bgimage').css({
      'background-image': 'url('+image+')'
  })

}

var swiper3 = new Swiper('.team-slider-main .swiper-container', {

  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.team-slider-next',
    prevEl: '.team-slider-prev',
  },

  on: {

		init: function (data) {
			const acttiveSlide = data.activeIndex;
			const circleBig = data.slides[acttiveSlide].dataset.image;

			changeImage(circleBig)
			CacheImgSlide()

		},

		slideChangeTransitionStart: function (data) {
			const acttiveSlide = data.activeIndex;
			const circleBig = data.slides[acttiveSlide].dataset.image;

			changeImage(circleBig)
			console.log(' change')

		},
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
        iconImageOffset: [-30, -60]
      });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.add('zoomControl');
    myMap.controls.add('fullscreenControl');

  } catch {

    console.error('Нет координат для карты');

  }


});