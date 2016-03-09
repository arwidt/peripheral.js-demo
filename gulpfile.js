var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rs = require('run-sequence');

var sass            = require('gulp-sass');
var rename          = require('gulp-rename');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var plumber         = require('gulp-plumber');
var cssnano         = require('gulp-cssnano');

var gutil           = require('gulp-util');

var onError = function (err) {
    gutil.beep();
    console.log(err);
};


gulp.task('dev', function() {
    gulp.src('src/peripheral.js')
        .pipe(uglify())
        .pipe(concat('peripheral.min.js'))
        .pipe(gulp.dest('./src/'));
});

gulp.task('default', function() {

    livereload({start: true});

    connect.server({
        root: './'
    });

    watch(['!src/**/*.min.js', 'src/**/*.js', '**/*.html', 'demo_src/**/*.(scss|js|html)'], function () {
        rs('dist', 'demo', livereload.reload);
    });

});

gulp.task('dist', function() {
    gulp.src('src/peripheral.js')
        .pipe(uglify())
        .pipe(concat('peripheral.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('demo', function() {

    gulp.src('demo_src/js/main.js')
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./js/'));


    gulp.src('demo_src/scss/main.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({style: 'compact', errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(cssnano())
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('css/'));

});