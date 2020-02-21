var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin');

var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
      html: './',
      js: 'build/js/',
      css: 'build/css/',
      img: 'build/img/',
      fonts: 'build/fonts/'
  },
  src: { //Пути откуда брать исходники
      html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
      js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
      style: 'src/css/main.scss',
      img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
      fonts: 'src/fonts/**/*.*'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
      html: 'src/**/*.html',
      js: 'src/js/**/*.js',
      style: 'src/css/**/*.scss',
      img: 'src/img/**/*.*',
      fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

gulp.task('html:build', function () {
  return gulp.src(path.src.html) //Выберем файлы по нужному пути
      .pipe(rigger()) //Прогоним через rigger
      .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js) //Найдем наш main файл
      .pipe(rigger()) //Прогоним через rigger
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(uglify()) //Сожмем наш js
      .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
});

gulp.task('style:build', function () {
  return gulp.src(path.src.style) //Выберем наш main.scss
      .pipe(sass({
        
        outputStyle: 'expanded'
      }).on("error", notify.onError())) //Скомпилируем
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(prefixer({
        overrideBrowserslist: ['last 3 versions'],
        cascade: false,
      })) //Добавим вендорные префиксы
      .pipe(cssmin({
        level: 2
      })) //Сожмем
      .pipe(gulp.dest(path.build.css)) //И в build
});

gulp.task('image:build', function () {
  return gulp.src(path.src.img) //Выберем наши картинки
      .pipe(imagemin())
      .pipe(gulp.dest(path.build.img)) //И бросим в build
});

gulp.task('fonts:build', function() {
  return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
});

gulp.task('clean', function() {
  return del([path.clean])
});

gulp.task('watch', function() {
  gulp.watch(path.watch.html, gulp.parallel('html:build'));
  gulp.watch(path.watch.js, gulp.parallel('js:build'));
  gulp.watch(path.watch.style, gulp.parallel('style:build'));
  gulp.watch(path.watch.img, gulp.parallel('image:build'));
  gulp.watch(path.watch.fonts, gulp.parallel('fonts:build'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('html:build', 'js:build', 'style:build', 'image:build', 'fonts:build'), 'watch'))