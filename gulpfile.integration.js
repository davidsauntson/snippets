var integrationTarget = "C:/repos/chc/CMS/CHC/Content/";


// include gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');



// include plug-ins
gulp.task('sass', function () {
 gulp.src('scss/main.scss')
	.pipe(sourcemaps.init())
 	.pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('map/'))
 	.pipe(gulp.dest('css/'))
	.pipe(browserSync.reload({stream: true}));	
});

gulp.task('watch', function()	{
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch(['html/**/**/*.twig', 'js/**/*.js'], ['reload']);
	gulp.watch(['html/**/**/*.php', 'js/**/*.js'], ['reload']);
});

gulp.task('reload', function() {
	browserSync.reload();
});

gulp.task('vendor-js', function() {
	gulp.src('js/vendor/**/*.js')
		.pipe(gulp.dest(integrationTarget + 'js/vendor/'))
})

gulp.task('js', function() {
	gulp.src('js/chc.js')
		//.pipe(uglify())
		.pipe(gulp.dest(integrationTarget + 'js/'));
});

gulp.task('css', function() {
	gulp.src('scss/main.scss')
		.pipe(sass({style: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(integrationTarget + 'css/'))
});

gulp.task('vendor-css', function() {
	gulp.src(['css/dropdown.css'])
		.pipe(sass({style: 'compressed'}))
		.pipe(gulp.dest(integrationTarget + 'css/'))
});

gulp.task('assets', function() {
	gulp.src(['fonts/**/*']).pipe(gulp.dest(integrationTarget  + "fonts/"));
	gulp.src(['img/**/*']).pipe(gulp.dest(integrationTarget + "img/"));
});

// browsersync task
gulp.task('browser-sync', function () {
	 browserSync({
		 port: 8081,
		 proxy: 'localhost:8080/chc-front-end',
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

gulp.task('integrate', ['sass', 'js', 'vendor-js', 'css', 'vendor-css', 'assets']);