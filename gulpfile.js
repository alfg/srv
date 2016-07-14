const gulp = require('gulp');
const del = require('del');
const cache = require('gulp-cached');
const help = require('gulp-task-listing');
const babel = require('gulp-babel');
const ext = require('gulp-ext');
const eslint = require('gulp-eslint');

gulp.task('help', help);

gulp.task('clean', function () {
  del(['build']);
});

gulp.task('transpile-bin', function () {
  return gulp.src('bin/**/*')
  .pipe(cache('bin'))
  .pipe(babel())
  .pipe(ext.crop())
  .pipe(gulp.dest('build'))
});

gulp.task('transpile-lib', function () {
  return gulp.src('lib/**/*')
  .pipe(cache('lib'))
  .pipe(babel())
  .pipe(gulp.dest('build/lib'))
});

gulp.task('watch', function () {
  gulp.watch('lib/**/*', ['build']);
});

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_modules/**', '!build/**', '!docs/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['transpile-bin', 'transpile-lib']);
