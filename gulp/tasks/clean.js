const del = require('del');

module.exports = function() {
  return del([_GULPCONFIG.dirs.public]);
};
