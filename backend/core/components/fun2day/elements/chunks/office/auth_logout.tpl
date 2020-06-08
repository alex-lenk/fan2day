<div class="top-panel-user__control icon-arrow-down">
    <div class="top-panel-user__media">
        <img src="{if $photo?}{$photo}{else}{$gravatar}?s=100{/if}" alt="{$fullname}">
    </div>
</div>
<div class="top-panel-user__menu">
    <ul class="personal-area-menu list-unstyled">
        <li class="personal-area-menu__item icon-arrow-right">
            <a href="#" class="personal-area-menu__link icon-orders">Заказы</a>
        </li>
        <li class="personal-area-menu__item icon-arrow-right">
            <a href="#" class="personal-area-menu__link icon-location">Мероприятия</a>
        </li>
        <li class="personal-area-menu__item icon-arrow-right">
            <a href="#" class="personal-area-menu__link icon-settings">Настройки</a>
        </li>
        <li class="personal-area-menu__item icon-arrow-right">
            <a href="#" class="personal-area-menu__link icon-support">Поддержка</a>
        </li>
    </ul>
    <a href="{$_modx->resource.id | url : [] : ['action' => 'auth/logout']}" class="personal-area-out">Выйти</a>
</div>
