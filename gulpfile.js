// Gulp Dependencies
var gulp   = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');

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

// Browserify Tasks
gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('client/index.js')
    .pipe(browserify({ insertGlobals: true }))
    .pipe(rename('client.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/client/initial_spec.js')
    .pipe(browserify({ insertGlobals: true }))
    .pipe(rename('client-test.js'))
    .pipe(gulp.dest('build'));
});
 
