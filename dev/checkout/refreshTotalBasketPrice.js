//пересчёт общей стоимости товаров в корзине
export function refreshTotalBasketPrice() {
  var productsTotal = 0,         //общая стоимость товаров в корзине
    basketProductsTotal = 0,   //количество товаров в корзине
    discountTotal = 0,         //общая скидка на товары
    prTotal;

  $('.basket-product__price').each(function (i, elem) {
    prTotal = $(this).text().replace(/[^-0-9]/gim, '');

    if (prTotal == 'Подарок')
      prTotal = 0;

    productsTotal += parseInt(prTotal);
    basketProductsTotal++;

  });

  /**
   * Пересмотреть логику форматирования цен*/
  $('.basket-product__old').each(function (i, elem) {
    var diff = parseInt($(this).text().replace(/[^-0-9]/gim, '')) - parseInt($(this).parent().find('.basket-product__price').text().replace(/[^-0-9]/gim, ''));
    discountTotal += diff;
  });

  var discountDeliveryType = $('#hidden-discountDeliveryType').val(),
    discountDeliveryValue = $('#hidden-discountDeliveryValue').val(),
    discountDeliveryUnit = $('#hidden-discountDeliveryUnit').val(),
    deliveryPrice = $('#delivery-price').text(),    //стоимость доставки
    finalDeliveryPrice;

  if (deliveryPrice === 'Бесплатно' || !!deliveryPrice) {
    deliveryPrice = 0;
  }

  switch (discountDeliveryType) {
    case 'Discount':
      if (discountDeliveryUnit == 'Perc') {
        finalDeliveryPrice = deliveryPrice - deliveryPrice / 100 * discountDeliveryValue;
        if (finalDeliveryPrice == 0) {
          $('#delivery-price').text('Бесплатно');
          $('#delivery-price-rub').hide();
          $('#delivery-price-pickpoint').text('0');
          $('#basket-tab-nav-2-delivery-price').text('0');
        } else {
          $('#delivery-price').text(finalDeliveryPrice);
          $('#delivery-price-rub').show();
          $('#delivery-price-pickpoint').text(finalDeliveryPrice);
          $('#basket-tab-nav-2-delivery-price').text(finalDeliveryPrice);
        }
      } else {    //Cur
        finalDeliveryPrice = parseInt(deliveryPrice) - parseInt(discountDeliveryValue);
        $('#delivery-price').text(finalDeliveryPrice);
        $('#delivery-price-rub').show();
        $('#delivery-price-pickpoint').text(finalDeliveryPrice);
        $('#basket-tab-nav-2-delivery-price').text(finalDeliveryPrice);
      }
      break;

    case 'Extra':
      if (discountDeliveryUnit == 'Perc') {
        finalDeliveryPrice = parseInt(deliveryPrice) + parseInt(deliveryPrice / 100 * discountDeliveryValue);
        if (finalDeliveryPrice == 0) {
          $('#delivery-price').text('Бесплатно');
          $('#delivery-price-rub').hide();
          $('#delivery-price-pickpoint').text('0');
          $('#basket-tab-nav-2-delivery-price').text('0');
        } else {
          $('#delivery-price').text(finalDeliveryPrice);
          $('#delivery-price-rub').show();
          $('#delivery-price-pickpoint').text(finalDeliveryPrice);
          $('#basket-tab-nav-2-delivery-price').text(finalDeliveryPrice);
        }
      } else {    //Cur
        finalDeliveryPrice = parseInt(deliveryPrice) + parseInt(discountDeliveryValue);
        $('#delivery-price').text(finalDeliveryPrice);
        $('#delivery-price-rub').show();
        $('#delivery-price-pickpoint').text(finalDeliveryPrice);
        $('#basket-tab-nav-2-delivery-price').text(finalDeliveryPrice);
      }
      break;
  }

  $('#basket-quantity-total').text(basketProductsTotal);

  //$('.header__basket.data-basket-amount').attr('data-basket-amount').text(basketProductsTotal);

  //... товаров на сумму
  $('#basket-total__line-upper').text(new Intl.NumberFormat('ru-RU').format(productsTotal));


  //скидка на товары
  $('#basket-total__line-li-discount-price').text(new Intl.NumberFormat('ru-RU').format(discountTotal));
  if (!discountTotal)
    $('#basket-total__line-li-discount').hide();

  if ($('#delivery-price').text() != 'Бесплатно' && $('#delivery-price').text() != '')
    productsTotal += parseInt($('#delivery-price').text());

  //стоимость итого
  $('.basket-total__cost.text-bold').text(new Intl.NumberFormat('ru-RU').format(productsTotal));

}