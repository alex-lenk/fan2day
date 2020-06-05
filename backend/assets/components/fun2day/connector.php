<?php
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var Fun2Day $Fun2Day */
$Fun2Day = $modx->getService('Fun2Day', 'Fun2Day', MODX_CORE_PATH . 'components/fun2day/model/');
$modx->lexicon->load('fun2day:default');

// handle request
$corePath = $modx->getOption('fun2day_core_path', null, $modx->getOption('core_path') . 'components/fun2day/');
$path = $modx->getOption('processorsPath', $Fun2Day->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);