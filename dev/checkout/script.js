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

$(document).ready(function () {

    /* Условия для определения мобильных устройств */
    if (!(isMobile.any())) {
        /* Инициализация липкого блока поалаты http://joxi.ru/ZrJqB3guwdMyPA */
        $('.js__basket-total').stick_in_parent({
            parent: '.js__basket-parent',
            inner_scrolling: true,
            offset_top: 15
        });
        /* END */
    } else {
        /* Плавная прокрутка к первому табу для мобильных устройств */
        $('#basket-tab-nav-1').on('click', function () {
            let top = $('.basket-tab-content').offset().top;
            $('html, body').animate({scrollTop: top}, 1500)
        });
        /* END */
    }
    /* END */


    /* Нажатие плюс минус на товаре */
    var basketProductAmountCost = $(".basket-product__amount-count");

    /*$(".basket-product__amount-plus").on('click', function () {
        var id = $(this).data('id'),
            count = $("#basket-product__amount-count-" + id).text();
        count++;
        $('#basket-product__amount-count-' + id).html(count);
    });*/
    //$(".basket-product__amount-minus").on('click', function () {
        /*var count = basketProductAmountCost.text();
        if (count > 1) {
            basketProductAmountCost.html(parseInt(count) - 1);
        }*/

        /*var id = $(this).data('id'),
            count = $("#basket-product__amount-count-" + id).text();
        if(count > 1) {
            count--;
            $('#basket-product__amount-count-' + id).html(count);
        }
    });*/
    /* END */

    $('#soa-property-3').inputmask("+7 (999) 999-9999");
    /* END */

    /* Добавляет активный класс для блоков дня доставки http://joxi.ru/Grqel3Nf47klOr */
    $('.js__basket-delivery-day').click(function () {
        $('.js__basket-delivery-day.active').removeClass('active');
        $(this).toggleClass('active');
    });
    /* END */


    /* Добавляет активный класс для блоков оплаты http://joxi.ru/MAjMdWXSj9xgD2 */

    $('.js__basket-payment-item').click(function () {
        $('.js__basket-payment-item.active').removeClass('active');
        $(this).toggleClass('active');
    });
    /* END */

    /* Открытие и закрытие инпута для ввода купона */
    /*$('.js__basket-total__coupon-apply').on('click', function () {
        //console.log('Открытие и закрытие инпута для ввода купона');
        $('.js__basket-total__coupon-field').fadeToggle();
    });*/
    /* END */


    /* Выбор подарка */
    $('.js__basket-select-gift').on('click', function () {
        var dataChoose = $(this).data('choose');

        $('.js__basket-product-gift').each(function (index, el) {
            var v = $(el).data('select');

            if (dataChoose === v) {
                $('.basket-gift').fadeOut();
                $(el).fadeIn();
            }
        });
    });

    $('.js__basket-choose-gift, .js__basket-gift__close').on('click', function () {
        $('.basket-gift').fadeIn();
        $(this).parents('.basket-product__row').fadeOut();
    });
    /* END */


    /* Этот скрипт выбирает единственного потомка и при нажатии на крестик удаляет ВСЁ http://joxi.ru/v29JR9KtZMzW3A and http://joxi.ru/n2YzLG4iblZO5A */
    if ($('.basket-product__list .basket-product__row:only-child')) {
        $('.js__basket-product__row-close').on('click', function () {
            var data = $(this).data('id');
            //$('.basket-top > h1, .basket-product__row, .basket-aside, .basket-gift, .basket-container').fadeOut();
            //$('.basket-empty').fadeIn();

            //$('#basket-item-' + data).fadeOut();
            $('#basket-item-' + data).remove();

            $('.basket-items-list-container').css({'min-height': '0'});
            $('.basket-items-list').css({'min-height': '0'});
        });
    }
    /* END */
});
