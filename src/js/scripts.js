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

    /* BEGIN: Клик по кнопке "все роазвлечения" .top-panel-all */
    let entertainmentPanel = '.entertainment-panel';
    let entertainmentPanelOpened = 'entertainment-panel-opened';

    $('.top-panel-all').click(function () {
        $(entertainmentPanel).toggleClass(entertainmentPanelOpened);
    });

    $(entertainmentPanel).on('click', function (e) {
        if ($(entertainmentPanel).has(e.target).length === 0 && !$('.top-panel-all').is(e.target)) {
            $(entertainmentPanel).removeClass(entertainmentPanelOpened)
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
