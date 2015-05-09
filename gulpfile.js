var gulp = require('gulp');
var harp = require('harp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

gulp.task('default', function() {
	var css = [
	];
	var js = [
	];

	if( css.length > 0 ) {
		gulp.src(css)
			.pipe(concat('plugins.css'))
			.pipe(minifyCSS())
			.pipe(gulp.dest('public/css'))
	}

	if( js.length > 0 ) {
		gulp.src(js)
			.pipe(concat('plugins.js'))
			.pipe(uglify({
				preserveComments: 'some'
			}))
			.pipe(gulp.dest('public/js'));
	}

	harp.server(__dirname, {
		port: 9000
	}, function() {
		console.log('----------------------------------');
		console.log('Server listening at http://localhost:9000');
	});
});

gulp.task('deploy', function() {
	var env = process.env.NODE_ENV || 'test';
	var secrets = require('./secrets.json');
	var deployInfo = env == 'production' ? secrets.deploy_production : secrets.deploy;

	harp.compile(__dirname, 'www', function() {
		console.log('--------------------------');
		console.log('Harp successfully compiled, now uploading...');
		console.log('--------------------------');

		gulp.src(['www/js/main.js'])
			.pipe(concat('main.js'))
			.pipe(uglify({
				preserveComments: 'some'
			}))
			.pipe(gulp.dest('www/js'));

		var conn = ftp.create({
			host: deployInfo.host,
			user: deployInfo.user,
			password: deployInfo.password,
			parallel: 3,
			log: gutil.log
		});

		return gulp.src(secrets.folders, { buffer: false } )
			.pipe(conn.newer(deployInfo.dest))
			.pipe(conn.dest(deployInfo.dest));
	});
});
