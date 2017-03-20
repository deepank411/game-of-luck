var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
// var uglify = require('gulp-uglify');

gulp.task('default', ['watch']);

// Static server
gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
});

gulp.task('build-css', function () {
   return gulp.src('./stylesheets/scss/*.scss')
      // .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest('./stylesheets/css'))
      // .pipe(browserSync.stream());
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('inject-index', function(){
   return gulp.src("./index.html")
      // .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
      .pipe(inject(
         // gulp.src(['./public/javascripts/**/*.js'], {read: false}), {relative: true}
         gulp.src(['./javascripts/**/*.js']).pipe(angularFilesort()).pipe(angularFilesort()), {relative: true}
      ))
      .pipe(inject(
         gulp.src(['./stylesheets/css/**/*.css'], {read: false}), {relative: true}
      ))
      .pipe(gulp.dest('./'));
});

gulp.task('watch', ['browser-sync', 'build-css', 'inject-index'], function () {
   // gulp.watch("public/javascripts/**/*.js", ['build-js']);
   gulp.watch("./stylesheets/scss/*.scss", ['build-css']);
   gulp.watch(['./javascripts/**/*.js', './stylesheets/css/**/*.css'], ['inject-index']);
   gulp.watch("./**/*.html").on('change', browserSync.reload);
   gulp.watch('./javascripts/**/*.js').on('change', browserSync.reload);
});
