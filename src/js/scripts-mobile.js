// Импортируем другие js-файлы
import './snippets/tab.js';
import './snippets-mobile/header-toggle.js';
import './snippets/login.js';

$(document).ready(function () {
  $('.js__search').click(function () {
    $('body').addClass('search-panel__active');
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
});
