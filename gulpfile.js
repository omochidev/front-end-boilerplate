var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var nunjucks = require('gulp-nunjucks-render');
var data = require('gulp-data');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var ftp = require('vinyl-ftp');

var vendorStylesheets = [];
var vendorScripts = [];
var appFonts = ['private/fonts/**/*.*'];
var appImages = ['private/images/**/*.*'];
var appStylesheets = ['private/stylesheets/**/*.scss'];
var appScripts = ['private/scripts/**/*.js'];
var sassConfig = {
  // outputStyle: 'expanded',
  includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets']
};

gulp.task('vendor', function() {
  if( vendorStylesheets.length ) {
    gulp.src(vendorScripts)
      .pipe(concat('vendors.css'))
      .pipe(gulp.dest('./public/js'))
  }

  if( vendorScripts.length ) {
    gulp.src(vendorScripts)
      .pipe(concat('vendors.js'))
      .pipe(gulp.dest('./public/js'))
  }
});

gulp.task('app:assets', function() {
  gulp.src(appFonts)
    .pipe(gulp.dest('./public/fonts'))

  gulp.src(appImages)
    .pipe(gulp.dest('./public/img'))
});

gulp.task('app:stylesheets', function() {
  if( appStylesheets.length ) {
    gulp.src(appStylesheets)
      // .pipe(sourcemaps.init())
      .pipe(sass(sassConfig).on('error', sass.logError))
      // .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./public/css'));
  }
});

gulp.task('app:scripts', function() {
  if( appScripts.length ) {
    gulp.src(appScripts)
      .pipe(gulp.dest('./public/js'));
  }
});

gulp.task('app:templates', function() {
  gulp.src('private/templates/pages/**.*+(html|nunjucks)')
    .pipe(data(function() {
      return require('./data.json');
    }))
    .pipe(nunjucks({
      path: ['private/templates/partials']
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('once', ['vendor', 'app:assets', 'app:stylesheets', 'app:scripts', 'app:templates']);

gulp.task('default', ['once'], function() {
  gulp.watch(appStylesheets, ['app:stylesheets']);
  gulp.watch(appScripts, ['app:scripts']);
});

gulp.task('deploy', ['once'], function() {
  var env = process.env.NODE_ENV || 'test';
  var secrets = require('./secrets.json');
  var deployInfo = env == 'production' ? secrets.deploy_production : secrets.deploy;

  console.log('--------------------------');
  console.log('Compiled, now uploading...');
  console.log('--------------------------');

  var conn = ftp.create({
    host: deployInfo.host,
    user: deployInfo.user,
    password: deployInfo.password,
    parallel: 3,
    log: gutil.log
  });

  gulp.src(secrets.folders, { buffer: false } )
    .pipe(conn.newer(deployInfo.dest))
    .pipe(conn.dest(deployInfo.dest));
});
