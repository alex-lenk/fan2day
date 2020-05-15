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

export default function app() {
  var htmlElement = $('html'),
    openedUserMenu = 'opened-user-menu',
    openedCity = 'opened-city',
    openedMenuAuthorized = 'opened-menu-authorized';

  /* Begin: Открытие и закрытие по иконке меню на мобильных */
  $('.js-hamburger').click(function () {
    $(this).toggleClass('is-active');
    $('.js-profile-menu').removeClass('active-auth');
  });
  /* END */


  /* Begin: Открытие и закрытие всплывающих панелей меню */
  $('#menu-catalog').click(function () {
    htmlElement.toggleClass('menu-catalog__opened');
  });

  $('#menu-country').click(function () {
    htmlElement.toggleClass('menu__country_opened');
  });

  $('.back-element').click(function () {
    htmlElement.removeClass('menu__country menu-catalog__opened opened-menu-authorized opened-city menu__country_opened');
  });

  $('.user-name .user-name__link').click(function () {
    htmlElement.toggleClass(openedUserMenu);
    htmlElement.removeClass(openedMenuAuthorized);
  });

  $('.menu-authorized .item-separator').click(function () {
    htmlElement.toggleClass(openedMenuAuthorized);
    htmlElement.removeClass(openedUserMenu);
  });

  $('.menu-city').click(function () {
    htmlElement.removeClass(openedMenuAuthorized);
    htmlElement.toggleClass(openedCity);
  });

  /* END */


  var slides = 3;
  if (isMobile.any()) {
    slides = 1;
  }

  var defButtonWidth,
    smallButtonWidth,
    defButtonText,
    defInputWidth,
    subscribeForItem = $('.subscribe-for-item');

  subscribeForItem.click(function () {

    if ($('.subscription-form input').is(':visible')) {
      var window = $('<div class="modal-window" id="subscribe-form"><div class="modal-shadow"><div class="modal-container"><div class="modal-body"><div class="modal-header"><h2>Оформление подписки</h2><div class="close-click"><i class="fa fa-times" aria-hidden="true"></i></div></div><div class="modal-content"><p></p></div></div></div></div></div>');

      if (!$('.subscription-form input').val()) {
        window.find('.modal-content p').html('Введите email!');
        htmlElement.append(window);
        window.show();
        window.find('.close-click').click(function () {
          window.remove();
        });

        return false;
      }

      $.ajax({
        url: '/local/php_interface/include/subscribe.php',
        method: 'POST',
        data: {
          'email': $('.subscription-form input').val(),
          'subscrId': 10
        }
      }).done(function (answer) {
        var window = $('<div class="modal-window" id="subscribe-form"><div class="modal-shadow"><div class="modal-container"><div class="modal-body"><div class="modal-header"><h2>Оформление подписки</h2><div class="close-click"><i class="fa fa-times" aria-hidden="true"></i></div></div><div class="modal-content"><p></p></div></div></div></div></div>');
        var res = JSON.parse(answer);

        if (res.result == 'success') {
          window.find('.modal-content p').html('Вы успешно подписались на рассылку &laquo;Оранжевый четверг&raquo;');
          htmlElement.append(window);
          window.show();
          window.find('.close-click').click(function () {
            window.remove();
            $('.subscription-form input').val('').fadeOut();
            subscribeForItem.animate({
              left: 0,
              width: defButtonWidth
            }, function () {
              $(this).find($('span')).html(defButtonText);
            });
          });
        } else {
          window.find('.modal-content p').html('Произошла ошибка. Пожалуйста, попробуйте еще раз позднее.');
          htmlElement.append(window);
          window.show();
          window.find('.close-click').click(function () {
            window.remove();
          });
        }
      });
    } else {
      defButtonWidth = subscribeForItem.outerWidth();
      defButtonText = subscribeForItem.find($('span')).html();
      defInputWidth = $('.subscription-form input').outerWidth();
      smallButtonWidth = 97;

      $(this).animate({
        left: defInputWidth,
        width: smallButtonWidth
      });

      $('.subscription-form input').fadeIn();

      $(this).find($('span')).html('ok');
    }
  });

  var geolocationForm = $(".geolocation-form");

  if ($(window).width() >= 1100) {
    $(document).mouseup(function (e) {
      if (!geolocationForm.is(e.target) && geolocationForm.has(e.target).length === 0) {
        htmlElement.removeClass('opened-city');
      }
    });
  }

}