var path = require('path');

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
    stylesheets: [],
    scripts: [path.join(this.dirs.bower, 'jquery', 'dist', 'jquery.js')]
  },
  app: {
    fonts: [path.join(this.dirs.private, 'fonts', '**')],
    images: [path.join(this.dirs.private, 'images', '**')],
    stylesheets: [path.join(this.dirs.private, 'stylesheets', '**', '*.scss')],
    scripts: [path.join(this.dirs.private, 'scripts', '**', '*.js')],
    pages: [path.join(this.dirs.private, 'templates', 'pages', '**', '*.nunjucks')],
    templates: [path.join(this.dirs.private, 'templates', '**', '*.nunjucks')]
  }
};

exports.settings = {
  sass: {
    outputStyle: 'compressed',
    includePaths: [
      path.join(this.dirs.bower, 'bootstrap-sass', 'assets', 'stylesheets')
    ]
  },
  uglify: {},
  nunjucks: {
    path: [path.join(this.dirs.private, 'templates', 'partials')]
  },
  versionNumber: {
    value: '%MD5%',
    append: {
      key: 'v',
      to: ['css', 'js']
    }
  }
};

exports.deploy = {
    local_path: path.join('public', '**'),
    remote_path: path.join('var', 'www')
};
