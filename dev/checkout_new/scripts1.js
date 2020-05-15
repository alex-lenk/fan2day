import {validBasketForm} from "../functions/Validate";

var map,
    clusterer,
    token = "ef4e8d14c532c945300bc454fef28351460dcdda",
    type = "ADDRESS",
    geoObjects = [],
    BalloonLayout,
    BalloonContentLayout;

const AJAX_URL = '/local/components/mi/checkout_new/templates/.default/ajax.php';

function toggleOverlay(element) {
    $(element).toggleClass('ajax-overlay');
}

function initYaMaps(domElementId) {
    return function () {
        map = new ymaps.Map(domElementId, {
            center: [55.650625, 37.62708], // Moscow default
            controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
        clusterer = new ymaps.Clusterer({
            /**
             * Через кластеризатор можно указать только стили кластеров,
             * стили для меток нужно назначать каждой метке отдельно.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
             */
            /**
             * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
             */
            groupByCoordinates: false,
            /**
             * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
             */
            clusterDisableClickZoom: false,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });

        /**
         * Можно менять опции кластеризатора после создания.
         */
        clusterer.options.set({
            gridSize: 80,
            clusterDisableClickZoom: false,
            clusterOpenBalloonOnClick: false
        });

        // Создание макета балуна
        BalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top" style="border-radius: 4px; font-family: Roboto; background-color: #fff;">' +
            '<a class="close" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=207 maxWidth=229 maxHeight=190]]' +
            '</div>' +
            '</div>',
            {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');
                    this.constructor.superclass.clear.call(this);
                },

                /**
                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onSublayoutSizeChange
                 */
                onSublayoutSizeChange: function () {
                    BalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },

                /**
                 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name applyElementOffset
                 */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onCloseClick
                 */
                onCloseClick: function (e) {
                    e.preventDefault();
                    this.events.fire('userclose');
                },

                /**
                 * Используется для автопозиционирования (balloonAutoPan).
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                 * @function
                 * @name getClientBounds
                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                 */
                getShape: function () {
                    if (!this._isElement(this._$element)) {
                        return BalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                },

                /**
                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                 * @function
                 * @private
                 * @name _isElement
                 * @param {jQuery} [element] Элемент.
                 * @returns {Boolean} Флаг наличия.
                 */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }
        ),

            // Создание макета содержимого балуна.
            // Макет создается с помощью фабрики макетов с помощью текстового шаблона.
            BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #3A3A44; font-style: normal; font-weight: normal; font-size: 12px; line-height: 135%; letter-spacing: 0.015em;">' +
                '<h2 id="pickup-point-name" style="font-size: 12px; font-weight: 600; width: 153px;">{{properties.balloonHeader}}</h2>' +
                '<span>{{properties.metro}}</span><br />' +
                '<span id="pickup-point-address">{{properties.address}}</span><br />' +
                '<span id="pickup-point-schedule" style="color: #777888;">{{properties.schedule}}</span><br />' +
                '<span id="pickup-point-image" style="display:none">{{properties.image}}</span><br />' +
                '<br />' +
                '<span class="choise" data-cityname="{{properties.cityname}}" data-postamatId="{{properties.postamatId}}" data-region="{{properties.region}}" data-warehouse="{{properties.warehouse}}" href="#" style="cursor: pointer; font-family: Gotham Pro; font-size: 14px; line-height: 13px; letter-spacing: 0.055em; text-transform: uppercase; color: #FF6700;">заберу отсюда</span>' +
                '</div>',
                {
                    // Переопределяем функцию build, чтобы при создании макета начинать слушать событие click на кнопке-счетчике.
                    build: function () {
                        // Сначала вызываем метод build родительского класса.
                        BalloonContentLayout.superclass.build.call(this);
                        // А затем выполняем дополнительные действия.
                        $('.choise').bind('click', this.onChoseClick);
                    },

                    // Аналогично переопределяем функцию clear, чтобы снять прослушивание клика при удалении макета с карты.
                    clear: function () {
                        // Выполняем действия в обратном порядке - сначала снимаем слушателя, а потом вызываем метод clear родительского класса.
                        $('.choise').unbind('click', this.onChoseClick);
                        BalloonContentLayout.superclass.clear.call(this);
                    },

                    onChoseClick: function () {
                        let pickupPoint = $(this).parent(),
                            postamatId = $(this).data('postamatid'),
                            currCity = $('#city').val(),
                            paySystemId = $('.basket-payment-item.js__basket-payment-item.active').data('id'),
                            deliverySystemId = $('.basket-tab-nav__item.active').data('id');

                        $('#pickpoint-address').attr('data-city', currCity);
                        $('.basket-tab-nav__item.active').removeClass('warn-message');

                        $.ajax({
                            url: AJAX_URL,
                            method: 'POST',
                            data: {
                                action: "setOrderDelivery",
                                deliverySystemId: deliverySystemId,
                                currCity: currCity,
                                toPt: postamatId
                            },
                        }).done(function (result) {
                            let parsedRes = JSON.parse(result);

                            if (parsedRes.success) {
                                let currBasket = parsedRes.currBasket,
                                    deliveryPrice = currBasket.deliveryPriceInfo.price_formatted,
                                    deliveryId = $('.basket-tab-nav__item.active').data('id'),
                                    pickupPointName = $(pickupPoint).find('#pickup-point-name').text(),
                                    pickupPointAddress = $(pickupPoint).find('#pickup-point-address').text(),
                                    pickupPointSchedule = $(pickupPoint).find('#pickup-point-schedule').text(),
                                    pickupPointImage = $(pickupPoint).find('#pickup-point-image').text();

                                if (deliveryId == 87) {
                                    let minPeriod = currBasket.possibleDeliveries[deliveryId].minPeriod,
                                        maxPeriod = currBasket.possibleDeliveries[deliveryId].maxPeriod,
                                        interval;

                                    if (minPeriod == maxPeriod) {
                                        interval = minPeriod;
                                    } else {
                                        interval = minPeriod + '-' + maxPeriod;
                                    }

                                    $('#basket-tab-' + deliveryId + ' .js__delivery-duration').text(interval + ' рабочих дня');
                                    $('#delivery-price-pickpoint').html(deliveryPrice);
                                    $('.pickup-point-title').text(pickupPointName);

                                    /** @todo подставлять город непосредственно в балун */
                                    $('.pickup-point-address').html(currCity + ', ' + pickupPointAddress);
                                    $('#pickpoint-concrete-panel').show().addClass('check-btn').data('pickuppoint', postamatId);
                                    $('[data-target="#basket-tab-2"].active').removeClass('warn-message');
                                    $('#pickpoint-address').hide();
                                    $('#pickUpMap').hide();
                                } else if (deliveryId == 82) {
                                    $('.popover.top').hide();
                                    $('#delivery-price').text('Бесплатно');
                                    //плашка под картой
                                    $('.pickup-point-title').text(pickupPointName);
                                    $('.pickup-point-address').text(pickupPointAddress);
                                    $('#panel-retail-store-schedule').text(pickupPointSchedule);
                                    //логотип магазина
                                    $('.retail-panel-logo').html('<img src="' + pickupPointImage + '">');
                                    $('#store-concrete-panel').show().data('pickuppoint', postamatId);
                                    $('#map').hide();
                                    $('#basket-tab-nav-3').attr('data-pricedeliverysystem', 0);
                                    $('#basket-tab-nav-3.active').removeClass('warn-message');
                                    $('#store-concrete-panel').addClass('check-btn');
                                }
                            }
                        });
                    }
                }
            );
    }
}

function setMarkers(arPlacemarks) {
    return function() {
        let placemarks = [];

        for (let i in arPlacemarks) {
            if (arPlacemarks.hasOwnProperty(i)) {
                var placemark = new ymaps.Placemark(
                    [arPlacemarks[i]['LATITUDE'], arPlacemarks[i]['LONGITUDE']],
                    {
                        //balloonHeader: 'Постамат: Вега: Измайловское 7701-357',
                        balloonHeader: arPlacemarks[i]['NAME'],
                        metro: arPlacemarks[i]['METRO_STATION'],
                        address: arPlacemarks[i]['ADDRESS'],
                        schedule: arPlacemarks[i]['WORKTIMESMS'],
                        warehouse: arPlacemarks[i]['POSTAMAT_ID'],

                        cityname: arPlacemarks[i]['CITINAME'],
                        region: arPlacemarks[i]['REGION'],
                        postamatId: arPlacemarks[i]['POSTAMAT_ID'],
                        image: arPlacemarks[i]['IMAGE']
                    },
                    {
                        balloonShadow: false,
                        balloonLayout: BalloonLayout,
                        balloonContentLayout: BalloonContentLayout,
                        // Запретим замену обычного балуна на балун-панель.
                        // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
                        balloonPanelMaxMapArea: 0,
                        hideIconOnBalloonOpen: false,
                        balloonOffset: [3, -50]
                    }
                );

                placemarks.push(placemark);
            }
        }

        clusterer.removeAll();
        clusterer.add(placemarks);
        let bounds = clusterer.getBounds();

        map.geoObjects.add(clusterer);
        map.setBounds(bounds);
    }
}

function drowMap(domElementId, arPlacemarks) {
    if (typeof map === 'undefined' || $('#' + domElementId).html().length == 0) {
        ymaps.ready(initYaMaps(domElementId));
        ymaps.ready(setMarkers(arPlacemarks));
    } else {
        ymaps.ready(setMarkers(arPlacemarks));
    }
}

function initPickpoint(currCity) {
    $.ajax({
        url: AJAX_URL,
        method: 'POST',
        data: {action: "getPickpointPostamats", currCity: currCity},
    }).done(function (result) {
        let arPlacemarks = JSON.parse(result);

        drowMap('map-pickpoint', arPlacemarks);
    });
}

function initRetail(currCity) {
    $.ajax({
        url: AJAX_URL,
        method: 'POST',
        data: {
            action: "getRetailOffices",
            currCity: currCity,
            deliverySystemId: $('.basket-tab-nav__item.active').data('id'),
        },
    }).done(function (result) {
        let arPlacemarks = JSON.parse(result);

        drowMap('map', arPlacemarks.store_info);
    });
}

function prepareModal(title, content) {
    var modalTemplate = '<div class="modal fade" id="show-user-auth" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '                   <div class="modal-dialog" role="document">' +
        '                       <div class="modal-content">' +
        '                           <a href="#" class="close-modal close" class="close"' +
        '                               data-dismiss="modal" aria-label="Close">' +
        '                               <svg><use xlink:href="/local/templates/main/images/icons.svg#close"></use></svg>' +
        '                           </a>' +
        '                           <div class="modal-body">' +
        '                               <div class="header__reg" id="show-user-body">' +
        '                                   <div class="header__reg-wrap">' +
        '                                       <span class="header__reg-title">{{title}}</span>' +
        '                                       <div>{{content}}</div>' +
        '                                   </div>' +
        '                               </div>' +
        '                           </div>' +
        '                       </div>' +
        '                   </div>' +
        '               </div>';

    var modal = modalTemplate.replace('{{title}}', title);
    modal = modal.replace('{{content}}', content);

    return modal;
}

function showModal(title, content) {
    var modal = prepareModal(title, content);

    $(modal).insertAfter('body').modal({
        show: true
    });
}

function initTab(tabId = false, city = false) {
    if (!tabId) {
        tabId = $('.basket-tab-nav__item.active').data('id');
    }

    if (!$('#basket-tab-' + tabId).hasClass('active')) {
        $('.tab-pane').removeClass('active').removeClass('show');
        $('#basket-tab-' + tabId).addClass('active').addClass('show');
    }

    if (!city) {
        city = $('#city').val();
    }

    switch (parseInt(tabId)) {
        case 83:
            break;
        case 87:
            initPickpoint(city);

            $("#pickpoint-address").suggestions({
                token: token,
                type: type,
                hint: false,
                bounds: "city-settlement",
                constraints: $("#city"),
                onSelect: function (suggestion) {
                    initPickpoint(suggestion.data.city);
                }
            });

            break;
        case 82:
            initRetail(city);
            break;
        default:
            break;
    }
}

$(document).ajaxStart(function () {
    toggleOverlay($('.js__basket-total'));
}).ajaxStop(function () {
    toggleOverlay($('.js__basket-total'));
});

$(document).ready(function () {
    let $city = $("#city"),
        $street = $("#street"),
        $house = $("#house");

    $city.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "city-settlement",
        onSelect: function (suggestion) {
            let city = suggestion.data.city;

            $.ajax({
                url: AJAX_URL,
                method: 'POST',
                data: {
                    action: "default",
                    currCity: city
                },
            }).done(function (result) {
                let parsedRes = JSON.parse(result);

                if (!!parsedRes.currBasket.errors) {
                    if ($('.basket-container').is(":visible")) {
                        $('.basket-container').hide();
                        $('.js-basket-submit').hide();
                        $('.basket-total__coupon-agree').hide();
                    }

                    let errorTitle = 'Оформление заказа невозможно',
                        errorsMesage = '<p>Дальнейшее оформление заказа невозможно по следующим причинам:</p><ul>';

                    for (let errorCode in parsedRes.currBasket.errors) {
                        if (parsedRes.currBasket.errors.hasOwnProperty(errorCode)) {
                            errorsMesage += ('<li>' + parsedRes.currBasket.errors[errorCode] + '</li>');
                        }
                    }

                    errorsMesage += '</ul>';

                    showModal(errorTitle, errorsMesage);
                } else {
                    if ($('.basket-container').is(":hidden")) {
                        $('.basket-container').show();
                        $('.js-basket-submit').show();
                        $('.basket-total__coupon-agree').show();
                    }

                    refreshDeliverySystems(parsedRes.currBasket.possibleDeliveries);
                    refreshPaySystems(parsedRes.currBasket.possiblePaySystems);

                    let tabId = $('.basket-tab-nav__item.active').data('id');
                    initTab(tabId, city);
                }
            });
        }
    });

    $street.suggestions({
        token: token,
        type: type,
        hint: false,
        bounds: "street",
        constraints: $city,
        count: 15
    });

    $house.suggestions({
        token: token,
        type: type,
        hint: false,
        noSuggestionsHint: false,
        bounds: "house",
        constraints: $street,
        onSelect: function (suggestion) {
            $house.data('fias', suggestion.data.fias_id);
        }
    });

    validBasketForm.initValidate(clickSendBtn);

    function clickSendBtn() {
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
            $('#basket-tab-nav-82.active').addClass('warn-message').append('<span class="warn-message__text">Выберите пункт выдачи заказа</span>');
        }
        if (!$('#pickpoint-concrete-panel').hasClass('check-btn')) {
            $('#basket-tab-nav-87.active').addClass('warn-message').append('<span class="warn-message__text">Выберите пункт выдачи заказа</span>');
        }

        //Проверка оплаты
        if ($('.basket-payment-item.js__basket-payment-item.active').length <= 0) {
            $('.js-valid-btns').addClass('warn-message');
        }

        scrollToError();
        /** @todo do this automatically */
        if ($('.input-error').length <= 0 && $('.warn-message').length <= 0) {
            $.ajax({
                url: AJAX_URL,
                method: 'POST',
                data: {
                    action: "createOrder",
                    currCity: $('#city').val(),
                    deliverySystemId: $('.basket-tab-nav__item.active').data('id'),
                    paySystemId: $('.basket-payment-item.js__basket-payment-item.active').data('id'),
                    userName: $('#basket-user-name').val(),
                    userPhone: $('#basket-user-phone').val(),
                    userMail: $('#basket-user-email').val(),
                    street: $('#street').val(),
                    house: $('#house').val(),
                    apartment: $('#apartment').val(),
                    fias: $('#house').data('fias'),
                    pickupPointAddress: $('.js__pickup-point-address:visible').text(),
                    deliveryDuration: $('.tab-pane:visible .js__delivery-duration').text(),
                    comment: $('#basket-delivery-comment').val(),
                    day: $('.js__basket-delivery-day.active').data('fulldate'),
                    hoursFrom: $('#basket-delivery-date option:selected').data('from'),
                    hoursTo: $('#basket-delivery-date option:selected').data('to'),
                    doNotConfirm: $('#not-confirm-phone').is(':checked'),
                    retailPoint: $('#store-concrete-panel').data('pickuppoint'),
                    pickPoint: $('#pickpoint-concrete-panel').data('pickuppoint'),
                }
            }).done(function (result) {
                let orderId = result.substring(result.length - 7, result.length);

                document.location = '/ru/personal/success.php?ORDER_ID=' + orderId;
            });
        }
    }

    if ($('.errors').length > 0) {
        let errorTitle = 'Оформление заказа невозможно',
            errorsMesage = '<p>Дальнейшее оформление заказа невозможно по следующим причинам:</p><ul>';

        $('.errors').each(function () {
            errorsMesage += ('<li>' + $(this).val() + '</li>');
        });

        errorsMesage += '</ul>';

        showModal(errorTitle, errorsMesage);
    }

    $(document).on('show.bs.tab', 'div[data-toggle="tab"]', function (e) {
        let deliverySystemId = $(this).data('id'),
            currCity = $('#city').val();

        $('.basket-tab-content .input-error').removeClass('input-error');
        $.ajax({
            url: AJAX_URL,
            method: 'POST',
            data: {
                action: "setOrderDelivery",
                deliverySystemId: deliverySystemId,
                currCity: currCity
            },
        }).done(function (result) {
            let parsedRes = JSON.parse(result);

            if (parsedRes.success) {
                refreshTotalBasketPrice(parsedRes.currBasket);
                refreshGiftList(parsedRes.currGiftList.gifts);
                refreshPaySystems(parsedRes.currBasket.possiblePaySystems);
            }
        });
    });

    $(document).on('shown.bs.tab', 'div[data-toggle="tab"]', function (e) {
        let tabId = $(e.target).data('id');

        initTab(tabId);
    });

    if ($('.basket-tab-nav__item.active').length > 0) {
        let tabId = $('.basket-tab-nav__item.active').data('id');

        initTab(tabId);
    }


    $("select.custom-select.delivery-date").click(function () {
        $('#hidden-cse-delivery-time-from').val($(this).children(":selected").data('from'));
        $('#hidden-cse-delivery-time-to').val($(this).children(":selected").data('to'));
    });

    $(".basket-delivery-day").click(function () {
        $('#hidden-cse-delivery-date-from').val($(this).data('fulldate'));
        $('#hidden-cse-delivery-date-to').val($(this).data('fulldate'));
    });

    //удаление товара из корзины
    $(document).on('click', '.close.js__basket-product__row-close', function () {
        let productId = $(this).data('id'),
            deliverySystemId = $('.basket-tab-nav__item.active').data('id'),
            currCity = $('#city').val();

        $.ajax({
            url: AJAX_URL,
            method: 'POST',
            data: {
                action: "deleteProduct",
                productId: productId,
                currCity: currCity
            },
        }).done(function (result) {
            var parsedRes = JSON.parse(result);

            if (parsedRes.success) {
                if (parsedRes.currBasket.basketItems.length == 0) {
                    document.location.reload(true);
                } else {
                    if (!parsedRes.currBasket.errors) {
                        if ($('.basket-container').is(":hidden")) {
                            $('.basket-container').show();
                            $('.js-basket-submit').show();
                            $('.basket-total__coupon-agree').show();
                        }
                    }

                    $('.basket-product__row[data-id=' + productId + ']').remove();
                    refreshTotalBasketPrice(parsedRes.currBasket);
                    refreshGiftList(parsedRes.currGiftList.gifts);
                    refreshDeliverySystems(parsedRes.currBasket.possibleDeliveries);
                    refreshPaySystems(parsedRes.currBasket.possiblePaySystems);
                }
            }
        });
    });

    //изменение количества товаров в корзине с изменением общей стоимости товара и общей стоимости корзины
    $(document).on('click', '.basket-product__amount-minus, .basket-product__amount-plus', function () {
        var direction = $(this).data('direction'),
            productBasketId = $(this).data('id'),
            quantity = $('#basket-product__amount-count-' + productBasketId).text(),
            paySystemId = $('.basket-payment-item.js__basket-payment-item.active').data('id'),
            deliverySystemId = $('.basket-tab-nav__item.active').data('id'),
            currCity = $('#city').val();

        if (direction == 'minus' && quantity > 1) {
            quantity--;
        } else if (direction == 'minus' && quantity == 1) {
            return false;
        }

        if (direction == 'plus') {
            quantity++;
        }

        $.ajax({
            url: AJAX_URL,
            method: 'POST',
            data: {
                action: "changeQuantity",
                productBasketId: productBasketId,
                quantity: quantity,
                //paymentSystemId: paySystemId,
                //deliverySystemId: deliverySystemId,
                currCity: currCity
            },
        }).done(function (result) {
            let parsedRes = JSON.parse(result);

            if (parsedRes.success) {
                refreshTotalBasketPrice(parsedRes.currBasket);

                if (!!parsedRes.currBasket.errors) {
                    if ($('.basket-container').is(":visible")) {
                        $('.basket-container').hide();
                        $('.js-basket-submit').hide();
                        $('.basket-total__coupon-agree').hide();
                    }

                    let errorTitle = 'Оформление заказа невозможно',
                        errorsMesage = '<p>Дальнейшее оформление заказа невозможно по следующим причинам:</p><ul>';

                    for (let errorCode in parsedRes.currBasket.errors) {
                        if (parsedRes.currBasket.errors.hasOwnProperty(errorCode)) {
                            errorsMesage += ('<li>' + parsedRes.currBasket.errors[errorCode] + '</li>');
                        }
                    }

                    errorsMesage += '</ul>';

                    showModal(errorTitle, errorsMesage);
                } else {
                    refreshGiftList(parsedRes.currGiftList.gifts);
                    refreshDeliverySystems(parsedRes.currBasket.possibleDeliveries);
                    refreshPaySystems(parsedRes.currBasket.possiblePaySystems);

                    if ($('.basket-container').is(":hidden")) {
                        $('.basket-container').show();
                        $('.js-basket-submit').show();
                        $('.basket-total__coupon-agree').show();
                    }
                }
            }
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

    //Поле квартир
    $('#basket-delivery-apartment').on('input', watchInput);

//применение купона к заказу (корзине)
    $(document).on("click", ".js-submit-cupon", function () {
        //var coupon = "SL-NXSP0-RUYRYM7";

        const inputCupon = $('.js__basket-total__coupon-field');

        function addErrCupon($msg = 'Введите действительный купон') {
            $('.js-cupon-err').text($msg).show();
            $('.js__basket-total__coupon-field').addClass('mod-err');
        }

        var coupon = inputCupon.val().toUpperCase();

        if (coupon !== '') {
            $.ajax({
                url: AJAX_URL,
                method: 'POST',
                data: {
                    action: "add-coupon",
                    coupon: coupon,
                    currCity: $('#city').val()
                },
            }).done(function (result) {
                let parsedRes = JSON.parse(result);

                if (!parsedRes.currBasket.hasOwnProperty('enteredCouponsInfo')) {
                    addErrCupon('Купон не найден');
                } else if (parsedRes.success && parsedRes.currBasket.enteredCouponsInfo[coupon].JS_STATUS != 'BAD') {
                    $('.js-cupon-err').hide();
                    inputCupon.removeClass('mod-err');
                    refreshTotalBasketPrice(parsedRes.currBasket);
                    refreshGiftList(parsedRes.currGiftList.gifts);
                } else {
                    addErrCupon(parsedRes.currBasket.enteredCouponsInfo[coupon].JS_CHECK_CODE);
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
            url: AJAX_URL,
            method: 'POST',
            data: {
                action: "delete-coupon",
                coupon: coupon,
                currCity: $('#city').val()
            },
        }).done(function (result) {
            let parsedRes = JSON.parse(result);

            if (parsedRes.success) {
                refreshTotalBasketPrice(parsedRes.currBasket);
                refreshGiftList(parsedRes.currGiftList.gifts);
            }
        });
    });

    $(document).on('click', '.js__basket-select-gift-ajax', function () {
        let currGift = $(this),
            productId = currGift.data('id'),
            deliverySystemId = $('.basket-tab-nav__item.active').data('id'),
            currCity = $('#city').val();

        $.ajax({
            url: AJAX_URL,
            method: 'POST',
            data: {
                action: "addGift",
                productId: productId,
                deliverySystemId: deliverySystemId,
                currCity: currCity
            },
        }).done(function (result) {
            let parsedRes = JSON.parse(result);

            if (parsedRes.success) {
                refreshTotalBasketPrice(parsedRes.currBasket);
                refreshGiftList(parsedRes.currGiftList.gifts);
                refreshDeliverySystems(parsedRes.currBasket.possibleDeliveries);
                refreshPaySystems(parsedRes.currBasket.possiblePaySystems);
            }
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

    //пересчитываем скидки при изменении платёжной системы
    $(document).on('click', '.js__basket-payment-item', function () {
        if ($(this).hasClass('active')) {
            return false;
        } else {
            let paySystemId = $(this).data('id'),
                deliverySystemId = $('.basket-tab-nav__item.active').data('id'),
                currCity = $('#city').val();

            $('.js__basket-payment-item').removeClass('active');
            $(this).addClass('active');

            $.ajax({
                url: AJAX_URL,
                method: 'POST',
                data: {
                    action: "setOrderPayment",
                    paymentSystemId: paySystemId,
                    deliverySystemId: deliverySystemId,
                    currCity: currCity
                },
            }).done(function (result) {
                let parsedRes = JSON.parse(result);

                if (parsedRes.success) {
                    refreshTotalBasketPrice(parsedRes.currBasket);
                    refreshGiftList(parsedRes.currGiftList.gifts);
                }
            });
        }
    });
});

//пересчёт общей стоимости товаров в корзине
function refreshTotalBasketPrice(basket) {
    let totalDiscountRowTemplate = '<li class="basket-total__line" id="basket-total__line-li-discount">\n' +
        '                                <div>Скидка на товары</div>\n' +
        '                                <div class="text-red">\n' +
        '                                    <span >-</span><span class="text-red" id="basket-total__line-li-discount-price">{{totalDiscount}}</span>\n' +
        '                                </div>\n' +
        '                            </li>';

    let basketProductRowTemplate = '<div class="basket-product__row" id="product-row-{{itemID}}" data-id="{{itemID}}"\n' +
        '                                 data-retail="{{base_price}}"\n' +
        '                                 data-price="{{min_price}}" data-quantity="{{quantity}}">\n' +
        '                                    <a href="{{url}}" class="basket-product__image">\n' +
        '                                        <img src="{{preview_picture}}">\n' +
        '                                    </a>\n' +
        '                                    <div class="basket-product__content">\n' +
        '                                        <div class="basket-product__name">\n' +
        '                                            <a href="{{url}}">{{name}}</a>\n' +
        '                                        </div>\n' +
        '                                        <div class="basket-product__color">{{color}}</div>\n' +
        '                                    </div>\n' +
        '                                    <div class="basket-product__amount">\n' +
        '                                            <div class="basket-product__amount-minus" data-quantity="{{quantity}}" data-direction="minus" data-id="{{itemID}}" data-price="{{price}}" data-retail="{{base_price}}">\n' +
        '                                                <svg>\n' +
        '                                                    <use xlink:href="/local/templates/main/images/icons.svg#minus"></use>\n' +
        '                                                </svg>\n' +
        '                                            </div>\n' +
        '                                            <div class="basket-product__amount-count" id="basket-product__amount-count-{{itemID}}">{{quantity}}</div>\n' +
        '                                            <div class="basket-product__amount-plus" data-quantity="{{quantity}}" data-direction="plus" data-id="{{itemID}}" data-price="{{price}}" data-retail="{{base_price}}">\n' +
        '                                                <svg>\n' +
        '                                                    <use xlink:href="/local/templates/main/images/icons.svg#plus"></use>\n' +
        '                                                </svg>\n' +
        '                                            </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="basket-product__cost">\n' +
        '                                        <div class="basket-product__price" id="product-total-{{itemID}}">{{min_price_formatted}}</div>\n' +
        '                                    </div>\n' +
        '                                    <div class="close js__basket-product__row-close" data-id="{{itemID}}">\n' +
        '                                        <svg>\n' +
        '                                            <use xlink:href="/local/templates/main/images/icons.svg#close"></use>\n' +
        '                                        </svg>\n' +
        '                                    </div>\n' +
        '                            </div>';
    let basketProductRowOldPriceTemplate = '<div class="basket-product__old" id="product-total-retail-{{itemID}}">{{base_price_formatted}}</div>';

    $('#total-product-qnt').html(basket.totalProductsQuantity_formatted);
    $('#basket-total__line-upper').html(basket.totalBaseSum_formatted);

    if (basket.totalDiscount > 0 && $('#basket-total__line-li-discount').length === 0) {
        let discountRow = totalDiscountRowTemplate.replace('{{totalDiscount}}', basket.totalDiscount_formatted);
        $(discountRow).insertAfter($('#total-product-qnt').parent().parent());
    } else if (basket.totalDiscount > 0 && $('#basket-total__line-li-discount').length > 0) {
        $('#basket-total__line-li-discount-price').html(basket.totalDiscount_formatted);
    } else if (basket.totalDiscount === 0 && $('#basket-total__line-li-discount').length > 0) {
        $('#basket-total__line-li-discount').slideUp(function () {
            $(this).remove();
        });
    }

    $('.basket-total__cost').html(basket.totalSum_formatted);

    if (basket.appliedCoupon.length > 0) {
        $('.basket-total__coupon').addClass('mod-hide-input');

        for (let key in basket.appliedCoupon) {
            if (basket.appliedCoupon.hasOwnProperty(key) && $('.coupon-delete[data-id=' + basket.appliedCoupon[key] + ']').length === 0) {
                $('<p class="basket-total__cupon-done">' + basket.appliedCoupon[key] + ' — купон применен <span' +
                    ' class="coupon-delete as-link__blue" data-id="' + basket.appliedCoupon[key] + '">удалить</span></p>').appendTo($('.basket-total__coupon'));
            }
        }
    } else {
        $('.basket-total__coupon').removeClass('mod-hide-input');
        $('.basket-total__cupon-done').remove();
    }

    for (let itemID in basket.basketItems) {
        if (basket.basketItems.hasOwnProperty(itemID)) {
            let tmpl = basketProductRowTemplate;
            let basketProductRow = tmpl
                .replace(/{{itemID}}/g, itemID)
                .replace(/{{base_price}}/g, basket.basketItems[itemID].base_sum)
                .replace(/{{min_price}}/g, basket.basketItems[itemID].sum)
                .replace(/{{quantity}}/g, basket.basketItems[itemID].quantity)
                .replace(/{{url}}/g, basket.basketItems[itemID].url)
                .replace(/{{preview_picture}}/g, basket.basketItems[itemID].preview_picture)
                .replace(/{{name}}/g, basket.basketItems[itemID].name)
                .replace(/{{color}}/g, basket.basketItems[itemID].color)
                .replace(/{{min_price_formatted}}/g, basket.basketItems[itemID].sum_formatted);

            if (!!basket.basketItems[itemID].discount) {
                let tmpl = basketProductRowOldPriceTemplate;
                var basketProductRowOldPrice = tmpl
                    .replace(/{{itemID}}/g, itemID)
                    .replace(/{{base_price_formatted}}/g, basket.basketItems[itemID].base_sum_formatted);
            }

            let domElement = $(basketProductRow);

            if (!!basketProductRowOldPrice) {
                $(basketProductRowOldPrice).prependTo(domElement.find('.basket-product__cost'));

                /**
                 * 'unset' var
                 * */
                var basketProductRowOldPrice = false;
            }

            if ($('#product-row-' + itemID).length > 0) {
                $('#product-row-' + itemID).replaceWith(domElement);
            } else {
                domElement.appendTo($('.basket-product__list'));
            }
        }
    }

    //if (!!basket.deliveryPriceInfo.price) {
    $('#delivery-price-rub').html(basket.deliveryPriceInfo.price_formatted);
    $('#delivery-price-pickpoint').html(basket.deliveryPriceInfo.price_formatted);
    $('.basket-tab-nav__item.active #js-delivery-price').html(basket.deliveryPriceInfo.price_formatted);
    //}
}

function refreshGiftList(gifts) {
    let basketGiftListContainerTemplate = '<div class="basket-gift">\n' +
        '                                      <h2 id="choose-gift">Выбрать подарок</h2>\n' +
        '                                      <div class="basket-gift__list">\n' +
        '                                      </div>\n' +
        '                                  </div>';

    let basketGiftListTemplate = '<div class="basket-gift__item col-md-4 col-lg-4 col-xl-3">\n' +
        '                             <div class="basket-gift__inner">\n' +
        '                                 <a href="{{detail_url}}" class="basket-gift__media">\n' +
        '                                     <img src="{{photo}}" alt="">\n' +
        '                                 </a>\n' +
        '                                 <a href="{{detail_url}}" class="basket-gift__title">{{name}}</a>\n' +
        '                                 <div class="component-colors__items">\n' +
        '                                     <div class="component-colors__item js-change-color">\n' +
        '                                         <img src="{{color_img}}" alt="{{color_name}}">\n' +
        '                                     </div>\n' +
        '                                 </div>\n' +
        '                                 <div class="btn btn-link js__basket-select-gift-ajax" data-id="{{giftOfferId}}" data-name="{{name}}" data-choose="choose-2" id="button-choose-gift">выбрать</div>\n' +
        '                             </div>\n' +
        '                         </div>';
    if (!!gifts) {
        let resGiftsList = '';

        for (let itemID in gifts) {
            if (gifts.hasOwnProperty(itemID)) {
                let tmpl = basketGiftListTemplate;
                resGiftsList = resGiftsList + tmpl
                    .replace(/{{detail_url}}/g, gifts[itemID].detail_url)
                    .replace(/{{photo}}/g, gifts[itemID].photo)
                    .replace(/{{name}}/g, gifts[itemID].name)
                    .replace(/{{color_img}}/g, gifts[itemID].color.img)
                    .replace(/{{giftOfferId}}/g, itemID)
            }
        }

        if ($('.basket-gift').length === 0) {
            $(basketGiftListContainerTemplate).insertAfter($('.basket-product__list'));
        }

        $('.basket-gift__list').html(resGiftsList);
    } else {
        if ($('.basket-gift').length > 0) {
            $('.basket-gift').remove();
        }
    }
}

function refreshPaySystems(paySystems) {
    let paymentListTemplate = '<div class="basket-payment-item col-md-4 js__basket-payment-item {{id}} {{active}}" data-id="{{id}}" id="basket-payment-item-{{id}}">' +
        '                           <div class="card-b text-center">' +
        '                               <div class="card-b-title">{{name}}</div>' +
        '                               {{description}}' +
        '                           </div>' +
        '                       </div>',
        paymentDescriptionTemplate = '<small class="card-b-text__small text-grey">{{description}}</small>',
        finalHtml = '';

    for (let paymentId in paySystems) {
        if (paySystems.hasOwnProperty(paymentId)) {
            let tmpl = paymentListTemplate.replace(/{{id}}/g, paymentId)
                .replace(/{{name}}/g, paySystems[paymentId].name);

            if (paySystems[paymentId].current) {
                tmpl = tmpl.replace(/{{active}}/g, 'active');
            } else {
                tmpl = tmpl.replace(/{{active}}/g, '');
            }

            if (!!paySystems[paymentId].description) {
                let descrTmpl = paymentDescriptionTemplate.replace(/{{description}}/g, paySystems[paymentId].description);
                tmpl = tmpl.replace(/{{description}}/g, descrTmpl);
            }

            finalHtml = finalHtml + tmpl;
        }
    }

    $('.basket-payment-list').html(finalHtml);
}

function refreshDeliverySystems(deliverySystems) {
    let deliveryListTemplate = '<div class="basket-tab-nav__item col-md-4 {{id}} {{active}}" id="basket-tab-nav-{{id}}" data-id="{{id}}" data-toggle="tab"' +
        '                            href="#basket-tab-{{id}}" role="tab" aria-controls="basket-tab-{{id}}"' +
        '                            aria-selected="{{selected}}">' +
        '                           <div class="card-b js-basket-get">' +
        '                               <div class="card-b-title">{{name}}</div>' +
        '                               <div id="js-delivery-price" class="card-b-text font-weight-bold">' +
        '                                   {{price_formatted}}' +
        '                               </div>' +
        '                               <div class="card-b-text__small text-grey">{{description}}</div>' +
        '                           </div>' +
        '                       </div>',
        finalHtml = '';

    for (let deliveryId in deliverySystems) {
        if (deliverySystems.hasOwnProperty(deliveryId)) {
            let tmpl = deliveryListTemplate.replace(/{{id}}/g, deliveryId)
                .replace(/{{name}}/g, deliverySystems[deliveryId].name)
                .replace(/{{price_formatted}}/g, deliverySystems[deliveryId].price_formatted)
                .replace(/{{description}}/g, deliverySystems[deliveryId].description);

            if (deliverySystems[deliveryId].current) {
                tmpl = tmpl.replace(/{{active}}/g, 'active')
                    .replace(/{{selected}}/g, true);

                initTab(deliveryId);
            }

            if (deliverySystems[deliveryId].hasOwnProperty('minPeriod') && deliverySystems[deliveryId].hasOwnProperty('maxPeriod')) {
                $('#basket-tab-' + deliveryId + ' .js__delivery-duration').text(deliverySystems[deliveryId].minPeriod + '-' + deliverySystems[deliveryId].maxPeriod);
            }

            finalHtml = finalHtml + tmpl;
        }
    }

    $('.js-basket-type-orders').html(finalHtml);
}