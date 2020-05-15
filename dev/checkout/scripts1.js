import {validBasketForm} from "../functions/Validate";
import {refreshTotalBasketPrice} from "./refreshTotalBasketPrice";

function toggleOverlay(element) {
  $(element).toggleClass('ajax-overlay');
}

$(document).ajaxStart(function() {
  toggleOverlay($('.js__basket-total'));
}).ajaxStop(function () {
  toggleOverlay($('.js__basket-total'));
});

$(document).ready(function () {
  //$("select#basket-delivery-date").click(function() {
  $("select.custom-select.delivery-date").click(function() {
    $('#hidden-cse-delivery-time-from').val($(this).children(":selected").data('from'));
    $('#hidden-cse-delivery-time-to').val($(this).children(":selected").data('to'));
  });

  $(".basket-delivery-day").click(function() {
    $('#hidden-cse-delivery-date-from').val($(this).data('fulldate'));
    $('#hidden-cse-delivery-date-to').val($(this).data('fulldate'));
  });

  /*var sumDiscount = 0;
  $('.basket-product__old').each(function (i, elem) {
    var diff = parseInt($(this).text()) - parseInt($(this).parent().find('.basket-product__price').text());
    sumDiscount += diff;
  });
  console.log(sumDiscount);*/

  $('#basket-tab-nav-83').find('.card-b').find('.card-b-text').text('');

  //проверка наличия товаров в корзине на складе ИМ для скрытия или показа плашек доставки курьером и самовывоза из пункта выдачи pickpoint
  checkBasketProductAvailable();

  //проверяем на нужный товар в корзине, для которого должна быть только оплата онлайн (Mi Note 10)
  /*$('.basket-product__row').each(function (i, elem) {
    if($(this).data('id') == 3633 || $(this).data('id') == 3634 || $(this).data('id') == 3635) {
      $('#basket-payment-item-7, #basket-payment-item-2, #basket-payment-item-6').remove();
      return false;
    }      
  });*/ 

//удаление товара из корзины
  $('.close.js__basket-product__row-close').on('click', function () {
    var productId = $(this).data('id');
    $.ajax({
      url: '/local/components/mi/checkout/templates/.default/ajax.php',
      method: 'POST',
      data: {action: "deleteProduct", productId: productId},
    }).done(function (result) {
      $('#product-row-' + productId).remove();
      refreshTotalBasketPrice();
      document.location.reload(true);
    });
  });

  $('.basket-product__amount-count').each(function (item) {
    if ($(this).text() <= 1) {
      $(this).siblings('.basket-product__amount-minus').css({'pointer-events': 'none'});
    } else {
      $(this).siblings('.basket-product__amount-minus').css({'pointer-events': 'initial'});
    }
  });

//изменение количества товаров в корзине с изменением общей стоимости товара и общей стоимости корзины
  $('.basket-product__amount-minus, .basket-product__amount-plus').on('click', function () {
    var direction = $(this).data('direction'),
      productBasketId = $(this).data('id'),
      price = $(this).data('price'),
      retailPrice = $(this).data('retail'),
      quantity = $('#basket-product__amount-count-' + productBasketId).text();

    if (direction == 'minus') {
      if (quantity > 1)
        quantity--;
    }
    if (direction == 'plus')
      quantity++;

    checkBasketProductAvailable();

    $.ajax({
      url: '/local/components/mi/checkout/templates/.default/ajax.php',
      method: 'POST',
      data: {action: "changeQuantity", productBasketId: productBasketId, quantity: quantity},
      //async: false
    }).done(function (result) {
      //обновляем количество этого товара
      $('#basket-product__amount-count-' + productBasketId).text(quantity);

      //обновляем общую стоимость этого товара
      $('#product-total-' + productBasketId).text(quantity * Math.floor(price));
      $('#product-total-retail-' + productBasketId).html(quantity * Math.floor(retailPrice) + ' ₽');

      //обновляем итоговую стоимость в корзине
      refreshTotalBasketPrice();

      //перезагружаем страницу, чтобы учитывать правила корзины, подарков и пр.
      document.location.reload(true);
    });
  });

  $('.js-basket-get').click(function () {
    $('.js-basket-type-orders').removeClass('warn-message');
    if (!$('.basket-tab-nav__item').hasClass('.active')) {
      $('.basket-tab-nav__item').removeClass('warn-message');
    }
  });
  $('.js__basket-payment-item').click(function () {
    $('.js-valid-btns').removeClass('warn-message');
  });

  //Инициализация валидации полей
  validBasketForm.initValidate(clickSendBtn);

  //Условие смены классов
  function watchInput() {
    if (this.value === '') {
      $(this).parent().removeClass('input-success').addClass('input-error');
    } else if (this.value !== '') {
      $(this).parent().removeClass('input-error').addClass('input-success');
    }
  }

  function scrollToError() {
    //Скролл к ошибке
    if ($('.warn-message').length > 0) {
      $("html,body").animate({scrollTop: $('.warn-message').offset().top}, 1000);
      return false;
    }
    if ($('.input-error').length > 0) {
      $("html,body").animate({scrollTop: $('.input-error').offset().top}, 1000);
      return false;
    }
  }

  //dadata + доп. валидация
  $("#address")
    .on('input', watchInput)
    .suggestions({
      token: "ef4e8d14c532c945300bc454fef28351460dcdda",
      type: "ADDRESS",
      /* Вызывается, когда пользователь выбирает одну из подсказок */
      onSelect: function (suggestion) {
        var paySystemId = $('.basket-payment-item.js__basket-payment-item.active').data('id');

        $('#hidden-fias').val(suggestion.data.fias_id);

        $('#address').attr('data-city', suggestion.data.city);

        $('.col-12.col-lg-12.col-xl-10.form-group').hide();

        if (suggestion.data.city == 'Москва')
          $('#div-delivery-date-time-moscow').show();
        else
          $('#div-delivery-date-time-moscow').hide();

        if (suggestion.data.city == 'Санкт-Петербург')
          $('#div-delivery-date-time-spb').show();
        else
          $('#div-delivery-date-time-spb').hide();

        /*if(suggestion.data.city == 'Санкт-Петербург')
            $('#div-delivery-date-time-spb').show();*/

        $.ajax({
          url: '/local/components/mi/checkout/templates/.default/ajax.php',
          method: 'POST',
          data: {
            action: "getPaySystemDiscountsCSE",
            paySystemId: paySystemId,
            currentDeliveryPrice: 0,
            oldPrice: 0,
            deliveryRegion: suggestion.data.city,
            city: suggestion.data.city,
            region_type: suggestion.data.city_type,
          },
        }).done(function (result) {
          result = result.replace('<br>', '');

          //округляем стоимость доставки
          result = Math.round(result / 100) * 100;

          $('#delivery-price').text(result);

          $('#delivery-price').attr('data-oldprice', result);

          $('#delivery-price-rub').show();

          $('#hidden-pricedelivery').val(result);

          //стоимость доставки на плашке курьерской доставки CSE
          $('#delivery-cse-price').html('<span class="text-bold">' + result + ' ₽</span>');

          if(suggestion.data.city == 'Москва' || suggestion.data.city == 'Санкт-Петербург')
            $('#span-delivery-cse').html('3 000');
          else
            $('#span-delivery-cse').html('10 000');

          $('#basket-tab-nav-85').attr('data-pricedeliverysystem', result);

          refreshTotalBasketPrice();

          deliveryRecount(0, paySystemId, getSelectedDelivery());
        });
      }
    });
  //Поле квартир
  $('#basket-delivery-apartment').on('input', watchInput);

  ///Коллбэк передаваемый в валидацию в случае успеха(заполненных полей)
  function clickSendBtn() {
    //выбран ли подарок
    if ($('#choose-gift').length > 0) {
      alert('Необходимо выбрать подарок.');
      return false;
    }

    //Проверка адреса
    if ($('[data-target="#basket-tab-1"].active').length > 0) {
      scrollToError();
    }

    //проверка получения заказа
    if ($('.basket-tab-nav__item.active').length <= 0) {
      $('.js-basket-type-orders').addClass('warn-message');
      if ($('.basket-payment-item.js__basket-payment-item.active').length <= 0) {
        $('.js-valid-btns').addClass('warn-message');
      }
    }

    //Проверка выбранной точки
    if (!$('#store-concrete-panel').hasClass('check-btn')) {
      $('[data-target="#basket-tab-3"].active').addClass('warn-message');
    }
    if (!$('#pickpoint-concrete-panel').hasClass('check-btn')) {
      $('[data-target="#basket-tab-2"].active').addClass('warn-message');
    }

    //Проверка оплаты
    if ($('.basket-payment-item.js__basket-payment-item.active').length <= 0) {
      $('.js-valid-btns').addClass('warn-message');
    }

    scrollToError();

      //проверяем наличие торговых предложений из корзины при доставке курьером, в pickpoint или в выбранном самовывозе
      //получаем ID всех торговых предложений в корзине
      var deliveryID = getSelectedDelivery();
      if(deliveryID == 85 || deliveryID == 82 || deliveryID == 83 || deliveryID == 68 || deliveryID == 87) {
        //ID выбранного самовывоза
        var storeID = $('#hidden-storeid').val();
        if(deliveryID == 83 || deliveryID == 68 || deliveryID == 87)
            storeID = 2;

      //получаем ID торговых предложений в корзине
      //получение остатков
      $.ajax({
        url: '/local/components/mi/checkout/templates/.default/ajax.php',
        method: 'POST',
        data: {
          action: "checkBasketProductsAvailable",
          storeid: storeID,
          basketIds: getBasketIds(),
          basketProductsQuantity: getBasketProductsQuantity()
        },
        async: false
      }).done(function (result) {
        if (result == 'недостаточно') {
          alert('Недостаточно товаров в выбранной точке самовывоза. Выберите другую точку самовывоза.');
          return false;
        } else {
          //способы доставки
          $('.basket-tab-nav__item').each(function (i, elem) {
            if ($(this).attr('class') == 'basket-tab-nav__item active') {
              $('#hidden-deliverysystemid').val($(this).data('id'));
              return false;
            }
          });

          var addressDelivery = $('#address').val(),
              apartment = $('#basket-delivery-apartment').val(),
              basketDeliveryComment = $('#basket-delivery-comment').val(),
              dataTimeDelivery = $('.basket-delivery-day.js__basket-delivery-day.active').text(),
              hoursDelivery = $('#basket-delivery-date').val(),
              fullComment;

          if($('.basket-payment-item.js__basket-payment-item.active').data('id') == 6)    //если рассрочка
            fullComment = basketDeliveryComment;
          else if ($('#hidden-citydelivery').val() == 'Москва')
            fullComment = basketDeliveryComment + ' ' + dataTimeDelivery + ' ' + hoursDelivery;
          else
            fullComment = basketDeliveryComment;

          $('#hidden-usercomment').val(fullComment);
          $('#hidden-addressdelivery').val(addressDelivery + ' ' + apartment);

          $('#ready_to_submit').val('Y');
        }
      });
    }
    if ($('.input-error').length <= 0 && $('.warn-message').length <= 0) {
      $('#order-form').submit();
    }
  }

//применение купона к заказу (корзине)
  $(document).on("click", ".js-submit-cupon", function () {
    //var coupon = "SL-NXSP0-RUYRYM7";

    const inputCupon = $('.js__basket-total__coupon-field');

    function addErrCupon() {
      $('.js-cupon-err').show();
      $('.js__basket-total__coupon-field').addClass('mod-err');
    }

    var coupon = inputCupon.val();
    if (coupon !== '') {
      $.ajax({
        url: '/local/components/mi/checkout/templates/.default/ajax.php',
        method: 'POST',
        data: {action: "add-coupon", coupon: coupon},
      }).done(function (result) {
        if(result!=1) {
          addErrCupon();
        } else {
          $('.js-cupon-err').hide();
          inputCupon.removeClass('mod-err');
          document.location.reload(true);
        }
      });
    } else {
      addErrCupon();
    }
  });

//удаление купона
  $(document).on("click", ".coupon-delete", function () {
    var coupon = $(this).data('id');
    $.ajax({
      url: '/local/components/mi/checkout/templates/.default/ajax.php',
      method: 'POST',
      data: {action: "delete-coupon", coupon: coupon},
    }).done(function (result) {
      document.location.reload(true);
    });
  });

  $('.js__basket-select-gift-ajax').on('click', function () {
    var productId = $(this).data('id'),
      productName = $(this).data('name');

    $.ajax({
      url: '/local/components/mi/checkout/templates/.default/ajax.php',
      method: 'POST',
      data: {action: "addGift", productId: productId, productName: productName},
    }).done(function (result) {
      document.location.reload(true);
    });
  });

  $('.btn btn-sm.btn-default').on('click', function () {
    event.preventDefault();
  });

  $('.btn.btn-sm.btn-default').on('click', function () {
    let deliveryFromStoreId = $(this).data('id');
    $('#hidden-deliverysystemid').val(deliveryFromStoreId);

    $('.bx-soa-pickup-l-item-detail').hide();
    $(this).parent().siblings('.bx-soa-pickup-l-item-detail').show();

    $('.bx-soa-pickup-list-item.bx-selected').hide();
    $('#store-' + deliveryFromStoreId).show();
  });


  $('.user-fields').on('click, change', function () {
    $(this).removeClass('empty_field');
  });

    $('.pickup-panel-change.pickpoint').on('click', function () {
        $('#pickpoint-concrete-panel.pickpoint').hide();
        $('#pickpoint-concrete-panel').hide().removeClass('check-btn');
        $('#pickpoint-address').show();
        $('#pickUpMap').show();
    });

  $('.pickup-panel-change.store').on('click', function () {
    $('#store-concrete-panel').hide().removeClass('check-btn');
    $('#map').show();
  });

  $('.component-colors__item').on('click', function () {
    $('.component-colors__item').removeClass('mod-colors-active');
    $(this).addClass('mod-colors-active');

    var id = $(this).data('id');
    $('.btn.btn-link.js__basket-select-gift-ajax').attr('data-id', id);
  });

  //пересчитываем скидки при изменении способа получения заказа
  $('.basket-tab-nav__item').on('click', function () {
    var pricedeliverysystem = $(this).data('pricedeliverysystem'),
      paySystemId = $('.basket-payment-item.js__basket-payment-item.active').data('id'),
      deliverySystemId = $(this).data('id');

    $('#hidden-deliverysystemid').val(deliverySystemId);

    deliveryRecount(pricedeliverysystem, paySystemId, $(this).data('id'));
  });

  //пересчитываем скидки при изменении платёжной системы
  $('.basket-payment-item.js__basket-payment-item').on('click', function () {
    var paySystemId = $(this).data('id'),
        pricedeliverysystem = $('.basket-tab-nav__item.active').data('pricedeliverysystem');

    $('#hidden-paysystemid').val(paySystemId);

    deliveryRecount(pricedeliverysystem, paySystemId, getSelectedDelivery());
  });

  //пересчитываем стоимость доставки исходя из выбранного способа доставки и выбранного способа оплаты
  function deliveryRecount(currentDeliveryPrice, paySystemId, selectedDeliveryId) {
    var deliveryRegion, result;

    if(selectedDeliveryId == 85 || selectedDeliveryId == 83) {
      deliveryRegion = $('#address').attr('data-city');
    }

    if(selectedDeliveryId == 87) {
      deliveryRegion = $('#pickpoint-address').attr('data-city');
    }

    //получение скидок на товары в корзине
    $.ajax({
      url: '/local/components/mi/checkout/templates/.default/ajax.php',
      method: 'POST',
      //async:false,
      data: {
        action: "getBasketProductsDiscount",
        paySystemId: paySystemId,
        selectedDeliveryId: selectedDeliveryId,
        deliveryRegion: deliveryRegion,
      },
      }).done(function (result) {
        var json = JSON.parse(result),
          productAmount,
          discountSumm = 0;

        for (var i in json) {
            productAmount = parseInt($('#basket-product__amount-count-' + i).text());

            var res = new Intl.NumberFormat('ru-RU').format(Math.floor(json[i]['PRICE']) * productAmount);
            $('#product-total-' + i).text(res + ' ₽');

            //пересчитываем сумму скидки
            discountSumm += parseInt(json[i]['DISCOUNT'] * productAmount);
        }

        refreshTotalBasketPrice();

        /*if(discountSumm > 0) {
          $('#basket-total__line-li-discount-price').text(discountSumm);
          $('#basket-total__line-li-discount').show();

          //basket-total__cost text-bold
        } else {
          //$('#basket-total__line-li-discount').hide();
        }*/
      })

      //refreshTotalBasketPrice();

    //необходимо получить стоимость доставки из правила работы с корзиной
    //если стоимость доставки из правила != 0, получаем стоимость доставки для выбранного способа доставки

    if(selectedDeliveryId == 85 || selectedDeliveryId == 83) {
      //только для доставки курьером КСЭ
      deliveryRegion = $('#address').attr('data-city');

      if(deliveryRegion != undefined) {
        $.ajax({
          url: '/local/components/mi/checkout/templates/.default/ajax.php',
          method: 'POST',
          data: {
            action: "getPaySystemDiscountsCSE",
            paySystemId: paySystemId,
            currentDeliveryPrice: currentDeliveryPrice,
            oldPrice: currentDeliveryPrice,
            deliveryRegion: deliveryRegion
          },
        }).done(function (result) {
          if (result) {
            $('#delivery-price').text(result);
            $('#delivery-price-rub').show();
            $('#delivery-cse-price').html('<span class="text-bold">' + result + ' ₽</span>');

            if(deliveryRegion == 'Москва' || deliveryRegion == 'Санкт-Петербург')
              $('#span-delivery-cse').html('3 000');
            else
              $('#span-delivery-cse').html('10 000');

            refreshTotalBasketPrice();

            return result;
          }
        });
      }
    } else if(selectedDeliveryId == 87) {
      deliveryRegion = $('#pickpoint-address').attr('data-city');

      if(deliveryRegion != undefined) {
        var zone = $('#pickpoint-address').attr('data-city-zone');

        $.ajax({
          url: '/local/components/mi/checkout/templates/.default/ajax.php',
          method: 'POST',
          data: {
            action: "getPaySystemDiscountsPickpoint",
            paySystemId: paySystemId,
            currentDeliveryPrice: currentDeliveryPrice,
            oldPrice: currentDeliveryPrice,
            deliveryRegion: deliveryRegion,
            zone: zone
          },
        }).done(function (result) {
          if (result) {
            $('#delivery-price').text(result);
            $('#delivery-price-rub').show();
            $('#basket-tab-nav-2-delivery-price').text(result);
            $('#delivery-price-pickpoint').text(result);
            refreshTotalBasketPrice();
            
            return result;
          }
        });
      }
    }
  }

  $('.basket-tab-nav__item').on('click', function () {
    if($(this).data('id') == 82) {
        $('#basket-payment-item-3').hide();
        $('#basket-payment-item-6').hide();
        $('#hidden-paysystemid').val('');
        $('.basket-payment-item.js__basket-payment-item.active').removeClass('active');
    } else {
        $('#basket-payment-item-3').show();
        $('#basket-payment-item-6').show();
    }
  });

  $('#basket-tab-nav-3').on('click', function () {
    $('#basket-payment-item-3').hide();
    $('#basket-payment-item-6').hide();
  });

  function getSelectedDelivery() {
    var selectedDelivery = $('.basket-tab-nav__item.active').data('id');
    return selectedDelivery;
  }

  function getBasketIds() {
    var basketIds = [];
    $('.basket-product__row').each(function (i, elem) {
      basketIds.push($(this).data('id'));
    });

    return basketIds;
  }

  function getBasketProductsQuantity() {
    var basketProdQuantity = [];
    $('.basket-product__amount-count').each(function (i, elem) {
      basketProdQuantity.push($(this).text());
    });

    return basketProdQuantity;
  }

  function checkBasketProductAvailable() {
    var allDeliveryesHidden = true;  //скрыты ли все доставки
    //проверяем остаток в корзине на складе ИМ => выводить или не выводить доставку курьером КСЭ и самовывоз из пункта выдачи pickpoint
    $.ajax({
      url: '/local/components/mi/checkout/templates/.default/ajax.php',
      method: 'POST',
      data: {
        action: "checkBasketProductsAvailable",
        storeid: 2,
        basketIds: getBasketIds(),
        basketProductsQuantity: getBasketProductsQuantity()
      },
    }).done(function (result) {
      if (result == 'недостаточно') {
        $('#basket-tab-nav-85').hide();
        $('#basket-tab-nav-83').hide();
        $('#basket-tab-nav-2').hide();

        $('.basket-tab-nav__item').each(function (i, elem) {
          if ($(this).is(':visible')) {
            allDeliveryesHidden = false;
          }
        });

        if(allDeliveryesHidden)
          $('.product-unavailable').show();

      } else {
        $('#basket-tab-nav-85').show();
        $('#basket-tab-nav-83').show();
        $('#basket-tab-nav-2').show();
      }

      $('.basket-tab-nav__item.col-md-4:visible:first').trigger('click');
    });
  }
});

