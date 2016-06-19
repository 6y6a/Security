/**
 * Created by 6y6a on 15.04.2016.
 */
'use strict'

var gulp           = require('gulp');
var del            = require('del');
var less           = require('gulp-less');
var concat         = require('gulp-concat');
var cleanCss       = require('gulp-clean-css');
var uglify         = require('gulp-uglify');
var sourcemap      = require('gulp-sourcemaps');
var autoprefixer   = require('gulp-autoprefixer');
var browserSync    = require('browser-sync');
var mainBowerFiles = require('main-bower-files');

gulp.task('make:less', function(){
    return gulp.src('src/less/**/main.less')
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(autoprefixer({browser: ['last 25 versions', 'ie9']}))
        .pipe(sourcemap.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('make:lib-less', function(){
    return gulp.src(mainBowerFiles('**/*.less'))
        .pipe(sourcemap.init())
        .pipe(concat('libs.css'))
        .pipe(less())
        .pipe(autoprefixer({browser: ['last 15 versions', 'ie9']}))
        .pipe(sourcemap.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('make:lib-js', function(){
   return gulp.src(mainBowerFiles('**/*.js'))
       .pipe(concat('libs.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest('src/js'));
});

gulp.task('server', ['make:less', 'make:lib-less', 'make:lib-js'], function(){

    browserSync({
        server: {
            baseDir: 'src'
        },
        browser: 'chrome'
    });

    gulp.watch('src/less/**/*.less', ['make:less']);
    gulp.watch('src/libs/bootstrap/less/**/*.less', ['make:lib-less']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function(){
    del.sync('dist');
});

gulp.task('build', ['clean', 'make:less', 'make:lib-less', 'make:lib-js'], function(){
    var buildCss = gulp.src('src/css/**/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJS = gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

});