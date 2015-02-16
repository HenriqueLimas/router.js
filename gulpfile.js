var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');

var karma = require('karma').server;

gulp.task('default', function() {

});

gulp.task('tdd', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('demo', ['demo:make', 'connect']);

gulp.task('demo:make', ['clean:demo'], function() {
	return gulp.src(['src/**/*.js'])
		.pipe(gulp.dest('demo/lib'));
});

gulp.task('connect', function() {
    connect.server({
        port: 8000,
        root: 'demo'
    });
});

gulp.task('clean:demo', function(cb) {
    del(['demo/lib'], cb);
});
