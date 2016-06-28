// Define project paths.
// Note: all of these are relative to the project root.
var projectPaths = {
    scssSources: 'scss',
    outputRoot: 'output'
};

// Import required dependencies.
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserSyncReload = browserSync.reload,
    sass = require('gulp-sass'),
    connectPHP = require('gulp-connect-php')
    jade = require('gulp-jade');

var browserSyncConfig = {
    server: {
        baseDir: './bicycle/builds/devolopment/'
    },
    files: [
        projectPaths.outputRoot + './builds/devolopment/css/*.css',
        projectPaths.outputRoot + './builds/devolopment/*.html',
        projectPaths.outputRoot + './builds/devolopment/js/*.js'
    ]
};

gulp.task('sass', function() {
   return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./builds/devolopment/css'))
        .pipe(browserSyncReload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./builds/devolopment"
        }
    });
});

gulp.task('jade', function () {
  return  gulp.src('./templates/**/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./builds/devolopment/'));
});

gulp.task('php', function(){
    connectPHP.server({ base: '.', keepalive:true, hostname: 'localhost', port:8000, open: true});
});

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', ['sass']);

    gulp.watch('./templates/**/*.jade', ['jade']);
    
});

gulp.task('default', 
    ['sass', 'jade', 'browser-sync', 'php' , 'watch']);