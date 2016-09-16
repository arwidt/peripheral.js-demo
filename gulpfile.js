var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var taskmodules = require('taskmodules');
var async = require('async');

gulp.task('run', function(done) {
    async.series([
        taskmodules.js.browserify.create('src/js/main.js', 'main.min.js', 'public/js/', false, false),
        taskmodules.style.sass.create('src/scss/main.scss', 'main.min.css', 'public/css/', false, false)
    ], function() {
        done();
    });
});

gulp.task('default', function() {

    connect.server({
        root: 'public',
        livereload: true
    });

    watch(['src/**/*.js', 'src/**/*.scss'], function () {
        async.series([
            taskmodules.js.browserify.create('src/js/main.js', 'main.min.js', 'public/js/', false, false),
            taskmodules.style.sass.create('src/scss/main.scss', 'main.min.css', 'public/css/', false, false)
        ], function() {
            connect.reload();
            console.log("WATCH COMPLETE:", new Date().toTimeString());
        });
    });

});
