let modalLogin = '#modal-login';
let modalForgot = '#modal-forgot';
let modalRegister = '#modal-register';

$(document).ready(function () {
  /* BEGIN: For logic on modals login, forgot and register */
  $('.js__login').click(function () {
    $('#modal-auth').addClass('modal-opened');
    $('.modal-form').removeClass('modal-form__active');
    $(modalLogin).addClass('modal-form__active');
  });

  $('.modal-close').click(function () {
    $('#modal-auth').removeClass('modal-opened');
  });

  $('.js__forgot').click(function () {
    $('.modal-form').removeClass('modal-form__active');
    $(modalForgot).addClass('modal-form__active');
  });

  $('.js__register').click(function () {
    $('.modal-form').removeClass('modal-form__active');
    $(modalRegister).addClass('modal-form__active');
  });


  let hash = window.location.hash;

  if (hash === modalForgot || hash === '/#modal-forgot') {
    $('#modal-auth').addClass('modal-opened');
    $('.modal-form').removeClass('modal-form__active');
    $(modalForgot).addClass('modal-form__active');
  } else if (hash === modalLogin || hash === '/#modal-login') {
    $('#modal-auth').addClass('modal-opened');
    $('.modal-form').removeClass('modal-form__active');
    $(modalLogin).addClass('modal-form__active');
  } else if (hash === modalRegister || hash === '/#modal-register') {
    $('#modal-auth').addClass('modal-opened');
    $('.modal-form').removeClass('modal-form__active');
    $(modalRegister).addClass('modal-form__active');
  }
  /* END */


  /* BEGIN: Валидация инпут полей */
  $(modalLogin).validate({
    rules: {
      email: {
        required: true,
        email: true,
        minlength: 8
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      email: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      },
      password: {
        required: "Обязательно введите пароль",
        email: "Пароль не может быть менее 6 символов"
      }
    }
  });
  $(modalForgot).validate({
    rules: {
      inputForgotEmail: {
        required: true,
        email: true,
        minlength: 8
      }
    },
    messages: {
      inputForgotEmail: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      }
    }
  });
  $(modalRegister).validate({
    rules: {
      inputRegisterEmail: {
        required: true,
        email: true,
        minlength: 8
      },
      agreeRegister: {
        required: true
      }
    },
    messages: {
      inputRegisterEmail: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      },
      agreeRegister: {
        required: "Вы должны согласиться на обработку персональных данных"
      }
    }
  });
  /* END */
});
