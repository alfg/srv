const gulp = require('gulp')
const del = require('del')
const cache = require('gulp-cached')
const help = require('gulp-task-listing')
const babel = require('gulp-babel')
const ext = require('gulp-ext')

gulp.task('help', help)

gulp.task('clean', function () {
  del(['build'])
})

gulp.task('transpile-bin', function () {
  return gulp.src('bin/**/*')
  .pipe(cache('bin'))
  .pipe(babel())
  .pipe(ext.crop())
  .pipe(gulp.dest('build'))
})

gulp.task('transpile-lib', function () {
  return gulp.src('lib/**/*')
  .pipe(cache('lib'))
  .pipe(babel())
  .pipe(gulp.dest('build/lib'))
})

gulp.task('watch', () => {
    gulp.watch('lib/**/*', ['transpile'])
})

gulp.task('default', ['watch', 'transpile-bin', 'transpile-lib'])
gulp.task('build', ['transpile-bin', 'transpile-lib'])
