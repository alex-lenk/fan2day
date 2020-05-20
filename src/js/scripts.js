// Импортируем другие js-файлы
import './snippets/tab.js';
//import './snippets/scripts.js';


if ($(window).width() < 992 && $(window).width() > 766) {
  $('.footer-nav__wrap + div').appendTo('.footer-nav__wrap .row');
}
/* BEGIN For mobile version */
if ($(window).width() <= 1199) {

  $(document).ready(function () {
    $('.header-toggle').click(function () {
      $(this).toggleClass('icon-menu icon-close');
      $('body').toggleClass('menu-open');
    });

    $('.menu-entertainment__item').click(function () {
      $('body').addClass('menu-entertainment__open');
    });

    $('.menu-entertainment__close').click(function () {
      $('body').removeClass('menu-entertainment__open');
      $('.menu-entertainment__item').removeClass('active');
    });

  });

}
/* END */


/* BEGIN For desktop version */
if ($(window).width() >= 1200) {
}
/* END */

$(document).ready(function () {
  /* BEGIN: Глабальные перменные */
  let modalLogin = '#modal-login';
  let modalForgot = '#modal-forgot';
  let modalRegister = '#modal-register';
  /* END */


  /* BEGIN: Клик по кнопке "все роазвлечения" .top-panel-all */
  let entertainment = '.entertainment';
  let entertainmentOpened = 'entertainment-opened';

  $('.top-panel-all').click(function () {
    $(entertainment).toggleClass(entertainmentOpened);
  });

  $(entertainment).on('click', function (e) {
    if ($(entertainment).has(e.target).length === 0 && !$('.top-panel-all').is(e.target)) {
      $(entertainment).removeClass(entertainmentOpened)
    }
  });
  /* END */


  /* BEGIN: Логика появления панели поиска и ввода данных  */
  let searchFormBoxInput = $('.search-form-box__input'),
    searchFormBox = $('.search-form-box'),
    searchFormBoxClear = $('.search-form-box__clear'),
    searchFormBoxBack = $('.search-form-box__back'),
    searchArea = '.search-area',
    searchResult = $('.search-result');

  searchFormBoxInput.keyup(function () {
    let value = $(this).val().length;

    if (value >= 2) {
      searchFormBox.removeClass('icon-search');
      searchFormBoxBack.addClass('active');
      searchFormBoxClear.addClass('active');
      searchResult.addClass('active');
    } else {
      searchFormBoxClear.removeClass('active');
      searchResult.removeClass('active');
    }
  });

  searchFormBoxClear.click(function () {
    searchFormBoxInput.val('').focus();
    $(this).removeClass('active');
    searchResult.removeClass('active');
  });

  searchFormBoxBack.click(function () {
    searchFormBox.addClass('icon-search');
    $(this).removeClass('active');
    searchFormBoxClear.removeClass('active');
    searchResult.removeClass('active');
    searchFormBoxInput.val('');
  });


  /* BEGIN For desktop version */
  if ($(window).width() >= 767) {
    $('.js__search').click(function () {
      $(searchArea).addClass('active');
      $(entertainment).removeClass(entertainmentOpened);
    });
  }
  /* END */
  /* BEGIN For desktop version */
  if ($(window).width() <= 766) {
    searchFormBoxBack.click(function () {
      $('body').removeClass('search-panel__active')
    });
    $('.js__search').click(function () {
      $('body').addClass('search-panel__active');
    });
  }
  /* END */

  $('.search-area__close').click(function () {
    $(searchArea).removeClass('active');
  });

  $(searchArea).click(function (e) {
    if ($(searchArea).has(e.target).length === 0) {
      $(searchArea).removeClass('active')
    }
  });
  /* END */


  /* BEGIN: For logic on modals login, forgot and register */
  $('.js__login').click(function () {
    $('#modal-auth').addClass('modal-opened');
    $('.modal-form').removeClass('modal-form__active');
    $(modalLogin).addClass('modal-form__active');
  });

  $('.modal-close').click(function () {
    $('#modal-auth').removeClass('modal-opened');
  });

  $('.js__forgot').click(function () {
    $('.modal-form').removeClass('modal-form__active');
    $(modalForgot).addClass('modal-form__active');
  });

  $('.js__register').click(function () {
    $('.modal-form').removeClass('modal-form__active');
    $(modalRegister).addClass('modal-form__active');
  });


  let hash = window.location.hash;

  if (hash === modalForgot || hash === '/#modal-forgot') {
    $('#modal-auth').addClass('modal-opened');
    $('.modal-form').removeClass('modal-form__active');
    $(modalForgot).addClass('modal-form__active');
  } else if (hash === modalLogin || hash === '/#modal-login') {
    $('#modal-auth').addClass('modal-opened');
    $('.modal-form').removeClass('modal-form__active');
    $(modalLogin).addClass('modal-form__active');
  } else if (hash === modalRegister || hash === '/#modal-register') {
    $('#modal-auth').addClass('modal-opened');
    $('.modal-form').removeClass('modal-form__active');
    $(modalRegister).addClass('modal-form__active');
  }
  /* END */


  /* BEGIN: Initialization carousel */
  $('.popular-carousel').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev btn-circle"><span class="icon-arrow-left btn-text"></span></button>',
    nextArrow: '<button type="button" class="slick-next btn-circle"><span class="icon-arrow-right btn-text"></span></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });
  /* END */


  /* BEGIN: Валидация инпут полей */
  $(modalLogin).validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      email: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      },
      password: {
        required: "Обязательно введите пароль",
        email: "Пароль не может быть менее 6 символов"
      }
    }
  });
  $(modalForgot).validate({
    rules: {
      inputForgotEmail: {
        required: true,
        email: true,
        minlength: 8
      }
    },
    messages: {
      inputForgotEmail: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      }
    }
  });
  $(modalRegister).validate({
    rules: {
      inputRegisterEmail: {
        required: true,
        email: true,
        minlength: 8
      },
      agreeRegister: {
        required: true
      }
    },
    messages: {
      inputRegisterEmail: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      },
      agreeRegister: {
        required: "Вы должны согласиться на обработку персональных данных"
      }
    }
  });
  $('#subscription-form').validate({
    rules: {
      inputSubscriptionEmail: {
        required: true,
        email: true,
        minlength: 8
      },
      agreeSubscription: {
        required: true
      }
    },
    messages: {
      inputSubscriptionEmail: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      },
      agreeSubscription: {
        required: "Вы должны согласиться на обработку персональных данных"
      }
    }
  });
  /* END */
});
