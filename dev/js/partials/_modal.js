export default function modal () {
  if ($('.modal-window').is(':visible')) {
    $('body').addClass('lock');
  }

  $('.modal-window .close-click').click(function () {
    $('.modal-window').hide();
    $('body').removeClass('lock');
  });

  $('.open-modal').click(function () {
    var modal = $(this).data('target');
    $('#' + modal).show();
  });

}