var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

export default function topSlider() {
  var $menuLink = $('.menu-link'),
    $topSlider = $('.top-slider');

  function getSliderSettings() {
    return {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>',
      dots: true,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500
    }
  }

  if ($topSlider.length > 0) {
    if (!(isMobile.any())) {
      $topSlider.slick(getSliderSettings()).on('afterChange', function (event, slick, currentSlide) {
        $menuLink.css('color', $('.slick-list .slick-slide').eq(currentSlide + 1).find('.slide-info').css('color'));
      });

      $menuLink.css('color', $('.slick-active .slide-info').css('color'));
    } else {
      $topSlider.slick(getSliderSettings());
    }
  }

}