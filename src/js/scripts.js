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
    /* Клик по кнопке "все роазвлечения" .top-panel-all__JS */
    let entertainmentPanel = '.entertainment-panel';
    let entertainmentPanelOpened = 'entertainment-panel-opened';

    $('.top-panel-all__JS').click(function () {
        if ($(entertainmentPanel).hasClass(entertainmentPanelOpened)) {
            $(document).mouseup(function (e) {
                if (!$(entertainmentPanel).is(e.target) && $(entertainmentPanel).has(e.target).length === 0 && !$('.top-panel-all__JS').is(e.target)) {
                    $(entertainmentPanel).removeClass(entertainmentPanelOpened)
                }
            });
        }

        $(entertainmentPanel).toggleClass(entertainmentPanelOpened);
    });
    /* END */

});

