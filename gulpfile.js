// Requires

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


// Variables

var dirs = {
  private: 'private',
  public: 'public',
  bower: 'bower_components'
};
var vendor = {
  stylesheets: [],
  scripts: [dirs.bower + '/jquery/dist/jquery.js']
};
var app = {
  fonts: [dirs.private + '/fonts/**'],
  images: [dirs.private + '/images/**'],
  stylesheets: [dirs.private + '/stylesheets/**/*.scss'],
  scripts: [dirs.private + '/scripts/**/*.js'],
  pages: [dirs.private + '/templates/pages/**.*+(html|nunjucks)'],
  partials: [dirs.private + '/templates/partials/**.*+(html|nunjucks)'],
  partialsTxt: dirs.private + '/templates/partials'
};
var configs = {
  sass: {
    outputStyle: 'compressed',
    includePaths: [dirs.bower + '/bootstrap-sass/assets/stylesheets']
  },
  uglify: {
    preserveComments: 'license'
  }
};


// Tasks

gulp.task('vendor', function() {
  if( vendor.stylesheets.length ) {
    gulp.src(vendor.stylesheets)
      .pipe(concat('vendors.css'))
      .pipe(gulp.dest(dirs.public + '/css'));
  }

  if( vendor.scripts.length ) {
    gulp.src(vendor.scripts)
      .pipe(concat('vendors.js'))
      .pipe(uglify(configs.uglify))
      .pipe(gulp.dest(dirs.public + '/js'));
  }
});

gulp.task('app:assets', function() {
  gulp.src(app.fonts)
    .pipe(gulp.dest(dirs.public + '/fonts'));

  gulp.src(app.images)
    .pipe(gulp.dest(dirs.public + '/img'));
});

gulp.task('app:stylesheets', function() {
  if( app.stylesheets.length ) {
    gulp.src(app.stylesheets)
      // .pipe(sourcemaps.init())
      .pipe(sass(configs.sass).on('error', sass.logError))
      // .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest(dirs.public + '/css'));
  }
});

gulp.task('app:scripts', function() {
  if( app.scripts.length ) {
    gulp.src(app.scripts)
      .pipe(uglify(configs.uglify))
      .pipe(gulp.dest(dirs.public + '/js'));
  }
});

gulp.task('app:templates', function() {
  gulp.src(app.pages)
    .pipe(data(function() {
      return require('./data.json');
    }))
    .pipe(nunjucks({
      path: app.partialsTxt
    }))
    .pipe(gulp.dest(dirs.public));
});

gulp.task('once', ['vendor', 'app:assets', 'app:stylesheets', 'app:scripts', 'app:templates']);

gulp.task('default', ['once'], function() {
  gulp.watch([app.fonts, app.images], ['app:assets']);
  gulp.watch(app.stylesheets, ['app:stylesheets']);
  gulp.watch(app.scripts, ['app:scripts']);
  gulp.watch(['data.json', app.pages, app.partials], ['app:templates']);
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
