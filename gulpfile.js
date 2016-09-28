// include gulp

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');



// include plug-ins
gulp.task('sass', function () {
 gulp.src('scss/kahicool.scss')
	.pipe(sourcemaps.init())
 	.pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('map/'))
 	.pipe(gulp.dest('css/'))
	.pipe(browserSync.reload({stream: true}));	
});

gulp.task('watch', function()	{
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch(['templates/**/**/*.twig', 'templates/**/*.js'], ['reload'])
});

gulp.task('reload', function() {
	browserSync.reload();
});

// browsersync task
gulp.task('browser-sync', function () {
	 browserSync({
		 port: 8000,
		 proxy: 'localhost',
		 notify: false,
		 open: false,
		 ui: {
			 port: 8001,
			 weinre: {
			 	port: 8002
			 }
		 }
	 });
});

// default task
gulp.task('default', ['sass', 'watch', 'browser-sync']);