const path = require('path');

exports.defaults = {
  port: 3000,
  env: 'dev'
};

exports.dirs = {
  private: 'private',
  public: 'public',
  bower: 'bower_components'
};

exports.paths = {
  vendor: {
    scripts: [path.join(this.dirs.bower, 'jquery', 'dist', 'jquery.js')]
  },
  app: {
    fonts: [path.join(this.dirs.private, 'fonts', '**')],
    images: [path.join(this.dirs.private, 'images', '**')],
    stylesheets: [path.join(this.dirs.private, 'stylesheets', '**', '*.scss')],
    script: path.join(this.dirs.private, 'scripts', 'main.js'),
    scripts: [path.join(this.dirs.private, 'scripts', '**', '*.js')]
  },
  templates: [path.join(this.dirs.private, 'templates', '**', '*.pug')],
  pages: [path.join(this.dirs.private, 'templates', 'pages', '**', '*.pug')]
};

exports.settings = {
  sass: {
    outputStyle: 'compressed',
    includePaths: [
      path.join(this.dirs.bower, 'bootstrap-sass', 'assets', 'stylesheets')
    ]
  },
  uglify: {},
  pug: {
    verbose: true
  }
};

exports.deploy = {
  local_path: path.join('public', '**'),
  remote_path: path.join('var', 'www')
};
