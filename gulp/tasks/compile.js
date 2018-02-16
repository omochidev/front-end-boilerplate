const runSequence = require('run-sequence');

module.exports = function(callback) {
  runSequence(
    ['clean'],
    ['vendor:scripts', 'app:fonts', 'app:images', 'app:stylesheets', 'app:scripts'],
    ['app:templates'],
    function() {
      callback();
    }
  );
}
