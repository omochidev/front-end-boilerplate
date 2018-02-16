const path = require('path');

module.exports = function() {
  return gulp.src(_GULPCONFIG.paths.app.fonts)
  .pipe(gulp.dest(path.join(_GULPCONFIG.dirs.public, 'assets', 'fonts')));
};
