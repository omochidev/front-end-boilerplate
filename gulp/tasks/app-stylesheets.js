const path = require('path');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

module.exports = function() {
  return gulp.src(_GULPCONFIG.paths.app.stylesheets)
  .pipe(sass(_GULPCONFIG.settings.sass).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest(path.join(_GULPCONFIG.dirs.public, 'assets', 'css')));
};
