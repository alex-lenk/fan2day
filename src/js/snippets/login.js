let modalLogin = '#modal-login',
  modalForgot = '#modal-forgot',
  modalRegister = '#modal-register',
  modalAuth = '#modal-auth',
  modalOpen = 'modal-open',
  modalForm = '.modal-form',
  modalFormActive = 'modal-form__active',
  modalAuth__org = '#modal-auth__org',
  modalLogin__org = '#modal-login__org',
  modalForgot__org = '#modal-forgot__org',
  modalRegister__org = '#modal-register__org';

$(document).ready(function () {
  /* BEGIN: For logic on modals login, forgot and register */
  $('.js__login').click(function () {
    $(modalAuth).addClass(modalOpen);
    $(modalForm).removeClass(modalFormActive);
    $(modalLogin).addClass(modalFormActive);
  });

  $('.js__login__org').click(function () {
    $(modalAuth__org).addClass(modalOpen);
    $(modalForm).removeClass(modalFormActive);
    $(modalLogin__org).addClass(modalFormActive);
  });

  $('.js__forgot').click(function () {
    $(modalAuth).addClass(modalOpen);
    $(modalForm).removeClass(modalFormActive);
    $(modalForgot).addClass(modalFormActive);
  });

  $('.js__forgot__org').click(function () {
    $(modalAuth__org).addClass(modalOpen);
    $(modalForm).removeClass(modalFormActive);
    $(modalForgot__org).addClass(modalFormActive);
  });

  $('.js__register').click(function () {
    $(modalAuth).addClass(modalOpen);
    $(modalForm).removeClass(modalFormActive);
    $(modalRegister).addClass(modalFormActive);
  });

  $('.js__register__org').click(function () {
    $(modalAuth__org).addClass(modalOpen);
    $(modalForm).removeClass(modalFormActive);
    $(modalRegister__org).addClass(modalFormActive);
  });

  $('.modal-close').click(function () {
    $(this).closest('.modal-wrapper').removeClass(modalOpen);
  });


  let hash = window.location.hash;

  if (hash === modalForgot || hash === '/#modal-forgot') {
    $(modalAuth).addClass(modalOpen);
    $(modalForm).removeClass(modalFormActive);
    $(modalForgot).addClass(modalFormActive);
  } else if (hash === modalLogin || hash === '/#modal-login') {
    $(modalAuth).addClass(modalOpen);
    $(modalForm).removeClass(modalFormActive);
    $(modalLogin).addClass(modalFormActive);
  } else if (hash === modalRegister || hash === '/#modal-register') {
    $(modalAuth).addClass(modalOpen);
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

  $(modalLogin__org).validate({
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
  $(modalForgot__org).validate({
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
  $(modalRegister__org).validate({
    rules: {
      inputRegisterEmail: {
        required: true,
        email: true,
        minlength: 8
      },
      inputRegisterTel: {
        required: true,
        minlength: 10
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
      inputRegisterTel: {
        required: "Введите номер телефона",
        minlength: "Пожалуйста, введите не менее 10 символов"
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
