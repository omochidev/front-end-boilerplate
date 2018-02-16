const path = require('path');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');

const taskClean = require('./tasks/clean');
const taskVendorScripts = require('./tasks/vendor-scripts');
const taskAppFonts = require('./tasks/app-fonts');
const taskAppImages = require('./tasks/app-images');
const taskAppStylesheets = require('./tasks/app-stylesheets');
const taskAppScripts = require('./tasks/app-scripts');
const taskAppTemplates = require('./tasks/app-templates');
const taskCompile = require('./tasks/compile');

module.exports = function() {
  gulp.task('clean', taskClean);

  gulp.task('vendor:scripts', taskVendorScripts);
  gulp.task('app:fonts', taskAppFonts);
  gulp.task('app:images', taskAppImages);
  gulp.task('app:stylesheets', taskAppStylesheets);
  gulp.task('app:scripts', taskAppScripts);
  gulp.task('app:templates', taskAppTemplates);

  gulp.task('compile', taskCompile);

  gulp.task('default', function() {
    runSequence('compile', function() {
      return gulp.src(path.join(_GULPCONFIG.dirs.public, 'assets', 'images', '**'))
      .pipe(imagemin([
        imagemin.gifsicle(_GULPCONFIG.settings.imagemin.gifsicle),
        imagemin.jpegtran(_GULPCONFIG.settings.imagemin.jpegtran),
        imagemin.optipng(_GULPCONFIG.settings.imagemin.optipng),
        imagemin.svgo(_GULPCONFIG.settings.imagemin.svgo)
      ], { verbose: true }))
      .pipe(gulp.dest(path.join(_GULPCONFIG.dirs.public, 'assets', 'images')))
    });
  });
};
