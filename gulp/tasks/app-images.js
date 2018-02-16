const path = require('path');

module.exports = function() {
  return gulp.src(_GULPCONFIG.paths.app.images)
  .pipe(gulp.dest(path.join(_GULPCONFIG.dirs.public, 'assets', 'images')));
};
