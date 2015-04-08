'use strict';

// Gulp Dependencies
var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

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
gulp.task('browserify-client', ['lint-client'], function() {
  var b = browserify({ entries: './client/index.js', debug: true });
  return b.bundle()
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/'))
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('browserify-test', ['lint-test'], function() {
  var b = browserify({ entries: './test/client/app_spec.js', debug: true });
  return b.bundle()
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(source("client-test.js"))
    .pipe(buffer())
    .pipe(gulp.dest("build/"))
});
 
// Test Tasks
gulp.task('test', ['browserify-test'], function() {
  return gulp.src('test/client/runner.html')
    .pipe(mochaPhantomjs({ interface: 'bdd', reporter: 'spec' }));
});

gulp.task('watch', function() {
  gulp.watch('client/**/*.js', ['browserify-client', 'test']);
  gulp.watch('test/client/**/*.js', ['test']);
});

// Build and Default Tasks
gulp.task('build', ['browserify-client']);
gulp.task('default', ['test', 'build']);

