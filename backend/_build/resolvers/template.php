<?php

/** @var $modx modX */
if (!$modx = $object->xpdo AND !$object->xpdo instanceof modX) {
    return true;
}

/** @var $options */
switch ($options[xPDOTransport::PACKAGE_ACTION]) {
    case xPDOTransport::ACTION_INSTALL:
    case xPDOTransport::ACTION_UPGRADE:
        $template = $modx->getObject('modTemplate', 1);
        $template->set('content', '{include \'file:templates/base.tpl\'}');
        $template->save();
        break;
    case xPDOTransport::ACTION_UNINSTALL:
        break;
}

return true;