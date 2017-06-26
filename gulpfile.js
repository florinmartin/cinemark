var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path');

console.log('\x1b[44m', '\x1b[37m', '\x1b[1m', ' Listening on port 4000 ' ,'\x1b[0m');

gulp.task('express', function() {
  var bodyParser = require('body-parser');
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(__dirname, 'public/')));
  app.listen(4000, '0.0.0.0');

  //app.all('/cinema/:key', function (req, res, next) {
  //  phantom.create({dnodeOpts: {weak: false}}, function(ph) {
  //    return ph.createPage(function(page) {
  //
  //    });
  //  });
  //});
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});
function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('sass', function () {
  return gulp.src('./public/sass/app.scss')
  	.pipe(sass({ includePaths: ['./public/sass'], errLogToConsole: true }))
    .pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS({debug: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/*.scss', ['sass']);
  gulp.watch('./public/**/*.html', notifyLiveReload);
  gulp.watch('./public/js/*.js', notifyLiveReload);
  gulp.watch('./public/css/*.css', notifyLiveReload);
});

gulp.task('default', ['sass', 'express', 'livereload', 'sass:watch'], function() {

});