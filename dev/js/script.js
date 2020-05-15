import modal from "./partials/_modal";
import footer from "./partials/_footer";
import app from "./partials/_app";
import topSlider from "./partials/_mi.topSlider";

import clickBuy from "../functions/js-buy";
import {validRegister, validAuth} from "../functions/Validate";

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

//foreach polyfill
if ('NodeList' in window && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
//closest polyfill
(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
//matches polyfill
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

$(document).ready(function () {
  $('.header__country_list').clone().appendTo(".header__country");
  $('.nav-head__list').clone().appendTo("#dropdown-catalog");


topSlider();
app();
footer();
modal();


  /* Begin: Показ и скрытие панели поиска */

  var navSearch = $('.nav-search');

  $('.js-stick-search').click(function (e) {
    e.preventDefault();
    var dataSearch = $(e.target).closest('.header__login').attr('data-search');
    if (dataSearch === 'false') {
      $(e.target).closest('.header__login').attr('data-search', 'true');
    }
  });
  $('.js-stick-close').click(function (e) {
    e.preventDefault();
    var dataSearch = $(e.target).closest('.header__login').attr('data-search');
    if (dataSearch === 'true') {
      $(e.target).closest('.header__login').attr('data-search', 'false');
    }
  });

  /* header-country */
  $('.header__country').click(function () {
    $(this).toggleClass('header__country_opened');
    $(this).children('.header__country_list').toggle();
  });
  $(document).mouseup(function (e) {
    var div = $(".header__country");
    if (!div.is(e.target)
      && div.has(e.target).length === 0) {
      div.removeClass('header__country_opened');
    }
  });
  /* END header-country */

  /*mob search*/
  $('.js-mob-search').click(function () {
    $('.header__block-search').slideToggle(600);
  });
  $('.js-search-close').click(function () {
    $('.header__block-search').slideUp(600);
  });


  /*menu profile*/

  var $goToReg = $('.js-gotoreg'),
    $goToAuth = $('.js-gotoauth'),
    $elAuth = $('.js-auth-form'),
    $elReg = $('.js-register'),
    headerRegTitle = $('.header__reg-title'),
    activeClassAuth = 'active-auth',
    activeFormAuth = 'reg-form-active';


  $goToReg.click(function () {
    $elReg.addClass(activeFormAuth);
    $elAuth.removeClass(activeFormAuth);
    headerRegTitle.text('Регистрация');
    validRegister.initValidate(function () {
      if ($('.input-error').length <= 0) {
        callAjaxReg();
      }
    });
  });
  $goToAuth.click(function () {
    $elAuth.addClass(activeFormAuth);
    $elReg.removeClass(activeFormAuth);
    headerRegTitle.text('Авторизация');
    validAuth.initValidate(function () {
      if ($('.input-error').length <= 0) {
        callAjaxAuth();
      }
    });
  });


  $('#js__show-reg-form').click(function () {
    $goToReg.trigger('click');
  });


  $('#js__show-auth-form').click(function () {
    $goToAuth.trigger('click');
  });

  $(document).click(function (e) {
    if ($(e.target).closest(".nav-search__form").length) {
      return;
    } else {
      navSearch.removeClass('nav-search__open');
    }
    if ($(e.target).closest(".header__country").length) {
      return;
    }
    e.stopPropagation();
  });

  var navHead = $('.nav-head');

  if (!(isMobile.any())) {
    if (navHead.css('display') !== 'none') {
      navHead.stickUp();
    }

    $(window).scroll(function () {
      if ($('.nav-search.nav-search__open')) {
        navSearch.removeClass('nav-search__open');
      }
    });
  }
  /* END */
  if ($(window).width() >= 1100 && $('.js-recommend-mobile')) {
    $('.js-recommend-mobile').remove();
  } else if ($(window).width() < 1099 && $('.js-recommend-desktop')) {
    $('.js-recommend-desktop').remove();
  }


  //HEADER
  const dropdown = $('.js-target');
  const searchSticky = $('.header__search_sticky');
  const burger = $('#hamburger');
  const menuTop = $('.header-menu');
  const btnToggleMenu = $('.js-toggle-menu');
  const catalogTop = $('.js-catalog');
  const searchClose = $('.js-search-close');

  //События открытия/закрытия в бутстрапе для добавления бодиЛока
  function changeLock(el, event) {
    el.on('show.bs.' + event, function () {
      $(document.body).addClass('body-lock');
    });
    el.on('hide.bs.' + event, function () {
      $(document.body).removeClass('body-lock');
    });
  }

  function unbindChangeLock(el, event) {
    el.unbind('show.bs.' + event);
    el.unbind('hide.bs.' + event);
  }

  $('.js-burger').click(() => {
    if (!$('#header-mobile').hasClass('show')) {
      $(document.body).addClass('body-lock');
      $('.header__auth').dropdown('hide');
    } else {
      $(document.body).removeClass('body-lock');
    }
  });

  //Меню каталога
  function checkCatalog() {
    //catalog in mobile
    btnToggleMenu.click((e) => {
      e.preventDefault();
      catalogTop.css('display', 'block');
    });
    $('.js-back').click(e => {
      e.preventDefault();
      catalogTop.css('display', 'none');
    });
  }
  checkCatalog();
  if ($(window).innerWidth() > 991) {
    catalogTop.css('display', 'flex');
  }


  if ($(window).innerWidth() > 992) {
    //События дропдауна для добавления/удаления бодилока
    changeLock(dropdown, 'dropdown');
  } else if ($(window).innerWidth() <= 992) {
    //Убираем события дропдауна
    unbindChangeLock(dropdown, 'dropdown');
  }

  //Авторизованное меню
  $('.mod-auth').click(function () {
    if (!$('.header__auth').hasClass('show')) {
      $(document.body).addClass('body-lock');
      $('#header-mobile').collapse('hide');
      $('#hamburger').removeClass('open');
    } else {
      $(document.body).removeClass('body-lock');
    }
  });

  //Анимация бургера
  burger.click(function (e) {
    burger.toggleClass('open');
  });


  //Добавление прилипшего меню
  $(window).scroll(() => {
    if (window.pageYOffset > 70 && $(window).innerWidth() >= 992) {
      menuTop.addClass('sticky-custom-top');
    } else {
      menuTop.removeClass('sticky-custom-top');
      searchSticky.css('display', 'none');
    }
  });

  //Открытие/закрытие поиска в прилипшем меню
  $('.js-open-search').click(function (e) {
    if ($('.sticky-custom-top').length > 0) {
      e.preventDefault();
      searchSticky.toggle();
    }
  });
  searchClose.click((e) => {
    e.preventDefault();
    searchSticky.css('display', 'none');
  });

  //Закрываем модалки/крестик
  $('.js-close-modal').click((e) => {
    e.preventDefault();
    $('#cities-modal').modal('hide');
    $('#show-user-auth').modal('hide');
    $('#choice-modal').modal('hide');
  });

  //Подтверждение города
  $('#choice-modal').modal('show');
  $('.js-show-city').click(() => {
    $('#choice-modal').modal('hide');
    setTimeout(() => $('#cities-modal').modal('show'),500);
  });
  $('.js-set-default').click(() => {
    setCookie('GEO_CITY', 'Москва', '', '/', '', '');
  });

  //Открытие/закрытие поиска
  const amount = $('.data-basket-amount')[0];//прячем иконку кол/ва товара чтобы не торчала из под поиска
  $('.js-search-mobile').click((e) => {
    e.preventDefault();
    $('.header__search_mobile').show(0, () => {
      if (!$(amount).hasClass('deactive')) {
        $(amount).addClass('deactive');
      }
    });
  });
  $('.js-search-mobile-close').click((e) => {
    e.preventDefault();
    $('.header__search_mobile').hide(0, () => {});
    if ($(amount).hasClass('deactive')) {
      $(amount).removeClass('deactive');
    }
  });

  //Только чекаут/города
  if (location.pathname === '/ru/cart/') {
    $('.mod-checkout .header__logo').removeClass('mr-auto');
    $('.checkout-city').click(function () {
      addActiveCity();
      if (!$('.checkout-city-list').hasClass('show')) {
        $(document.body).addClass('body-lock');
      } else {
        $(document.body).removeClass('body-lock');
      }
    });
    $('.js-checkout-back').click(function () {
      $(document.body).removeClass('body-lock');
    });
    $('.checkout-city-list .dropdown-name').click(e => e.preventDefault());
  }

  //Открытие и валидация регистрации/авторизации
  $('.js-open-auth').click(function (e) {
    e.preventDefault();
    $('#show-user-auth').modal('toggle');
  });
  $('#show-user-auth').on('shown.bs.modal', () => {
    validAuth.initValidate(function () {
      if ($('.input-error').length <= 0) {
        callAjaxAuth();
      }
    });
  });
  $('#cities-modal').on('shown.bs.modal', () => {
    addActiveCity();
  });
  $('.js-link-city').click(() => {
    addActiveCity();
  });

  //Выбор активного города
  function addActiveCity() {
    $('.city').each(function (i, item) {
      if ($(item).text() === $($('.js-point-city')[0]).text()) {
        $(item).addClass('active-city');
      }
    });
  }

  //Точки в крошках на мобиле
  if ($(window).innerWidth() < 992) {
    $('.js-breadcrumb-item').each((i,item) => {
      if (i !== 0 && i !== $('.js-breadcrumb-item').length - 1) {
        $(item).children().text('...');
      }
    });
  }

  //HEADER END

  /*START FOOTER*/
  function activeCollapse() {
    $(window).innerWidth() < 992 ? $('.js-dropdown').attr('data-toggle', 'collapse') : $('.js-dropdown').attr('data-toggle', '').click(e => e.preventDefault());
  }
  activeCollapse();
  $(window).resize(() => activeCollapse());
  $('.js-dropdown').click(function() {
    !$(this).next().hasClass('show') ? $(this).children('.js-footer-arrow').css('transform', 'rotate(-90deg)') : $(this).children('.js-footer-arrow').css('transform', '');
  });
  /*END FOOTER*/

  /*click buy modal*/
  clickBuy();
  /*endclick buy*/

  /*POPOVERS*/
  var url = $('.js-gift-popover').data('url');
  var name = $('.js-gift-popover').data('name');
  var scu = $('.js-gift-popover').data('scu');

  $('.js-gift-popover').popover({
    container: 'body',
    animation: false,
    template: '<div class="popover-custom popover js-popover-opened" role="tooltip">' +
              '<div class="popover-custom__arrow arrow"></div>' +
              '<div class="popover-custom__body body">' +
              'При покупке <span class="text-bold">' + scu + '</span> в&nbsp;подарок <span class="js-href mod-link" data-href="">' + name + '</span>! Спеши! Количество подарков ограничено!' +
              '</div>' +
              '</div>'
  });
  
  $('.js-credit-popover').popover({
    container: 'body',
    animation: false,
    template: '<div class="popover-custom popover-credit popover js-popover-opened" role="tooltip">' +
        '<div class="popover-custom__arrow arrow"></div>' +
        '<div class="popover-custom__body body">' +
        'Беспроцентное кредитное предложение <span class="text-bold">«0-0-10»</span>' +
        '</div>' +
        '</div>'
  });

  function closePopover(el) {
    $(document).mouseup(function (e){
      const div = el;
      if (!div.is(e.target) && div.has(e.target).length === 0) {
        div.popover('hide');
      }
    });
  }

  $('.js-gift-popover').on('shown.bs.popover', function () {
    $('.js-href').data('href', url);
    $('.js-href').click(function () {
      location.href = $(this).data('href');
    });
    closePopover($(".js-popover-opened"));
  });
  /*POPOVEREND*/

  /*TOAST*/
  window.showToast = function() {
    $('.toast-custom').toast('show');
  };
  window.hideToast = function() {
    $('.toast-custom').toast('hide');
  };
  /*TOASTEND*/

});

function callAjaxAuth() {
  var login = $('#auth-form-email').val(),
    password = $('#auth-form-password').val();
  $.ajax({
    type: "POST",
    url: "/local/templates/main/components/bitrix/system.auth.authorize/.default/check_fields.php",
    data: "login=" + login + "&password=" + password,
    success: function (msg) {
      if (msg != 'error') {
        window.location = window.location;
        $('.js-auth-form').submit();
      } else {
        $('#auth-form-error').html('<span style="color:red">Неверный логин или пароль.</span>');
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert('Неверный логин или пароль');
      return false;
    }
  });
}

function callAjaxReg() {
  var email = $('#form-register-e-mail').val(),
    password = $('#form-register-auth-pass').val(),
    confirmPass = $('#form-register-confirm-pass').val();

  if (password == confirmPass) {
    $.ajax({
      url: '/local/components/mi/main.register/templates/.default/ajax.php',
      method: 'POST',
      data: {email: email, password: password, confirmPass: confirmPass},
    }).done(function (result) {
      if (result != 1) {
        $('#register-error').html(result);
      }
    });
  }
}