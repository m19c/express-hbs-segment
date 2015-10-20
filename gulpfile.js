var config = require('./package.json');
var gulp = require('gulp');
var gds = require('gulp-dev-server');
var eslint = require('gulp-eslint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var codeclimate = require('gulp-codeclimate-reporter');
var notify = require('gulp-notify');

gulp.task('dev', ['test', 'lint'], function dev() {
  gds.task({
    restart: ['lib/**/*.js', 'index.js', 'example/**/*'],
    notify: ['lib/**/*.js', 'index.js', 'example/**/*'],
    server: {
      verbose: true,
      environment: 'development',
      script: { path: 'example/index.js' },
      process: {
        args: ['--harmony']
      }
    }
  });

  gulp.watch(['lib/**/*.js', 'index.js', 'test/**/*.js'], ['test', 'lint']);
});

gulp.task('test.instrument', function instrument() {
  return gulp
    .src(['index.js', 'lib/**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
  ;
});

gulp.task('test', ['test.instrument'], function test() {
  return gulp
    .src(['test/**/*.test.js'])
    .pipe(mocha({
      require: ['./test/bootstrap']
    }))
    .pipe(istanbul.writeReports({
      dir: './dist/test-report'
    }))
    .pipe(notify({
      title: config.name,
      message: 'Task "test" completed'
    }))
  ;
});

gulp.task('lint', function lint() {
  return gulp
    .src(['index.js', 'lib/**/*.js', 'test/**/*.js', 'gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(notify({
      title: config.name,
      message: 'Task "lint" completed'
    }))
  ;
});

gulp.task('codeclimate', function sendToCodeclimate() {
  return gulp
    .src(['dist/test-report/lcov.info'], { read: false })
    .pipe(codeclimate({
      token: 'x'
    }))
  ;
});

gulp.task('default', ['lint', 'test']);
