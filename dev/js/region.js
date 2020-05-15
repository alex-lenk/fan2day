import {scrollToTabs} from '../detail/script.js';

function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + encodeURIComponent(value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function get_cookie(cookie_name) {
  var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
  if (results)
    return (unescape(results[2]));
  else
    return null;
}


$(document).ready(function () {
  var cityChose = $('.js-point-city').text(),
    geolocationCity = $('#cities-modal .city');
    geolocationCity.each(function (i, el) {
    if (cityChose === $(el).text()) {
      $(el).css('font-weight', '500');
    }
  });

  $(document).on("click", ".city", function () {
    setCookie('GEO_CITY', $(this).data('city'), '', '/', 'mi-shop.com', '');
    $('.js-point-city').text($(this).data('city'));
    $('#cities-modal').modal('hide');

    scrollToTabs($('.js-goto-delivery'), '#pdp-tab-shipping', $('.js-fromto-delivery'));

  });
});
