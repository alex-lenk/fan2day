// Импортируем jQuery
import 'jquery';

// Импортируем slick
import 'slick';

// Импортируем другие js-файлы
import './snippets/tab.js';


/* BEGIN фунция для закрытия панелей вне области */
function documentMouseup(elClass, twoClass) {
    $(document).mouseup(function (e) {
        if (!$(elClass).is(e.target) && $(elClass).has(e.target).length === 0) {
            $(elClass).removeClass(twoClass)
        }
    });
}

/* END */


$(document).ready(function () {
    /* BEGIN: */
    $('#register').on('submit', function (event) {
        if (validateForm()) { // если есть ошибки возвращает true
            event.preventDefault();
        }
    });

    function validateForm() {
        $(".text-error").remove();

        // Проверка логина
        var el_l = $("#login");
        if (el_l.val().length < 4) {
            var v_login = true;
            el_l.after('<span class="text-error for-login">Логин должен быть больше 3 символов</span>');
            $(".for-login").css({top: el_l.position().top + el_l.outerHeight() + 2});
        }
        $("#login").toggleClass('error', v_login);

        // Проверка e-mail

        var reg = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
        var el_e = $("#email");
        var v_email = el_e.val() ? false : true;

        if (v_email) {
            el_e.after('<span class="text-error for-email">Поле e-mail обязательно к заполнению</span>');
            $(".for-email").css({top: el_e.position().top + el_e.outerHeight() + 2});
        } else if (!reg.test(el_e.val())) {
            v_email = true;
            el_e.after('<span class="text-error for-email">Вы указали недопустимый e-mail</span>');
            $(".for-email").css({top: el_e.position().top + el_e.outerHeight() + 2});
        }
        $("#email").toggleClass('error', v_email);

        // Проверка паролей

        var el_p1 = $("#pass1");
        var el_p2 = $("#pass2");

        var v_pass1 = el_p1.val() ? false : true;
        var v_pass2 = el_p1.val() ? false : true;

        if (el_p1.val() != el_p2.val()) {
            var v_pass1 = true;
            var v_pass2 = true;
            el_p1.after('<span class="text-error for-pass1">Пароли не совпадают!</span>');
            $(".for-pass1").css({top: el_p1.position().top + el_p1.outerHeight() + 2});
        } else if (el_p1.val().length < 6) {
            var v_pass1 = true;
            var v_pass2 = true;
            el_p1.after('<span class="text-error for-pass1">Пароль должен быть не менее 6 символов</span>');
            $(".for-pass1").css({top: el_p1.position().top + el_p1.outerHeight() + 2});
        }

        $("#pass1").toggleClass('error', v_pass1);
        $("#pass2").toggleClass('error', v_pass2);

        return (v_login || v_email || v_pass1 || v_pass2);
    }

    /* END */


    /* BEGIN: Клик по кнопке "все роазвлечения" .top-panel-all */
    let entertainment = '.entertainment';
    let entertainmentOpened = 'entertainment-opened';

    $('.top-panel-all').click(function () {
        $(entertainment).toggleClass(entertainmentOpened);
    });

    $(entertainment).on('click', function (e) {
        if ($(entertainment).has(e.target).length === 0 && !$('.top-panel-all').is(e.target)) {
            $(entertainment).removeClass(entertainmentOpened)
        }
    });
    /* END */


    /* BEGIN: Логика появления панели поиска и ввода данных  */
    let searchFormBoxInput = $('.search-form-box__input'),
        searchFormBox = $('.search-form-box'),
        searchFormBoxClear = $('.search-form-box__clear'),
        searchFormBoxBack = $('.search-form-box__back'),
        searchArea = $('.search-area'),
        searchResultPanel = $('.search-area__result');

    searchFormBoxInput.keyup(function () {
        let value = $(this).val().length;

        if (value >= 2) {
            searchFormBox.removeClass('icon-search');
            searchFormBoxBack.addClass('active');
            searchFormBoxClear.addClass('active');
            searchResultPanel.addClass('active');
        } else {
            searchFormBoxClear.removeClass('active');
            searchResultPanel.removeClass('active');
        }
    });

    searchFormBoxClear.click(function () {
        searchFormBoxInput.val('').focus();
        $(this).removeClass('active');
        searchResultPanel.removeClass('active');
    });

    searchFormBoxBack.click(function () {
        searchFormBox.addClass('icon-search');
        $(this).removeClass('active');
        searchFormBoxClear.removeClass('active');
        searchResultPanel.removeClass('active');
        searchFormBoxInput.val('');
    });

    $('.top-panel-search').click(function () {
        searchArea.addClass('active');
    });

    $('.search-area__close').click(function () {
        searchArea.removeClass('active');
    });

    searchArea.click(function (e) {
        if (searchArea.has(e.target).length === 0) {
            searchArea.removeClass('active')
        }
    });
    /* END */


    /* BEGIN: For logic on modals login, forgot and register */
    $('.js__login').click(function () {
        $('#modal-auth').addClass('modal-opened');
        $('.modal-form').removeClass('modal-form__active');
        $('#modal-login').addClass('modal-form__active');
    });

    $('.modal-close').click(function () {
        $('#modal-auth').removeClass('modal-opened');
    });

    $('.js__forgot').click(function () {
        $('.modal-form').removeClass('modal-form__active');
        $('#modal-forgot').addClass('modal-form__active');
    });

    $('.js__register').click(function () {
        $('.modal-form').removeClass('modal-form__active');
        $('#modal-register').addClass('modal-form__active');
    });


    let hash = window.location.hash;

    if (hash === '#modal-forgot' || hash === '/#modal-forgot') {
        $('#modal-auth').addClass('modal-opened');
        $('.modal-form').removeClass('modal-form__active');
        $('#modal-forgot').addClass('modal-form__active');
    } else if (hash === '#modal-login' || hash === '/#modal-login') {
        $('#modal-auth').addClass('modal-opened');
        $('.modal-form').removeClass('modal-form__active');
        $('#modal-login').addClass('modal-form__active');
    } else if (hash === '#modal-register' || hash === '/#modal-register') {
        $('#modal-auth').addClass('modal-opened');
        $('.modal-form').removeClass('modal-form__active');
        $('#modal-register').addClass('modal-form__active');
    }
    /* END */


    /* BEGIN: Initialization carousel */
    $('.popular-carousel').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev btn-circle"><span class="icon-arrow-left btn-text"></span></button>',
        nextArrow: '<button type="button" class="slick-next btn-circle"><span class="icon-arrow-right btn-text"></span></button>'
    });
    /* END */
});
