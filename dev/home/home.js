import {timer} from "../functions/timer";import {validSubscribe} from "../functions/Validate";$(document).ready(() => {  //top slick  $('.js-home-slider').slick({    slidesToShow: 1,    slidesToScroll: 1,    arrows: false,    dots: true,    autoplay: true,    autoplaySpeed: 4000,    swipe: false,    responsive: [      {        breakpoint: 992,        settings: {          swipe: true        }      }    ]  });//end top slick  //timer  timer({    deadline: $('.js-timer').data('deadline'),    hours: $('.js-hours'),    minutes: $('.js-minutes'),    seconds: $('.js-seconds')  });  //end timer  //validation subscribe  validSubscribe.initValidate(() => {    if ($('.input-error').length > 0) {      return false;    } else {      $.ajax({        method: 'POST',        url: '/ru/feedback_send.php',        data: $('#news-subscribe-form').serialize()      }).done(function (msg) {        msg = JSON.parse(msg);        if (msg == 'success') {          $(validSubscribe.el).val('');          $('.js-success-text').text('Спасибо! Мы будем держать вас в курсе!');        } else {          $(validSubscribe.el).val('');          $('.js-success-text').text('Спасибо! Вы уже подписались на наши новости и спецпредложения!');        }      });    }  });  $(validSubscribe.el).click(() => {    $('.js-success-text').text('');  });  //end validation subscribe});