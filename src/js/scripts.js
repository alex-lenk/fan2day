// Импортируем другие js-файлы
import './snippets/tab.js';
import './snippets/login.js';
import './snippets-mobile/header-toggle.js';

/* BEGIN: функция для закрытия разных панелей при нажатии на пустое пространство */
function documentMouseup(elClass, twoClass) {
  $(document).mouseup(function (e) {
    if (!$(elClass).is(e.target) && $(elClass).has(e.target).length === 0) {
      $(elClass).removeClass(twoClass)
    }
  });
}

/* END */


/* BEGIN:  Условие для планшетных версий */
if ($(window).width() < 992 && $(window).width() > 765) {
  $('.footer-nav__wrap + div').appendTo('.footer-nav__wrap .row');
}
/* END */


$(document).ready(function () {
  /* BEGIN: Сортировка по цене добавление и удаление иконок */
  $('.filter-sorter__state-price').click(function () {
    if ($(this).hasClass('icon-increase')) {
      $(this).removeClass('icon-increase');
      $(this).addClass('icon-decrease');
    } else {
      $(this).addClass('icon-increase');
      $(this).removeClass('icon-decrease');
    }
  });
  /* END */


  /* BEGIN: Для панелей с фильтрами */
  $('.catalog-widget__title').on('click', function () {
    $(this).toggleClass('catalog-widget__active');
    $(this).next().slideToggle();
  });

  $('.catalog-widget__clear').on('click', function () {
    $(this).closest('.catalog-widget__body').find('.custom-control-input').prop('checked', false);
  });
  /* END */


  /* BEGIN: инициализация кастомизации селектов */
  $('select').styler();
  /* END */


  /* BEGIN: Клик по кнопке "выбрать развлечения", появится панель с навигацией */
  $('.js__nav-catalog-btn').click(function () {
    $('.nav-catalog-panel').addClass('nav-catalog-opened');
  });

  documentMouseup('.nav-catalog-panel', 'nav-catalog-opened');
  /* END */


  /* BEGIN: Клик по кнопке "все развлечения" .top-panel-all */
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
    searchFormBoxBack.removeClass('active');
    searchFormBox.addClass('icon-search');
  });

  searchFormBoxBack.click(function () {
    $(this).removeClass('active');
    searchFormBox.addClass('icon-search');
    searchFormBoxClear.removeClass('active');
    searchResult.removeClass('active');
    searchFormBoxInput.val('');
  });

  $('.js__search').click(function () {
    $(searchArea).addClass('active');
    $(entertainment).removeClass(entertainmentOpened);
    searchFormBoxInput.val('').focus();
  });

  $('.search-area__close').click(function () {
    $(searchArea).removeClass('active');
  });

  $(searchArea).click(function (e) {
    if ($(searchArea).has(e.target).length === 0) {
      $(searchArea).removeClass('active')
    }
  });
  /* END */


  /* BEGIN: Initialization carousel */
  $('.popular-section__list').slick({
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
        breakpoint: 765,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });
  /* END */
});
