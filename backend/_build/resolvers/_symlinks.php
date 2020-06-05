<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/Fun2Day/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/fun2day')) {
            $cache->deleteTree(
                $dev . 'assets/components/fun2day/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/fun2day/', $dev . 'assets/components/fun2day');
        }
        if (!is_link($dev . 'core/components/fun2day')) {
            $cache->deleteTree(
                $dev . 'core/components/fun2day/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/fun2day/', $dev . 'core/components/fun2day');
        }
    }
}

return true;