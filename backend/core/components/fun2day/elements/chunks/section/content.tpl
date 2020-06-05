{var $default = true}
{switch $_modx->resource.id}
    {case 1}
        {var $default = false}
        {include 'file:chunks/content/main.tpl'}
{/switch}
{if $default}
    {include 'file:chunks/content/default.tpl'}
{/if}
