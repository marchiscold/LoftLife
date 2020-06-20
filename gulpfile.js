const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const path =  {
  src: './src/',
  dist: './dist/',
};

function clean (done) {
  return del('dist', done);
}

function sassCompile () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.dist + 'css'))
    .pipe(browserSync.stream())
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest(path.dist + 'css'));
}

function copyAll () {
  return gulp.src([path.src + 'js/**/*.js',
                   path.src + '*.html',
                   path.src + 'assets/**',
                   path.src + 'fonts/**'],
                   {base: path.src})
    .pipe(gulp.dest(path.dist));
}

function copyHtml () {
  return gulp.src(path.src + '*.html')
    .pipe(gulp.dest(path.dist));
}

function copyImg () {
  return gulp.src(path.src + 'assets/**',
                  {base: path.src})
    .pipe(gulp.dest(path.dist))
}

function copyFonts () {
  return gulp.src(path.src + 'fonts/**',
                  {base: path.src})
    .pipe(gulp.dest(path.dist))
}

function serve () {
  browserSync.init({
    server: {
      baseDir: path.dist
    }
  });

  gulp.watch(path.src + 'scss/**/*.scss', sassCompile);
  gulp.watch(path.src + '*.html', copyHtml);
  gulp.watch(path.src + 'assets/**', copyImg);
  gulp.watch(path.src + 'fonts/**', copyFonts);
  gulp.watch(path.dist + '*.html').on('change', browserSync.reload);
  gulp.watch(path.dist + 'js/**/*.js').on('change', browserSync.reload);
}

exports.serve = serve;
exports.sassCompile = sassCompile;
exports.clean = clean;
exports.copyAll = copyAll;
exports.copyHtml = copyHtml;