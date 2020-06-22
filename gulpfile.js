const gulp = require('gulp');
const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const ghPages = require('gulp-gh-pages');

const path =  {
  src: './src/',
  dist: './dist/',
};

function clean (done) {
  return del('dist', done);
}

function compileSass () {
  return src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(dest(path.dist + 'css'))
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(browserSync.stream())
    .pipe(sourcemaps.write('/'))
    .pipe(dest(path.dist + 'css'));
}

function copyAll () {
  return src([path.src + 'js/**/*.js',
                   path.src + '*.html',
                   path.src + 'images/**',
                   path.src + 'fonts/**'],
                   {base: path.src})
    .pipe(dest(path.dist));
}

function copyHtml () {
  return src(path.src + '*.html')
    .pipe(dest(path.dist));
}

function copyImg () {
  return src(path.src + 'images/**',
                  {base: path.src})
    .pipe(newer(path.dist + 'images'))  
    .pipe(dest(path.dist));
}

function copyFonts () {
  return src(path.src + 'fonts/**',
                  {base: path.src})
    .pipe(dest(path.dist))
}

function compileJs () {
  return src(path.src + 'js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(concat('script.min.js'))
    .pipe(sourcemaps.write('/map'))
    .pipe(dest(path.dist + 'js'));
}

function serve () {
  browserSync.init({
    server: {
      baseDir: path.dist,
      startPath: "index.html"
    }
  });

  watch(path.src + 'scss/**/*.scss', compileSass);
  watch(path.src + '*.html', copyHtml);
  watch(path.src + 'images/**', copyImg);
  watch(path.src + 'fonts/**', copyFonts);
  watch(path.src + 'js/**', compileJs);
  watch(path.dist + '*.html').on('change', browserSync.reload);
  watch(path.dist + 'js/**/*.js').on('change', browserSync.reload);
}

function deploy () {
  return src(path.dist + '**/*')
    .pipe(ghPages());
}

exports.serve = serve;
exports.compileSass = compileSass;
exports.clean = clean;
exports.copyAll = copyAll;
exports.copyHtml = copyHtml;
exports.copyImg = copyImg;
exports.compileJs = compileJs;
exports.deploy = deploy;
exports.build = series(
  clean,
  parallel(copyHtml, copyFonts, copyImg, compileJs, compileSass)
);
