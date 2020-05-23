# Gulp + Webpack - Окружение для разработки веб-проекта fan2day
Современный стартовый инструментарий для веб-разработки с использованием Gulp Task Runner и Webpack bundler.

Идеально подходит для быстрой сборки статических HTML сайтов или верстки. 

Все задачи выполняются через Gulp. Webpack используется только для сборки Javascript (особенно для ES6 Import/Export, так как Gulp не может сделать это надлежащим образом).

![](readme/img/gwst.png)

## Требования к окружению
Для создания окружения необходимо иметь следующие установленные инструменты:
-	node.js
-   npm
-	git
-	gulp
-   webpack

Если у вас данных инструментов нет, то их необходимо установить.

Также рекомендуется вместо `npm` использовать `yarn`, синтаксис не особо отличается, но зато прирост в скорости установки пакетов ощутимо заметен.

## Установка

### 1. Клонирование
Скачайте файлы с github или клонируйте его c помощью команды:

```bash
git clone https://github.com/alex-lenk/fan2day.git
```

### 2. Установки зависимостей проекта
Для установки зависимостей проекта необходимо в командной строке ввести команды:
```bash
npm install
```

Если требуются дополнительные пакеты, то для их установки нужно выполнить команду:

- Установка пакета, при этом информация о нём, автоматически прописывается в секцию "devDependencies" файла "package.json" *(такие пакеты как gulp-autoprefixer)*
```bash
npm install название_пакета --save-dev
```

- Установка пакета, при этом информация о нём, автоматически прописывается в секцию "dependencies" файла "package.json" *(такие пакеты как bootstrap)*
```bash
npm install название_пакета --save-prod
```


## Как использовать окружение
**Режим живого сервера** 
- `npm run watch`       - сборка и запуск live-server в режиме developer 
- `npm run prodwatch`   - сборка и запуск live-server в режиме production        

**Режим сборки** 
- `npm run build`       - сборка проекта в режиме production 
- `npm run devbuild`    - сборка проекта в режиме developer       

**Выборочная сборка**: 
- `gulp templates`    - сборка html файлов
- `gulp styles`       - сборка css стилей
- `gulp scripts`      - сборка js скриптов
- `gulp scripts_libs` - сборка js библиотек
- `gulp fonts`        - сборка шрифтов
- `gulp images`       - сборка картинок
- `gulp clean`        - очистка папки конечной сборки

## Список инструментов

Окружение, предназначенное для разработки фронтенд проекта, построено на базе следующих инструментов:

- **Node.js** (среды, в которой будет выполняться окружение);
- **npm** (пакетного менеджера, входящего в Node.js; будет использоваться для загрузки Gulp, плагинов и фронтенд пакетов);
- **jQuery, Popover, Bootstrap** (пакеты, которые будут использоваться для сборки css и js частей сайта);
- **Gulp и его плагины** (будут использоваться для сборки проекта и выполнения других веб задач).
- **Webpack и его плагины** (будут использоваться для сборки js скриптов).

## Файловая структура Gulp проекта

### Корневая директория
В корне проекта расположены папки:

```bash
├── gulpfile.js                 # Конфигурация и задачи Gulpfile
├── package.json                # Зависимости и скрипты Node.js
├── README.md                   # Описание проекта
├── dist                        # Директория выгрузки проекта
├── src                         # Для исходных файлов
│   ├── fonts                   # Для шрифтов
│   ├── img                     # Для изображений
│   ├── js                      # Для js-файлов
│   │   └── main.js             # Вы можете создать любое количество js файлов в этом каталоге
│   ├── styles                  # Для scss стилей
│   │   ├── styles.scss         # Основной файл таблицы стилей для десктопной версии сайта
│   │   ├── styles-mobile.scss  # Пользовательская таблица стилей
│   ├── data                    # Хранятся json файлы для вывода данных при разработке
│   │   ├── dev.json            # json файл для вывода данных при develop разработке
│   │   ├── prod.jso            # json файл для вывода данных при production разработке
│   │   └── site.jso            # Общий json файл для вывода данных
│   └── views                   # Для фрагментов twig файлов
│       ├── index-desk.twig     # Десктопная и планшетная версия главной
│       ├── index-mob.twig      # Мобильная версия главной
│       ├── /desktop-table/     # Хранятся блоки для десктопной версия
│       ├── /mobile/            # Хранятся блоки для мобильной версия
│       ├── /layout/            # Хранятся шаблоны страницы
│       │   └── index.twig      # Хранятся общие шаблоны страниц
│       └── partials            # Хранятся части часто используемого кода на страницах
└── webpack.config.js           # Настройки webpack
```

### Директория js

В директории `js` располагаются два файла: `scripts.js` и `scripts-mobile.js`. Файл `scripts-mobile.js` используется для написания своих скриптов для мобильной версии, а 
`scripts.js` – используется для написания своих скриптов для десктопной версии.
Под итоговым понимается файл, который должен получиться на выходе (в каталоге `build`).

### Директория style

Директория `style` отведена под стили. В данной директории находятся три файла: `main.scss` (содержит список файлов, содержимое которых необходимо включить в итоговый файл стилей), `my.scss` (используется для написания своих стилей) и `variables.scss` (содержит SCSS переменные, с помощью которых будем изменять стили Bootstrap 4, а также использовать его для создания своих переменных).

### Директория views и файл index.twig

Файл `index.twig` - это главная страница создаваемого проекта. Кроме `index.twig` в данную директорию можно поместить и другие twig файлы из которых будут созданы html страницы.

Директория `layout` предназначена для помещения в неё шаблонов страниц. 

Директория `partials` предназначена для помещения в неё фрагментов страниц. Это позволит более просто создавать и редактировать html страницы, т.к. отдельные части страниц уже будут находиться в отдельных файлах.

В данной сборке используется шаблонизатор twig.
