// Импортируем другие js-файлы
import './snippets/tab.js';
import './snippets/login.js';
import './snippets/mask.js';
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
  let navCatalogPanel = '.nav-catalog-panel';
  $('.js__nav-catalog-btn').click(function () {
    $(navCatalogPanel).addClass('nav-catalog-opened');
  });

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


  /* BEGIN: Вывод имени файла в див */
  $('.js__decor-file').change(function (e) {
    $(this).next().text(e.target.files[0].name);
  });
  /* END */


  /* BEGIN: Разворачиваем панель с вводом данных филиала */
  $('.personal-area__add-address').click(function () {
    $(this).prev('.personal-area-box').slideDown();
  });
  /* END */


  /* BEGIN: Раскрываем и сворачиваем список dropdown */
  let dropdown = '.dropdown',
    dropdownActive = 'dropdown-active',
    dropdownToggle = '.dropdown-toggle';

  $(dropdownToggle).click(function () {
    if (!$(this).hasClass(dropdownActive)) {
      $('.dropdown-toggle.dropdown-active').removeClass(dropdownActive).next().slideUp();
      $(this).addClass(dropdownActive).next().slideDown();
    } else {
      $(this).removeClass(dropdownActive).next().slideUp();
    }
  });
  /* END */


  /*
   BEGIN: Логика удаления схем проезда из личного кабинета, когда последняя удалена,скрывается блок и появляется блок
   с загрузкой схем
  */
  let personalAreaDirectionsClose = '.personal-area-directions__close';

  $(personalAreaDirectionsClose).click(function () {
    $(this).closest('.personal-area-directions__item').remove();
    if ($(personalAreaDirectionsClose).length < 1) {
      $('.personal-area-directions').fadeOut();
      $('.personal-area__download-files').fadeIn();
    }
  });
  /* END */


  /* BEGIN: Проверка на textarea и авторесайз textarea тега */
  let textarea = $('textarea');
  if (textarea.length > 0) {
    textarea.each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
  /* END */


  /* BEGIN: Для закрытия разных панелей при нажатии на пустое пространство */
  $(document).mouseup(function (e) {
    if ($(navCatalogPanel).has(e.target).length === 0) {
      $(navCatalogPanel).removeClass('nav-catalog-opened');
    }
    if (!$(dropdown).is(e.target) && $(dropdown).has(e.target).length === 0) {
      $(dropdownToggle).removeClass(dropdownActive).next().slideUp();
    }
  });
  /* END */
});
