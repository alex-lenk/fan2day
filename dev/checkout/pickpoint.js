import {refreshTotalBasketPrice} from "./refreshTotalBasketPrice";

function redrawOurPickpointMap(regionSelected, centers) {
  ymaps.ready(init);

  function init() {
    var map = new ymaps.Map('map-pickpoint', {
        //center: [55.650625, 37.62708],
        center: centers,
        controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
        zoom: 10
      }, {
        searchControlProvider: 'yandex#search'
      }),

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
      }),
      /**
       * Функция возвращает объект, содержащий данные метки.
       * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
       * Поле balloonContentBody - источник данных для контента балуна.
       * Оба поля поддерживают HTML-разметку.
       * Список полей данных, которые используют стандартные макеты содержимого иконки метки
       * и балуна геообъектов, можно посмотреть в документации.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
       */
      getPointData = function (index) {
        return {
          balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
          balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
          balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
          clusterCaption: 'метка <strong>' + index + '</strong>'
        };
      },
      /**
       * Функция возвращает объект, содержащий опции метки.
       * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
       */
      getPointOptions = function () {
        return {
          preset: 'islands#violetIcon'
        };
      },
      geoObjects = [];

    /**
     * Можно менять опции кластеризатора после создания.
     */
    clusterer.options.set({
      gridSize: 80,
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false
    });

    // Создание макета балуна
    let BalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover-ya top" style="border-radius: 4px; font-family: Roboto; background-color: #fff;">' +
      '<a class="close" href="#">&times;</a>' +
      '<div class="arrow"></div>' +
      '<div class="popover-inner">' +
      '$[[options.contentLayout observeSize minWidth=207 maxWidth=229 maxHeight=190]]' +
      '</div>' +
      '</div>'
      , {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = $('.popover-ya', this.getParentElement());

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
      }),

      // Создание макета содержимого балуна.
      // Макет создается с помощью фабрики макетов с помощью текстового шаблона.
      BalloonContentLayoutPickpoint = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #3A3A44; font-style: normal; font-weight: normal; font-size: 12px; line-height: 135%; letter-spacing: 0.015em;">' +
        '<h2 style="font-size: 12px; font-weight: 600; width: 153px;">{{properties.balloonHeader}}</h2>' +
        '<span>{{properties.metro}}</span><br />' +
        '<span id="pickpoint-postamat-address">{{properties.address}}</span><br />' +
        '<span style="color: #777888;">{{properties.schedule}}</span><br />' +
        '<br />' +
        '<span class="choise" data-cityname="{{properties.cityname}}" data-postamatId="{{properties.postamatId}}" data-region="{{properties.region}}" data-warehouse="{{properties.warehouse}}" href="#" style="cursor: pointer; font-family: Gotham Pro; font-size: 14px; line-height: 13px; letter-spacing: 0.055em; text-transform: uppercase; color: #FF6700;">заберу отсюда</span>' +
        '</div>', {

          // Переопределяем функцию build, чтобы при создании макета начинать слушать событие click на кнопке-счетчике.
          build: function () {
            // Сначала вызываем метод build родительского класса.
            BalloonContentLayoutPickpoint.superclass.build.call(this);
            // А затем выполняем дополнительные действия.
            $('.choise').bind('click', this.onChoseClick);
          },

          // Аналогично переопределяем функцию clear, чтобы снять прослушивание клика при удалении макета с карты.
          clear: function () {
            // Выполняем действия в обратном порядке - сначала снимаем слушателя, а потом вызываем метод clear родительского класса.
            $('.choise').unbind('click', this.onChoseClick);
            BalloonContentLayoutPickpoint.superclass.clear.call(this);
          },

          onChoseClick: function () {
            let warehouseID = $(this).data('warehouse'),
              postamatId = $(this).data('postamatid'),
              cityname = $(this).data('cityname'),
              region = $(this).data('region'),
              deliveryRegion = cityname,
              login = {Login: "qrvL0y", Password: "ywDYW2"},
              sessionId;

            $('#pickpoint-address').attr('data-city', cityname);

            //логинимся и получаем номер сессии
            $.ajax({
              url: 'https://e-solution.pickpoint.ru/api/login',
              type: 'POST',
              dataType: "json",
              contentType: 'application/json; charset=utf-8',
              data: JSON.stringify(login),
              async: false
            }).done(function (result) {
              sessionId = result.SessionId;
              $('.popover.top').hide();
            });

            //получение информации по тарифным зонам
            var dat = {SessionId: sessionId, IKN: 9990622412, FromCity: "Москва", ToPT: postamatId};

            $.ajax({
              url: 'https://e-solution.pickpoint.ru/api/getzone',
              type: 'POST',
              dataType: "json",
              contentType: 'application/json; charset=utf-8',
              data: JSON.stringify(dat),
              async: false
            }).done(function (result) {
              var DeliveryMin = result.Zones[0].DeliveryMin,
                DeliveryMax = result.Zones[0].DeliveryMax,
                interval,
                zone = result.Zones[0].Zone,
                paySystemId = $('.basket-payment-item.col-md-4.js__basket-payment-item.active').data('id');

              if (DeliveryMin == DeliveryMax)
                interval = DeliveryMin;
              else
                interval = DeliveryMin + '-' + DeliveryMax;

              $('#pickup-delivery-days').text(interval + ' рабочих дня');

              $('#pickpoint-address').attr('data-zone', zone);

              $.ajax({
                url: '/local/components/mi/checkout/templates/.default/ajax.php',
                method: 'POST',
                data: {
                  action: "getPaySystemDiscountsPickpoint",
                  paySystemId: paySystemId,
                  currentDeliveryPrice: 0,
                  oldPrice: 0,
                  deliveryRegion: deliveryRegion,
                  zone: zone
                },
              }).done(function (result) {
                var pickpointRegion = $('.choise').data('region'),
                  pickpointCity = $('.choise').data('cityname'),
                  pickpointAddress = $('#pickpoint-postamat-address').text(),
                  pickpointDeliveryInfo;

                pickpointDeliveryInfo = pickpointRegion + ', ' + pickpointCity + ', ' + pickpointAddress;

                //адрес доставки pickpoint
                $('#hidden-pickpoint-address-delivery').val(pickpointDeliveryInfo);
                //номер постомата
                $('#hidden-pickpoint-number').val(postamatId);

                let deliveryPrice = result;

                $('#basket-tab-nav-2-delivery-price').text(deliveryPrice);
                $('#delivery-price').text(deliveryPrice);
                $('#delivery-price-pickpoint').text(deliveryPrice);
                $('#delivery-price-rub').show();

                //адрес постамата pickpoint
                $('.pickup-panel-address').html($('#pickpoint-postamat-address').text());

                $('#hidden-pricedelivery').val(deliveryPrice);

                $('#delivery-price').attr('data-oldprice', deliveryPrice);

                $('#pickpoint-concrete-panel').show().addClass('check-btn');
                $('[data-target="#basket-tab-2"].active').removeClass('warn-message');
                $('#pickpoint-address').hide();
                $('#pickUpMap').hide();

                $('#basket-tab-nav-2').attr('data-pricedeliverysystem', deliveryPrice);

                refreshTotalBasketPrice();
              });

              if (DeliveryMin == DeliveryMax)
                interval = DeliveryMin;
              else
                interval = DeliveryMin + '-' + DeliveryMax;

              //нужный интервал для Москвы
              if (result.Zones[0].ToCity == 'Москва')
                interval = '1-2';

              $('#pickup-delivery-days').text(interval + ' рабочих дня');
            });
          }
        });

    //получаем аяксом постоматы из региона пользователя
    $.ajax({
      url: '/local/components/mi/checkout/templates/.default/ajax.php',
      method: 'POST',
      data: {action: "getPickpointPostamats", region: regionSelected},
    }).done(function (result) {
      var json = JSON.parse(result),
        placemarks = [];

      for (let i = 0; i < json.length; i++) {
        var placemark = new ymaps.Placemark([json[i]['LATITUDE'], json[i]['LONGITUDE']], {
          balloonHeader: json[i]['NAME'],
          address: json[i]['ADDRESS'],
          schedule: json[i]['WORKTIMESMS'],
          warehouse: json[i]['POSTAMAT_ID'],

          cityname: json[i]['CITINAME'],
          region: json[i]['REGION'],
          postamatId: json[i]['POSTAMAT_ID']
        }, {
          balloonShadow: false,
          balloonLayout: BalloonLayout,
          balloonContentLayout: BalloonContentLayoutPickpoint,
          // Запретим замену обычного балуна на балун-панель.
          // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
          balloonPanelMaxMapArea: 0,
          hideIconOnBalloonOpen: false,
          balloonOffset: [3, -50]
        });

        placemarks.push(placemark);
      }

      clusterer.add(placemarks);
      map.geoObjects.add(clusterer);
    });
  }
}

$(document).ready(function () {
  var regionSelected = $('.js-point-city:first').text();

  if (regionSelected == 'Другой регион' || regionSelected == "Город")
    regionSelected = 'Москва';

//можно получать координаты центра города, на котором будем центрироваться, геокодером (https://tech.yandex.ru/maps/geocoder/)
//его можно использовать, если в сутки к нему делается до 25 тысяч запросов
//захадрходил центры наших основных городов, чтобы не делать (лишних) запросов. В дальнейшем можно получать центры и запросом.
//https://geocode-maps.yandex.ru/1.x/?geocode=Москва

  var centers;
  switch (regionSelected) {
    case 'Москва':
      centers = [55.750625, 37.62708];
      break;
    case 'Санкт-Петербург':
      centers = [59.939095, 30.315868];
      break;
    case 'Новосибирск':
      centers = [55.009316, 82.670662];
      break;
    case 'Астрахань':
      centers = [46.347869, 48.033574];
      break;
    case 'Владивосток':
      centers = [43.134019, 131.928379];
      break;
    case 'Владимир':
      centers = [56.129042, 40.40703];
      break;
    case 'Волгоград':
      centers = [48.707103, 44.516939];
      break;
    case 'Воронеж':
      centers = [51.661535, 39.200287];
      break;
    case 'Екатеринбург':
      centers = [56.838002, 60.597295];
      break;
    case 'Казань':
      centers = [55.795793, 49.106585];
      break;
    case 'Калининград':
      centers = [54.707390, 20.507307];
      break;
    case 'Краснодар':
      centers = [45.023877, 38.970157];
      break;
    case 'Нижний Новгород':
      centers = [56.323902, 44.002267];
      break;
    case 'Новосибирск':
      centers = [55.028739, 82.90692799999999];
      break;
    case 'Омск':
      centers = [54.989342, 73.368212];
      break;
    case 'Ростов-на-Дону':
      centers = [47.227151, 39.744972];
      break;
    case 'Рязань':
      centers = [54.619886, 39.744954];
      break;
    case 'Самара':
      centers = [53.195533, 50.101801];
      break;
    case 'Томск':
      centers = [56.495116, 84.972128];
      break;
    case 'Уфа':
      centers = [54.734768, 55.957838];
      break;
    case 'Хабаровск':
      centers = [48.472584, 135.057732];
      break;
    case 'Сергиев Посад':
      centers = [56.315321, 38.135766];
      break;
    case 'Химки':
      centers = [55.870625, 37.32708];
      break;
    case 'Мытищи':
      centers = [55.870625, 37.69708];
      break;

    default:    //Москва
      centers = [55.650625, 37.62708];
  }

  redrawOurPickpointMap(regionSelected, centers);
});