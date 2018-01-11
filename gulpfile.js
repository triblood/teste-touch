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
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('buildJs', function(){
    return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/arquivos'));    
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'build'
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

gulp.task('watch', ['browser-sync', 'buildCss'], function(){
    gulp.watch('./src/scss/**/*.scss', ['buildCss']);
    gulp.watch('./src/js/**/*.js', ['jsHints']);
    gulp.watch('./src/js/**/*.js', ['buildJs']);
    gulp.watch('./src/*.html', browserSync.reload); 
});

gulp.task('html', function() {
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build/'))
})

gulp.task('img', function() {
    return gulp.src('./src/image/*.png')
    .pipe(gulp.dest('./build/arquivos/'))
})

gulp.task('default', ['cleanBuild','html','img','buildCss','jsHints','buildJs','browser-sync','watch'], function(){
    console.log('Começando...');
});