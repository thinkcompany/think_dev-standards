var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	clean = require('gulp-clean'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect');

gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('connect', function() {
	connect.server({
		root: './build',
		livereload: true
	})
})