// Gulp Dependencies
var gulp   = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');

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

