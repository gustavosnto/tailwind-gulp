const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const tailwindcss = require('tailwindcss');

const PROJECT_DIR = __dirname;

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      tailwindcss({
        config: `${PROJECT_DIR}/tailwind.config.js`
      }),
      autoprefixer(),
      cssnano()
    ]))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
      proxy: 'http://aquiegamer.local',
      open: false
    });
  
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('**/*.php').on('change', gulp.series('sass', browserSync.reload));
  });  

gulp.task('default', gulp.series('sass', 'serve'));