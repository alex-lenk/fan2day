import {validRegister} from "../js/script";

$(document).ready(function () {

  validRegister.initValidate(function () {
    var email = $('#register-mail').val(),
      password = $('#register-password').val(),
      confirmPass = $('#register-confirm-pass').val();
    if ($('.input-error').length <= 0) {
      $.ajax({
        url: '/local/components/mi/main.register/templates/systems/ajax.php',
        method: 'POST',
        data: {email: email, password: password, confirmPass: confirmPass},
      }).done(function (result) {
        if (result != 1) {
          $('#register-error-form').html(result);
        } else {
          location.reload();
        }
      });
    }
  });

  $('.header__reg-login.js-gotoauth').on('click', function () {
    $('.header__reg-title').text('Авторизация');
  });

  $('#form-register-e-mail, #form-register-auth-pass, #form-register-confirm-pass').on('click', function () {
    $('#register-error').html('');
  });
});