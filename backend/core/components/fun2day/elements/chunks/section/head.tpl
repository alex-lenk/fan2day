<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<title>{$_modx->resource.pagetitle}</title>
<base href="{$_modx->config.site_url}">
<link rel="stylesheet" href="/css/styles.min.css?ver=4.0">
<link rel="manifest" href="/favicon/manifest.json?v=8jMvgPwL0E">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png?v=8jMvgPwL0E">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=8jMvgPwL0E">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=8jMvgPwL0E">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png?v=8jMvgPwL0E">
<link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png?v=8jMvgPwL0E">
<link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png?v=8jMvgPwL0E">
<link rel="apple-touch-icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png?v=8jMvgPwL0E">
<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg?v=8jMvgPwL0E" color="#111111">
<link rel="shortcut icon" href="/favicon/favicon.ico?v=8jMvgPwL0E">
<meta name="msapplication-TileColor" content="#e3e5ec">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="application-name" content="fan2day">
<meta name="apple-mobile-web-app-title" content="fan2day">
<meta name="msapplication-navbutton-color" content="#e3e5ec">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="msapplication-starturl" content="/">
<meta name="msapplication-config" content="/favicon/browserconfig.xml?v=8jMvgPwL0E">
<meta name="theme-color" content="#e3e5ec">

{if $_modx->resource.searchable}<meta name="robots" content="index, follow">
{else}<meta name="robots" content="noindex, nofollow">{/if}
{if !$_modx->resource.description && !($_modx->resource.content | ellipsis : "500" | match : '*{*')}
{var $description = $_modx->resource.content | stripmodxtags | striptags | strip : true | ellipsis : "180"}
{else}{var $description = $_modx->resource.description}{/if}
<meta name="description" content="{$description | replace :' "':' «' | replace :'"':'»'}">
<meta name="keywords" content="{$_modx->resource.keywords | replace :' "':' «' | replace :'"':'»'}" />
{if $_modx->resource.img}<meta property="og:image" content="{$_modx->config.site_url | rtrim : '/'}{$_modx->resource.img | phpthumbon : "w=400&h=280"}" />{/if}
