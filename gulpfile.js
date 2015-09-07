var gulp	 		= require('gulp'),
		webpack		= require('webpack'),
		path			= require('path'),
		_     		= require('lodash'),
    DevServer = require('webpack-dev-server'),
		preprocess = require('gulp-preprocess');

var paths = {
	static: __dirname + '/client/static/**/*',
	js: 'client/app/**/*',
	build: __dirname + '/client/build',
	html: __dirname + '/client/static/index.html'
};

var webpackServerConfig = {
  historyApiFallback: true,
  contentBase: path.join(process.cwd(), 'client/build/'),
  publicPath: 'http://localhost:8080/assets',
  filename: "bundle.js",
  noInfo: true
};

gulp.task('copy:assets', function () {
	return gulp.src(paths.static)
		.pipe(gulp.dest(paths.build));
});

gulp.task('copy:assets:dev', ['copy:assets'], function () {
	return gulp.src(paths.html)
		.pipe(preprocess({context: { NODE_ENV: 'dev'}}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('copy:assets:production', ['copy:assets'], function () {
	return gulp.src(paths.html)
		.pipe(preprocess({context: { NODE_ENV: 'production'}}))
		.pipe(gulp.dest(paths.build));
});

gulp.task('build:static:dev', function(cb) {
  var config = require('./client/config/webpack.dev');
  return webpack(config)
		.run(function (err, stats) {
						if(err)
							return cb(err);
						var jsonStats = stats.toJson();
						if(jsonStats.errors.length > 0)
								return cb(jsonStats.errors);
						else if(jsonStats.warnings.length > 0)
								console.log(jsonStats.warnings);
						return cb();
					});
});

gulp.task('build:static:production', function(cb) {
  var config = require('./client/config/webpack.prod');
  return webpack(config)
    .run(function (err, stats) {
            if(err)
              return cb(err);
						var jsonStats = stats.toJson();
            if(jsonStats.errors.length > 0)
                return cb(jsonStats.errors);
            else if(jsonStats.warnings.length > 0)
                console.log(jsonStats.warnings);
            return cb();
          });
});

gulp.task('run:frontend', function () {
  new DevServer(webpack(require('./client/config/webpack.dev')), webpackServerConfig).listen(8080);
});

gulp.task('run:frontend:hot', function () {
	var config = require('./client/config/webpack.dev');
	config.entry.push('webpack/hot/only-dev-server');
  new DevServer(webpack(config), _.merge(webpackServerConfig, { hot: true })).listen(8080);
});

gulp.task('watch:build', function(){
	gulp.watch(paths.js, ['build:dev']);
});

gulp.task('watch:copy', function () {
	gulp.watch(paths.static, ['copy:assets:dev']);
});

gulp.task('default', ['copy:assets:dev', 'run:frontend', 'watch:copy']);
gulp.task('hot', ['copy:assets:dev', 'run:frontend:hot', 'watch:copy']);
gulp.task('build:production', ['build:static:production', 'copy:assets:production'])
