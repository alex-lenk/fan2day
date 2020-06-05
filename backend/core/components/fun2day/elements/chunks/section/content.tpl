{var $default = true}
{switch $_modx->resource.uri}
    {case 'index'}
        {var $default = false}
        {include 'file:chunks/content/main.tpl'}
    {case 'catalog'}
        {var $default = false}
        {include 'file:chunks/content/catalog.tpl'}
{/switch}
{if $default}
    {include 'file:chunks/content/default.tpl'}
{/if}
