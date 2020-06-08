        <form id="modal-login" class="modal-form">
            <h2 class="modal-title">Вход</h2>
            <div class="modal-subtitle">Для входа используйте ваш е-mail и&nbsp;пароль</div>
            <div class="form-group">
                <input type="email" name="username" class="form-control hide-placeholder" placeholder="Введите e-mail *">
            </div>
            <div class="form-group">
                <input type="password" name="password" class="form-control hide-placeholder" placeholder="Пароль *">
            </div>

            <input type="hidden" name="action" value="auth/formLogin"/>
            <input type="hidden" name="return" value=""/>

            <div class="form-group__btn">
                <button type="submit" class="btn btn-primary"><span class="btn-text">Войти</span></button>
                <div class="form-group__link as-link js__forgot">Забыли пароли?</div>
            </div>
            <div class="modal-box__bottom">
                <div class="modal-box__bottom-text">У вас нет аккаунта на Fun2Day?</div>
                <div class="as-link js__register">Зарегистрироваться</div>
            </div>
        </form>
        <form id="modal-forgot" class="modal-form">
            <h2 class="modal-title">Восстановления пароля</h2>
            <div class="modal-subtitle">Укажите адрес электронной почты, который вы&nbsp;использовали при регистрации.</div>
            <div class="form-group">
                <input type="email" name="username" class="form-control hide-placeholder" placeholder="E-mail *">
            </div>

            <input type="hidden" name="action" value="auth/formLogin"/>
            <input type="hidden" name="return" value=""/>
            <input type="hidden" name="password" value=""/>

            <div class="form-group__btn">
                <button type="submit" class="btn btn-primary"><span class="btn-text">Восстановить</span></button>
                <div class="form-group__link as-link js__login">Вспомнили пароль?</div>
            </div>
            <div class="modal-box__bottom">
                <div class="modal-box__bottom-text">У вас нет аккаунта на Fun2Day?</div>
                <div class="as-link js__register">Зарегистрироваться</div>
            </div>
        </form>
        <form id="modal-register" class="modal-form">
            <h2 class="modal-title">Регистрация</h2>
            <div class="modal-subtitle"> Укажите адрес электронной почты, мы&nbsp;отправим вам пароль для входа в&nbsp;личный кабинет </div>
            <div class="form-group">
                <input type="email" name="email" class="form-control hide-placeholder" placeholder="Укажите Ваш E-mail *">
            </div>
            <label class="form-group custom-control custom-checkbox">
                <input type="checkbox" name="agreeRegister" class="custom-control-input">
                <span class="custom-control-label icon-check">Согласие на обработку</span>
            </label>

            <input type="hidden" name="action" value="auth/formRegister"/>

            <div class="form-group__btn">
                <button type="submit" class="btn btn-primary"><span class="btn-text">Зарегистрироваться</span></button>
            </div>
            <div class="modal-box__bottom">
                <div class="modal-box__bottom-text">Уже есть аккаунт на Fun2Day?</div>
                <div class="as-link js__login">Войти</div>
            </div>
        </form>
