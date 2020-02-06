const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const rigger = require('gulp-rigger');

const jsFiles = [
	'./src/js/main.js',
]

function fonts() {
  return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts/'))
}

function images() {
  return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./build/img/'))
}

function styles() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest('./build/css/'))
}

function scripts() {
	return gulp.src(jsFiles)
	  .pipe(rigger())
		.pipe(concat('all.js'))
		.pipe(uglify({
      toplevel: true,
    }))
		.pipe(gulp.dest('./build/js'))
}

function watch() {
	gulp.watch('./src/scss/**/*.scss', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./src/fonts/**/*.*', fonts);
  gulp.watch('./src/img/**/*.*', images);
}

function clean() {
	return del(['build/*'])
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('fonts', fonts);
gulp.task('images', images);

gulp.task('default', gulp.series(clean, gulp.parallel(fonts, images, styles, scripts), 'watch'))
