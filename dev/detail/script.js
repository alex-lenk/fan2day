import clickBuy from "../functions/js-buy";
import {goTo} from "../functions/goTo";

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

var $html = $('html, body');

/*Функция смены активного класса при клике*/
function changeActive(els, active) {
  els.click(function (e) {
    els.removeClass(active);
    $(this).addClass(active);
  });
}

function openListMap() {
  var activeClass = 'mod-active';
  var $pickup = $('.js-pickup');
  var $pickupMap = $('.js-pickup-map');
  var $shop = $('.js-shop');
  var $shopMap = $('.js-shop-map');
  var $shopList = $('.js-shop-list');
  var $shopContent = $('.js-shop-content');

  /*Открытие/скрытие карты*/
  $pickup.click(function (e) {
    e.preventDefault();
    $pickupMap.toggleClass(activeClass);
    if ($pickupMap.hasClass(activeClass)) {
      $pickup.text('Скрыть карту');
    } else {
      $pickup.text('Посмотреть на карте');
    }
  });
  /*Открытие/скрытие карты*/
  $shop.click(function (e) {
    e.preventDefault();
    $shopContent.removeClass(activeClass);
    $shopMap.toggleClass(activeClass);
    if ($shopMap.hasClass(activeClass)) {
      $shop.text('Скрыть карту');
    } else {
      $shop.text('Посмотреть на карте');
    }
  });
  /*Открытие/скрытие списка*/
  $shopList.click(function (e) {
    e.preventDefault();
    $shopMap.removeClass(activeClass);
    $shopContent.toggleClass(activeClass);
    if ($shopContent.hasClass(activeClass)) {
      $shopList.text('Скрыть список');
    } else {
      $shopList.text('Списком');
    }
  });
}


function initTopSlider() {
  $('.js-slider-item').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '.js-arrow-nav-left',
    nextArrow: '.js-arrow-nav-right',
    variableWidth: true,
    centerMode: true,
    swipe: false,
    asNavFor: '.js-slider-nav',
    settings: 'setPosition',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: '.js-arrow-left',
          nextArrow: '.js-arrow-right',
          variableWidth: true,
          centerMode: true,
          swipe: true
        }
      },
      {
        breakpoint: 575,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: '.js-arrow-left',
          nextArrow: '.js-arrow-right',
          variableWidth: true,
          centerMode: true,
          swipe: true
        }
      }
    ]
  });

  $('.js-slider-nav').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.js-slider-item',
    focusOnSelect: true,
    swipe: false,
    responsive: [
      {
        breakpoint: 992,
        settings: 'unslick'
      }
    ]
  });

  delArrows();
  $('.js-slider-nav').on('init', function (event, slick, direction) {
    delArrows();
  });

  function delArrows() {
    if ($(window).innerWidth() > 992) {
      $('.js-arrow-nav-left').removeClass('slick-hidden');
      $('.js-arrow-nav-right').removeClass('slick-hidden');
    }
  }
}

function initPopupSlider() {

  var lengthNav = $('.js-popup-item .detail__slide').length;
  var nav = lengthNav <= 4 ? '' : '.js-popup-nav';
  var arrows = $('.js-arrow-slick-left, .js-arrow-slick-right');

  $('.js-popup-item').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '.js-arrow-slick-left',
    nextArrow: '.js-arrow-slick-right',
    variableWidth: true,
    centerMode: true,
    swipe: false,
    asNavFor: nav,
    settings: 'setPosition',
    lazyLoad: 'ondemand',
    speed: 500,
    fade: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: '.js-arrow-slick-left',
          nextArrow: '.js-arrow-slick-right',
          variableWidth: true,
          centerMode: true,
          swipe: true,
          asNavFor: false,
          settings: 'setPosition',
          lazyLoad: 'ondemand',
          speed: 500,
          fade: true,
          cssEase: 'linear',
          dots: true
        }
      }
    ]
  });
  arrows.css('display', 'flex');
  $('.js-popup-nav').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.js-popup-item',
    focusOnSelect: true,
    swipe: false,
    variableWidth: true
  });
  if (lengthNav === 3) {
    $('.js-popup-nav').css('max-width', '216px');
  } else if (lengthNav === 2) {
    $('.js-popup-nav').css('max-width', '146px');
  }

  $('.js-popup-item').on('afterChange', function () {
    watchActiveSlide();
  });
}

function watchActiveSlide() {
  var lengthNav = $('.js-popup-item .detail__slide').length;

  if (lengthNav <= 4) {
    $('.js-popup-item .detail__slide').each(function (i, item) {
      if ($(item).hasClass('slick-current')) {
        $('.js-popup-nav .detail__slide-nav').each(function (j, nav) {
          $(nav).removeClass('slick-current');
          if ($(item).data('slick-index') === $(nav).data('slick-index')) {
            $(nav).addClass('slick-current');
          }
        });
      }
    });
  }

}

/*zoom popup slick*/
function openPopupSlick() {

  var popupSlick = $('.js-popup-item');
  var addVideo = $('.js-add-video');
  var videoSlick = $('.js-video');
  var addPopupVideo = $('.js-add-popup-video');

  var activeClassVideo = 'video-on';

  function showVideo() {
    popupSlick.hide();
    videoSlick.show();
    addVideo.addClass(activeClassVideo);
  }

  function hideVideo() {
    popupSlick.show();
    videoSlick.hide();
    addVideo.removeClass(activeClassVideo);
  }

  $('.js-open-popup .slick-list').click(function (e) {
    $('#buy-zoom-modal').modal('show');
    var index = $(e.target).data('slick-index');
    if ($('.js-popup-item').hasClass('slick-initialized')) {
      hideVideo();
      $('.js-popup-item').slick('slickGoTo', index, true);
    }
  });
  addPopupVideo.click(function () {
    $('#buy-zoom-modal').modal('show');
    showVideo();
  });
  $('.js-close-slick').click(function () {
    $('#buy-zoom-modal').modal('hide');
    $('#buy-zoom-modal').on('hide.bs.modal', function (e) {
      if (addVideo.hasClass(activeClassVideo)) {
        hideVideo();
      }
    });
  });
  addVideo.click(function () {
    if ($(this).hasClass(activeClassVideo)) {
      hideVideo();
      player.pauseVideo();
    } else {
      showVideo();
    }
  });
  $('.js-hide-video').click(function () {
    if (addVideo.hasClass(activeClassVideo)) {
      hideVideo();
      player.pauseVideo();
    }
  });
}

/*Функция скролла к контенту в табе и активация таба*/
function scrollToTabs(clickEl, tabSelect, gotoEl) {
  clickEl.click(function (e) {
    e.preventDefault();
    goTo(gotoEl);
    $(tabSelect).click();
  });
}

function initDealsSlides(el) {
  el.not('.slick-initialized').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: '.js-arrow-deals-left',
    nextArrow: '.js-arrow-deals-right',
    swipe: false,
    responsive: [
      {
        breakpoint: 991,
        settings: 'unslick'
      }
    ]
  });
}

function initRecommendedSlides(el) {
  el.not('.slick-initialized').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: '.js-arrow-recommended-right',
    prevArrow: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 1245,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          nextArrow: '.js-arrow-recommended-right',
          prevArrow: false,
          swipe: false,
        }
      }
    ]
  });
}

function watchRetailBlock(target) {
  var config = {
    childList: true,
    subtree: true
  };
  
  var callback = function (mutationsList, observer) {
    clickBuy();
    if ($(window).innerWidth() >= 1100) {
      for (let mutation of mutationsList) {
        mutation.addedNodes.forEach(function (item, i) {
          if ($(item).hasClass('container')) {
            initRecommendedSlides($(item).find('.js-recommended'));
            initDealsSlides($(item).find('.js-deals'));
            whatchObj.disconnect();
          }
        });
      }
    } else {
      $('.js-recommend-mobile .row').removeClass('row').css({'padding-bottom': '1px'});
      $('.js-recommended, .js-deals').append('<span>&nbsp;</span>');
      for (let mutation of mutationsList) {
        mutation.addedNodes.forEach(function (item, i) {
          if ($(item).hasClass('container')) {
            whatchObj.disconnect();
          }
        });
      }
    }
  };
  
  var whatchObj = new MutationObserver(callback);
  whatchObj.observe(target, config);
}

$(document).ready(function () {
  var $gotoDelivery = $('.js-goto-delivery');
  var $targetDelivery = $('.js-fromto-delivery');
  var $gotoDetail = $('.js-goto-detail');

  /*Едем к нужному табу*/
  scrollToTabs($gotoDelivery, '#pdp-tab-shipping', $targetDelivery);
  scrollToTabs($gotoDetail, '#pdp-tab-specifications', $targetDelivery);

  openListMap();

  $('.js-buy-oneclick').click(function () {
    $('#buy-onecklick-modal').modal('show');
  });

  //Маска купить в 1 клик
  $('#detail-modal-phone').inputmask({
    mask: "+7 (999) 999-9999"
  });
  $('#detail-modal-email').inputmask("email");

  var activeBtn = 'mod-click-active';
  var activeColor = 'mod-colors-active';
  var $colors = $('.js-change-color');
  var $sizes = $('.js-change-size');

  changeActive($colors, activeColor);
  changeActive($sizes, activeBtn);

  initTopSlider();

  window.initSlider = initRecommendedSlides;

  $(document).on('click', $gotoDelivery, function () {
    scrollToTabs($('.js-goto-delivery'), '#pdp-tab-shipping', $('.js-fromto-delivery'));
  });

  $('.js-close-modal').click(function (e) {
    e.preventDefault();
    $('#buy-modal').modal('hide');
    $('#buy-onecklick-modal').modal('hide');
  });

  $(document).on("click", ".js-change-color", function (e) {
    var id = $(e.target).data('id');

    var purpose = $(this).data('target');
    $('.buy-item').attr('action', $('.buy-link#' + purpose).val());

    redrawOurStoresMap(id);
  });

  $(".js-oneclick").on("click", function () {
    var phone = $('input[name="oneclick_phone"]').val(),
      email = $('input[name="oneclick_email"]').val(),
      region = $('.js-point-city:first').text(),
      productPrice = $("#oneclick_user_price").val();
    
    if (phone && email) {
      $('.js-valid-oneclick').removeClass('input-error');
      $.ajax({
        type: "POST",
        url: "/local/components/mi/el.catalog.element/email.php",
        data: "phone=" + phone + "&email=" + email + "&oneclick_product_id=" + $('#oneclick_product_id').val() + "&oneclick_user_price=" + productPrice + '&region=' + region,
        success: function (msg) {
          location.href = '/ru/personal/buy-one-click/request.php?request=' + msg;
        }
      });
    } else {
      $('.js-valid-oneclick').addClass('input-error');
    }
    return false;
  });

  var target = $(window).innerWidth() >= 1100
    ? $('.js-recommend-desktop')
    : $('.js-recommend-mobile');
  
  target.each((i, item) => {
    watchRetailBlock(item);
  });

  openPopupSlick();

  if ($('.js-popup-item .detail__slide').length > 1) {
    initPopupSlider();
  }

  $('#buy-modal').on('hidden.bs.modal', function () {
    if ($('#buy-zoom-modal.show').length > 0) {
      $(document.body).addClass('modal-open').css('padding-right', '16px');
    }
  });

  $('#buy-zoom-modal').on('hide.bs.modal', function (e) {
    if ($('.js-add-video').length > 0) {
      player.pauseVideo();
    }
  });

  /*TOAST*/
  window.showToast = function() {
    $('.toast-custom').toast('show');
  };
  window.hideToast = function() {
    $('.toast-custom').toast('hide');
  };
  /*TOASTEND*/

  if ($('.js__delivery-available').length == 0 && $('.js__pickpoint-available').length == 0) {
    $('.js-shop-content').addClass('mod-active');
    $('.js-shop-list').text('Скрыть список');
  }
});
