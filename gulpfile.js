var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var changed = require('gulp-changed');
var gulp = require('gulp');
var pump = require('pump');
var babel = require('gulp-babel');
var stripDebug = require('gulp-strip-debug');

var src = ['./js/lodash.min.js','./js/vue.min.js','./js/vue-resource.js','./js/vue-router.js','./js/AV.analytics.js','./js/global.js','./js/nav.js','./js/index.js','./js/about.js','./js/contact.js','./js/rgbaster.min.js','./js/detail.js','./js/lab.js','./js/work.js','./js/route.js'];

gulp.task('js', function() {
	return	gulp.src(src)
  			.pipe(concat('main20210105.js'))
  			.pipe(babel())
  			.pipe(stripDebug())
  			.pipe(uglify())
  			.pipe(gulp.dest('./js'));
});