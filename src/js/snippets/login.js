let modalLogin = '#modal-login',
  modalForgot = '#modal-forgot',
  modalRegister = '#modal-register',
  modalAuth = '#modal-auth',
  modalOpened = 'modal-opened',
  modalForm = '.modal-form',
  modalFormActive = 'modal-form__active';

$(document).ready(function () {
  /* BEGIN: For logic on modals login, forgot and register */
  $('.js__login').click(function () {
    $(modalAuth).addClass(modalOpened);
    $(modalForm).removeClass(modalFormActive);
    $(modalLogin).addClass(modalFormActive);
  });

  $('.js__forgot').click(function () {
    console.log('click');
    $(modalAuth).addClass(modalOpened);
    $(modalForm).removeClass(modalFormActive);
    $(modalForgot).addClass(modalFormActive);
  });

  $('.js__register').click(function () {
    $(modalAuth).addClass(modalOpened);
    $(modalForm).removeClass(modalFormActive);
    $(modalRegister).addClass(modalFormActive);
  });

  $('.modal-close').click(function () {
    $(modalAuth).removeClass(modalOpened);
  });


  let hash = window.location.hash;

  if (hash === modalForgot || hash === '/#modal-forgot') {
    $(modalAuth).addClass(modalOpened);
    $(modalForm).removeClass(modalFormActive);
    $(modalForgot).addClass(modalFormActive);
  } else if (hash === modalLogin || hash === '/#modal-login') {
    $(modalAuth).addClass(modalOpened);
    $(modalForm).removeClass(modalFormActive);
    $(modalLogin).addClass(modalFormActive);
  } else if (hash === modalRegister || hash === '/#modal-register') {
    $(modalAuth).addClass(modalOpened);
    $(modalForm).removeClass(modalFormActive);
    $(modalRegister).addClass(modalFormActive);
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
        minlength: "Пароль не может быть менее 6 символов"
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

  $('#subscription-form').validate({
    rules: {
      inputSubscriptionEmail: {
        required: true,
        email: true,
        minlength: 8
      },
      agreeSubscription: {
        required: true
      }
    },
    messages: {
      inputSubscriptionEmail: {
        required: "Поле e-mail обязательно к заполнению",
        email: "Необходим формат адреса e-mail",
        minlength: "Пожалуйста, введите не менее 7 символов"
      },
      agreeSubscription: {
        required: "Вы должны согласиться на обработку персональных данных"
      }
    }
  });
  /* END */
});
