var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    watch   = require('gulp-watch'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify');

gulp.task('uglify', function() {
  return gulp.src('src/*.js')
    .pipe(concat('jpop.min.js'))
    .pipe(uglify())
    .on('error', printError)
    .pipe(gulp.dest('./'))
    .pipe(gulp.dest('demo/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['uglify']);
});

gulp.task('default', ['uglify', 'watch']);

function printError(error) {
  console.log(error.toString());
  this.emit('end');
}
