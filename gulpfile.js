'use strict';
const ftp = require('vinyl-ftp');

const path = require('path');

/* подключаем gulp и плагины */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const jpegrecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const rimraf = require('gulp-rimraf');
const rename = require('gulp-rename');
const stripCssComments = require('gulp-strip-css-comments');
const twig = require('gulp-twig');
const htmlbeautify = require('gulp-html-beautify');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const strip = require('gulp-strip-comments');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

const argv = require('yargs').argv;
const developer = !!argv.developer;
const production = !developer;

const isMode = developer ? 'dev' : 'prod';
const dataMode = require(`./src/data/${isMode}.json`);
const dataSite = require(`./src/data/site.json`);

/* пути */
const paths = {
  root: './public_html',
  clean: './public_html',
  dist: {
    html: './public_html',
    js: './public_html/js',
    css: './public_html/css',
    img: './public_html/img',
    fonts: './public_html/fonts',
    favicon: './public_html/favicon'
  },
  src: {
    twig: './src/views/*.twig',
    script: './src/js/*.js',
    style: './src/styles/*.scss',
    img: './src/img/**/*.*',
    fonts: './src/fonts/**/*.*',
    favicon: './src/favicon/**/*.*'
  },
  watch: {
    twig: './src/views/**/*.twig',
    js: './src/js/**/*.js',
    scss: './src/styles/**/*.scss',
    img: './src/img/**/*.*',
    fonts: './src/fonts',
    favicon: './src/favicon'
  }
};


// слежка
function watch() {
  gulp.watch(paths.watch.scss, styles);
  gulp.watch(paths.watch.twig, templates);
  gulp.watch(paths.watch.js, scripts);
  gulp.watch(paths.watch.fonts, fonts);
  gulp.watch(paths.watch.img, images);
}


// следим за dist и релоадим браузер
function server() {
  browserSync.init({
    server: './public_html',
    notify: false,
    port: 5005
  });
  browserSync.watch('./public_html/**/*.*', browserSync.reload);
}


// очистка
function clean() {
  return gulp.src(paths.clean, {read: false})
    .pipe(rimraf());
}


// templates
function templates() {
  return gulp.src(paths.src.twig)
    .pipe(twig({
      data: {
        mode: dataMode,
        site: dataSite
      }
    }))
    .pipe(gulpif(production, htmlbeautify()))
    .pipe(gulp.dest(paths.dist.html));
}


// scss
function styles() {
  return gulp.src(paths.src.style)
    .pipe(gulpif(developer, sourcemaps.init()))
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({includePaths: ['node_modules']})
      .on('error', sass.logError))
    .pipe(plumber.stop())
    .pipe(stripCssComments())
    .pipe(autoprefixer())
    .pipe(gulpif(developer, sourcemaps.write()))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist.css));
}


// js
function scripts() {
  return gulp.src(paths.src.script)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulpif(production, strip()))
    .pipe(gulp.dest(paths.dist.js));
}

function scripts_libs() {
  return gulp.src([
    './src/js/vendors/jquery.min.js',
    './src/js/vendors/jquery.validate.min.js',
    './src/js/vendors/slick.min.js',
    './src/js/vendors/jquery.formstyler.js'
  ])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js));
}


// fonts
function fonts() {
  return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts));
}


// favicon
function favicon() {
  return gulp.src(paths.src.favicon)
    .pipe(gulp.dest(paths.dist.favicon));
}


// обработка картинок
function images() {
  return gulp.src(paths.src.img)
    .pipe(cache(imagemin([
      jpegrecompress({
        progressive: true,
        max: 85,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({plugins: [{removeViewBox: false}]})
    ])))
    .pipe(gulp.dest(paths.dist.img));
}


// инициализируем задачи
exports.scripts_libs = scripts_libs;
exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.favicon = favicon;
exports.images = images;
exports.clean = clean;


gulp.task('default', gulp.series(
  gulp.parallel(fonts, favicon, images, styles, scripts, templates),
  gulp.parallel(watch, server)
));


gulp.task('build', gulp.series(
  gulp.parallel(fonts, favicon, images, styles, scripts, templates)
));


/* задачи */
gulp.task('countriesIcons', function () {
  return gulp
    .src('./src/img/countries/*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest('./public_html/img/'));
});


gulp.task('deploy', function () {
  var conn = ftp.create({
    host: 'artlen0t.beget.tech',
    user: 'artlen0t_depfill2',
    password: '4uUA&pYB6kZH7&gP',
    parallel: 10
  });

  var globs = [
    './public_html/**'
  ];
  return gulp.src(globs, {buffer: false})
    .pipe(conn.dest('/'));

});
