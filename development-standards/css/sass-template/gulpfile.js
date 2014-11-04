var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  clean = require('gulp-clean'),
  watch = require('gulp-watch'),
  connect = require('gulp-connect'),
  shell = require('gulp-shell');

gulp.task('styles', function () {
    return gulp.src('src/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() { 
  gulp.watch('./src/**', ['styles']);
})

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
  gulp.src('./build/index.html')
  //.pipe(shell('open http://localhost:8080'));
})

// start the livereload server and watch
// for file changes
gulp.task('default', ['connect', 'watch'], function(){
  console.log('Server running at http://localhost:8080');
});