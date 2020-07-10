const gulp = require('gulp');
const del = require('del');
const cache = require('gulp-cached');
const help = require('gulp-task-listing');
const babel = require('gulp-babel');
const ext = require('gulp-ext');
const eslint = require('gulp-eslint');

function clean() {
  return del(['build'])
}

function transpileBin() {
  return gulp.src('bin/**/*')
  .pipe(cache('bin'))
  .pipe(babel())
  .pipe(ext.crop())
  .pipe(gulp.dest('build'))
}

function transpileLib() {
  return gulp.src('lib/**/*')
  .pipe(cache('lib'))
  .pipe(babel())
  .pipe(gulp.dest('build/lib'))
}

function copy() {
  return gulp.src(['default.json'])
  .pipe(gulp.dest('build'));
}

function watchFiles() {
  gulp.watch('lib/**/*', build);
}

function lint() {
  return gulp.src(['**/*.js', '!node_modules/**', '!build/**', '!docs/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
}


export { clean, help, transpileBin, transpileLib, copy, lint, watchFiles as watch };

const build = gulp.series(clean);

export default build;
