const path = require('path');
const fancyLog = require('fancy-log');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');

module.exports = function() {
  return gulp.src(_GULPCONFIG.paths.app.script)
  .pipe(browserify())
  .pipe(concat('main.js'))
  .pipe(uglify(_GULPCONFIG.settings.uglify).on('error', fancyLog))
  .pipe(gulp.dest(path.join(_GULPCONFIG.dirs.public, 'assets', 'js')));
};
