<?php

return [
    'web' => [
        'index' => [
            'pagetitle' => 'Главная',
            'template' => 1,
            'hidemenu' => false,
        ],
        'catalog' => [
            'pagetitle' => 'Каталог',
            'template' => 1,
            'hidemenu' => false,
        ],
        '404' => [
            'pagetitle' => '404 Страница не найдена',
            'template' => 1,
            'hidemenu' => true,
            'menuindex' => 1000,
        ],
        'robots' => [
            'pagetitle' => 'robots.txt',
            'template' => 0,
            'hidemenu' => true,
            'uri' => 'robots.txt',
            'uri_override' => true,
            'content_type' => 3,
            'menuindex' => 1010,
        ],
        /*
        'service' => [
            'pagetitle' => 'Service',
            'template' => 0,
            'hidemenu' => true,
            'published' => false,
            'resources' => [
                '404' => [
                    'pagetitle' => '404',
                    'template' => 1,
                    'hidemenu' => true,
                    'uri' => '404',
                    'uri_override' => true,
                ],
                'sitemap.xml' => [
                    'pagetitle' => 'Sitemap',
                    'template' => 0,
                    'hidemenu' => true,
                    'uri' => 'sitemap.xml',
                    'uri_override' => true,
                ],
            ],
        ],
        */
    ],
];