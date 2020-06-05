// Импортируем другие js-файлы
import './snippets/tab.js';
import './snippets-mobile/header-toggle.js';
import './snippets/login.js';

$(document).ready(function () {
  $('.js__search').click(function () {
    $('body').addClass('search-panel__active');
  });
  $('.js__nav-catalog-btn').click(function () {
    $('body').addClass('menu-open');
    $('.nav-catalog-panel').addClass('nav-catalog-opened');
    $('.header-toggle').toggleClass('icon-menu icon-close');
  });

  $('.search-form-box__back').click(function () {
    $('body').removeClass('search-panel__active');
    searchResult.removeClass('active');
    searchFormBoxInput.val('');
  });


  /* BEGIN: Логика появления панели поиска и ввода данных  */
  let searchFormBoxInput = $('.search-form-box__input'),
    searchResult = $('.search-result');

  searchFormBoxInput.keyup(function () {
    let value = $(this).val().length;

    $('body').addClass('search-panel__active');

    if (value >= 2) {
      searchResult.addClass('active');
    } else {
      searchResult.removeClass('active');
    }
  });
  /* END */


  /* BEGIN: Легкий аккордион применяется для сокращения огромных простыней с текстом */
  $('.accordion-light__head').click(function () {
    $(this).toggleClass('accordion-light__active').next().slideToggle();
  });
  /* END */


  /* BEGIN: Клик по кнопке "выбрать развлечения", появится панель с навигацией */
  $('.nav-catalog-dropdown__close').click(function () {
    $(this).closest('.js__tab-box').removeClass('active');
  });
  /* END */


  /* BEGIN: Для панелей с фильтрами */
  $('.catalog-widget__title').on('click', function () {
    $(this).toggleClass('catalog-widget__active');
    $(this).next().slideToggle();
  });

  $('.catalog-widget__clear').on('click', function () {
    $(this).closest('.catalog-widget__body').find('.custom-control-input').prop('checked', false);

    let countChecked = $('.catalog-filter').find('.custom-control-input:checked').length;

    if (countChecked < 1) {
      $(catalogFilter).removeClass('catalog-filter__show');
    }
  });

  let catalogFilter = '.catalog-filter';
  $('.catalog-widget__group').on('click', function () {
    if ($(".catalog-widget__group .custom-control-input").is(":checked")) {
      $(catalogFilter).addClass('catalog-filter__show');
    } else {
      $(catalogFilter).removeClass('catalog-filter__show');
    }
  });

  $('.catalog-filter__close').click(function () {
    $('.catalog-filter').removeClass('catalog-filter__opened');
  });

  $('.filter-panel__choose').click(function () {
    $('.catalog-filter').addClass('catalog-filter__opened');
  });

  $('.catalog-filter__clear-all').click(function () {
    $('.catalog-filter .custom-control-input').prop('checked', false);
    $('.catalog-filter').removeClass('catalog-filter__show');
  });
  /* END */
});


var size = 65,
  newsContent = $('.snippet-title'),
  newsText = newsContent.text();

if (newsText.length > size) {
  newsContent.text(newsText.slice(0, size) + ' ...');
}
