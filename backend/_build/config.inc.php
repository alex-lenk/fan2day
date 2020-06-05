<?php

if (!defined('MODX_CORE_PATH')) {
    $path = dirname(dirname(__DIR__)) . '/dist';
    while (!file_exists($path . '/core/config/config.inc.php') && (strlen($path) > 1)) {
        $path = dirname($path);
    }
    define('MODX_CORE_PATH', $path . '/core/');
}

return [
    'name' => 'Fun2Day',
    'name_lower' => 'fun2day',
    'version' => '1.0.0',
    'release' => 'beta',
    // Install package to site right after build
    'install' => true,
    // Which elements should be updated on package upgrade
    'update' => [
        'chunks' => true,
        'menus' => true,
        'permission' => true,
        'plugins' => true,
        'policies' => true,
        'policy_templates' => true,
        'resources' => true,
        'settings' => false,
        'snippets' => true,
        'templates' => true,
        'widgets' => true,
    ],
    // Which elements should be static by default
    'static' => [
        'plugins' => false,
        'snippets' => false,
        'chunks' => false,
    ],
    // Log settings
    'log_level' => !empty($_REQUEST['download']) ? 0 : 3,
    'log_target' => php_sapi_name() == 'cli' ? 'ECHO' : 'HTML',
    // Download transport.zip after build
    'download' => !empty($_REQUEST['download']),
];