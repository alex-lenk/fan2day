import {validAuth} from "../functions/Validate";

$(document).ready(function () {
  validAuth.initValidate(function () {
    var login = $('#auth-default-email').val(),
      password = $('#auth-default-password').val();

    if ($('.input-error').length <= 0) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/components/bitrix/system.auth.authorize/.default/check_fields.php",
        data: "login=" + login + "&password=" + password,
        success: function (msg) {
          if (msg != 'error')
            window.location = window.location;
          else
            $('.js-auth-error').html('<span id="error-form" style="color:red">Неверный логин или пароль.</span>');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          $('.js-auth-error').html('<span id="error-form" style="color:red">Неверный логин или пароль.</span>');
          return false;
        }
      });
    }
  });
});