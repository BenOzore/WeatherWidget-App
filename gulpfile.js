const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function minifyCSS() {
  return gulp.src('css/*.css') 
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

function transpileJS() {
  return gulp.src('js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist')) 
}

function sync() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

function copyHTML() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
}

exports.default = function() {
  gulp.watch('css/*.css', minifyCSS);
  gulp.watch('js/*.js', transpileJS);
  minifyCSS();
  transpileJS();
  copyHTML();
  sync();
}

