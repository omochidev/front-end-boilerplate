const path = require('path');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

module.exports = function() {
  return gulp.src(_GULPCONFIG.paths.vendor.scripts)
  .pipe(concat('vendors.js'))
  .pipe(uglify(_GULPCONFIG.settings.uglify))
  .pipe(gulp.dest(path.join(_GULPCONFIG.dirs.public, 'assets', 'js')));
}
