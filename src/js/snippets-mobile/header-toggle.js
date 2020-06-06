$(document).ready(function () {
  $('.header-toggle').click(function () {
    $(this).toggleClass('icon-menu icon-close');
    $('body').toggleClass('menu-open');
    $('.nav-catalog-panel').removeClass('nav-catalog-opened');
    $('.nav-catalog-dropdown').removeClass('active');
  });

  $('.menu-entertainment__item').click(function () {
    $('body').addClass('menu-entertainment__open');
  });

  $('.menu-entertainment__close').click(function () {
    $('body').removeClass('menu-entertainment__open');
    $('.menu-entertainment__item').removeClass('active');
  });
});
