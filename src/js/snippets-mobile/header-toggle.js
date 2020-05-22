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
