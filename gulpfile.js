// Gulp Dependencies
var gulp   = require('gulp');
var rename = require('gulp-rename');

// Dev Dependencies
var jshint = require('gulp-jshint');

// Lint Tasks
gulp.task('lint-client', function() {
  return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function() {
  return gulp.src('./test/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

