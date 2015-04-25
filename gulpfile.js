var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

gulp.task('build', function() {
	var css = [
	];
	var js = [
	];

	gulp.src(css)
		.pipe(concat('plugins.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('public/css'))

	gulp.src(js)
		.pipe(concat('plugins.min.js'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(gulp.dest('public/js'));
});


gulp.task('deploy', function() {
	gulp.src(['www/js/main.js'])
		.pipe(concat('main.js'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(gulp.dest('www/js'));

	var deployInfo = require('./secrets.json').deploy;
	var conn = ftp.create({
		host: deployInfo.host,
		user: deployInfo.user,
		password: deployInfo.password,
		parallel: 3,
		log: gutil.log
	});

	return gulp.src('www/**', { buffer: false } )
		.pipe(conn.newer(deployInfo.dest))
		.pipe(conn.dest(deployInfo.dest));
});
