// Gulp Dependencies
const gulp = require('gulp');
const rename = require('gulp-rename');
const gutil = require('gulp-util');

// dev Dependencies
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// Style Dependencies
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const assets = require('postcss-assets');


// Build Dependencies
const del = require('del');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const stripdebug = require('gulp-strip-debug');
const imagemin = require('gulp-imagemin');
const htmlclean = require('gulp-htmlclean');


const folder = {
	build: './build/',
	src: './src/'
};

gulp.task('sass', () => {
	gulp.src(folder.src + 'sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(folder.src + 'css/'))
		.pipe(reload({ stream: true }))
});

gulp.task('browserify', () => { 
	return gulp.src(folder.src + 'js/app.js')
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest(folder.build))
		.pipe(gulp.dest(folder.src + 'js'))
		.pipe(reload({ stream: true }))
});

// watch Sass & JS files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('watch', ['browserify', 'sass'], () => {
	browserSync({
		server: {
			baseDir: folder.src
		}
	});

	gulp.watch(folder.src + 'scss/**/*.scss', ['sass']);
	gulp.watch(folder.src + 'js/**/*.js', ['browserify']);
	gulp.watch(folder.src + '*.html', reload);
});


/*
* DISTRIBUTION TASKS
*/

// delete previous build folder contents
gulp.task('clean', function() {
	del([folder.build]);
});

// Image processing
gulp.task('images', () => {
	const output = folder.build + 'img/';
	return gulp.src(folder.src + 'img/**/*')
		.pipe(newer(output))
		.pipe(imagemin({ optimizationLevel: 5 }))
		.pipe(gulp.dest(output));
});

// favicon
gulp.task('favicons', () => {
	const output = folder.build;
	return gulp.src(folder.src + 'favicons/*')
		.pipe(gulp.dest(output));
});

// JS uglify
gulp.task('ugly-js', ['browserify'], () => {
	return gulp.src(folder.public + 'js/bundle.js')
		.pipe(stripdebug()) // remove logs & comments
		// .pipe(uglify()) // do this via webpackConfig
		.pipe(gulp.dest(folder.build + 'js/'));
});

// CSS uglify
gulp.task('ugly-css', ['images'], () => {
	const plugins = [
		assets({ loadPaths: ['images/'] }), // images
		autoprefixer(), // browser prefixes
		cssnano(), // minify
		mqpacker() // merge media queries
	];

	return gulp.src(folder.src + 'css/**/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest(folder.build + 'css/'));
});

// HTML 
gulp.task('html', ['images'], () => {
	return gulp.src(folder.src + '/**/*.html')
		.pipe(newer(folder.build))
		// .pipe(htmlclean())
		.pipe(gulp.dest(folder.build))
});

// build dist
gulp.task('build', ['clean', 'sass', 'browserify', 'html', 'favicons', 'ugly-css', 'ugly-js']);
