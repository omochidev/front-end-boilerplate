var filename;

global._GULPCONFIG = require('./gulp/config');
global._GULPENV = process.env.NODE_ENV || config.defaults.env;
global.gulp = require('gulp');

switch (_GULPENV) {
  case 'prod':
  case 'stage':
    filename = './gulp/prod.js';
    break;

  default:
    filename = './gulp/dev.js';
}

require(filename)();
