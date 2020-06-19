const gulp = require('gulp');
const server = require('browser-sync').create();
const sass = require('gulp-sass');
const del = require('del');

function clean (done) {
  return del('dist', done);
}

function sassCompile () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(server.stream());
}

function copy () {
  return gulp.src(['./src/js/**/*.js',
                   './src/*.html',
                   './src/assets/**',
                   './src/fonts/**'],
                   {base: './src/'})
    .pipe(gulp.dest('./dist'));
}

function serve () {
  server.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('./src/scss/**/*.scss', sassCompile);
  gulp.watch('./src/*.html').on('change', server.reload);
  gulp.watch('./src/js/**/*.js').on('change', server.reload);
}

exports.serve = serve;
exports.sassCompile = sassCompile;
exports.clean = clean;
exports.copy = copy;