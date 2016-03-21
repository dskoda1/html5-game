'use strict';

const gulp = require('gulp');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
 
// Basic usage 
gulp.task('bundle', function() {
	// Single entry point to browserify 
	gulp.src('client/app.js')
		.pipe(browserify({
		  insertGlobals : true,
		  debug : false
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('lint', function() {
  return gulp.src(['client/**', '!node_modules/**'])
    .pipe(eslint(require('./.eslintrc.json')))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('watch',function()  {
    gulp.watch('client/**', ['lint', 'bundle']);
});
gulp.task('default', ['watch']);