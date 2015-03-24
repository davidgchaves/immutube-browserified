'use strict';

// Gulp Dependencies
var gulp      = require('gulp');
var rename    = require('gulp-rename');
var transform = require('vinyl-transform');

// Build Dependencies
var browserify = require('browserify');

// Dev Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

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

// browserified transforms a regular node stream to a gulp (buffered vinyl) stream
var browserified = transform(function(filename) {
  var b = browserify({ entries: filename, debug: true, insertGlobals: true });
  return b.bundle();
});

gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('client/index.js')
    .pipe(browserified)
    .pipe(rename('client.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/client/initial_spec.js')
    .pipe(browserified)
    .pipe(rename('client-test.js'))
    .pipe(gulp.dest('build'));
});
 
// Test Tasks
gulp.task('test', ['lint-test', 'browserify-test'], function() {
  return gulp.src('test/client/runner.html')
    .pipe(mochaPhantomjs({interface: 'bdd', reporter: 'spec'}));
});

gulp.task('watch', function() {
  gulp.watch('client/**/*.js', ['browserify-client', 'test']);
  gulp.watch('test/client/**/*.js', ['test']);
});

// Build and Default Tasks
gulp.task('build', ['browserify-client']);
gulp.task('default', ['test', 'build']);

