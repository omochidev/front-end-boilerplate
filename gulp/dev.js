const path = require('path');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

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

  gulp.task('server', function() {
    return browserSync.init({
      server: _GULPCONFIG.dirs.public,
      files: [path.join(_GULPCONFIG.dirs.public, '**', '*.*')],
      port: process.env.PORT || _GULPCONFIG.defaults.port,
      open: false,
      directory: true,
      reloadDelay: 100
    });
  });

  gulp.task('default', function() {
    runSequence('compile', 'server', function() {
      gulp.watch(_GULPCONFIG.paths.app.fonts, ['app:fonts']);
      gulp.watch(_GULPCONFIG.paths.app.images, ['app:images']);
      gulp.watch(_GULPCONFIG.paths.app.stylesheets, ['app:stylesheets']);
      gulp.watch(_GULPCONFIG.paths.app.scripts, ['app:scripts']);
      gulp.watch(['data.json', _GULPCONFIG.paths.templates], ['app:templates']);
    });
  });
};
