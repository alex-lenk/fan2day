/*START VALIDATE*/
export function Validate(el, btn, parent) {
  this.el = el;
  this.btn = btn;
  this.parent = parent;

  function addError(el) {
    el.parentNode.classList.remove('input-success');
    el.parentNode.classList.add('input-error');
  }

  function addSuccess(el) {
    el.parentNode.classList.remove('input-error');
    el.parentNode.classList.add('input-success');
  }

  function verifyInputBlur(e) {
    switch (this.getAttribute('data-name')) {
      case 'check-pass':
        const changePass = this.closest(parent).querySelector('[data-name="password"]').value;
        if (
          (e.target.value !== changePass && e.target.value.length < 6)
          || this.parentNode.classList.contains('input-success')
        ) addError(this);
        if (
          e.target.value === changePass
          && e.target.value.length >= 6
          && this.parentNode.classList.contains('input-error')
        ) addSuccess(this);
        break;
      case 'require':
        if (
          e.target.value.length <= 0 || this.parentNode.classList.contains('input-success')
        ) addError(this);
        if (
          e.target.value.length > 0 && this.parentNode.classList.contains('input-error')
        ) addSuccess(this);
        break;
    }
  }

  function verifyInputLive(e) {
    switch (this.getAttribute('data-name')) {
      case 'email':
        var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
          !emailValid.test(e.target.value)
          || this.parentNode.classList.contains('input-success')
        ) addError(this);
        if (
          emailValid.test(e.target.value)
          && this.parentNode.classList.contains('input-error')
        ) addSuccess(this);
        break;
      case 'password':
        if (
          e.target.value.length < 6
          || this.parentNode.classList.contains('input-success')
        ) addError(this);
        if (
          e.target.value.length >= 6
          && this.parentNode.classList.contains('input-error')
        ) addSuccess(this);
        break;
    }
  }

  this.initValidate = function initValidate(call) {

    const validate = document.querySelectorAll(this.el);
    validate.forEach(item => {
      if (item.offsetWidth > 0) {

        if (item.getAttribute('data-name') === 'phone') {
          /* Маска для телефона */
          $(item).inputmask({
            mask: "+7 (999) 999-9999",
            onincomplete: function () {
              addError(this);
            },
            oncomplete: function () {
              addSuccess(this);
            },
            onKeyDown: function () {
              addSuccess(this);
            }
          });
        }

        item.addEventListener('change', verifyInputLive);
        item.addEventListener('paste', verifyInputLive);
        item.addEventListener('blur', verifyInputLive);

        item.addEventListener('input', verifyInputBlur);
        item.addEventListener('paste', verifyInputBlur);
        item.addEventListener('blur', verifyInputBlur);
      }
    });

    const btnSend = document.querySelector(this.btn);
    if (btnSend.offsetWidth > 0) {
      btnSend.addEventListener('click', function (e) {
        e.preventDefault();
        for (let i = 0; i < validate.length; i++) {
          if (validate[i].offsetWidth > 0 && validate[i].value === '') {
            addError(validate[i]);
          }
        }
        call();
      });
    }
  };
}

/*START VALIDATE*/
export var validBasketForm = new Validate('.js-basket-validate', '.js-basket-submit', '#order-form');
export var validRegister = new Validate('.js-register-validate', '.js-register-submit', '.js-register');
export var validAuth = new Validate('.js-auth-validate', '.js-auth-submit', '.js-auth-form');
export var validSubscribe = new Validate('.js-subscr-validate', '.js-subscr-submit', '.js-subscr-form');
/*END VALIDATE*/