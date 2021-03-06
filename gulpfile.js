var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    watch   = require('gulp-watch'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    header  = require('gulp-header'),
    rename  = require('gulp-rename'),
    jslint  = require('gulp-jslint');
    fs      = require('fs');

var license = fs.readFileSync('./BUILD', 'utf8');
var build   = (new Date()).toUTCString();
var version = fs.readFileSync('./VERSION', 'utf8');

gulp.task('uglify', function() {
  return gulp.src('src/*.js')
    .pipe(concat('jpop.min.js'))
    .pipe(jslint({
      node       : true,
      white      : true,
      browser    : true,
      regexp     : false,
      errorsOnly : false
    }))
    .on('error', printError)
    .pipe(uglify())
    .on('error', printError)
    .pipe(header(license, {
      version: version,
      build: build
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('demo/js'));
});

gulp.task('dist', function() {
  return gulp.src('src/*.js')
    .pipe(concat('jpop.js'))
    .pipe(header(license, {
      version: version,
      build: build
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['uglify']);
});

gutil.log('VERSION: ' + version);
gutil.log('BUILD: ' + build);

gulp.task('default', ['uglify', 'dist', 'watch']);

function printError(error) {
  console.log(error.toString());
  this.emit('end');
}
