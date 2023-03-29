const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const tailwindcss = require('tailwindcss');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const PROJECT_DIR = __dirname;

gulp.task('sass', function () {
  return gulp.src('assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      tailwindcss({
        config: `${PROJECT_DIR}/tailwind.config.js`
      }),
      autoprefixer(),
      cssnano()
    ]))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

function pluginsCSS() {
  return gulp.src('./assets/css/libs/*.css')
  .pipe(concat('plugins.css'))
  .pipe(gulp.dest('./assets/css/'))
  .pipe(browserSync.stream())
}
gulp.task('plugincss', pluginsCSS);

function gulpJs() {
  return gulp.src('./assets/js/scripts/*.js')
  .pipe(concat('all.js'))
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('./assets/js/'))
  .pipe(browserSync.stream());
}
gulp.task('alljs', gulpJs);

function pluginsJs() {
  return gulp
  .src(['./assets/js/libs/*'])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('./assets/js/'))
  .pipe(browserSync.stream())
}
gulp.task('pluginjs', pluginsJs);

gulp.task('serve', function () {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
  
    gulp.watch('./assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./assets/css/libs/*.css', pluginsCSS);
    gulp.watch('**/*.html').on('change', gulp.series('sass', browserSync.reload));
    gulp.watch('./assets/js/scripts/*js', gulpJs);
    gulp.watch('./assets/js/libs/*.js', pluginsJs);
  });  

gulp.task('default', gulp.series('sass', 'plugincss', 'serve', 'alljs', 'pluginjs'));