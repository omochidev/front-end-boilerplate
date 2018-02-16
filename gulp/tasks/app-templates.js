const path = require('path');
const fancyLog = require('fancy-log');
const pug = require('gulp-pug');
const data = require('gulp-data');

module.exports = function() {
  return gulp.src(_GULPCONFIG.paths.pages)
  .pipe(data(function(file) {
    // require uncached json
    var dataJSON = (function(module) {
      delete require.cache[require.resolve(module)];
      return require(module);
    })('../../data.json');

    dataJSON.environment = _GULPENV;
    dataJSON.page = {
      id: path.basename(file.path, '.pug'),
      filename: (path.basename(file.path, '.pug') + '.html')
    };

    return dataJSON;
  }))
  .pipe(pug(_GULPCONFIG.settings.pug).on('error', fancyLog))
  .pipe(gulp.dest(_GULPCONFIG.dirs.public));
};
