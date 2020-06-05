<title>{$_modx->resource.pagetitle}</title>
<base href="{$_modx->config.site_url}">

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
{if $_modx->resource.searchable}<meta name="robots" content="index, follow">
{else}<meta name="robots" content="noindex, nofollow">{/if}
{if !$_modx->resource.description && !($_modx->resource.content | ellipsis : "500" | match : '*{*')}
{var $description = $_modx->resource.content | stripmodxtags | striptags | strip : true | ellipsis : "180"}
{else}{var $description = $_modx->resource.description}{/if}
<meta name="description" content="{$description | replace :' "':' «' | replace :'"':'»'}">
<meta name="keywords" content="{$_modx->resource.keywords | replace :' "':' «' | replace :'"':'»'}" />
{if $_modx->resource.img}<meta property="og:image" content="{$_modx->config.site_url | rtrim : '/'}{$_modx->resource.img | phpthumbon : "w=400&h=280"}" />{/if}

<link rel="shortcut icon" href="/assets/components/site/web/img/favicon.ico" type="image/x-icon">

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="/assets/components/site/web/vendor/jquery.min.js"><\/script>')</script>
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

{'!MinifyX' | snippet : [
  'minifyCss' => 1,
  'minifyJs' => 1,
  'cssSources' => '/assets/components/site/bootstrap/css/bootstrap.min.css,' ~
                  '/assets/components/site/fancybox/source/jquery.fancybox.css',
  'jsSources'  => '/assets/components/site/bootstrap/js/bootstrap.min.js,' ~
                  '/assets/components/site/fancybox/source/jquery.fancybox.pack.js,' ~
                  '/assets/components/site/web/js/script.js,'
]}
{'MinifyX.css' | placeholder}
