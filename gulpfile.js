const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const nunjucks = require('gulp-nunjucks-render');
const data = require('gulp-data');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const config = require('./gulpconfig');
const _APP_ENV = process.env.NODE_ENV || config.defaults.env;



// Tasks

gulp.task('clean', function() {
    return del([config.dirs.public]);
});

gulp.task('vendor:stylesheets', function() {
  return gulp.src(config.paths.vendor.stylesheets)
  .pipe(concat('vendors.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest(path.join(config.dirs.public, 'assets', 'css')));
});

gulp.task('vendor:scripts', function() {
  return gulp.src(config.paths.vendor.scripts)
  .pipe(concat('vendors.js'))
  .pipe(uglify(config.settings.uglify))
  .pipe(gulp.dest(path.join(config.dirs.public, 'assets', 'js')));
});

gulp.task('app:fonts', function() {
  return gulp.src(config.paths.app.fonts)
  .pipe(gulp.dest(path.join(config.dirs.public, 'assets', 'fonts')));
});

gulp.task('app:images', function() {
  return gulp.src(config.paths.app.images)
  .pipe(gulp.dest(path.join(config.dirs.public, 'assets', 'images')));
});

gulp.task('app:stylesheets', function() {
  return gulp.src(config.paths.app.stylesheets)
  .pipe(sourcemaps.init())
  .pipe(sass(config.settings.sass).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(autoprefixer())
  .pipe(gulp.dest(path.join(config.dirs.public, 'assets', 'css')))
  .pipe(browserSync.stream());
});

gulp.task('app:scripts', function() {
  return gulp.src(config.paths.app.scripts)
  // .pipe(concat('main.js'))
  .pipe(sourcemaps.init())
  .pipe(uglify(config.settings.uglify).on('error', gutil.log))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.join(config.dirs.public, 'assets', 'js')));
});

gulp.task('app:templates', function() {
  return gulp.src(config.paths.app.pages)
  .pipe(data(function(file) {
    // require uncached json
    var dataJSON = (function(module) {
      delete require.cache[require.resolve(module)];
      return require(module);
    })('./data.json');

    dataJSON.env = _APP_ENV;
    dataJSON.page_id = path.basename(file.path, '.nunjucks');

    return dataJSON;
  }))
  .pipe(nunjucks(config.settings.nunjucks).on('error', gutil.log))
  .pipe(gulp.dest(config.dirs.public));
});

gulp.task('server', function() {
  return browserSync.init({
    server: config.dirs.public,
    files: [path.join(config.dirs.public, '**', '*.*')],
    port: process.env.PORT || config.defaults.port,
    open: false,
    directory: true
  });
});

gulp.task('compile', function(callback) {
  runSequence(
    ['clean'],
    ['vendor:stylesheets', 'vendor:scripts'],
    ['app:fonts', 'app:images', 'app:stylesheets', 'app:scripts'],
    ['app:templates'],
    function() {
      callback();
    }
  );
});

gulp.task('default', function() {
  runSequence('compile', 'server', function() {
    gulp.watch(config.paths.app.fonts, ['app:fonts']);
    gulp.watch(config.paths.app.images, ['app:images']);
    gulp.watch(config.paths.app.stylesheets, ['app:stylesheets']);
    gulp.watch(config.paths.app.scripts, ['app:scripts']);
    gulp.watch(['data.json', config.paths.app.templates], ['app:templates']);
  });
});
