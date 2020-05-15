export default function clickBuy() {
  $('.js-buy').unbind('click');
  $('.js-buy').click(function () {
    //добавляем выбранное торговое предложение в корзину
    var offerId = $(this).data('offerid'),
      productName = $(this).data('name'),
      price = new Intl.NumberFormat('ru-RU').format(parseInt($(this).attr('data-price').replace(/\s+/g, ''))),
      oldPrice = new Intl.NumberFormat('ru-RU').format(parseInt($(this).attr('data-old-price').replace(/\s+/g, ''))),
      url = $(this).data('url'),
      img = $(this).data('img');

    $('.js-modal-name').text(productName);
    $('.js-modal-price').text(price + ' ₽');
    $('.js-modal-old-price').text(oldPrice + ' ₽');
    $('.js-modal-img').attr({'src': img, 'alt': productName});

    $('#buy-modal').modal('show');

    $('#buy-modal .modal-content').addClass('ajax-overlay');

    $.ajax({
      url: '/local/components/mi/el.catalog.element/ajax.php',
      method: 'POST',
      data: {
        action: "add2Basket",
        offerId: offerId
      },
    }).done(function (result) {
      var json = JSON.parse(result);
      $('#detail-modal__footer-in-basket').html(json['BASKET']['IN_BASKET']);
      $('.header__basket.data-basket-amount').attr('data-basket-amount', json['BASKET']['QUANTITY']);
      $('#buy-modal .modal-content').removeClass('ajax-overlay');
    });
  });

  $('.js-close-modal').click(function (e) {
    e.preventDefault();
    $('#buy-modal').modal('hide');
  });
}