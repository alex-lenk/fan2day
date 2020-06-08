<div class="modal-wrapper" id="modal-auth">
    <div class="modal-box" id="office-auth-form">
        <div class="modal-close btn-circle icon-close"></div>
        {'!officeAuth' | snippet : [
        	'tplLogin' => '@FILE chunks/office/auth_login.tpl'
        ]}
    </div>
</div>
<div class="search-area">
    <div class="search-area-holder">
        <!-- Begin: search form -->
        <div class="search-form__wrap">
            <form class="search-form" action="/" method="GET">
                <div class="search-form-box form-control__prepend icon-search">
                    <input type="search" class="search-form-box__input form-control hide-placeholder" placeholder="Найдите любимое развлечение">
                    <div class="search-form-box__back icon-arrow-long-left"></div>
                    <div class="search-form-box__clear icon-close"></div>
                    <button type="submit" class="btn btn-primary"><span class="btn-text">Найти</span></button>
                </div>
            </form>
            <!-- Begin: result panel -->
            <div class="search-result">
                <div class="search-result__list">
                    <a href="#" class="result-item">
                        <img src="img/example/search-result-01.png" class="result-img" alt="">
                        <div class="result-text"> Мастер класс по приготовлению зелёного чая собранного в горах Индии ручным методом </div>
                    </a>
                    <a href="#" class="result-item">
                        <img src="img/example/search-result-02.png" class="result-img" alt="">
                        <div class="result-text"> Мастер класс по приготовлению зелёного чая собранного в горах Индии ручным методом </div>
                    </a>
                    <a href="#" class="result-item">
                        <img src="img/example/search-result-03.png" class="result-img" alt="">
                        <div class="result-text"> Мастер класс по приготовлению зелёного чая собранного в горах Индии ручным методом </div>
                    </a>
                    <a href="#" class="result-item">
                        <img src="img/example/search-result-04.png" class="result-img" alt="">
                        <div class="result-text"> Мастер класс по приготовлению зелёного чая собранного в горах Индии ручным методом </div>
                    </a>
                </div>
                <div class="result-all">
                    <a href="#" class="btn btn-bright"><span class="btn-text">Посмотреть все предложения</span></a>
                </div>
            </div>
            <!-- END: result panel -->
        </div>
        <!-- END: search form -->
        <!-- Begin: tag-list -->
        <ul class="search-area__tag tag-list list-unstyled">
            <li class="tag-list__item"><a href="#" class="tag-list__link">Мини тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Короткий тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Тэг 11</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Длинный тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Короткий тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Ещё какой-то тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Короткий тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Ещё какой-то тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Короткий тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Это тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Мини тэг</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Тэг 11</a></li>
            <li class="tag-list__item"><a href="#" class="tag-list__link">Тэг</a></li>
        </ul>
        <!-- END: tag-list -->
        <!-- Begin: link-offer -->
        <div>
            <h2>Популярные предложения</h2>
            <ul class="search-area__popular link-offer list-unstyled">
                <li class="search-area__popular-item link-offer-item"><a href="#" class="icon-education link-offer-link link-offer-link__active">Новые</a></li>
                <li class="search-area__popular-item link-offer-item"><a href="#" class="icon-balloon link-offer-link">Детские</a></li>
                <li class="search-area__popular-item link-offer-item"><a href="#" class="icon-gift link-offer-link">Подарок</a></li>
                <li class="search-area__popular-item link-offer-item"><a href="#" class="icon-time link-offer-link">Вечерние</a></li>
                <li class="search-area__popular-item link-offer-item"><a href="#" class="icon-user link-offer-link">Групповые</a></li>
            </ul>
        </div>
        <!-- END: link-offer -->
        <!-- Begin: search-area__viewed -->
        <div class="search-area__viewed">
            <h2 class="search-area__viewed-title">Недавно просмотренные</h2>
            <div>
                <a href="#" class="result-item">
                    <img src="img/example/search-result-01.png" class="result-img" alt="">
                    <div class="result-text"> Мастер класс по приготовлению зелёного чая собранного в горах Индии ручным методом </div>
                    <div class="result-price">
                        <div class="result-price__old">100 ₽</div>
                        <div class="result-price__new">50 ₽</div>
                    </div>
                </a>
                <a href="#" class="result-item">
                    <img src="img/example/search-result-02.png" class="result-img" alt="">
                    <div class="result-text"> Лепка глинянных горшком при помощи гончарного круга </div>
                    <div class="result-price">
                        <div class="result-price__old">1 000 ₽</div>
                        <div class="result-price__new">500 ₽</div>
                    </div>
                </a>
                <a href="#" class="result-item">
                    <img src="img/example/search-result-03.png" class="result-img" alt="">
                    <div class="result-text"> Катание на лошадях по красной площади </div>
                    <div class="result-price">
                        <div class="result-price__old">10 000 ₽</div>
                        <div class="result-price__new">5 000 ₽</div>
                    </div>
                </a>
                <a href="#" class="result-item">
                    <img src="img/example/search-result-04.png" class="result-img" alt="">
                    <div class="result-text"> Тайский массаж в 4 руки </div>
                    <div class="result-price">
                        <div class="result-price__old">100 000 ₽</div>
                        <div class="result-price__new">50 000 ₽</div>
                    </div>
                </a>
            </div>
        </div>
        <!-- END: search-area__viewed -->
        <div class="search-area__close btn-circle icon-close"></div>
    </div>
</div>
<div class="entertainment">
    <div class="entertainment-holder container">
        <ul class="entertainment-sidebar nav-section">
            <li class="nav-section-item icon-paint tab-links js__tab-nav active" data-tab="nav-section-item-01">
                <span class="nav-section-item__text">Творчество</span>
            </li>
            <li class="nav-section-item icon-guitar tab-links js__tab-nav" data-tab="nav-section-item-02">
                <span class="nav-section-item__text">Музыка</span>
            </li>
            <li class="nav-section-item icon-food-tray tab-links js__tab-nav" data-tab="nav-section-item-03">
                <span class="nav-section-item__text">Еда и напитки</span>
            </li>
            <li class="nav-section-item icon-hair-dye tab-links js__tab-nav" data-tab="nav-section-item-04">
                <span class="nav-section-item__text">Уход за собой</span>
            </li>
            <li class="nav-section-item icon-extreme tab-links js__tab-nav" data-tab="nav-section-item-05">
                <span class="nav-section-item__text">Экстрим</span>
            </li>
            <li class="nav-section-item icon-running tab-links js__tab-nav" data-tab="nav-section-item-06">
                <span class="nav-section-item__text">Спорт</span>
            </li>
            <li class="nav-section-item icon-education tab-links js__tab-nav" data-tab="nav-section-item-07">
                <span class="nav-section-item__text">Развитие</span>
            </li>
            <li class="nav-section-item icon-balloon tab-links js__tab-nav" data-tab="nav-section-item-08">
                <span class="nav-section-item__text">Разное</span>
            </li>
        </ul>
        <div class="entertainment-content tab-content">
            <div class="entertainment-section tab-pane js__tab-panel active" id="nav-section-item-01">
                <h2 class="entertainment-title">
                    <a href="#" class="entertainment-title__link link-decor">Творчество</a>
                </h2>
                <div class="entertainment-boxed">
                    <div class="entertainment-box">
                        <div class="entertainment-box__title">
                            <a href="#" class="entertainment-box__title-link link-decor">Живопись</a>
                        </div>
                        <ul class="entertainment-box__list list-unstyled">
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Роспись по стеклу</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Валяние из войлока</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Приготовление мыла</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Создание авторских украшений</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по живописи</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по флористике</a>
                            </li>
                        </ul>
                    </div>
                    <div class="entertainment-box">
                        <div class="entertainment-box__title">
                            <a href="#" class="entertainment-box__title-link link-decor">Танцевальное</a>
                        </div>
                        <ul class="entertainment-box__list list-unstyled">
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по восточным танцам</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по хип-хопу</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по балету</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по танго</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по бачате</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по брейкдансу</a>
                            </li>
                        </ul>
                    </div>
                    <div class="entertainment-box">
                        <div class="entertainment-box__title">
                            <a href="#" class="entertainment-box__title-link link-decor">Музыкальное</a>
                        </div>
                        <ul class="entertainment-box__list list-unstyled">
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по вокалу</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс игры на барабанах</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс DJ</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс игры на фортепиано</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс игры на гитаре</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс игры на флейте</a>
                            </li>
                        </ul>
                    </div>
                    <div class="entertainment-box">
                        <div class="entertainment-box__title">
                            <a href="#" class="entertainment-box__title-link link-decor">Кулинария</a>
                        </div>
                        <ul class="entertainment-box__list list-unstyled">
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс бармена</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Приготовление суши</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Кондитерское искусство</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер-класс по приготовлению пряников</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс по шоколадоварению</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Церемония приготовления какао</a>
                            </li>
                        </ul>
                    </div>
                    <div class="entertainment-box">
                        <div class="entertainment-box__title">
                            <a href="#" class="entertainment-box__title-link link-decor">Детям</a>
                        </div>
                        <ul class="entertainment-box__list list-unstyled">
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Аквапарк</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Картинг</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Батуты</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Парк игрового обучения</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Развивающие игры</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Детский лагерь</a>
                            </li>
                        </ul>
                    </div>
                    <div class="entertainment-box">
                        <div class="entertainment-box__title">
                            <a href="#" class="entertainment-box__title-link link-decor">Разное</a>
                        </div>
                        <ul class="entertainment-box__list list-unstyled">
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс жонглирования</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Курс по файершоу</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс макияжа</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Мастер класс прически</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Рыбалка</a>
                            </li>
                            <li class="entertainment-box__item">
                                <a href="#" class="entertainment-box__link">Актерское мастерство</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="entertainment-section tab-pane js__tab-panel" id="nav-section-item-02">
                <h2 class="entertainment-title">
                    <a href="#" class="entertainment-title__link link-decor">Музыка</a>
                </h2>
            </div>
            <div class="entertainment-section tab-pane js__tab-panel" id="nav-section-item-03">
                <h2 class="entertainment-title">
                    <a href="#" class="entertainment-title__link link-decor">Еда и напитки</a>
                </h2>
            </div>
            <div class="entertainment-section tab-pane js__tab-panel" id="nav-section-item-04">
                <h2 class="entertainment-title">
                    <a href="#" class="entertainment-title__link link-decor">Уход за собою</a>
                </h2>
            </div>
            <div class="entertainment-section tab-pane js__tab-panel" id="nav-section-item-05">
                <h2 class="entertainment-title">
                    <a href="#" class="entertainment-title__link link-decor">Экстрим</a>
                </h2>
            </div>
            <div class="entertainment-section tab-pane js__tab-panel" id="nav-section-item-06">
                <h2 class="entertainment-title">
                    <a href="#" class="entertainment-title__link link-decor">Спорт</a>
                </h2>
            </div>
            <div class="entertainment-section tab-pane js__tab-panel" id="nav-section-item-07">
                <h2 class="entertainment-title">
                    <a href="#" class="entertainment-title__link link-decor">Развитие</a>
                </h2>
            </div>
            <div class="entertainment-section tab-pane js__tab-panel" id="nav-section-item-08">
                <h2 class="entertainment-title">
                    <a href="#" class="entertainment-title__link link-decor">Разное</a>
                </h2>
            </div>
        </div>
    </div>
</div>
<div class="menu">
    <div class="container">
        <ul class="menu-tab-nav list-unstyled">
            <li class="menu-tab-nav__item tab-links js__tab-nav active" data-tab="menu-tab-1">
                <div class="menu-tab-nav__item-text">Главное меню</div>
            </li>
            <li class="menu-tab-nav__item tab-links js__tab-nav" data-tab="menu-tab-2">
                <div class="menu-tab-nav__item-text">Все развлечения</div>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane js__tab-panel active" id="menu-tab-1">
                <div class="menu-compare menu-link icon-arrow-right"> Сравнение мероприятий <span class="menu-compare__counter">2</span>
                </div>
                <ul class="menu-list list-unstyled">
                    <li class="menu-item"><a href="#" class="menu-link icon-arrow-right">О проекте</a></li>
                    <li class="menu-item"><a href="#" class="menu-link icon-arrow-right">Гарантии</a></li>
                    <li class="menu-item"><a href="#" class="menu-link icon-arrow-right">Staycation</a></li>
                    <li class="menu-item"><a href="#" class="menu-link icon-arrow-right">Блог</a></li>
                    <li class="menu-item"><a href="#" class="menu-link icon-arrow-right">Стать организатором</a></li>
                </ul>
            </div>
            <div class="tab-pane js__tab-panel" id="menu-tab-2">
                <ul class="list-unstyled">
                    <li class="menu-entertainment__item tab-links js__tab-item icon-paint" data-tab="menu-entertainment-01">
                        <span class="menu-entertainment__text">Творчество</span>
                    </li>
                    <li class="menu-entertainment__item tab-links js__tab-item icon-guitar" data-tab="menu-entertainment-02">
                        <span class="menu-entertainment__text">Музыка</span>
                    </li>
                    <li class="menu-entertainment__item tab-links js__tab-item icon-food-tray" data-tab="menu-entertainment-03">
                        <span class="menu-entertainment__text">Еда и напитки</span>
                    </li>
                    <li class="menu-entertainment__item tab-links js__tab-item icon-hair-dye" data-tab="menu-entertainment-04">
                        <span class="menu-entertainment__text">Уход за собой</span>
                    </li>
                    <li class="menu-entertainment__item tab-links js__tab-item icon-extreme" data-tab="menu-entertainment-05">
                        <span class="menu-entertainment__text">Экстрим</span>
                    </li>
                    <li class="menu-entertainment__item tab-links js__tab-item icon-running" data-tab="menu-entertainment-06">
                        <span class="menu-entertainment__text">Спорт</span>
                    </li>
                    <li class="menu-entertainment__item tab-links js__tab-item icon-education" data-tab="menu-entertainment-07">
                        <span class="menu-entertainment__text">Развитие</span>
                    </li>
                    <li class="menu-entertainment__item tab-links js__tab-item icon-balloon" data-tab="menu-entertainment-08">
                        <span class="menu-entertainment__text">Разное</span>
                    </li>
                </ul>
                <div class="menu-entertainment tab-content">
                    <div class="tab-pane js__tab-box" id="menu-entertainment-01">
                        <h2><a href="#" class="menu-entertainment__title-link">Творчество</a></h2>
                        <ul class="mini-card list-unstyled">
                            <li class="mini-card-item">
                                <a href="#" class="mini-card-link">
                                    <img src="img/example/entertainment-01.jpg" class="mini-card-img" alt=""> Живопись </a>
                            </li>
                            <li class="mini-card-item">
                                <a href="#" class="mini-card-link">
                                    <img src="img/example/entertainment-02.jpg" class="mini-card-img" alt=""> Музыкальное </a>
                            </li>
                            <li class="mini-card-item">
                                <a href="#" class="mini-card-link">
                                    <img src="img/example/entertainment-03.jpg" class="mini-card-img" alt=""> Танцевальное </a>
                            </li>
                            <li class="mini-card-item">
                                <a href="#" class="mini-card-link">
                                    <img src="img/example/entertainment-04.jpg" class="mini-card-img" alt=""> Кулинария </a>
                            </li>
                            <li class="mini-card-item">
                                <a href="#" class="mini-card-link">
                                    <img src="img/example/entertainment-05.jpg" class="mini-card-img" alt=""> Детям </a>
                            </li>
                            <li class="mini-card-item">
                                <a href="#" class="mini-card-link">
                                    <img src="img/example/entertainment-06.jpg" class="mini-card-img" alt=""> Разное </a>
                            </li>
                        </ul>
                        <a href="#">Посмотреть все предложения >>></a>
                    </div>
                    <div class="tab-pane js__tab-box" id="menu-entertainment-02">2</div>
                    <div class="tab-pane js__tab-box" id="menu-entertainment-03">3</div>
                    <div class="tab-pane js__tab-box" id="menu-entertainment-04">4</div>
                    <div class="tab-pane js__tab-box" id="menu-entertainment-05">5</div>
                    <div class="tab-pane js__tab-box" id="menu-entertainment-06">6</div>
                    <div class="tab-pane js__tab-box" id="menu-entertainment-07">7</div>
                    <div class="tab-pane js__tab-box" id="menu-entertainment-08">8</div>
                    <div class="menu-entertainment__close btn-circle icon-arrow-long-left"></div>
                </div>
            </div>
        </div>
    </div>
</div>
