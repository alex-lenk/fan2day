/**
 * Функция для скроллслайдера*/
/*$(function () {
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

  var filterListItem = '.filter-list__item',
    filterSelect = '.filter-select',
    filterItemOpen = 'filter-item__open',
    filterItemSelected = ' filter-item__selected',
    filterOptionItem = '.filter-option__item',
    filterByMemory = '.filter-by-memory',
    filterParameter__count = '.filter-parameter__count',
    filterClearAll = '.filter-clear-all',
    filterBoolean__item = '.filter-boolean__item',
    jsChangeColor = '.js-change-color',
    filterRange = $("#filter-range");


  /!* Добавляет активный класс для открытия select`ов *!/
  $('.filter-toggle').click(function () {
    $('body').addClass('filter-open');
  });
  $('.filter-parameter__close').click(function () {
    $('body').removeClass('filter-open');
  });


  filterRange.slider({
    range: true,
    min: 2000,
    max: 5000,
    values: [2000, 5000],
    slide: function (event, ui) {
      $("#filter-option-from").val(ui.values[0]);
      $("#filter-option-to").val(ui.values[1]);
    }
  });

  $("#filter-option-from").val(filterRange.slider("values", 0));
  $("#filter-option-to").val(filterRange.slider("values", 1));


  $('.filter-select__close').click(function () {
    $(this).siblings(filterByMemory).html('');
    $(this).closest(filterSelect).removeClass(filterItemSelected);
    $(this).closest(filterSelect).find(filterOptionItem).removeClass('active');
    $(this).closest(filterSelect).find(jsChangeColor).removeClass('mod-colors-active');
    $(filterClearAll).removeClass('show');
  });


  $(filterClearAll).click(function () {
    $(filterByMemory).html('');
    $(filterSelect).removeClass(filterItemSelected);
    $(filterSelect).find(filterOptionItem).removeClass('active');
    $(filterSelect).find(jsChangeColor).removeClass('mod-colors-active');
    $(this).hide();
  });

  $(filterOptionItem).click(function () {
    $(this).toggleClass('active');

    var text = '<span>&nbsp;' + $(this).text() + '&nbsp;</span>';
    var selectedOptions = $(this).parent().parent().find(filterByMemory);

    selectedOptions.html(selectedOptions.html().replace(text, ''));

    if ($(this).hasClass('active')) {
      selectedOptions.append(text);
    }

    if ($(filterOptionItem + '.active').length) {
      $(this).closest(filterSelect).addClass(filterItemSelected);
      $(filterClearAll).addClass('show');
    } else {
      $(this).closest(filterSelect).removeClass(filterItemSelected);
      $(filterClearAll).removeClass('show');
    }

    $(filterParameter__count).html($('.filter-option .active').length);
  });


  $('.filter-select__label').click(function () {
    if ($(this).parent().hasClass(filterItemOpen)) {
      $(filterSelect).removeClass(filterItemOpen);
    } else {
      $(filterSelect).removeClass(filterItemOpen);
      $(this).parent().addClass(filterItemOpen);
    }
  });

  $(filterListItem).click(function (text) {
    text = $(this).text();

    $(this).closest('.filter-select__sort').find('.filter-select__label-text').text(text);
    $(this).closest(filterSelect).toggleClass(filterItemOpen).addClass(filterItemSelected);
    $(filterClearAll).addClass('show');
  });


  $(filterBoolean__item).click(function () {
    $(filterBoolean__item).removeClass('active');
    $(this).addClass('active');

    var text = '<span>&nbsp;' + $(this).text() + '&nbsp;</span>';

    var selectedOptions = $(this).closest('.filter-select').find(filterByMemory);

    selectedOptions.html(selectedOptions.html().replace(text, ''));

    if ($(this).hasClass('active')) {
      selectedOptions.append(text);
    }

    if ($(filterBoolean__item + '.active').length) {
      $(this).closest(filterSelect).addClass(filterItemSelected);
      $(filterClearAll).addClass('show');
    } else {
      $(this).closest(filterSelect).removeClass(filterItemSelected);
      $(filterClearAll).removeClass('show');
    }

    $(this).closest(filterSelect).toggleClass(filterItemOpen).addClass(filterItemSelected);
  });


  $(jsChangeColor).click(function () {
    $(this).toggleClass('mod-colors-active');
    var active = $('.js-change-color.mod-colors-active');

    if (active.length) {
      $(this).closest(filterSelect).addClass(filterItemSelected);
      $(filterClearAll).addClass('show');
      $(this).closest('.filter-select').find(filterByMemory).html(active.length);
    } else {
      $(this).closest(filterSelect).removeClass(filterItemSelected);
      $(filterClearAll).removeClass('show');
      $(this).closest('.filter-select').find(filterByMemory).text('');
    }
  });


  $(document).click(function (event) {
    if ($(event.target).closest('.filter-select').length) return;
    $('.filter-select').removeClass('filter-item__open');
    event.stopPropagation();
  });

  /!* END *!/
});*/

/**
 * Функции для тэгов*/
/*$(function () {
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
  /!* Добавляет активный класс для открытия скрытых тегов *!/
  var js__catalogTagsMore = $('.js__catalog-tags__more');

  js__catalogTagsMore.click(function () {
    $('.catalog-tags').toggleClass('catalog-tags__open');
  });
  /!* END *!/
});*/

$(document).ready(function () {

  /*UNKNOWN*/
  $(document).on('focus', 'input[name="oneclick_phone"]', function () {
    $(this).inputmask("+7 (999) 999-9999");
  });

  $('#oneclick_button_send').click(function () {
    $('.oneclick_phone_error').html('');
    $('.oneclick_grey_bg').css('display', 'block');
    $('.oneclick_popup').css('display', 'block');
    return false;
  });

  $('#buy-one-click__modal-input').click(function () {
    $('.oneclick_phone_error').html('');
  });

  $(".btn.buy-one-click__modal-btn").on("click", function () {
    var intRegex = /[0-9 -()+]+$/,
      phone = $('input[name="oneclick_phone"]').val(),
      region = $('#region-city').text();

    $('.oneclick_phone_error').html('');

    if ($('.callback_one_click').hasClass('disabled'))
      return;

    if ((phone.length < 4) || (!intRegex.test(phone))) {
      $('.oneclick_phone_error').html('Неверный формат номера.');
      return false;
    }

    $('.btn.buy-one-click__modal-btn').attr('disabled', 'disabled');

    $.ajax({
      type: "POST",
      url: "/local/templates/main/components/bitrix/catalog/mi_detail/bitrix/catalog.element/.default/email.php",
      //async: false,
      data: "phone=" + phone + "&oneclick_product_id=" + $('#oneclick_product_id').val() + "&oneclick_user_price=" + $('#oneclick_user_price').val() + '&region=' + region,
      success: function (msg) {
        location.href = '/ru/personal/buy-one-click/request.php?request=' + msg;
      }
    });
    return false;
  });

  $('.item-propertyes-shade-close').click(function () {
    $('.item-propertyes-shade').fadeOut(function () {
      $('.item-propertyes-shade .props').html('');
    });
  });

  $('.item-propertyes-wrapper li').click(function () {
    $('.item-propertyes-shade .props').html($(this).find('dl').clone());
    $('.item-propertyes-shade .props').prepend('<h2>' + $(this).find('.pict-name').html() + '</h2>');
    $('.item-propertyes-shade').fadeIn();
  });

  $('.nav-slide').click(function () {
    var target = $(this).data('target');
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    $('.big-carousel .big-slide[data-num!="' + target + '"]').hide();
    $('.big-carousel .big-slide[data-num!="' + target + '"] img').removeClass('animated');
    $('.big-carousel .big-slide[data-num="' + target + '"]').fadeIn(1000);
    $('.big-carousel .big-slide[data-num="' + target + '"] img').addClass('animated');
  });

  $('.colours .colour-square').click(function () {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');

    var colour = $(this).data('target'),
      carouselWrap = $('.carousel-wrap[data-out=' + colour + '] .nav-slide:first-of-type');

    $('.carousel-wrap[data-out!=' + colour + ']').removeClass('current');
    $('.carousel-wrap[data-out=' + colour + ']').addClass('current');
    carouselWrap.addClass('selected');
    carouselWrap.siblings().removeClass('selected');
    $('.big-carousel[data-in!=' + colour + ']').hide();
    $('.big-carousel[data-in=' + colour + ']').fadeIn();
    $('.big-carousel[data-in=' + colour + '] .big-slide:first-of-type').fadeIn();
    $('.big-carousel[data-in=' + colour + '] .big-slide:not(:first-of-type)').hide();
    $('.big-carousel[data-in=' + colour + '] .big-slide:first-of-type img').addClass('animated');

  });

  $('.subscribe-for-item').click(function () {
    var defButtonWidth,
      smallButtonWidth,
      defInputWidth,
      subscriptionFormInput = $('.subscription-form input');

    if (subscriptionFormInput.is(':visible')) {
      var window = $('<div class="modal-window" id="subscribe-form"><div class="modal-shadow"><div class="modal-container"><div class="modal-body"><div class="modal-header"><h2>Оформление подписки</h2><div class="close-click"><i class="fa fa-times" aria-hidden="true"></i></div></div><div class="modal-content"><p></p></div></div></div></div></div>');

      if (!subscriptionFormInput.val()) {
        window.find('.modal-content p').html('Введите email!');
        window.insertAfter($('#add-to-basket')).show();
        window.find('.close-click').click(function () {
          window.remove();
        });

        return false;
      }

      $.ajax({
        url: '/local/php_interface/include/subscribe.php',
        method: 'POST',
        data: {
          'email': subscriptionFormInput.val(),
          'subscrId': 10
        }
      }).done(function (answer) {
        var window = $('<div class="modal-window" id="subscribe-form"><div class="modal-shadow"><div class="modal-container"><div class="modal-body"><div class="modal-header"><h2>Оформление подписки</h2><div class="close-click"><i class="fa fa-times" aria-hidden="true"></i></div></div><div class="modal-content"><p></p></div></div></div></div></div>');
        var res = JSON.parse(answer);

        if (res.result === 'success') {
          window.find('.modal-content p').html('Вы успешно подписались на рассылку &laquo;Оранжевый четверг&raquo;');
          window.insertAfter($('#add-to-basket')).show();
          window.find('.close-click').click(function () {
            window.remove();
            subscriptionFormInput.val('').fadeOut();
            $('.subscribe-for-item').animate({
              left: 0,
              width: 370
            }, function () {
              $(this).find($('span')).html('унать о следующей акции');
            });
          });
        } else {
          window.find('.modal-content p').html('Произошла ошибка. Пожалуйста, попробуйте еще раз позднее.');
          window.insertAfter($('#add-to-basket')).show();
          window.find('.close-click').click(function () {
            window.remove();
          });
        }
      });
    } else {
      defButtonWidth = $('.subscribe-for-item').outerWidth();
      defInputWidth = subscriptionFormInput.outerWidth();
      smallButtonWidth = 97;

      $(this).animate({
        left: defInputWidth,
        width: smallButtonWidth
      });

      subscriptionFormInput.fadeIn();

      $(this).find($('span')).html('ok');
    }
  });

  if ($('#recommended').length > 0) {
    $('<li><a href="javascript:void(0)" data-target="recommended" title="Аксессуары">Аксессуары</a></li>').insertAfter($('a[data-target=characteristics]').parent());
  }

  $(document).on('click', '.detail-tab__point:not(.price-buy) a', function () {
    if ($(this).data('target')) {
      $('.catalog-item#' + $(this).data('target')).addClass('current');
      $('.catalog-item:not(#' + $(this).data('target') + ')').removeClass('current');
      $(this).parent('.detail-tab__point').addClass('detail-tab__point-current');
      $(this).parent('.detail-tab__point').siblings('.detail-tab__point').removeClass('detail-tab__point-current');
    }
  });

  $(document).on('click', '#overview .item-image img', function () {
    $('#itemMenuLiFirst').removeClass('detail-tab__point-current');
    $('#itemMenuLiSecond').addClass('detail-tab__point-current');
    $('#overview').removeClass('current');
    $('#gallery').addClass('current');
  });

  $(document).on('click', '#characteristics .item-image img', function () {
    $('.detail-tab__menu .detail-tab__point:nth-of-type(3)').removeClass('detail-tab__point-current');
    $('#itemMenuLiSecond').addClass('detail-tab__point-current');
    $('#characteristics').removeClass('current');
    $('#gallery').addClass('current');
  });


  // item detail scripts
  $('.versions label').click(function () {
    var purpose = $(this).data('target');
    var word = $(this).data('word');
    var prod = $(this).data('id');
    if ($(this).hasClass('unavailable'))
      return false;

    $('.choice-body .versions input[data-option="' + purpose + '"]:not(:disabled)').attr('checked', true).change();
    $('.choice-body .versions input[data-option!="' + purpose + '"]').attr('checked', false).change();

    $('.item-image.image-wrap').children('img[data-color="' + purpose + '"]').show();
    $('.item-image.image-wrap').children('img[data-color!="' + purpose + '"]').hide();

    $('.card-pickup').hide();
    $('.card-pickup.' + $(this).data('id')).show();

    $('.item-buttons div').hide();
    $('.item-buttons .' + $(this).data('id')).show();

    $('.price-buy .open-modal, .price-buy .not-available').hide();
    $('.price-buy .' + $(this).data('id')).show();

    $('.choice .version').html(word);

    $('.versions input[data-option="' + purpose + '"]:not(:disabled)').attr('checked', true).change();
    $('.versions input[data-option!="' + purpose + '"]').attr('checked', false).change();
    $('.image-wrap').children('img[data-color="' + purpose + '"]').show();
    $('.image-wrap').children('img[data-color!="' + purpose + '"]').hide();

    $('.buy-item').attr('action', $('.buy-link#' + purpose).val());

    $('.product-special_href').each(function () {
      $(this).attr('href', 'https://mi-shop.com/ru/personal/add2BasketArr.php?access=' + $(this).data('id') + '&prod=' + prod);
    });
  });


  $('.card-recommended__btn-add').click(
    function (e) {
      var thisParent = $(this).parent();
      e.preventDefault();
      thisParent.prepend('<img src="/local/templates/main/ajax-loader.gif" alt="" class="card-recommended__loader">');

      $.ajax({
        type: "GET",
        url: $(this).attr("href"),
        success: function () {
          thisParent.toggleClass('card-recommended__added');
          $('.card-recommended__loader').delay(500).fadeOut();
        }
      });
    }
  );


  $('.map-link').click(function () {
    var selector = $(this),
      name = selector.data('name'),
      address = selector.data('address'),
      coords = selector.data('coords').split(';', 2),
      title = name,
      linkTo = '/personal/ajax.php';

    $.ajax({
      url: linkTo + '?coords=' + coords + '&address=' + address + '&name=' + name,
      method: 'GET'
    }).done(function (result) {
      $('.map-modal__header').html('<h3>' + title + '</h3>');
      //$('.pickpoint-map').show();
      $('.map-modal__body').html(result);
    });
  });
  $('body').on("DOMNodeInserted", function () {
    $('.map-modal .fancybox-close-small').click(function () {
      $('.map-modal__header h3').remove();
      $('.map-modal__body').html();
    });
  });
  /*UNKNOWNEND*/


  /*TAG*/
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
  var catalogTags = $('.catalog-tags'),
    catalogTagsToggle = $('.catalog-tags__toggle'),
    catalogTagsList = $('.catalog-tags__list');


  catalogTagsToggle.click(function () {
    catalogTags.toggleClass('catalog-tags__opened');
  });

  if ((isMobile.any())) {
    catalogTagsToggle.click(function () {
      if (catalogTags.hasClass('catalog-tags__opened')) {
        catalogTagsList.css({"display": "flex"});
      } else {
        catalogTagsList.css({"display": "none"});
      }
    });
    $('.catalog-tags__roll-up').click(function () {
      catalogTagsList.css({"display": "none"});
      catalogTags.toggleClass('catalog-tags__opened');
    });
  }

  $('.js-back').click(function () {
    location.href = $(this).data('href');
  });
  /*TAGEND*/
});

/**
 * Выяснить что далле/выпилить ненужный спиннер и его функционал*/
$('.pickpoints a, #card-pickup-stores, #card-pickup-im').click(function () {
  if ($(this).data('target')) {
    var target = $(this).data('target');
    var link = $('.detail-tab__point a[data-target=' + target + ']').parent('.detail-tab__point-current');
    $('.catalog-item#' + target).addClass('current');
    $('.catalog-item:not(#' + target + ')').removeClass('current');
    $(link).addClass('detail-tab__point-current');
    $(link).siblings('.detail-tab__point').removeClass('detail-tab__point-current');
  }
});



let spinner = '<svg class="lds-balls" xmlns="http://www.w3.org/2000/svg"' +
  ' xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="width:100px;height:100px;margin-left:auto;margin-right:auto"><circle cx="79.6491" cy="50.9642" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="80;72.98133329356934" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="50;69.28362829059617" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle><circle cx="72.0927" cy="69.7967" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="72.98133329356934;55.20944533000791" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="69.28362829059617;79.54423259036625" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle><circle cx="54.199" cy="79.3661" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="55.20944533000791;35.00000000000001" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="79.54423259036625;75.98076211353316" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle><circle cx="34.3405" cy="75.1947" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="35.00000000000001;21.80922137642275" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="75.98076211353316;60.260604299770065" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle><circle cx="21.8092" cy="59.2345" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="21.80922137642275;21.809221376422748" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="60.260604299770065;39.73939570022994" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle><circle cx="22.4688" cy="38.9534" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="21.809221376422748;34.999999999999986" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="39.73939570022994;24.019237886466847" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle><circle cx="36.0105" cy="23.8411" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="34.999999999999986;55.209445330007895" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="24.019237886466847;20.455767409633758" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle><circle cx="56.098" cy="20.9688" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="55.209445330007895;72.98133329356934" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="20.455767409633758;30.716371709403813" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle><circle cx="73.3323" cy="31.6806" r="5" fill="#ff6700">\n' +
  '                            <animate attributeName="cx" values="72.98133329356934;80" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="cy" values="30.716371709403813;49.99999999999999" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                            <animate attributeName="fill" values="#ff6700;#ff6700" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>\n' +
  '                        </circle>\n' +
  '                    </svg>';


window.addEventListener('load', onLoad, {passive: true});

function onLoad() {
  setSpinner();
}

function setSpinner() {
  $('.media-content-item:not(:has(.media-content-inner))').first().html(spinner);
}

window.addEventListener('scroll', onScroll, {passive: true});

let inProgress = false;

function onScroll() {
  let downPos = window.innerHeight + window.scrollY;
  let firstSpinner = $('.media-content-item .lds-balls').first();

  if (firstSpinner.length === 0 || !!inProgress) {
    return false;
  } else {
    let firstBanner = firstSpinner.parent();

    if (downPos >= firstBanner.offset().top) {
      let bannerId = firstBanner.attr('id').replace('media-content-item__', '');
      inProgress = true;

      getBanner(bannerId);
    }
  }
}

function getBanner(bannerId) {
  $.ajax({
    url: componentFolder + '/ajax.php',
    method: 'POST',
    data: {
      'AJAX': 'Y',
      'action': 'get_banner',
      'elementID': elementID,
      'bannerId': bannerId
    }
  }).done(function (banner) {
    if (banner.length > 0) {
      showBanner(bannerId, banner);
    }
  });
}

function showBanner(bannerId, banner) {
  $('#media-content-item__' + bannerId).hide().replaceWith($(banner).attr('id', 'media-content-item__' + bannerId));
  $('#media-content-item__' + bannerId).hide().fadeIn(500, function () {
    inProgress = false;
    setSpinner();
  });
}
