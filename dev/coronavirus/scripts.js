import {goTo} from "../functions/goTo";

$(document).ready(() => {
    $('.js-checkbox').on('click', function () {
        $(this).toggleClass('active');
    });
    
    $('input[name="phone"]').inputmask("+7 (999) 999-9999");
    
    $('.js-send-btn').on('click', function (e) {
        if (!$('.js-checkbox').hasClass('active')) {
            e.preventDefault();
            $('.js-parent').addClass('input-error');
            return false;
        }
    });
    
    $('.js-choice').on('click', function () {
        let target = $($(this).data('target'));
        $('.js-radio').removeClass('active');
        target.addClass('active');
        goTo(target);
    });
    
    $('.js-create').on('click', () => goTo($('#target-create')));
    
    
    
    $('.js-tab').on('click', function () {
        $('input[required]').prop('required', false);
        let inputs = $($(this).attr('href')).find('input');
        $(inputs).prop('required', true);
    });

    $(".nav-link").on("click",function() {
        $('#who').val($(this).attr('id'));
    });

    $(".js-radio").on("click",function() {
        $('#tariff').val($(this).attr('id'));
    });

    $(".js-choice").on("click",function() {
        $('#tariff').val($(this).data('tariff'));
    });
});