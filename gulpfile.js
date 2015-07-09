var gulp   = require('gulp');
var watch  = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
  return gulp.src('src/*.js')
    .pipe(concat('jpop.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(gulp.dest('demo/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['uglify']);
});

gulp.task('default', ['uglify', 'watch']);
