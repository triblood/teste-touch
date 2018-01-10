var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

gulp.task('buildCss', function(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./build/arquivos'))
});

gulp.task('buildJs', function(){
    return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/arquivos'));    
});

gulp.task('browser-sync', function() {
    browserSync.init({
        dev: {
            bsFiles: {
                src:'build/arquivos/*.css'
            }
        },

        option: {
            proxy: 'pandorajoias.vtexlocal.com.br',
            watchTask: true
        }
    });
});

gulp.task('jsHints', function(){
    return gulp.src(['./src/js/**/*.js', './build/arquivos/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('fail'));
});

gulp.task('cleanBuild', function () {
    return gulp.src('./build/arquivos', {read: false})
        .pipe(clean());
});

gulp.task('copyCss', function () {
    gulp.src('./src/css/**/*.css')
        .pipe(gulp.dest('./build/arquivos/'));
});

gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', ['buildCss']);
    gulp.watch('./src/js/**/*.js', ['jsHints']);
    gulp.watch('./src/js/**/*.js', ['buildJs']);
});

gulp.task('default', ['cleanBuild','buildCss','jsHints','buildJs','copyCss','browser-sync','watch'], function(){
    console.log('Começando...');
});