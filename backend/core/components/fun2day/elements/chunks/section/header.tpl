{if 'mobile' | mobiledetect}
    {include 'file:chunks/section/breadcrumbs.tpl'}
    <header class="header">
        <div class="container">
            <div class="header-holder row">
                <div class="col-2">
                    <div class="header-toggle btn-circle icon-menu"></div>
                </div>
                <div class="col-2">
                    <div class="btn-circle icon-search js__search"></div>
                </div>
                <div class="col-4">
                    <a href="/" class="header-logo"><img src="img/logo.svg" alt="fan2day"></a>
                </div>
                <div class="col-2 text-right">
                    <a href="tel:+79776958105" class="btn-circle icon-phone" rel="nofollow"></a>
                </div>
                <div class="col-2 text-right">
                    <div class="btn-circle icon-user js__login"></div>
                </div>
            </div>
            <!-- Begin: search form -->
            <div class="search-form__wrap">
                <form class="search-form" action="/" method="GET">
                    <div class="search-form-box">
                        <input type="search" class="search-form-box__input form-control hide-placeholder" placeholder="Введите поисковой запрос">
                        <div class="search-form-box__back btn-circle icon-arrow-long-left"></div>
                        <button type="submit" class="search-form-btn btn-circle icon-search"></button>
                    </div>
                </form>
            </div>
            <!-- END: search form -->
        </div>
    </header>
{else}
    <nav class="top-panel">
        <div class="top-panel-holder container">
            <div class="top-panel-all btn btn-bright icon-menu-list top-panel-all__JS">
                <span class="btn-text">Все развлечения</span>
            </div>
            <div class="top-panel-search btn-circle icon-search js__search"></div>
            <ul class="top-panel-nav list-unstyled">
                <li class="top-panel-nav__item"><a href="#" class="top-panel-nav__link link-decor">О проекте</a></li>
                <li class="top-panel-nav__item"><a href="#" class="top-panel-nav__link link-decor">Гарантии</a></li>
                <li class="top-panel-nav__item"><a href="#" class="top-panel-nav__link link-decor">Staycation</a></li>
                <li class="top-panel-nav__item"><a href="#" class="top-panel-nav__link link-decor">Главная</a></li>
                <li class="top-panel-nav__item"><a href="#" class="top-panel-nav__link link-decor">Блог</a></li>
                <li class="top-panel-nav__item"><a href="#" class="top-panel-nav__link link-decor">Стать организатором</a></li>
            </ul>
            <a href="tel:+79776958105" class="top-panel-phone link-decor" rel="nofollow">+7 (977) 695-81-05</a>
            <a href="#" class="top-panel-compare btn-circle icon-compare">
                <span class="top-panel-compare__counter">2</span>
            </a>
            {if $_modx->hasSessionContext('web')}
                <div class="top-panel-user">
                    {'!officeAuth' | snippet : [
                    	'tplLogout' => '@FILE chunks/office/auth_logout.tpl'
                    ]}
                </div>
            {else}
                <div class="btn btn-bright js__login">
                    <span class="btn-text">Войти</span>
                </div>
            {/if}
        </div>
    </nav>
    {include 'file:chunks/section/breadcrumbs.tpl'}
{/if}
