{block 'wrapper'}
  <h1>{$_modx->resource.longtitle ?: $_modx->resource.pagetitle}</h1>
  {block 'before_content'}{/block}
  {block 'content'}
    {var $show_on_page = $_modx->resource.show_on_page}
    {if $show_on_page | match : '*content*'}
      {$_modx->resource.content}
    {/if}
  {/block}
  {block 'after_content'}{/block}
{/block}
