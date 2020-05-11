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
        if ($(entertainmentPanel).hasClass(entertainmentPanelOpened)) {
            $(document).mouseup(function (e) {
                if (!$(entertainmentPanel).is(e.target) && $(entertainmentPanel).has(e.target).length === 0 && !$('.top-panel-all').is(e.target)) {
                    $(entertainmentPanel).removeClass(entertainmentPanelOpened)
                }
            });
        }

        $(entertainmentPanel).toggleClass(entertainmentPanelOpened);
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
});
